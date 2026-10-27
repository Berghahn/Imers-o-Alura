import React, { useState } from 'react';
import { Copy, Check, Download, Info, Lightbulb, Code2 } from 'lucide-react';
import { PYTHON_VERSIONS } from '../data/pythonCode';
import { CodeAnnotation } from '../types/calculator';

interface CodeViewerProps {
  onDownloadFile: (code: string, filename: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onDownloadFile }) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string>('simples');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<CodeAnnotation | null>(null);

  const currentVersion = PYTHON_VERSIONS.find(v => v.id === selectedVersionId) || PYTHON_VERSIONS[0];
  const lines = currentVersion.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentVersion.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `calculadora_desafio1_alura_${currentVersion.id}.py`;
    onDownloadFile(currentVersion.code, filename);
  };

  // Find annotation for a line if any
  const getAnnotationForLine = (lineNum: number) => {
    return currentVersion.annotations.find(a => a.lineNumber === lineNum);
  };

  return (
    <div id="codigo-python" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header bar with Version Switcher Tabs and Actions */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Código Python do Desafio 1</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Selecione a versão desejada e clique nas linhas destacadas para ver a explicação
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Version Selector Tabs */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex flex-wrap gap-2">
        {PYTHON_VERSIONS.map(v => {
          const isSelected = v.id === selectedVersionId;
          return (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVersionId(v.id);
                setSelectedAnnotation(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span>{v.title}</span>
              <span className="text-[10px] text-slate-400">· {v.difficulty}</span>
            </button>
          );
        })}
      </div>

      {/* Description banner */}
      <div className="px-5 py-3 bg-slate-900/50 border-b border-slate-800/80 text-xs text-slate-300">
        <span className="font-semibold text-emerald-400">Objetivo desta versão: </span>
        <span>{currentVersion.description}</span>
      </div>

      {/* Code Viewer and Annotation Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Code Lines Display */}
        <div className="lg:col-span-8 bg-slate-950 p-4 font-mono text-xs sm:text-sm overflow-x-auto max-h-[550px] overflow-y-auto">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const annotation = getAnnotationForLine(lineNum);
            const isAnnotated = Boolean(annotation);
            const isSelected = selectedAnnotation?.lineNumber === lineNum;

            return (
              <div
                key={idx}
                onClick={() => annotation && setSelectedAnnotation(annotation)}
                className={`flex items-start group rounded px-1 -mx-1 py-0.5 transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-500/40'
                    : isAnnotated
                    ? 'cursor-pointer hover:bg-slate-800/80 text-slate-200'
                    : 'text-slate-400'
                }`}
              >
                {/* Line number */}
                <span className="w-8 shrink-0 text-right pr-3 select-none text-slate-600 group-hover:text-slate-400 text-xs">
                  {lineNum}
                </span>

                {/* Annotation dot if present */}
                <span className="w-4 shrink-0 flex items-center justify-center text-[10px]">
                  {isAnnotated && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`}
                      title="Clique para ver a explicação desta linha"
                    />
                  )}
                </span>

                {/* Line Content with basic Python syntax styling */}
                <span className="flex-1 whitespace-pre pl-1">
                  {line.startsWith('#') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('def ') ? (
                    <span className="text-cyan-300 font-semibold">{line}</span>
                  ) : line.includes('if ') || line.includes('elif ') || line.includes('else:') || line.includes('while ') ? (
                    <span className="text-amber-300">{line}</span>
                  ) : line.includes('print(') ? (
                    <span className="text-emerald-300">{line}</span>
                  ) : line.includes('input(') ? (
                    <span className="text-purple-300">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Line Explanation Drawer / Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 p-5 flex flex-col justify-between max-h-[550px] overflow-y-auto">
          {selectedAnnotation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Linha {selectedAnnotation.lineNumber}
                </span>
                <span className="text-xs text-slate-400">Explicação Didática</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedAnnotation.title}
                </h3>
                <div className="mt-2 bg-slate-950 p-2 rounded-lg font-mono text-xs text-emerald-300 border border-slate-800">
                  <code>{selectedAnnotation.code}</code>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed">
                {selectedAnnotation.explanation}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dica Alura:</span>
                </div>
                <p className="text-slate-300 leading-normal">
                  {selectedAnnotation.aluraTip}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3 my-auto">
              <Info className="w-8 h-8 text-cyan-400/80" />
              <div className="font-semibold text-sm text-slate-200">
                Guia Linha por Linha
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clique em qualquer linha com o ponto azul no código ao lado para abrir a explicação detalhada de sua lógica, tipos e boas práticas do Python.
              </p>
              {currentVersion.annotations.length > 0 && (
                <button
                  onClick={() => setSelectedAnnotation(currentVersion.annotations[0])}
                  className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  Ver 1ª Explicação: {currentVersion.annotations[0].title}
                </button>
              )}
            </div>
          )}

          {/* Quick instructions */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span>Dica de execução: para rodar no seu computador, salve como <code className="text-slate-300">calculadora.py</code> e execute com <code className="text-emerald-400 font-mono">python calculadora.py</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
