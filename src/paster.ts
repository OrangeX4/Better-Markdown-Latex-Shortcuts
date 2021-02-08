import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

class Logger {
    static channel: vscode.OutputChannel

    static log(message: any) {
        if (this.channel) {
            this.channel.appendLine(message)
        }
    }

    static showInformationMessage(message: string, ...items: string[]) {
        this.log(message)
        return vscode.window.showInformationMessage(message, ...items)
    }

    static showErrorMessage(message: string, ...items: string[]) {
        this.log(message)
        return vscode.window.showErrorMessage(message, ...items)
    }
}

export function saveAndPaste(imagePath: string, callback: () => void) {
    // save image and insert to current edit file
    saveClipboardImageToFileAndGetPath(imagePath, (imagePathReturnByScript) => {
        if (!imagePathReturnByScript) { return }
        if (imagePathReturnByScript === 'no image') {
            Logger.showInformationMessage('There is not an image in the clipboard.')
            return
        }
        callback()
    })
}


/**
 * use applescript to save image from clipboard and get file path
 */
function saveClipboardImageToFileAndGetPath(imagePath: string, cb: (imagePathFromScript: string) => void) {
    if (!imagePath) { return }

    let platform = process.platform
    if (platform === 'win32') {
        // Windows
        const scriptPath = path.join(__dirname, '../res/pc.ps1')

        let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
        let powershellExisted = fs.existsSync(command)
        if (!powershellExisted) {
            command = "powershell"
        }

        const powershell = spawn(command, [
            '-noprofile',
            '-noninteractive',
            '-nologo',
            '-sta',
            '-executionpolicy', 'unrestricted',
            '-windowstyle', 'hidden',
            '-file', scriptPath,
            imagePath
        ])
        powershell.on('error', function (e: any) {
            if (e.code === "ENOENT") {
                Logger.showErrorMessage(`The powershell command is not in you PATH environment variables. Please add it and retry.`)
            } else {
                Logger.showErrorMessage(e)
            }
        })
        powershell.on('exit', function (code, signal) {
            // console.log('exit', code, signal);
        })
        powershell.stdout.on('data', function (data: Buffer) {
            cb(data.toString().trim())
        })
    }
    else if (platform === 'darwin') {
        // Mac
        let scriptPath = path.join(__dirname, '../res/mac.applescript')

        let ascript = spawn('osascript', [scriptPath, imagePath])
        ascript.on('error', function (e: any) {
            Logger.showErrorMessage(e)
        })
        ascript.on('exit', function (code, signal) {
            // console.log('exit',code,signal);
        })
        ascript.stdout.on('data', function (data: Buffer) {
            cb(data.toString().trim())
        })
    } else {
        // Linux 

        let scriptPath = path.join(__dirname, '../res/linux.sh')

        let ascript = spawn('sh', [scriptPath, imagePath])
        ascript.on('error', function (e: any) {
            Logger.showErrorMessage(e)
        })
        ascript.on('exit', function (code, signal) {
            // console.log('exit',code,signal);
        })
        ascript.stdout.on('data', function (data: Buffer) {
            let result = data.toString().trim()
            if (result === "no xclip") {
                Logger.showInformationMessage('You need to install xclip command first.')
                return
            }
            cb(result)
        })
    }
}
