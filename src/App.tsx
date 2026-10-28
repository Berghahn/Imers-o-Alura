import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisualCalculator } from './components/VisualCalculator';
import { PythonTerminal } from './components/PythonTerminal';
import { HistoryList } from './components/HistoryList';
import { CodeViewer } from './components/CodeViewer';
import { ConceptGuide } from './components/ConceptGuide';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { CalculationRecord } from './types/calculator';
import { PYTHON_VERSIONS } from './data/pythonCode';
import { Calculator as CalcIcon, Terminal as TerminalIcon } from 'lucide-react';

export default function App() {
  // Pre-seed with a couple of nice initial calculations so the history is clear immediately
  const [historyRecords, setHistoryRecords] = useState<CalculationRecord[]>([
    {
      id: 'init-1',
      num1: 15,
      operation: '+',
      num2: 35,
      result: 50,
      timestamp: '10:00:00',
      expression: '15 + 35',
      pythonSnippet: 'resultado = 15 + 35  # = 50'
    },
    {
      id: 'init-2',
      num1: 120,
      operation: '/',
      num2: 4,
      result: 30,
      timestamp: '10:02:15',
      expression: '120 / 4',
      pythonSnippet: 'resultado = 120 / 4  # = 30.0'
    }
  ]);

  const [activeInteractiveMode, setActiveInteractiveMode] = useState<'visual' | 'terminal'>('visual');
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  const handleAddCalculation = (record: CalculationRecord) => {
    setHistoryRecords(prev => [record, ...prev]);
  };

  const handleClearHistory = () => {
    setHistoryRecords([]);
  };

  const handleDownloadFile = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMainCode = () => {
    const mainCode = PYTHON_VERSIONS[0].code;
    navigator.clipboard.writeText(mainCode);
    setCopiedCodeToast(true);
    setTimeout(() => setCopiedCodeToast(false), 2000);
  };

  const scrollToCalculator = () => {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCode = () => {
    document.getElementById('codigo-python')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Top Bar */}
      <Header
        onDownloadCode={() =>
          handleDownloadFile(PYTHON_VERSIONS[0].code, 'calculadora_desafio1_alura.py')
        }
        onCopyMainCode={handleCopyMainCode}
        copied={copiedCodeToast}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToCalculator={scrollToCalculator}
          onScrollToCode={scrollToCode}
        />

        {/* Interactive Sandbox Section (Calculadora + Terminal + Código) */}
        <section id="calculadora" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <span>Laboratório Prático</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Ambiente Interativo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Calculadora de Operações &amp; Histórico
              </h2>
            </div>

            {/* Mode switch between Visual Calculator & Terminal CLI */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setActiveInteractiveMode('visual')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeInteractiveMode === 'visual'
                    ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700/80 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalcIcon className="w-3.5 h-3.5" />
                <span>Calculadora Visual</span>
              </button>
              <button
                onClick={() => setActiveInteractiveMode('terminal')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeInteractiveMode === 'terminal'
                    ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700/80 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Terminal Python (CLI)</span>
              </button>
            </div>
          </div>

          {/* 2-Zone Split: Left (Interactive Sandbox & History) + Right (Python Code) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Zone: Calculator or Terminal + History List */}
            <div className="lg:col-span-5 space-y-6">
              {activeInteractiveMode === 'visual' ? (
                <VisualCalculator
                  onAddCalculation={handleAddCalculation}
                  recentCalculation={historyRecords[0] || null}
                />
              ) : (
                <div id="terminal">
                  <PythonTerminal
                    onAddCalculation={handleAddCalculation}
                    historyRecords={historyRecords}
                  />
                </div>
              )}

              {/* Real-time Calculation History List */}
              <div className="h-[380px]">
                <HistoryList
                  records={historyRecords}
                  onClearHistory={handleClearHistory}
                />
              </div>
            </div>

            {/* Right Zone: Pristine Python Code Viewer & Line-by-Line Annotations */}
            <div className="lg:col-span-7">
              <CodeViewer onDownloadFile={handleDownloadFile} />
            </div>
          </div>
        </section>

        {/* Didactic Step-by-Step Concepts */}
        <ConceptGuide />

        {/* Quiz Section */}
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
