import React, { useState } from 'react';
import { History, Trash2, Copy, Check, Calculator, AlertCircle } from 'lucide-react';
import { CalculationRecord } from '../types/calculator';

interface HistoryListProps {
  records: CalculationRecord[];
  onClearHistory: () => void;
  onSelectCalculation?: (record: CalculationRecord) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  records,
  onClearHistory,
  onSelectCalculation
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyRecord = (record: CalculationRecord) => {
    const text = `${record.expression} = ${record.result}`;
    navigator.clipboard.writeText(text);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Histórico de Cálculos Realizados
            </h3>
            <span className="text-xs text-slate-400">
              ({records.length})
            </span>
          </div>

          {records.length > 0 && (
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors border border-transparent hover:border-rose-900/40"
              title="Limpar todos os registros do histórico"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {/* Content */}
        {records.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3 border border-slate-700/60">
              <Calculator className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-300">Nenhum cálculo registrado ainda</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Faça uma operação na calculadora visual ou no terminal para ver o resultado registrado aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {records.map((record, index) => {
              const isCopied = copiedId === record.id;
              const opNames: Record<string, string> = {
                '+': 'Soma',
                '-': 'Subtração',
                '*': 'Multiplicação',
                '/': 'Divisão',
                '%': 'Porcentagem'
              };

              return (
                <div
                  key={record.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    record.isError
                      ? 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-5 text-right tabular-nums">
                      {index + 1}.
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white tabular-nums">
                          {record.expression}
                        </span>
                        <span className="text-slate-500">=</span>
                        <span
                          className={`font-mono text-sm font-extrabold tabular-nums ${
                            record.isError ? 'text-rose-400' : 'text-emerald-300'
                          }`}
                        >
                          {record.result}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{opNames[record.operation]}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="font-mono">{record.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyRecord(record)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      title="Copiar resultado"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Explanatory note at bottom */}
      <div className="pt-3 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Estrutura Python equivalente: <code className="text-emerald-400 font-mono">historico.append(...)</code></span>
        <span className="font-mono text-slate-300 tabular-nums">Total: {records.length}</span>
      </div>
    </div>
  );
};
