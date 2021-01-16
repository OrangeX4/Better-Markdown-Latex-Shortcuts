import * as mathjs from 'mathjs'

export function equal(text: string) {
    let value = 0
    try {
        value = mathjs.evaluate(text)
    } catch {
        return ''
    }
    return '=' + value
}

export function replace(text: string) {
    let value = 0
    try {
        value = mathjs.evaluate(text)
    } catch {
        return text
    }
    return '' + value
}