import { PythonCodeVersion, QuizQuestion } from '../types/calculator';

export const PYTHON_VERSIONS: PythonCodeVersion[] = [
  {
    id: 'simples',
    title: '1. O Mais Simples Possível (Básico Alura)',
    difficulty: 'Iniciante',
    description: 'Código direto e linear: recebe 2 números, pergunta a operação, calcula, exibe o resultado e salva no histórico.',
    code: `# ====================================================
# Desafio 1 Alura - Calculadora Básica em Python
# 4 Operações: Soma (+), Subtração (-), Multiplicação (*), Divisão (/)
# ====================================================

# Lista para armazenar o histórico de cálculos realizados
historico = []

print("=== CALCULADORA PYTHON - DESAFIO 1 ALURA ===")

# 1. Entrada dos dois números (convertidos para float para aceitar decimais)
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

# 2. Escolha da operação lógica/aritmética
print("\\nOperações disponíveis:")
print("+ : Adição")
print("- : Subtração")
print("* : Multiplicação")
print("/ : Divisão")
operacao = input("\\nEscolha a operação (+, -, *, /): ")

# 3. Tomada de decisão com if, elif e else
if operacao == '+':
    resultado = num1 + num2
    mensagem = f"{num1} + {num2} = {resultado}"
elif operacao == '-':
    resultado = num1 - num2
    mensagem = f"{num1} - {num2} = {resultado}"
elif operacao == '*':
    resultado = num1 * num2
    mensagem = f"{num1} * {num2} = {resultado}"
elif operacao == '/':
    # Verificação de segurança: não existe divisão por zero!
    if num2 == 0:
        mensagem = "Erro: Não é possível dividir por zero!"
    else:
        resultado = num1 / num2
        mensagem = f"{num1} / {num2} = {resultado}"
else:
    mensagem = "Operação inválida!"

# 4. Exibição do resultado do cálculo realizado
print("\\n--------------------------------")
print(f"Resultado do cálculo: {mensagem}")
print("--------------------------------")

# 5. Guardando no histórico
historico.append(mensagem)
print(f"Total de cálculos no histórico: {len(historico)}")
`,
    annotations: [
      {
        lineNumber: 7,
        code: 'historico = []',
        title: 'Criação da Lista de Histórico',
        explanation: 'Cria uma lista vazia chamada `historico`. No Python, colchetes `[]` definem uma lista mutável onde podemos guardar cada cálculo realizado usando `.append()`.',
        aluraTip: 'Listas são ideais para acumular resultados ao longo da execução de um programa.'
      },
      {
        lineNumber: 12,
        code: 'num1 = float(input("Digite o primeiro número: "))',
        title: 'Entrada de Dados e Conversão (Casting)',
        explanation: 'A função `input()` lê o que o usuário digita no teclado sempre como texto (`str`). A função `float()` converte esse texto para um número decimal, permitindo operações como 10.5 + 2.',
        aluraTip: 'Se não usarmos `float()`, o Python somaria strings como textos: "5" + "5" viraria "55" em vez de 10.'
      },
      {
        lineNumber: 22,
        code: 'operacao = input("\\nEscolha a operação (+, -, *, /): ")',
        title: 'Captura da Operação Aritmética',
        explanation: 'Guarda o símbolo digitado pelo usuário (`+`, `-`, `*` ou `/`) em uma variável de texto para comparar depois.',
        aluraTip: 'Strings em Python podem ser comparadas diretamente usando o operador de igualdade `==`.'
      },
      {
        lineNumber: 25,
        code: 'if operacao == \'+\':',
        title: 'Estrutura Condicional (if/elif/else)',
        explanation: 'Compara se o símbolo digitado é igual a `+`. Se verdadeiro, executa a soma `num1 + num2`. O operador `==` verifica igualdade.',
        aluraTip: 'Use `if` para a primeira condição, `elif` (else if) para opções intermediárias e `else` para caso nenhuma seja atendida.'
      },
      {
        lineNumber: 35,
        code: 'if num2 == 0:',
        title: 'Tratamento de Divisão por Zero',
        explanation: 'Na matemática e no Python, dividir qualquer número por 0 resulta no erro fatal `ZeroDivisionError`. Checar antes previne que o programa trave.',
        aluraTip: 'Tratar erros de entrada antes de executar o cálculo é uma das boas práticas mais cobradas na Alura.'
      },
      {
        lineNumber: 45,
        code: 'print(f"Resultado do cálculo: {mensagem}")',
        title: 'Exibição Formatada com f-string',
        explanation: 'A f-string (`f"..."`) permite intercalar variáveis diretamente dentro de chaves `{mensagem}` de forma limpa e moderna.',
        aluraTip: 'As f-strings foram introduzidas no Python 3.6 e são a forma oficial e mais legível recomendada hoje.'
      },
      {
        lineNumber: 49,
        code: 'historico.append(mensagem)',
        title: 'Armazenamento do Resultado no Histórico',
        explanation: 'O método `.append()` adiciona o resultado formatado ao final da lista `historico`, permitindo consultar todos os cálculos depois.',
        aluraTip: 'O método `.append()` altera a lista original sem precisar reatribuí-la.'
      }
    ]
  },
  {
    id: 'completo',
    title: '2. Com Loop Contínuo & Histórico Detalhado (Recomendado)',
    difficulty: 'Completo',
    description: 'Versão interativa com loop `while True`, permitindo realizar múltiplos cálculos seguidos, exibir histórico a qualquer momento e sair quando desejar.',
    code: `# ====================================================
# Desafio 1 Alura - Calculadora com Loop e Histórico
# Permite realizar vários cálculos seguidos e exibe cada resultado
# ====================================================

historico = []

print("========================================")
print("     CALCULADORA PYTHON - ALURA         ")
print("========================================")

while True:
    print("\\n--- NOVO CÁLCULO ---")
    
    # 1. Entrada de dados protegida
    try:
        n1 = float(input("Digite o 1º número: "))
        op = input("Operação (+, -, *, /) ou [H] Histórico ou [S] Sair: ").strip()
        
        # Opções especiais de navegação
        if op.lower() == 's':
            print("\\nEncerrando a calculadora. Até mais!")
            break
        elif op.lower() == 'h':
            print("\\n=== HISTÓRICO DE CÁLCULOS REALIZADOS ===")
            if not historico:
                print("Nenhum cálculo realizado ainda.")
            else:
                for indice, item in enumerate(historico, start=1):
                    print(f"{indice}. {item}")
            continue
            
        n2 = float(input("Digite o 2º número: "))
    except ValueError:
        print("Erro: Por favor, digite apenas números válidos!")
        continue

    # 2. Execução da operação selecionada
    if op == '+':
        res = n1 + n2
        res_formatado = f"{n1} + {n2} = {res}"
    elif op == '-':
        res = n1 - n2
        res_formatado = f"{n1} - {n2} = {res}"
    elif op == '*':
        res = n1 * n2
        res_formatado = f"{n1} * {n2} = {res}"
    elif op == '/':
        if n2 == 0:
            res_formatado = f"{n1} / {n2} = Erro (divisão por zero)"
            print("\\n[!] Atenção: Não é possível dividir nenhum número por zero!")
        else:
            res = n1 / n2
            res_formatado = f"{n1} / {n2} = {res}"
    else:
        print("Operação inválida! Use apenas +, -, * ou /.")
        continue

    # 3. Exibição imediata do resultado
    print(f"\\n>>> RESULTADO: {res_formatado}")
    
    # 4. Registro no histórico
    historico.append(res_formatado)
`,
    annotations: [
      {
        lineNumber: 13,
        code: 'while True:',
        title: 'Loop Infinito com Controle',
        explanation: 'O comando `while True` faz o programa continuar rodando até que o usuário escolha explicitamente sair (`break`).',
        aluraTip: 'Sempre forneça uma condição de parada (`break`) em loops `while True` para evitar que o terminal congele.'
      },
      {
        lineNumber: 17,
        code: 'try: ... except ValueError:',
        title: 'Tratamento de Exceções (Try/Except)',
        explanation: 'Se o usuário digitar uma letra no lugar de um número, o `try/except` captura o erro amigavelmente sem travar o programa.',
        aluraTip: 'Essa é a forma profissional em Python de validar entradas de usuário.'
      },
      {
        lineNumber: 29,
        code: 'for indice, item in enumerate(historico, start=1):',
        title: 'Enumeração de Itens no Histórico',
        explanation: 'A função `enumerate()` percorre a lista e nos entrega tanto o número da linha quanto o texto do cálculo guardado.',
        aluraTip: 'O parâmetro `start=1` faz a contagem começar em 1 em vez de 0, ficando mais natural para quem usa.'
      }
    ]
  },
  {
    id: 'funcoes',
    title: '3. Modular com Funções (`def`)',
    difficulty: 'Intermediário',
    description: 'Versão com código organizado em pequenas funções reutilizáveis para cada operação aritmética.',
    code: `# ====================================================
# Desafio 1 Alura - Calculadora Modular com Funções
# ====================================================

historico = []

# Definição das 4 operações lógicas como funções independentes
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: divisão por zero"
    return a / b

def registrar_calculo(a, op, b, resultado):
    registro = f"{a} {op} {b} = {resultado}"
    historico.append(registro)
    return registro

# Testando os cálculos
print("--- CÁLCULOS COM FUNÇÕES ---")
num1 = 15.0
num2 = 3.0

print(registrar_calculo(num1, '+', num2, somar(num1, num2)))
print(registrar_calculo(num1, '-', num2, subtrair(num1, num2)))
print(registrar_calculo(num1, '*', num2, multiplicar(num1, num2)))
print(registrar_calculo(num1, '/', num2, dividir(num1, num2)))

print("\\nHistórico salvo:")
for calc in historico:
    print(f"- {calc}")
`,
    annotations: [
      {
        lineNumber: 8,
        code: 'def somar(a, b):',
        title: 'Definição de Função em Python',
        explanation: 'A palavra-chave `def` cria uma função chamada `somar` que recebe dois parâmetros `a` e `b` e devolve a soma com `return`.',
        aluraTip: 'Funções tornam seu código reutilizável, modular e muito mais fácil de testar.'
      },
      {
        lineNumber: 18,
        code: 'def dividir(a, b):',
        title: 'Função com Validação Interna',
        explanation: 'A própria função verifica se o divisor `b` é igual a 0 antes de tentar dividir, isolando a regra de negócio.',
        aluraTip: 'Centralizar regras dentro de funções evita repetir código em várias partes do sistema.'
      }
    ]
  }
];

