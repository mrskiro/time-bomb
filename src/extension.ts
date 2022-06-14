import * as vscode from "vscode"
import { MeterDecoration } from "./modules/meter"
import { Timer } from "./modules/timer"

const timer = new Timer(3)
const meter = new MeterDecoration(timer)

let enabled = false

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("time-bomb.enabled", () => {
    enabled = true
    vscode.window.showInformationMessage("🔥")
    const { activeTextEditor } = vscode.window
    if (!activeTextEditor) return
    const { visibleRanges } = activeTextEditor
    const position = visibleRanges.find((v) => !v.isEmpty)
    if (!position) {
      meter.remove()
      return
    }
    const range = new vscode.Range(position.start, position.start)
    meter.update(range, activeTextEditor)
  })

  vscode.commands.registerCommand("time-bomb.disabled", () => {
    enabled = false
    vscode.window.showInformationMessage("💧")
    meter.remove()
  })

  vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
    if (!enabled) return
    const { visibleRanges, textEditor } = e
    const position = visibleRanges.find((v) => !v.isEmpty)
    if (!position) {
      meter.remove()
      return
    }
    const range = new vscode.Range(position.start, position.start)
    meter.update(range, textEditor)
  })

  vscode.workspace.onDidChangeTextDocument((e) => {
    if (!enabled) return
    timer.restart()
  })
  vscode.workspace.onDidSaveTextDocument((e) => {
    if (!enabled) return
    timer.restart()
  })
}

export function deactivate() {}
