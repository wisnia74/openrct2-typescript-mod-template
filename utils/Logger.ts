/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */

import chalk from 'chalk';

const seed = (): number => Math.floor(Math.random() * 255);
const getRandomColor = (): chalk.Chalk => chalk.rgb(seed(), seed(), seed());

const formatTime = (time: [number, number]): string => `${time[0]}s ${Math.round(time[1] / 1000000)}ms`;

export default class Logger {
  private name: string;

  private color: chalk.Chalk;

  private output: Console;

  private timeMeasures: Map<string, ReturnType<NodeJS.HRTime>>;

  prepend: string;

  characterOffset: number;

  constructor({
    name,
    color = getRandomColor(),
    output = console,
  }: {
    name: string;
    color?: chalk.Chalk;
    output: Console;
  }) {
    this.name = name;
    this.color = color;
    this.output = output;
    this.prepend = `[${this.color(this.name)}]`;
    this.timeMeasures = new Map<string, ReturnType<NodeJS.HRTime>>();
    this.characterOffset = this.name.length + 3;
  }

  log(...data: any[]): void {
    this.output.log(this.prepend, chalk.white(data));
  }

  info(...data: any[]): void {
    this.output.info(this.prepend, chalk.cyan(data));
  }

  warn(...data: any[]): void {
    this.output.warn(this.prepend, chalk.yellow(data));
  }

  error(...data: any[]): void {
    this.output.error(this.prepend, chalk.red(data));
  }

  success(...data: any[]): void {
    this.output.log(this.prepend, chalk.green(data));
  }

  timeStart(label: string): void {
    this.timeMeasures.set(label, process.hrtime());
  }

  timeLog(label: string, ...data: any[]): void {
    if (!this.timeMeasures.has(label)) {
      throw new Error(`Timer with ${label} label not found`);
    }

    const elapsedTime = process.hrtime(this.timeMeasures.get(label));

    this.output.log(this.prepend, data.join(' '), formatTime(elapsedTime));
  }

  timeEnd(label: string): string {
    if (!this.timeMeasures.has(label)) {
      throw new Error(`Timer with ${label} label not found`);
    }

    const elapsedTime = process.hrtime(this.timeMeasures.get(label));

    this.timeMeasures.delete(label);

    return formatTime(elapsedTime);
  }
}
