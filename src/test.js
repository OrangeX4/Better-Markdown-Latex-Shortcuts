function removeDisplaystyle(text) {
    return text.replace(/\\displaystyle/g, '')
}

function toPi(text) {
    return text.replace(/\\pi/g, 'pi')
}

function toMultiply(text) {
    return text.replace(/\\times/g, '*')
}

function toPow(text) {
    let old = text
    let pattern = /\^{([+-]?[0-9\s\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\^{([+-]?[0-9\s\*/+-^()i]+)}/g
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

function toFrac(text) {
    let old = text
    let pattern = /\\frac{([0-9\s\*/+-^()i]+)}{([0-9\*/+-^()i]+)}/g
    let match = text.match(pattern)
    if (!match) { return text }
    match.forEach((str) => {
        pattern = /\\frac{([0-9\s\*/+-^()i]+)}{([0-9\*/+-^()i]+)}/g
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

let text = String.raw`\frac{\frac{2\frac{2^{3\frac{1\times 3}{4}}+4}{3}+3}{4}}{2}+\frac{1+3*6}{2}`

console.log(toFrac(toPow(toFrac(toMultiply(toPi(removeDisplaystyle(text)))))))

