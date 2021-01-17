import * as mathjs from 'mathjs'

const parser = mathjs.parser()

export function define(text: string) {
    try {
        evaluate(text)
    } catch {
        return
    }
}

export function equal(text: string) {
    let value
    try {
        value = evaluate(text)
    } catch {
        try {
            let processedText = mathjs.parse(process(text)).toString()
            value = mathjs.simplify(processedText).toString()
            if(removeBracket(processedText) === removeBracket(value)) {
                value = mathjs.rationalize(processedText)
            }
        } catch {
            return ''
        }
    }
    return '=' + toTex('' + value)
}

export function replace(text: string) {
    let value
    try {
        value = evaluate(text)
    } catch {
        try {
            let processedText = mathjs.parse(process(text)).toString()
            value = mathjs.simplify(processedText).toString()
            if(removeBracket(processedText) === removeBracket(value)) {
                value = mathjs.rationalize(processedText)
            }
        } catch {
            return text
        }
    }
    return '' + toTex('' + value)
}

function toTex(text: string): string {
    function toTexFrac(text: string, pattern: RegExp): string {
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
    text = removeSpace(text)
    text = toTexFrac(text, /([\w\s]+)\/([\w\s]+)/g)
    text = toTexFrac(text, /([\w\s]+)\/[(]([\w\s\*/+-^]+)[)]/g)
    text = toTexFrac(text, /[(]([\w\s\*/+-^]+)[)]\/([\w\s]+)/g)
    text = toTexFrac(text, /[(]([\w\s\*/+-^]+)[)]\/[(]([\w\s\*/+-^]+)[)]/g)
    text = removeSpace(text).replace(/\*/g, '\\times ')
    // Replace matrix
    let pattern = /\[\[[0-9\[\],.+-]+\]\]/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        let result = '\\begin{pmatrix}\n' + str.slice(2, str.length - 2).split('],[').map((vector) => {
            return vector.replace(/,/g, ' &')
        }).join(' \\\\\n') + '\n\\end{pmatrix}'
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

function process(text: string): string {
    return toMatrix(toSqrt(toFrac(toPow(toFrac(toTranspose(toMultiply(toPi(removeDisplaystyle(text)))))))))
}

function evaluate(text: string): any {
    return parser.evaluate(process(text))
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
            if(array[1] === 'vmatrix')
            {
                result = 'det([' + array[2].split('\\\\').map((line) => {
                    return '[' + line.replace(/&/g, ',') + ']'
                }).join() + '])'
                if(array[4]) {
                    result = result + '^(-1)'
                }
            } else {
                result = '[' + array[2].split('\\\\').map((line) => {
                    return '[' + line.replace(/&/g, ',') + ']'
                }).join() + ']'
                if(array[4]) {
                    result = 'inv(' + result + ')'
                }
            }
            text = text.replace(str, result)
        }
    })
    return text
}