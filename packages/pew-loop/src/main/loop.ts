export interface LoopTask {
  fn: () => void,
  priority: number,
  scope: any,
}

export class Loop {
  protected tasks: LoopTask[] = [];
  protected running: boolean = false;

  constructor(protected freq: number) {}

  public add(fn: () => void, priority: number, scope: any): void {
    for (let i = 0, n = this.tasks.length; i < n; i++) {
      if (priority > this.tasks[i].priority) {
        this.tasks.splice(i, 0, { fn, priority, scope });
      }
    }
  }

  public start(): void {
    this.running = true;
    this.process();
  }

  public stop(): void {
    this.running = false;
  }

  private process(): void {
    if (!this.running) {
      return;
    }

    // Process Recording - start
    const processStart = performance.now()

    for (let { fn, scope } of this.tasks) {
      fn.call(scope);
    }

    // Process Recording - end
    const processEnd = performance.now()

    setTimeout(() => this.process(), 1000 / this.freq - (processEnd - processStart))
  }
}
