import React, { useState } from 'react';
import { Terminal, BookOpen, Calculator, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
  onScrollToCode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator, onScrollToCode }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-8 pb-10 border-b border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed Metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3 tracking-wide">
          <span>Desafio 1</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Formação Python Alura</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>4 Operações Lógicas (+, -, *, /)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Histórico de Resultados</span>
        </div>

        {/* Hero headline and subtext */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Calculadora Python com as 4 Operações e Exibição de Resultados
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Código simples, limpo e detalhadamente explicado para o <span className="text-emerald-400 font-semibold">Desafio 1 da Alura</span>. 
              Realize cálculos matemáticos com soma, subtração, multiplicação e divisão, consulte o histórico salvo a cada operação e execute no terminal interativo.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>Testar Calculadora</span>
              </button>
              <button
                onClick={onScrollToCode}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-slate-600 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ver Código Explicado</span>
              </button>
            </div>

            {/* Quick feature indicators */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
              <div>
                <span className="block text-slate-200 font-semibold text-sm">Operações</span>
                <span>+ , - , * , / nativos</span>
              </div>
              <div>
                <span className="block text-slate-200 font-semibold text-sm">Histórico</span>
                <span>Lista cumulativa</span>
              </div>
              <div>
                <span className="block text-slate-200 font-semibold text-sm">Proteção</span>
                <span>Divisão por zero tratada</span>
              </div>
              <div>
                <span className="block text-slate-200 font-semibold text-sm">Didática</span>
                <span>Linha por linha</span>
              </div>
            </div>
          </div>

          {/* Banner Graphic with resilient fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-xl overflow-hidden group">
              {!imageError ? (
                <img
                  src="/src/assets/images/python_calculadora_banner_1793119461510.jpg"
                  alt="Infográfico das 4 operações lógicas em Python: Adição, Subtração, Multiplicação e Divisão"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto rounded-xl object-cover aspect-video"
                />
              ) : (
                <div className="w-full aspect-video rounded-xl bg-slate-900 flex flex-col items-center justify-center p-6 text-center border border-slate-800">
                  <Terminal className="w-10 h-10 text-emerald-400 mb-2" />
                  <span className="text-white font-semibold text-sm">Desafio 1 Alura: Calculadora Python</span>
                  <span className="text-xs text-slate-400 mt-1">Operadores +, -, * e / com histórico de cálculos</span>
                </div>
              )}
              <div className="p-3 text-xs text-slate-400 flex items-center justify-between">
                <span>Operadores Aritméticos Python</span>
                <span className="font-mono text-emerald-400">float(input()) &gt; if/elif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
