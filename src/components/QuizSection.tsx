import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { ALURA_QUIZ } from '../data/pythonCode';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  // Score calculation
  const totalQuestions = ALURA_QUIZ.length;
  const answeredCount = Object.keys(userAnswers).length;
  const score = ALURA_QUIZ.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <section id="quiz" className="py-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <span>Fixação de Conteúdo</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Exercícios Práticos</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Quiz: Teste Seus Conhecimentos do Desafio 1
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Perguntas objetivas sobre a sintaxe e regras da linguagem Python aplicadas nesta calculadora.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {submitted && (
              <div className="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                Pontuação: {score} de {totalQuestions} acertos
              </div>
            )}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>
          </div>
        </div>

        {/* Question cards */}
        <div className="space-y-6">
          {ALURA_QUIZ.map((q, idx) => {
            const selectedOption = userAnswers[q.id];
            const isCorrect = selectedOption === q.correctIndex;
            const hasAnswered = selectedOption !== undefined;

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-0.5 shrink-0">
                    Questão {idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {q.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2 mb-4">
                  {q.options.map((option, optIdx) => {
                    const isOptionSelected = selectedOption === optIdx;
                    let optionStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200 font-semibold';
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-rose-950/60 border-rose-600/80 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-slate-800 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </span>

                        {submitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isOptionSelected && optIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation upon submission */}
                {submitted && (
                  <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-950/30 border border-emerald-900/50 text-emerald-200' : 'bg-slate-950 border border-slate-800 text-slate-300'}`}>
                    <span className="font-semibold">{isCorrect ? 'Correto! ' : 'Explicação: '}</span>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit action */}
        {!submitted && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setSubmitted(true)}
              disabled={answeredCount === 0}
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl shadow-lg transition-colors text-sm"
            >
              Conferir Respostas ({answeredCount} de {totalQuestions} respondidas)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
