'use client';
import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, XCircle, ArrowRight, RotateCcw, Brain, Timer } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizEngine() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);

  useEffect(() => {
    fetch('/api/quiz')
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (quizFinished || isAnswered || questions.length === 0) return;
    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, quizFinished, questions.length]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedOption(-1);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(25);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(25);
  };

  if (questions.length === 0) {
    return <div className="text-center py-20 text-slate-400">Loading quiz challenges...</div>;
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2.5">
          <Brain className="h-7 w-7 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Full-Stack Architecture Quiz</h1>
            <p className="text-xs text-slate-400">PostgreSQL, Next.js 14, BullMQ & Systems Design</p>
          </div>
        </div>
        {!quizFinished && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
            <Timer className="h-4 w-4" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span className="uppercase tracking-wider font-semibold text-emerald-400">{currentQ.category}</span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Title */}
          <h2 className="text-lg font-medium text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
                } else if (idx === selectedOption) {
                  btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                } else {
                  btnStyle = 'border-slate-800 bg-slate-950 text-slate-600 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">Architectural Insight:</span>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Footer Action */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition shadow-lg"
            >
              <span>{currentIndex + 1 === questions.length ? 'Show Results' : 'Next Question'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
          <Award className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-sm text-slate-400 mb-6">Here is how you performed on modern architecture fundamentals:</p>

          <div className="inline-block px-6 py-4 rounded-2xl bg-slate-950 border border-slate-800 mb-8">
            <span className="text-4xl font-extrabold text-emerald-400">{score}</span>
            <span className="text-lg text-slate-500"> / {questions.length}</span>
            <p className="text-xs text-slate-400 mt-1">
              Score: {Math.round((score / questions.length) * 100)}%
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm mx-auto transition"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
