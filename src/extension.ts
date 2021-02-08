// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as calculator from './calculator'
import * as paster from './paster'
import * as path from 'path'
import * as upimg from 'upimg'
import * as fs from 'fs'

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
            editor.edit((edit) => {
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
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let range = new vscode.Range(
                        new vscode.Position(selection.start.line, selection.start.character),
                        new vscode.Position(selection.end.line, selection.end.character + 1))
                    let text = doc.getText(range)
                    edit.replace(range, text.charAt(text.length - 1) + text.slice(0, text.length - 1))
                })
            }).then(() => {
                if (!editor) { return }
                editor.selections = sel.map((selection) => {
                    let start = selection.start
                    let end = selection.end
                    return new vscode.Selection(
                        new vscode.Position(start.line, start.character + 1),
                        new vscode.Position(end.line, end.character + 1))
                })
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToLeft', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let range = new vscode.Range(
                        new vscode.Position(selection.start.line, selection.start.character - 1),
                        new vscode.Position(selection.end.line, selection.end.character))
                    let text = doc.getText(range)
                    edit.replace(range, text.slice(1, text.length) + text.charAt(0))
                })
            }).then(() => {
                if (!editor) { return }
                editor.selections = sel.map((selection) => {
                    let start = selection.start
                    let end = selection.end
                    return new vscode.Selection(
                        new vscode.Position(start.line, start.character - 1),
                        new vscode.Position(end.line, end.character - 1))
                })
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.singleCursor', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            editor.selections = [editor.selection]
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.equal', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            editor.edit((edit) => {
                edit.insert(selection.end, calculator.equal(text))
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.replace', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            editor.edit((edit) => {
                edit.replace(selection, calculator.replace(text))
            })
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.define', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            calculator.define(text)
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.paste', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            const imgPath = path.join((process.env.HOME || process.env.USERPROFILE) as string, 'better-markdown-latex-shortcuts-img.png')
            paster.saveAndPaste(imgPath, () => {
                upimg.toutiao
                    .upload(imgPath)
                    .then(response => {
                        console.log(response)
                        if (response.success) {
                            let editor = vscode.window.activeTextEditor
                            if (!editor) { return }
                            editor.edit((edit) => {
                                let editor = vscode.window.activeTextEditor
                                if (!editor) { return }
                                let selection = editor.selection
                                if (selection.isEmpty) {
                                    edit.insert(selection.start, `![](${response.url})`)
                                } else {
                                    edit.replace(selection, `![${editor.document.getText(selection)}](${response.url})`)
                                }
                            })
                        } else {
                            vscode.window.showErrorMessage(response.message)
                        }
                        fs.unlinkSync(imgPath)
                    })
                    .catch(err => console.error(err.message))
            })
        })
    )
}

// this method is called when your extension is deactivated
export function deactivate() { }
