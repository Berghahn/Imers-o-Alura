export type OperationType = '+' | '-' | '*' | '/' | '%';

export interface CalculationRecord {
  id: string;
  num1: number;
  operation: OperationType;
  num2: number;
  result: number | string; // string in case of "Erro: divisão por zero"
  isError?: boolean;
  timestamp: string;
  expression: string;
  pythonSnippet: string;
}

export interface CodeAnnotation {
  lineNumber: number;
  code: string;
  title: string;
  explanation: string;
  aluraTip: string;
}

export interface PythonCodeVersion {
  id: string;
  title: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Completo';
  description: string;
  code: string;
  annotations: CodeAnnotation[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
