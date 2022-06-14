import * as VSCode from "vscode"
import { Timer } from "./timer"

export class MeterDecoration {
  private beforeRange: VSCode.Range | null = null
  private decoration: VSCode.TextEditorDecorationType | null = null
  private decorationTimer: NodeJS.Timer | null = null
  private limitTimer: Timer

  private readonly interval = 50

  constructor(limitTimer: Timer) {
    this.limitTimer = limitTimer
  }

  public start() {
    this.limitTimer.start()
  }

  public update(range: VSCode.Range, editor: VSCode.TextEditor) {
    if (!this.canUpdate(range)) return
    if (this.decorationTimer) {
      clearTimeout(this.decorationTimer)
    }

    this.beforeRange = range

    this.decorationTimer = setInterval(() => {
      // if (this.limitTimer.getValue() <= 0) {
      //   VSCode.commands.executeCommand("workbench.action.closeWindow")
      //   if (this.decorationTimer) {
      //     clearTimeout(this.decorationTimer)
      //     this.decorationTimer = null
      //   }
      //   if (this.decoration) {
      //     this.decoration.dispose()
      //     this.decoration = null
      //   }
      // }
      if (this.decoration) {
        this.decoration.dispose()
      }

      //TODO
      // animation
      // bomb
      // shake
      this.decoration = VSCode.window.createTextEditorDecorationType({
        before: {
          contentText: `${this.limitTimer.getValue()}💣`,
          height: "16px",
          color: "white",
          textDecoration: `
          none;
          position: absolute;
          top: 20px;
          right: 5%;
          font-size: 32px;
          text-align: center;
        `,
        },
      })
      editor.setDecorations(this.decoration, [range])
    }, this.interval)
  }

  public remove() {
    this.beforeRange = null
    if (this.decoration) {
      this.decoration.dispose()
      this.decoration = null
    }
    if (this.decorationTimer) {
      clearTimeout(this.decorationTimer)
      this.decorationTimer = null
    }
  }

  private canUpdate(range: VSCode.Range): boolean {
    if (!this.beforeRange) return true
    return !range.isEqual(this.beforeRange)
  }
}
