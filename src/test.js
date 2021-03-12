function imply(p, q) {
    if (!p) {
        return true
    } else if (q) {
        return true
    } else {
        return false
    }
}


function onlyif(p, q) {
    if (p && q) {
        return true
    } else if (!p && !q) {
        return true
    } else {
        return false
    }
}

function xor(p, q) {
    return !onlyif(p, q)
}


function boolToString(p) {
    return p ? 'T' : 'F'
}

function truthtable(func, set) {
    let input = {}
    for (let i = 0; i < set.length; i++) {
        input[set[i]] = false
    }

    function block(begin, end) {
        if (begin < end - 1) {
            let current = set[begin]
            input[current] = false
            block(begin + 1, end)

            input[current] = true
            block(begin + 1, end)

        } else {

            function printOut() {
                let out = ''
                for (let i = 0; i < end; i++) {
                    out = out + '| ' + boolToString(input[set[i]]) + ' '
                }
                out = out + '| ' + boolToString(func(...Object.values(input).slice(0, -1))) + ' |'
                console.log(out)
            }

            let current = set[begin]
            input[current] = false
            printOut()

            input[current] = true
            printOut()
        }
    }

    let out = ''
    for (let i = 0; i < set.length; i++) {
        out = out + '| ' + set[i] + ' '
    }
    out = out + '|'
    console.log(out)

    out = ''
    for (let i = 0; i < set.length; i++) {
        out = out + '|---'
    }
    out = out + '|'
    console.log(out)

    block(0, set.length - 1)
}

// truthtable((x, y) => x && y, ['x', 'y', 'Ans'])

eval("truthtable((x, y) => x && y, ['x', 'y', 'Ans'])")