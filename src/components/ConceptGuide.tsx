import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DIDACTIC_STEPS } from '../data/pythonCode';

export const ConceptGuide: React.FC = () => {
  const [openStep, setOpenStep] = useState<string>('01');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section id="explicacao" className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Metodologia Alura</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Passo a Passo Didático</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guia Didático: Entendendo a Lógica da Calculadora
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Aprenda como o Python lida com dados do usuário, executa as quatro operações fundamentais e toma decisões no fluxo do programa.
          </p>
        </div>

        {/* Step-by-Step Accordion / Cards */}
        <div className="space-y-4">
          {DIDACTIC_STEPS.map((step, idx) => {
            const isOpen = openStep === step.step;

            return (
              <div
                key={step.step}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                {/* Header button */}
                <button
                  onClick={() => setOpenStep(isOpen ? '' : step.step)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-base font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-2.5 py-1 shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expandable Body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-7 space-y-3 text-sm text-slate-300 leading-relaxed">
                        <p>{step.content}</p>
                      </div>

                      <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-slate-800">
                          <span>Exemplo Python</span>
                          <button
                            onClick={() => handleCopySnippet(step.codeSnippet, idx)}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {step.codeSnippet}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
