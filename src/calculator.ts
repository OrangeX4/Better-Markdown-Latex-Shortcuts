import * as mathjs from 'mathjs'

const parser = mathjs.parser()

export function define(text: string) {
    try {
        evaluate(text)
    } catch {
        return
    }
}

export function equal(text: string): string {
    const isWrap = text.indexOf('\n') !== -1 ? '\n' : ''
    let value

    try {
        let elementaryTransformation = elementaryTransform(toFrac(text), isWrap)
        if (elementaryTransformation) {
            const pattern = /\\begin{([vbp]matrix)}/
            const match = pattern.exec(text)
            if (match) {
                return elementaryTransformation.replace(/pmatrix/g, match[1]).replace(/\*/g, '')
            }
        }
    } catch {

    }

    try {
        value = evaluate(text)
    } catch {
        try {
            let processedText = mathjs.parse(process(text)).toString()
            value = mathjs.simplify(processedText).toString()
            if (removeBracket(processedText) === removeBracket(value)) {
                value = mathjs.rationalize(processedText)
            }
        } catch {
            return ''
        }
    }
    return '=' + toTex('' + value, isWrap)
}

export function replace(text: string): string {
    const isWrap = text.indexOf('\n') !== -1 ? '\n' : ''
    let value

    try {
        let elementaryTransformation = elementaryTransform(toFrac(text), isWrap)
        if (elementaryTransformation) {
            const pattern = /\\begin{([vbp]matrix)}/
            const match = pattern.exec(text)
            if (match) {
                return elementaryTransformation.replace(/pmatrix/g, match[1]).replace(/\*/g, '')
                // return elementaryTransformation.replace(/pmatrix/g, match[1])
            }
        }
    } catch {

    }

    try {
        value = evaluate(text)
    } catch {
        try {
            let processedText = mathjs.parse(process(text)).toString()
            value = mathjs.simplify(processedText).toString()
            if (removeBracket(processedText) === removeBracket(value)) {
                value = mathjs.rationalize(processedText)
            }
        } catch {
            return text
        }
    }
    return '' + toTex('' + value, isWrap)
}

function evaluate(text: string): any {
    return parser.evaluate(process(text))
}

function process(text: string): string {
    return toMatrix(toSqrt(toFrac(toPow(toFrac(toTranspose(toMultiply(toPi(removeDisplaystyle(text)))))))))
}


function toTexFrac(text: string): string {

    function _toTexFrac(text: string, pattern: RegExp): string {
        let _pattern = pattern
        let match = text.match(_pattern)
        if (!match) { return text }
        match.forEach((str) => {
            _pattern = pattern
            let array = _pattern.exec(str)
            if (array) {
                text = text.replace(str, `\\frac{${array[1]}}{${array[2]}}`)
            }
        })
        return text
    }

    text = _toTexFrac(text, /([\w\s]+)\/([\w\s]+)/g)
    text = _toTexFrac(text, /([\w\s]+)\/[(]([\w\s\*/+-^]+)[)]/g)
    text = _toTexFrac(text, /[(]([\w\s\*/+-^]+)[)]\/([\w\s]+)/g)
    text = _toTexFrac(text, /[(]([\w\s\*/+-^]+)[)]\/[(]([\w\s\*/+-^]+)[)]/g)

    text = removeSpace(text)
    return text
}


function toTex(text: string, isWrap: string): string {
    
    text = toTexFrac(text)
    text = removeSpace(text).replace(/\*/g, '\\times ')
    // Replace matrix
    let pattern = /\[\[[0-9\[\],.+-]+\]\]/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        let result = '\\begin{pmatrix}' + isWrap + str.slice(2, str.length - 2).split('],[').map((vector) => {
            return vector.replace(/,/g, ' &')
        }).join(' \\\\' + isWrap) + isWrap + '\\end{pmatrix}'
        text = text.replace(str, result)
    })
    return text
}

function removeSpace(text: string): string {
    return text.replace(/\s/g, '')
}

function removeBracket(text: string): string {
    return text.replace(/[()]/g, '')
}

function removeDisplaystyle(text: string): string {
    return text.replace(/\\displaystyle/g, '')
}

function toMultiply(text: string): string {
    return text.replace(/\\times/g, '*')
}

function toPi(text: string): string {
    return text.replace(/\\pi/g, 'pi')
}

function toTranspose(text: string): string {
    return text.replace(/\^T/g, "'")
}

