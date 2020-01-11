export interface LoopTask {
  fn: () => void,
  priority: number,
  scope: any,
}

export class Loop {
  protected tasks: LoopTask[] = [];

  constructor (
    public name: string
  ) { }

  public add(fn: () => void, priority: number, scope: any): void {
    this.tasks.push({ fn, priority, scope});
  }
}
