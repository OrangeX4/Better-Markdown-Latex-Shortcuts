// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { start } from 'repl'
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.copyToRight', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            // editor.edit((edit) => {
            //     let start = sel[0].start
            //     if (!editor) { return }
            //     let text = doc.getText(sel[0])
            //     edit.insert(start, text)
            //     editor.selection = new vscode.Selection(start, new vscode.Position(start.line, start.character + text.length))
            // })
            editor.edit((edit) => {
                if (!editor) { return }
                sel.forEach((selection) => {
                    let start = selection.start
                    let text = doc.getText(selection)
                    edit.insert(start, text)
                })
            }).then(() => {
                if (!editor) { return }
                editor.selections = sel.map((selection) => {
                    let end = selection.end
                    let text = doc.getText(selection)
                    return new vscode.Selection(end, new vscode.Position(end.line, end.character + text.length))
                })
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.copyToLeft', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            editor.edit((edit) => {
                if (!editor) { return }
                sel.forEach((selection) => {
                    let end = selection.end
                    let text = doc.getText(selection)
                    edit.insert(end, text)
                })
            }).then(() => {
                if (!editor) { return }
                editor.selections = sel.map((selection) => {
                    let start = selection.start
                    let text = doc.getText(selection)
                    return new vscode.Selection(start, new vscode.Position(start.line, start.character + text.length))
                })
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToRight', () => {
            vscode.window.showInformationMessage('Success to move to right!')
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToLeft', () => {
            vscode.window.showInformationMessage('Success to move to left!')
        })
    )
}

// this method is called when your extension is deactivated
export function deactivate() { }
