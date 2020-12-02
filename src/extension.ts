// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "better-markdown-latex-shortcuts" is now active!')

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.copyToRight', () => {
            vscode.window.showInformationMessage('Success to copy to right!');
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.copyToLeft', () => {
            vscode.window.showInformationMessage('Success to copy to left!');
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToRight', () => {
            vscode.window.showInformationMessage('Success to move to right!');
        })
    )
    context.subscriptions.push(
        vscode.commands.registerCommand('better-markdown-latex-shortcuts.moveToLeft', () => {
            vscode.window.showInformationMessage('Success to move to left!');
        })
    )
}

// this method is called when your extension is deactivated
export function deactivate() { }
