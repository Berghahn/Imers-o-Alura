import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { CalculationRecord, OperationType } from '../types/calculator';

interface TerminalLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface PythonTerminalProps {
  onAddCalculation: (record: CalculationRecord) => void;
  historyRecords: CalculationRecord[];
}

export const PythonTerminal: React.FC<PythonTerminalProps> = ({
  onAddCalculation,
  historyRecords
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Python 3.12.0 (main) - Terminal Interativo Alura' },
    { id: '2', type: 'system', text: '$ python calculadora_desafio1_alura.py' },
    { id: '3', type: 'system', text: '=========================================' },
    { id: '4', type: 'system', text: '   CALCULADORA PYTHON - DESAFIO 1 ALURA   ' },
    { id: '5', type: 'system', text: '=========================================' },
    { id: '6', type: 'prompt', text: 'Digite o primeiro número: ' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<'num1' | 'op' | 'num2' | 'continue'>('num1');
  const [tempNum1, setTempNum1] = useState<number | null>(null);
  const [tempOp, setTempOp] = useState<OperationType | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const handleReset = () => {
    setLines([
      { id: Date.now().toString() + '-1', type: 'system', text: '$ python calculadora_desafio1_alura.py' },
      { id: Date.now().toString() + '-2', type: 'system', text: '=== CALCULADORA PYTHON - DESAFIO 1 ALURA ===' },
      { id: Date.now().toString() + '-3', type: 'prompt', text: 'Digite o primeiro número: ' }
    ]);
    setStep('num1');
    setTempNum1(null);
    setTempOp(null);
    setInputVal('');
    inputRef.current?.focus();
  };

  const handleRunExample = () => {
    const n1 = 45;
    const op = '*';
    const n2 = 4;
    const res = n1 * n2;
    const now = new Date().toLocaleTimeString('pt-BR');

    const newLines: TerminalLine[] = [
      ...lines,
      { id: Date.now() + '-a', type: 'input', text: `45` },
      { id: Date.now() + '-b', type: 'prompt', text: 'Escolha a operação (+, -, *, /): ' },
      { id: Date.now() + '-c', type: 'input', text: `*` },
      { id: Date.now() + '-d', type: 'prompt', text: 'Digite o segundo número: ' },
      { id: Date.now() + '-e', type: 'input', text: `4` },
      { id: Date.now() + '-f', type: 'system', text: '----------------------------------------' },
      { id: Date.now() + '-g', type: 'success', text: `>>> Resultado do cálculo: 45.0 * 4.0 = ${res}.0` },
      { id: Date.now() + '-h', type: 'output', text: `[+] Registro salvo no histórico da sessão.` },
      { id: Date.now() + '-i', type: 'system', text: '----------------------------------------' },
      { id: Date.now() + '-j', type: 'prompt', text: 'Deseja fazer outro cálculo? Digite um novo número (ou S para sair): ' }
    ];

    setLines(newLines);
    setStep('num1');
    setTempNum1(null);
    setTempOp(null);
    setInputVal('');

    onAddCalculation({
      id: `${Date.now()}-cli`,
      num1: n1,
      operation: op,
      num2: n2,
      result: res,
      timestamp: now,
      expression: `${n1} ${op} ${n2}`,
      pythonSnippet: `resultado = ${n1} * ${n2}  # = ${res}`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const currentLines = [...lines, { id: Date.now().toString(), type: 'input' as const, text: trimmed }];

    if (trimmed.toLowerCase() === 'sair' || trimmed.toLowerCase() === 's') {
      currentLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'Encerrando programa... Obrigado por usar a calculadora Alura!'
      });
      currentLines.push({
        id: (Date.now() + 2).toString(),
        type: 'system',
        text: '$ (digite um número ou clique em Reiniciar para rodar novamente)'
      });
      setLines(currentLines);
      setStep('num1');
      setTempNum1(null);
      setTempOp(null);
      setInputVal('');
      return;
    }

    if (trimmed.toLowerCase() === 'historico' || trimmed.toLowerCase() === 'h') {
      currentLines.push({
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: '=== HISTÓRICO DE CÁLCULOS REGISTRADOS ==='
      });
      if (historyRecords.length === 0) {
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'output',
          text: 'Nenhum cálculo registrado ainda nesta sessão.'
        });
      } else {
        historyRecords.forEach((rec, idx) => {
          currentLines.push({
            id: `${Date.now()}-rec-${idx}`,
            type: 'output',
            text: `${idx + 1}. [${rec.timestamp}] ${rec.expression} = ${rec.result}`
          });
        });
      }
      currentLines.push({
        id: (Date.now() + 3).toString(),
        type: 'prompt',
        text: 'Digite o primeiro número para continuar: '
      });
      setLines(currentLines);
      setStep('num1');
      setInputVal('');
      return;
    }

    if (step === 'num1') {
      const parsed = parseFloat(trimmed);
      if (isNaN(parsed)) {
        currentLines.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: 'ValueError: Valor inválido! Digite um número válido (ex: 10 ou 4.5).'
        });
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Digite o primeiro número: '
        });
        setLines(currentLines);
        setInputVal('');
        return;
      }
      setTempNum1(parsed);
      setStep('op');
      currentLines.push({
        id: (Date.now() + 1).toString(),
        type: 'prompt',
        text: 'Escolha a operação (+ para Soma, - para Subtração, * para Multiplicação, / para Divisão, % para Porcentagem): '
      });
      setLines(currentLines);
      setInputVal('');
    } else if (step === 'op') {
      if (!['+', '-', '*', '/', '%'].includes(trimmed)) {
        currentLines.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: 'Operação inválida! Por favor, digite apenas +, -, *, / ou %.'
        });
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Escolha a operação (+, -, *, /, %): '
        });
        setLines(currentLines);
        setInputVal('');
        return;
      }
      setTempOp(trimmed as OperationType);
      setStep('num2');
      currentLines.push({
        id: (Date.now() + 1).toString(),
        type: 'prompt',
        text: 'Digite o segundo número: '
      });
      setLines(currentLines);
      setInputVal('');
    } else if (step === 'num2') {
      const parsed2 = parseFloat(trimmed);
      if (isNaN(parsed2)) {
        currentLines.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: 'ValueError: Segundo valor inválido! Digite um número.'
        });
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Digite o segundo número: '
        });
        setLines(currentLines);
        setInputVal('');
        return;
      }

      const n1 = tempNum1 ?? 0;
      const op = tempOp ?? '+';
      const n2 = parsed2;

      let res: number | string = 0;
      let isError = false;
      let pySnippet = '';

      if (op === '+') {
        res = n1 + n2;
        pySnippet = `resultado = ${n1} + ${n2}  # = ${res}`;
      } else if (op === '-') {
        res = n1 - n2;
        pySnippet = `resultado = ${n1} - ${n2}  # = ${res}`;
      } else if (op === '*') {
        res = n1 * n2;
        pySnippet = `resultado = ${n1} * ${n2}  # = ${res}`;
      } else if (op === '/') {
        if (n2 === 0) {
          res = 'Erro: divisão por zero';
          isError = true;
          pySnippet = `if ${n2} == 0:\n    print("Erro: Não é possível dividir por zero!")`;
        } else {
          res = n1 / n2;
          pySnippet = `resultado = ${n1} / ${n2}  # = ${res}`;
        }
      } else if (op === '%') {
        res = (n1 * n2) / 100;
        pySnippet = `resultado = (${n1} * ${n2}) / 100  # = ${res} (${n2}% de ${n1})`;
      }

      if (typeof res === 'number' && !Number.isInteger(res)) {
        res = parseFloat(res.toFixed(4));
      }

      const now = new Date().toLocaleTimeString('pt-BR');
      const calcRecord: CalculationRecord = {
        id: `${Date.now()}-term`,
        num1: n1,
        operation: op,
        num2: n2,
        result: res,
        isError,
        timestamp: now,
        expression: `${n1} ${op} ${n2}`,
        pythonSnippet: pySnippet
      };

      onAddCalculation(calcRecord);

      currentLines.push({
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: '----------------------------------------'
      });

      if (isError) {
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'error',
          text: `[!] ZeroDivisionError: Não é possível dividir por zero! (num2 = 0)`
        });
      } else {
        const resultMsg = op === '%'
          ? `>>> Resultado do cálculo: ${n2}% de ${n1} = ${res}`
          : `>>> Resultado do cálculo: ${n1} ${op} ${n2} = ${res}`;
        currentLines.push({
          id: (Date.now() + 2).toString(),
          type: 'success',
          text: resultMsg
        });
      }

      currentLines.push({
        id: (Date.now() + 3).toString(),
        type: 'output',
        text: `[+] Histórico atualizado! Total registrado: ${historyRecords.length + 1}`
      });

      currentLines.push({
        id: (Date.now() + 4).toString(),
        type: 'system',
        text: '----------------------------------------'
      });

      currentLines.push({
        id: (Date.now() + 5).toString(),
        type: 'prompt',
        text: 'Digite o primeiro número para um novo cálculo (ou "sair"): '
      });

      setLines(currentLines);
      setStep('num1');
      setTempNum1(null);
      setTempOp(null);
      setInputVal('');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
      {/* Terminal Titlebar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>terminal_alura ~ python3</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunExample}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-md transition-colors"
            title="Executar cálculo de demonstração"
          >
            <Sparkles className="w-3 h-3" />
            <span>Demo Rápida</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
            title="Reiniciar terminal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Terminal Console Body */}
      <div
        className="p-4 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-y-auto flex-1 max-h-[380px] sm:max-h-[420px] space-y-1.5"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map(line => {
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-slate-500">
                {line.text}
              </div>
            );
          }
          if (line.type === 'input') {
            return (
              <div key={line.id} className="text-emerald-400 font-semibold flex items-center gap-2">
                <span className="text-slate-600">&gt;</span>
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400 font-medium">
                {line.text}
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div key={line.id} className="text-emerald-300 font-bold bg-emerald-950/40 border border-emerald-900/60 p-2 rounded">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-slate-300">
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Interactive Input Field */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-mono text-sm font-bold pl-1">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder={
            step === 'num1'
              ? 'Digite o 1º número (ex: 20)...'
              : step === 'op'
              ? 'Digite +, -, * ou /...'
              : 'Digite o 2º número (ex: 5)...'
          }
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors shrink-0"
        >
          <span>Enviar</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Quick shortcuts info */}
      <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/60 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Dicas de comandos: digite <code className="text-slate-300 bg-slate-800 px-1 py-0.5 rounded">historico</code> ou <code className="text-slate-300 bg-slate-800 px-1 py-0.5 rounded">sair</code></span>
        <span>Pressione Enter para enviar entrada</span>
      </div>
    </div>
  );
};
