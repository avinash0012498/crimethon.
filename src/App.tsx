/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProblemStatementsSection } from './components/ProblemStatementsSection';
import { QuestionBankSection } from './components/QuestionBankSection';
import { MockTestSection } from './components/MockTestSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { JudgeVivaSection } from './components/JudgeVivaSection';
import { LearningResourcesSection } from './components/LearningResourcesSection';
import { DashboardSection } from './components/DashboardSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { RandomQuestionModal } from './components/RandomQuestionModal';

import { problemStatements } from './data/problemStatements';
import { questionsData } from './data/questions';
import { caseStudiesData } from './data/caseStudies';
import { judgeQuestionsData } from './data/judgeQuestions';
import { learningResourcesData } from './data/learningResources';

import {
  loadUserProgress,
  saveTestResult,
  toggleBookmarkQuestion,
  toggleCompletedProblem,
  toggleCompletedCaseStudy,
  saveNotes,
  resetAllUserProgress
} from './utils/storage';
import { UserProgressState, QuestionCategory } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userProgress, setUserProgress] = useState<UserProgressState>(loadUserProgress());
  
  // Selected problem or case state for deep linking
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [mockExamPresetCategory, setMockExamPresetCategory] = useState<string | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRandomQuestionOpen, setIsRandomQuestionOpen] = useState<boolean>(false);

  // Keep progress in sync
  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmarkQuestion(id);
    setUserProgress(updated);
  };

  const handleToggleCompletedProblem = (id: string) => {
    const updated = toggleCompletedProblem(id);
    setUserProgress(updated);
  };

  const handleToggleCompletedCase = (id: string) => {
    const updated = toggleCompletedCaseStudy(id);
    setUserProgress(updated);
  };

  const handleSaveNotes = (notes: string) => {
    const updated = saveNotes(notes);
    setUserProgress(updated);
  };

  const handleResetProgress = () => {
    const updated = resetAllUserProgress();
    setUserProgress(updated);
  };

  // Quick navigation handlers
  const handleSelectProblemFromHero = (id: string) => {
    setSelectedProblemId(id);
    setActiveSection('challenges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchMockExamWithCategory = (category: QuestionCategory) => {
    setMockExamPresetCategory(category);
    setActiveSection('mocktest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchResultClick = (type: 'problem' | 'question' | 'case' | 'viva' | 'resource', id: string) => {
    if (type === 'problem') {
      setSelectedProblemId(id);
      setActiveSection('challenges');
    } else if (type === 'question') {
      setActiveSection('questions');
    } else if (type === 'case') {
      setActiveSection('cases');
    } else if (type === 'viva') {
      setActiveSection('viva');
    } else if (type === 'resource') {
      setActiveSection('resources');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] bg-cyber-grid text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRandomQuestion={() => setIsRandomQuestionOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HOME OVERVIEW */}
        {activeSection === 'home' && (
          <Hero
            onExploreChallenges={() => {
              setActiveSection('challenges');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartPracticing={() => {
              setActiveSection('mocktest');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProblem={handleSelectProblemFromHero}
            problemStatements={problemStatements}
          />
        )}

        {/* 10 CHALLENGE PROBLEM STATEMENTS */}
        {activeSection === 'challenges' && (
          <ProblemStatementsSection
            problems={problemStatements}
            completedProblemIds={userProgress.completedProblemIds}
            onToggleComplete={handleToggleCompletedProblem}
            selectedProblemId={selectedProblemId}
            onSelectProblem={(id) => setSelectedProblemId(id)}
          />
        )}

        {/* 100+ QUESTION BANK */}
        {activeSection === 'questions' && (
          <QuestionBankSection
            questions={questionsData}
            bookmarkedIds={userProgress.bookmarkedQuestionIds}
            onToggleBookmark={handleToggleBookmark}
            onLaunchMockExamWithCategory={handleLaunchMockExamWithCategory}
          />
        )}

        {/* TIMED MOCK TEST SYSTEM */}
        {activeSection === 'mocktest' && (
          <MockTestSection
            questions={questionsData}
            onSaveTestResult={(res) => {
              const updated = saveTestResult(res);
              setUserProgress(updated);
            }}
            presetCategory={mockExamPresetCategory}
          />
        )}

        {/* 10 FORENSIC CASE STUDIES */}
        {activeSection === 'cases' && (
          <CaseStudiesSection
            caseStudies={caseStudiesData}
            completedCaseIds={userProgress.completedCaseStudyIds}
            onToggleCompleteCase={handleToggleCompletedCase}
          />
        )}

        {/* JUDGE QUESTIONS & VIVA PREPARATION */}
        {activeSection === 'viva' && (
          <JudgeVivaSection
            questions={judgeQuestionsData}
          />
        )}

        {/* LEARNING RESOURCES & CHEATSHEETS */}
        {activeSection === 'resources' && (
          <LearningResourcesSection
            resources={learningResourcesData}
          />
        )}

        {/* PARTICIPANT DASHBOARD & LOCAL LEDGER */}
        {activeSection === 'dashboard' && (
          <DashboardSection
            progress={userProgress}
            questions={questionsData}
            problemStatements={problemStatements}
            caseStudies={caseStudiesData}
            onUpdateNotes={handleSaveNotes}
            onResetProgress={handleResetProgress}
            onNavigateToQuestions={() => {
              setActiveSection('questions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMockTest={() => {
              setActiveSection('mocktest');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToChallenges={() => {
              setActiveSection('challenges');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCases={() => {
              setActiveSection('cases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Global Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        problemStatements={problemStatements}
        questions={questionsData}
        caseStudies={caseStudiesData}
        learningResources={learningResourcesData}
        judgeQuestions={judgeQuestionsData}
        onSelectResult={handleSearchResultClick}
      />

      {/* Random Question Warm-Up Modal */}
      <RandomQuestionModal
        isOpen={isRandomQuestionOpen}
        onClose={() => setIsRandomQuestionOpen(false)}
        questions={questionsData}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={(id) => userProgress.bookmarkedQuestionIds.includes(id)}
      />

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />

    </div>
  );
}
