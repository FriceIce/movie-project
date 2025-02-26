type TerminalColors = 'highlight' | 'warning' | 'error';

const colorDictionary = {
  highlight: '\x1b[32m',
  warning: '\x1b[33m',
  error: '\x1b[31m', 
}

export function coloredConsoleLog(type: TerminalColors, text: string): void {
  console.log(colorDictionary[type], text, '\x1b[0m')
}