export interface LoopTask {
  fn: () => void,
  priority: number,
  scope: any,
}

export class Loop {
  protected tasks: LoopTask[] = [];
  protected running: boolean = false;

  constructor(protected freq: number) {}

  public add(fn: () => void, scope: any, priority: number): void {
    for (let i = 0, n = this.tasks.length; i < n; i++) {
      if (priority > this.tasks[i].priority) {
        return void this.tasks.splice(i, 0, { fn, priority, scope });
      }
    }

    this.tasks.push({ fn, priority, scope })
  }

  public remove(fn: () => void, scope: any): void {
    for (let i = 0, n = this.tasks.length; i < n; i++) {
      if (this.tasks[n].fn === fn && this.tasks[n].scope === scope) {
        this.tasks.splice(i, 1);
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
