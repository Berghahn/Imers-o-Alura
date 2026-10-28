import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw, Equal, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { CalculationRecord, OperationType } from '../types/calculator';

interface VisualCalculatorProps {
  onAddCalculation: (record: CalculationRecord) => void;
  recentCalculation: CalculationRecord | null;
}

export const VisualCalculator: React.FC<VisualCalculatorProps> = ({
  onAddCalculation,
  recentCalculation
}) => {
  const [num1, setNum1] = useState<string>('12');
  const [operation, setOperation] = useState<OperationType | null>('+');
  const [num2, setNum2] = useState<string>('5');
  const [activeTarget, setActiveTarget] = useState<'num1' | 'num2'>('num2');
  const [lastExecutedResult, setLastExecutedResult] = useState<number | string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick presets for the Alura student to test each operation
  const presets = [
    { label: 'Soma: 25 + 17', n1: '25', op: '+' as OperationType, n2: '17' },
    { label: 'Subtração: 100 - 38', n1: '100', op: '-' as OperationType, n2: '38' },
    { label: 'Multiplicação: 8 * 12.5', n1: '8', op: '*' as OperationType, n2: '12.5' },
    { label: 'Divisão: 144 / 12', n1: '144', op: '/' as OperationType, n2: '12' },
    { label: 'Porcentagem: 15% de 200', n1: '200', op: '%' as OperationType, n2: '15' },
    { label: 'Teste Zero: 50 / 0', n1: '50', op: '/' as OperationType, n2: '0' }
  ];

  const handleDigit = (digit: string) => {
    setErrorMessage(null);
    if (activeTarget === 'num1') {
      if (digit === '.' && num1.includes('.')) return;
      if (num1 === '0' && digit !== '.') {
        setNum1(digit);
      } else {
        setNum1(prev => (prev.length < 10 ? prev + digit : prev));
      }
    } else {
      if (digit === '.' && num2.includes('.')) return;
      if (num2 === '0' && digit !== '.') {
        setNum2(digit);
      } else {
        setNum2(prev => (prev.length < 10 ? prev + digit : prev));
      }
    }
  };

  const handleBackspace = () => {
    setErrorMessage(null);
    if (activeTarget === 'num2') {
      if (num2.length > 1) {
        setNum2(prev => prev.slice(0, -1));
      } else {
        setNum2('0');
      }
    } else {
      if (num1.length > 1) {
        setNum1(prev => prev.slice(0, -1));
      } else {
        setNum1('0');
      }
    }
  };

  const handleClear = () => {
    setNum1('0');
    setNum2('0');
    setOperation(null);
    setActiveTarget('num1');
    setLastExecutedResult(null);
    setErrorMessage(null);
  };

  const handleSelectOperation = (op: OperationType) => {
    setErrorMessage(null);
    setOperation(op);
    setActiveTarget('num2');
    if (num2 === '0') {
      // ready for user to enter second number
    }
  };

  const handleCalculate = () => {
    setErrorMessage(null);
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1)) {
      setErrorMessage('Por favor, informe o primeiro número.');
      return;
    }

    if (!operation) {
      setErrorMessage('Escolha uma operação (+, -, * ou /).');
      return;
    }

    if (isNaN(n2)) {
      setErrorMessage('Por favor, informe o segundo número.');
      return;
    }

    let calculatedResult: number | string = 0;
    let isError = false;
    let pySnippet = '';

    if (operation === '+') {
      calculatedResult = n1 + n2;
      pySnippet = `resultado = ${n1} + ${n2}  # = ${calculatedResult}`;
    } else if (operation === '-') {
      calculatedResult = n1 - n2;
      pySnippet = `resultado = ${n1} - ${n2}  # = ${calculatedResult}`;
    } else if (operation === '*') {
      calculatedResult = n1 * n2;
      pySnippet = `resultado = ${n1} * ${n2}  # = ${calculatedResult}`;
    } else if (operation === '/') {
      if (n2 === 0) {
        calculatedResult = 'Erro: divisão por zero';
        isError = true;
        setErrorMessage('Não é possível dividir por zero! (ZeroDivisionError prevenido)');
        pySnippet = `if ${n2} == 0:\n    print("Erro: Não é possível dividir por zero!")`;
      } else {
        calculatedResult = n1 / n2;
        pySnippet = `resultado = ${n1} / ${n2}  # = ${calculatedResult}`;
      }
    } else if (operation === '%') {
      calculatedResult = (n1 * n2) / 100;
      pySnippet = `resultado = (${n1} * ${n2}) / 100  # = ${calculatedResult} (${n2}% de ${n1})`;
    }

    // Round clean floats if lengthy decimal
    let displayRes = calculatedResult;
    if (typeof calculatedResult === 'number') {
      if (!Number.isInteger(calculatedResult)) {
        displayRes = parseFloat(calculatedResult.toFixed(4));
      }
    }

    setLastExecutedResult(displayRes);

    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newRecord: CalculationRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      num1: n1,
      operation,
      num2: n2,
      result: displayRes,
      isError,
      timestamp: timeString,
      expression: `${n1} ${operation} ${n2}`,
      pythonSnippet: pySnippet
    };

    onAddCalculation(newRecord);

    // Keep result as num1 for chaining calculations if valid
    if (!isError && typeof displayRes === 'number') {
      setNum1(String(displayRes));
      setActiveTarget('num2');
    }
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setNum1(preset.n1);
    setOperation(preset.op);
    setNum2(preset.n2);
    setActiveTarget('num2');
    setErrorMessage(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input element
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDigit('.');
      } else if (e.key === '+') {
        handleSelectOperation('+');
      } else if (e.key === '-') {
        handleSelectOperation('-');
      } else if (e.key === '*') {
        handleSelectOperation('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleSelectOperation('/');
      } else if (e.key === '%') {
        handleSelectOperation('%');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
      <div>
        {/* Top bar info */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Calculadora Visual Interativa</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Alterne entre os operandos e veja o cálculo em Python em tempo real
            </p>
          </div>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="Limpar calculadora (ESC)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar (C)</span>
          </button>
        </div>

        {/* Display Screen */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-4 font-mono shadow-inner">
          {/* Interactive active operand indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-2">
              <span
                onClick={() => setActiveTarget('num1')}
                className={`cursor-pointer px-2 py-0.5 rounded transition-colors ${
                  activeTarget === 'num1'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                    : 'hover:text-slate-200'
                }`}
              >
                1º Número: {num1}
              </span>
              <span className="text-slate-600 font-bold">{operation || '?'}</span>
              <span
                onClick={() => setActiveTarget('num2')}
                className={`cursor-pointer px-2 py-0.5 rounded transition-colors ${
                  activeTarget === 'num2'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                    : 'hover:text-slate-200'
                }`}
              >
                2º Número: {num2}
              </span>
            </span>

            <span className="text-slate-500 text-[11px]">
              Editando: {activeTarget === 'num1' ? '1º Operando' : '2º Operando'}
            </span>
          </div>

          {/* Current big visual formula */}
          <div className="flex items-baseline justify-end gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-white py-1">
            <span className={activeTarget === 'num1' ? 'text-emerald-400 underline decoration-2' : ''}>
              {num1}
            </span>
            <span className="text-cyan-400 font-black px-1">
              {operation || '+'}
            </span>
            <span className={activeTarget === 'num2' ? 'text-emerald-400 underline decoration-2' : ''}>
              {num2}
            </span>
          </div>

          {/* Live / Last Result Banner */}
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-sm">
            <span className="text-xs text-slate-400">Resultado Atual:</span>
            <span className="font-bold text-base text-emerald-300 tabular-nums">
              {lastExecutedResult !== null ? `= ${lastExecutedResult}` : 'Pressione = para calcular'}
            </span>
          </div>
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Operations Selector Buttons */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Escolha a Operação Desejada:
          </div>
          <div className="grid grid-cols-5 gap-2">
            {(
              [
                { op: '+', name: 'Soma', symbol: '+' },
                { op: '-', name: 'Subtração', symbol: '-' },
                { op: '*', name: 'Multiplicação', symbol: '*' },
                { op: '/', name: 'Divisão', symbol: '/' },
                { op: '%', name: 'Porcentagem', symbol: '%' }
              ] as const
            ).map(item => {
              const isSelected = operation === item.op;
              return (
                <button
                  key={item.op}
                  onClick={() => handleSelectOperation(item.op)}
                  className={`py-2.5 px-2 rounded-xl font-mono text-center transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 ring-2 ring-cyan-300'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <span className="text-xl block leading-none">{item.symbol}</span>
                  <span className="text-[10px] block mt-1 tracking-tight font-sans">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator keypad (0-9, dot, backspace, calculate) */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {['7', '8', '9'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-lg font-semibold bg-slate-800/90 hover:bg-slate-750 text-white rounded-xl border border-slate-700/60 active:scale-95 transition-all"
            >
              {d}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="py-3 text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 flex items-center justify-center active:scale-95 transition-all"
            title="Apagar dígito"
          >
            <Delete className="w-5 h-5" />
          </button>

          {['4', '5', '6'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-lg font-semibold bg-slate-800/90 hover:bg-slate-750 text-white rounded-xl border border-slate-700/60 active:scale-95 transition-all"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => setActiveTarget(activeTarget === 'num1' ? 'num2' : 'num1')}
            className="py-3 px-1 text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-cyan-300 rounded-xl border border-slate-700/60 flex flex-col items-center justify-center leading-tight active:scale-95 transition-all"
            title="Trocar operando em edição"
          >
            <span>Trocar</span>
            <span className="text-[10px] text-slate-400">N1 ↔ N2</span>
          </button>

          {['1', '2', '3'].map(d => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-lg font-semibold bg-slate-800/90 hover:bg-slate-750 text-white rounded-xl border border-slate-700/60 active:scale-95 transition-all"
            >
              {d}
            </button>
          ))}

          {/* Big Equal / Calculate Button spanning 2 rows */}
          <button
            onClick={handleCalculate}
            className="row-span-2 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
            title="Executar cálculo e exibir resultado (ENTER)"
          >
            <Equal className="w-6 h-6 stroke-[3]" />
            <span className="text-xs uppercase tracking-wider font-extrabold">Calcular</span>
          </button>

          {/* Row 4: 0 and decimal dot */}
          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-3 text-lg font-semibold bg-slate-800/90 hover:bg-slate-750 text-white rounded-xl border border-slate-700/60 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={() => handleDigit('.')}
            className="py-3 text-lg font-semibold bg-slate-800/90 hover:bg-slate-750 text-white rounded-xl border border-slate-700/60 active:scale-95 transition-all"
          >
            .
          </button>
        </div>

        {/* Quick Test Presets */}
        <div className="pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-400 mb-2 font-medium">Exemplos rápidos para testar:</div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Behind-the-scenes Python snippet preview */}
      <div className="mt-4 pt-3 border-t border-slate-800/90">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="font-semibold text-slate-300">Como o Python calcula isso:</span>
          <span className="font-mono text-emerald-400 text-[11px]">interpretador Python</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
          <div className="text-slate-400">
            num1 = <span className="text-emerald-400">{num1}</span>
          </div>
          <div className="text-slate-400">
            num2 = <span className="text-emerald-400">{num2}</span>
          </div>
          <div className="text-cyan-300">
            {operation === '%'
              ? `resultado = (${num1} * ${num2}) / 100  # ${num2}% de ${num1}`
              : `resultado = ${num1} ${operation || '+'} ${num2}`}
          </div>
          <div className="text-slate-400">
            {operation === '%'
              ? `historico.append(f&quot;{num2}% de {num1} = &#123;resultado&#125;&quot;)`
              : `historico.append(f&quot;{num1} {operation || '+'} {num2} = &#123;resultado&#125;&quot;)`}
          </div>
        </div>
      </div>
    </div>
  );
};
