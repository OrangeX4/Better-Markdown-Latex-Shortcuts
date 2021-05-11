// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as paster from './paster'
import * as path from 'path'
import * as upimg from 'upimg'
import * as fs from 'fs'

const translateLatex = require('latex-expression-translator')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // lock the moving
    let isMovable = true

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
            if (!isMovable) {
                return
            }

            // Begin to move
            isMovable = false

            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            let isJump = false
            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let line = doc.lineAt(selection.end)
                    if (line.range.end.character === selection.end.character) {
                        isJump = true
                    }
                    if (!isJump) {
                        let range = new vscode.Range(
                            new vscode.Position(selection.start.line, selection.start.character),
                            new vscode.Position(selection.end.line, selection.end.character + 1))
                        let text = doc.getText(range)
                        edit.replace(range, text.charAt(text.length - 1) + text.slice(0, text.length - 1))
                    }
                })
            }).then(() => {
                if (!isJump) {
                    if (!editor) { return }
                    editor.selections = sel.map((selection) => {
                        let start = selection.start
                        let end = selection.end
                        return new vscode.Selection(
                            new vscode.Position(start.line, start.character + 1),
                            new vscode.Position(end.line, end.character + 1))
                    })
                }
                isMovable = true
            })
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToLeft', () => {
            if (!isMovable) {
                return
            }

            // Begin to move
            isMovable = false

            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }
            let isJump = false
            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let line = doc.lineAt(selection.start)
                    if (line.range.start.character === selection.start.character) {
                        isJump = true
                    }
                    if (!isJump) {
                        let range = new vscode.Range(
                            new vscode.Position(selection.start.line, selection.start.character - 1),
                            new vscode.Position(selection.end.line, selection.end.character))
                        let text = doc.getText(range)
                        edit.replace(range, text.slice(1, text.length) + text.charAt(0))
                    }
                })
            }).then(() => {
                if (!isJump) {
                    if (!editor) { return }
                    editor.selections = sel.map((selection) => {
                        let start = selection.start
                        let end = selection.end
                        return new vscode.Selection(
                            new vscode.Position(start.line, start.character - 1),
                            new vscode.Position(end.line, end.character - 1))
                    })
                }
                isMovable = true
            })
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToRightQuickly', () => {
            if (!isMovable) {
                return
            }

            // Begin to move
            isMovable = false

            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }

            let isJump = false
            let count = 1

            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let line = doc.lineAt(selection.end)
                    if (line.range.end.character === selection.end.character) {
                        isJump = true
                    }
                    if (!isJump) {
                        let substr = line.text.slice(selection.end.character, line.text.length)
                        let match = substr.match(/^([A-Z][a-z]+)|([A-Z]+)|(_*[a-z]+)|(_+)/)
                        if (match && match[0] === substr.slice(0, match[0].length)) {
                            count = match[0].length
                        }
                        let range = new vscode.Range(
                            new vscode.Position(selection.start.line, selection.start.character),
                            new vscode.Position(selection.end.line, selection.end.character + count))
                        let text = doc.getText(range)
                        edit.replace(range, text.slice(text.length - count, text.length) + text.slice(0, text.length - count))
                    }
                })
            }).then(() => {
                if (!isJump) {
                    if (!editor) { return }
                    editor.selections = sel.map((selection) => {
                        let start = selection.start
                        let end = selection.end
                        return new vscode.Selection(
                            new vscode.Position(start.line, start.character + count),
                            new vscode.Position(end.line, end.character + count))
                    })
                }
                isMovable = true
            })
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToLeftQuickly', () => {
            if (!isMovable) {
                return
            }

            // Begin to move
            isMovable = false

            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let sel = editor.selections
            if (sel.length === 0) { return }

            let isJump = false
            let count = 1

            editor.edit((edit) => {
                sel.forEach((selection) => {
                    let line = doc.lineAt(selection.start)
                    if (line.range.start.character === selection.start.character) {
                        isJump = true
                    }
                    if (!isJump) {
                        let substr = line.text.slice(0, selection.start.character)
                        let match = substr.match(/^([A-Z][a-z]+)|([A-Z]+)|(_*[a-z]+)|(_+)/g)
                        let lastStr = ''
                        if (match) {
                            lastStr = match[match.length - 1]
                        }
                        if (match && lastStr === substr.slice(substr.length - lastStr.length, substr.length)) {
                            count = lastStr.length
                        }

                        let range = new vscode.Range(
                            new vscode.Position(selection.start.line, selection.start.character - count),
                            new vscode.Position(selection.end.line, selection.end.character))
                        let text = doc.getText(range)
                        edit.replace(range, text.slice(count, text.length) + text.slice(0, count))
                    }
                })
            }).then(() => {
                if (!isJump) {
                    if (!editor) { return }
                    editor.selections = sel.map((selection) => {
                        let start = selection.start
                        let end = selection.end
                        return new vscode.Selection(
                            new vscode.Position(start.line, start.character - count),
                            new vscode.Position(end.line, end.character - count))
                    })
                }
                isMovable = true
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
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.set', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            editor.edit((edit) => {
                edit.replace(selection, '{' + text + '}')
            }).then(() => {
                if (!editor) {
                    return
                }
                let sel = editor.selection
                if (sel.anchor.line > sel.active.line || sel.anchor.line === sel.active.line && sel.anchor.character >= sel.active.character) {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character - 1),
                        new vscode.Position(sel.active.line, sel.active.character + 1)
                    )
                } else {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character + 1),
                        new vscode.Position(sel.active.line, sel.active.character - 1)
                    )
                }
            })

        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.dollar', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            editor.edit((edit) => {
                edit.replace(selection, '$' + text + '$')
            }).then(() => {
                if (!editor) {
                    return
                }
                let sel = editor.selection
                if (sel.anchor.line > sel.active.line || sel.anchor.line === sel.active.line && sel.anchor.character >= sel.active.character) {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character - 1),
                        new vscode.Position(sel.active.line, sel.active.character + 1)
                    )
                } else {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character + 1),
                        new vscode.Position(sel.active.line, sel.active.character - 1)
                    )
                }
            })

        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.abs', () => {
            let editor = vscode.window.activeTextEditor
            if (!editor) { return }
            let doc = editor.document
            let selection = editor.selection
            let text = doc.getText(selection)
            editor.edit((edit) => {
                edit.replace(selection, '|' + text + '|')
            }).then(() => {
                if (!editor) {
                    return
                }
                let sel = editor.selection
                if (sel.anchor.line > sel.active.line || sel.anchor.line === sel.active.line && sel.anchor.character >= sel.active.character) {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character - 1),
                        new vscode.Position(sel.active.line, sel.active.character + 1)
                    )
                } else {
                    editor.selection = new vscode.Selection(
                        new vscode.Position(sel.anchor.line, sel.anchor.character + 1),
                        new vscode.Position(sel.active.line, sel.active.character - 1)
                    )
                }
            })

        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.paste', () => {
            new Promise((resolve) => {
                resolve(null)
                return
            }).then(() => {
                let editor = vscode.window.activeTextEditor
                if (!editor) { return }
                const imgPath = path.join((process.env.HOME || process.env.USERPROFILE) as string, 'better-markdown-latex-shortcuts-img.png')
                return new Promise<string>((resolve) => {
                    paster.saveAndPaste(imgPath, () => resolve(imgPath))
                })
            }).then((imgPath) => (upimg as any)['58'].upload(imgPath as string)).then(response => {
                const imgPath = path.join((process.env.HOME || process.env.USERPROFILE) as string, 'better-markdown-latex-shortcuts-img.png')
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
            }).catch(err => console.error(err.message))
        }))
}

// this method is called when your extension is deactivated
export function deactivate() { }
