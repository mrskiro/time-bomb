import * as vscode from "vscode"
import { MeterDecoration } from "./modules/meter"
import { Timer } from "./modules/timer"

const timer = new Timer(5)
const meter = new MeterDecoration(timer)

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "time-bomb" is now active!')

  context.subscriptions.push(
    vscode.commands.registerCommand("time-bomb.time-bomb", () => {
      vscode.window.showInformationMessage("Hello World from time-bomb!")
    })
  )
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      const { visibleRanges } = e
      const position = visibleRanges.find((v) => !v.isEmpty)
      if (!position) {
        meter.remove()
        return
      }
      const range = new vscode.Range(position.start, position.start)
      meter.update(range)
    })
  )

  // vscode.window.onDidChangeActiveTextEditor(
  //   (editor) => {
  //     activeEditor = editor
  //     if (editor) {
  //       triggerUpdateDecorations()
  //     }
  //   },
  //   null,
  //   context.subscriptions
  // )

  // vscode.window.onDidChangeTextEditorVisibleRanges(
  //   (event) => {
  //     if (activeEditor) {
  //       triggerUpdateDecorations(true)
  //     }
  //   },
  //   null,
  //   context.subscriptions
  // )

  vscode.workspace.onDidChangeTextDocument((e) => {
    timer.restart()
  })
  vscode.workspace.onDidSaveTextDocument((e) => {
    timer.restart()
  })
}

export function deactivate() {}
