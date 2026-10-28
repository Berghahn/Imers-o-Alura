import React from 'react';
import { Download, FileCode } from 'lucide-react';

interface HeaderProps {
  onDownloadCode: () => void;
  onCopyMainCode: () => void;
  copied: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadCode, onCopyMainCode, copied }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-slate-100 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
            <FileCode className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Desafio 1 Alura
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#calculadora" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Calculadora
          </a>
          <a href="#codigo-python" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Código Python
          </a>
          <a href="#explicacao" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Explicação
          </a>
          <a href="#terminal" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Terminal CLI
          </a>
          <a href="#quiz" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Quiz Alura
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCopyMainCode}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            title="Copiar código para colar no VS Code"
          >
            {copied ? 'Código Copiado!' : 'Copiar Código'}
          </button>
          <button
            onClick={onDownloadCode}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