function toPow(text: string): string {
    let old = text
    let pattern = /\^{([+-]?[\w\s\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\^{([+-]?[\w\s\*/+-^()i]+)}/g
        let array = pattern.exec(str)
        if (array) {
            text = text.replace(str, `^(${array[1]})`)
        }
    })
    if (old === text) { return text }
    else {
        return toPow(text)
    }
}

function toSqrt(text: string): string {
    let pattern = /\\sqrt{([+-]?[\w\s\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\\sqrt{([+-]?[\w\s\*/+-^()i]+)}/g
        let array = pattern.exec(str)
        if (array) {
            text = text.replace(str, `sqrt(${array[1]})`)
        }
    })
    return text
}

function toFrac(text: string): string {
    let old = text
    let pattern = /\\frac{([\w\s\*/+-^()i]+)}{([\w\s\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\\frac{([\w\s\*/+-^()i]+)}{([\w\s\*/+-^()i]+)}/g
        let array = pattern.exec(str)
        if (array) {
            text = text.replace(str, `((${array[1]})/(${array[2]}))`)
        }
    })
    if (old === text) { return text }
    else {
        return toFrac(text)
    }
}

function toMatrix(text: string): string {
    text = removeSpace(text)
    let pattern = /\\begin{([vbp]matrix)}([\w\*/+-^()i&\\]+)\\end{([vbp]matrix)}(\^[(]-1[)])?/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\\begin{([vbp]matrix)}([\w\*/+-^()i&\\]+)\\end{([vbp]matrix)}(\^[(]-1[)])?/g
        let array = pattern.exec(str)
        if (array) {
            let result = ''
            if (array[1] === 'vmatrix') {
                result = 'det([' + array[2].split('\\\\').map((line) => {
                    return '[' + line.replace(/&/g, ',') + ']'
                }).join() + '])'
                if (array[4]) {
                    result = result + '^(-1)'
                }
            } else {
                result = '[' + array[2].split('\\\\').map((line) => {
                    return '[' + line.replace(/&/g, ',') + ']'
                }).join() + ']'
                if (array[4]) {
                    result = 'inv(' + result + ')'
                }
            }
            text = text.replace(str, result)
        }
    })
    return text
}

function elementaryTransform(text: string, isWrap: string): string | null {
    text = text.replace(/\s/g, '')

    const pattern = /\\begin{([vbp]matrix)}([\w\*/+-^()i&\\]+)\\end{([vbp]matrix)}(\\xrightarrow|\\xlongequal)(\[([\w_=\s\*/+-^,/()]+)\])?{([\w_=\s\*/+-^,/()]+)}/g
    const match = pattern.exec(text)
    if (match) {
        // const matrix = match[2].split('\\\\').map((line) => line.split('&').map((value) => parseFloat(value)))
        const matrix = match[2].split('\\\\').map((line) => line.split('&'))
        const commands = match[6] ? match[7].split(',').concat(match[6].split(',')) : match[7].split(',')
        commands.forEach((command) => { changeMatrix(matrix, command) })

        return isWrap + '\\begin{pmatrix}' + isWrap +
            matrix.map((vector) => vector.map((value) => toTexFrac(mathjs.simplify(value).toString())).join(' &')).join(' \\\\' + isWrap)
            + isWrap + '\\end{pmatrix}'
    } else {
        return null
    }

    function changeMatrix(matrix: string[][], command: string) {
        function evaluate(expression: string) {
            const result = new Array(matrix.length > matrix[0].length ? matrix.length : matrix[0].length).fill('0')

            while (true) {
                const match = /^([abdtspqxyz0-9-+/.()]*)(([rc])_([0-9]))/.exec(expression)

                if (!expression || !match || !match[0]) {
                    break
                }

                expression = expression.substr(match[0].length, expression.length - match[0].length)

                if (match[1] === '' || match[1] === '+') {
                    match[1] = '1'
                } else if (match[1] === '-') {
                    match[1] = '-1'
                }

                const multiple = match[1]
                const index = parseInt(match[4]) - 1

                if (match[3] === 'r') {
                    const line = matrix[index]
                    line.forEach((v, i) => result[i] += `+(${multiple})*(${line[i]})`)
                } else if (match[3] === 'c') {
                    matrix.forEach((line, i) => result[i] += `+(${multiple})*(${line[index]})`)
                }
            }

            return result
        }

        // Receive r_0 or c_1 for str
        function setVector(str: string, vector: string[]) {
            const match = str.split('_')
            const index = parseInt(match[1]) - 1
            if (match[0] === 'r') {
                const line = matrix[index]
                line.forEach((v, i) => line[i] = vector[i])
            } else if (match[0] === 'c') {
                matrix.forEach((line, i) => line[index] = vector[i])
            }
        }

        if (command.indexOf('\\leftrightarrow') !== -1) {
            const parts = command.split('\\leftrightarrow').map((value) => value.split('_'))
            const pre = parseInt(parts[0][1]) - 1
            const aft = parseInt(parts[1][1]) - 1
            if (parts[0][0] === 'r' && parts[1][0] === 'r') {
                const tmp = matrix[pre]
                matrix[pre] = matrix[aft]
                matrix[aft] = tmp
            } else if (parts[0][0] === 'c' && parts[1][0] === 'c') {
                const tmp = matrix.map((line) => line[pre])
                matrix.forEach((line, i) => line[pre] = matrix[i][aft])
                matrix.forEach((line, i) => line[aft] = tmp[i])
            }
        } else if (command.indexOf('=') !== -1) {
            const match = command.split('=')
            const vector = evaluate(match[1])
            setVector(match[0], vector)
        } else {
            const match = /^[abdtspqxyz0-9-+./()]*([rc]_[0-9])/.exec(command)
            if (match && match[1]) {
                const vector = evaluate(command)
                setVector(match[1], vector)
            }
        }
    }
}