export const DIDACTIC_STEPS = [
  {
    step: '01',
    title: 'Entrada de Dados com `input()` e `float()`',
    summary: 'Como ler o que o usuário digita e converter para números',
    content: 'Por padrão, toda informação recebida pelo comando `input()` é do tipo texto (`str`). Para realizar operações matemáticas (+, -, *, /), é obrigatório converter para `int()` (número inteiro) ou `float()` (número decimal). Recomendamos `float()` para que sua calculadora consiga somar valores como 10.5 ou 2.25.',
    codeSnippet: 'numero1 = float(input("Digite o primeiro número: "))'
  },
  {
    step: '02',
    title: 'As 4 Operações Aritméticas Fundamentais',
    summary: 'Os operadores nativos da linguagem Python',
    content: 'Python possui operadores matemáticos integrados diretos: `+` para Adição, `-` para Subtração, `*` para Multiplicação e `/` para Divisão. Note que a divisão sempre retorna um valor `float` em Python 3.',
    codeSnippet: 'soma = a + b\nsubtracao = a - b\nmultiplicacao = a * b\ndivisao = a / b'
  },
  {
    step: '03',
    title: 'Tomada de Decisão com `if`, `elif` e `else`',
    summary: 'Como o Python escolhe qual cálculo executar',
    content: 'Usamos a estrutura de controle condicional para comparar a opção escolhida pelo usuário. Se for `+`, executa a soma; se for `-`, a subtração; e assim por diante. O `else` final captura entradas incorretas.',
    codeSnippet: 'if operacao == "+":\n    resultado = a + b\nelif operacao == "-":\n    resultado = a - b\nelse:\n    print("Operação inválida")'
  },
  {
    step: '04',
    title: 'Proteção contra Divisão por Zero',
    summary: 'Evitando que o programa pare com `ZeroDivisionError`',
    content: 'Em qualquer linguagem de programação, dividir por zero gera um erro fatal. No Python, isso lança a exceção `ZeroDivisionError`. Sempre verificamos `if divisor == 0:` antes de calcular a divisão.',
    codeSnippet: 'if num2 == 0:\n    print("Erro: Impossível dividir por zero!")\nelse:\n    resultado = num1 / num2'
  },
  {
    step: '05',
    title: 'Exibição do Resultado e Histórico com Listas',
    summary: 'Mostrando o resultado com f-strings e guardando em listas',
    content: 'Com as f-strings (`f"{num1} + {num2} = {resultado}"`), o Python formata o texto com clareza. Para o histórico, criamos uma lista vazia `historico = []` e a cada cálculo executamos `historico.append(resultado)`.',
    codeSnippet: 'historico = []\nhistorico.append(f"{a} + {b} = {resultado}")\nprint(f"Cálculo realizado: {historico[-1]}")'
  }
];

