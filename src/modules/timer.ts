let value = 300

export class Timer {
  private initialValue: number = 0
  timer: NodeJS.Timer | undefined = undefined

  constructor(initialValue: number) {
    this.initialValue = initialValue
    value = initialValue
  }

  public start() {
    this.stop()
    this.timer = setInterval(() => {
      this.countDown()
    }, 1000)
  }

  public stop() {
    clearInterval(this.timer)
  }

  public restart() {
    this.stop()
    value = this.initialValue
    this.start()
  }

  public getValue() {
    return value
  }

  private countDown() {
    if (value <= 0) {
      return
    }
    value = value - 1
  }
}

export const timer = new Timer(300)
