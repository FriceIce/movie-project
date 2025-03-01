type TerminalColors = 'highlight' | 'warning' | 'error';

const colorDictionary = {
  highlight: '\x1b[32m', // Green
  warning: '\x1b[33m', // Yellow
  error: '\x1b[31m',  // Red
}

export function coloredConsoleLog(type: TerminalColors, text: string): void {
  console.log(colorDictionary[type], text, '\x1b[0m')
}