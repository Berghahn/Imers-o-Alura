import React from 'react';
import { FileCode, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileCode className="w-3 h-3" />
          </div>
          <span className="text-slate-300 font-semibold">Desafio 1 Alura</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>Calculadora Didática em Python</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#calculadora" className="hover:text-slate-300 transition-colors">Calculadora</a>
          <a href="#codigo-python" className="hover:text-slate-300 transition-colors">Código</a>
          <a href="#explicacao" className="hover:text-slate-300 transition-colors">Guia</a>
          <a href="#terminal" className="hover:text-slate-300 transition-colors">Terminal</a>
        </div>

        <div className="text-slate-400 text-center sm:text-right">
          Feito para estudantes da Imersão Python Alura
        </div>
      </div>
    </footer>
  );
};