export const ALURA_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é o tipo de dado retornado pela função input() no Python?',
    options: [
      'Sempre retorna uma String (str/texto)',
      'Retorna int ou float automaticamente',
      'Retorna um número decimal',
      'Retorna uma lista de caracteres'
    ],
    correctIndex: 0,
    explanation: 'A função input() sempre lê dados do teclado como string (texto). Por isso usamos float(input()) para transformar em número antes de calcular!'
  },
  {
    id: 2,
    question: 'O que acontece se executarmos 10 / 0 no Python sem validação prévia?',
    options: [
      'Retorna o valor infinito (inf)',
      'O Python lança o erro ZeroDivisionError e interrompe o programa',
      'Retorna 0 automaticamente',
      'Retorna None'
    ],
    correctIndex: 1,
    explanation: 'A divisão por zero não é permitida matematicamente e dispara um ZeroDivisionError. Por isso é crucial verificar if divisor == 0: antes!'
  },
  {
    id: 3,
    question: 'Qual método de lista é usado para adicionar um novo cálculo ao histórico?',
    options: [
      '.append()',
      '.push()',
      '.add()',
      '.insert_last()'
    ],
    correctIndex: 0,
    explanation: 'No Python, o método oficial para acrescentar um item ao final de uma lista é .append(elemento).'
  },
  {
    id: 4,
    question: 'Qual operador lógico/aritmético realiza a multiplicação no Python?',
    options: [
      '* (asterisco)',
      'x (letra x)',
      '. (ponto)',
      '^ (circunflexo)'
    ],
    correctIndex: 0,
    explanation: 'No Python, o asterisco * é o operador aritmético de multiplicação. (O operador ** é potência).'
  }
];
