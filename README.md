# 剪贴板图片自动上传图床

使用快捷键 "Shift + Ctrl + Alt + V" 可以将剪贴板内的图片自动上传到头条图床, 并以 Markdown 形式粘贴在当前位置.

代码参考 [vscode-paste-image](https://github.com/mushanshitiancai/vscode-paste-image) 和 [upimg](https://www.npmjs.com/package/upimg).

![](https://p.pstatp.com/origin/137df0001b5db431ffb9f)

# 行内复制与移动

## 复制

使用快捷键 "Shift + Alt + ←" 将选中内容在行内向左复制。

使用快捷键 "Shift + Alt + →" 将选中内容在行内向右复制。

![copy](https://s3.ax1x.com/2020/12/02/DIg8ds.gif)

## 多行复制

![multicopy](https://s3.ax1x.com/2020/12/02/DIgGon.gif)

## 移动

使用快捷键 "Alt + ←" 将选中内容在行内向左移动一位，使用快捷键 "Ctrl + Alt + ←" 将选中内容在行内向左移动一个单词。

使用快捷键 "Alt + →" 将选中内容在行内向右移动一位，使用快捷键 "Ctrl + Alt + →" 将选中内容在行内向右移动一个单词。

![move](https://s3.ax1x.com/2020/12/02/DIgYiq.gif)

## 单选

使用快捷键 "Ctrl + Alt + U" 将光标变为一个。

![single](https://s3.ax1x.com/2020/12/02/DIgtJ0.gif)


# 计算器功能

计算器功能一共有三个快捷键，分别是：

1. 定义（Define）："Shift + Ctrl + Alt + D"
2. 等于（Equal）："Shift + Ctrl + Alt + E"
3. 替换（Replace）："Shift + Ctrl + Alt + R"

这三个命令实际上效果相同，唯一区别是输出的内容。

“定义”什么都不会输出，通常用来定义变量，如 “x=3”。

“等于”会将计算结果加上等于号并接在当前选中区域之后，如 “1+2” 会变成 “1+2=3”。

“等于”会用计算结果替换选中区域，如 “1+2” 会变成 “3”。

目前计算器支持数值运算，函数运算，多项式运算，矩阵运算等诸多运算，并且是用 Latex 表达式直接计算，输出结果也会自动转换为 Latex 形式。

![Calculator](https://ae01.alicdn.com/kf/U775488c7dd0a4fa682ffed6b36ef12ab1.jpg)

## 矩阵初等变换功能

使用 `\xrightarrow[c_1=c_1+c_2]{r_1\leftrightarrow r_2, 3r_3}` 此类语法, 即可进行初等变换操作.

![](https://ae01.alicdn.com/kf/U86962d71af644a06ace91f344be6a52cu.jpg)

PS：运算相关支持使用的是 “Mathjs” 库，一切 Mathjs 表达式均可以正常使用。

## 真值表运算

使用如下语法:

``` javascript
truthtable((x, y, z) => !x && y || z, ['X', 'Y', 'Z', 'Ans'], ['T', 'F'])
```

并按下计算快捷键 `Shift + Ctrl + Alt + E / R`

可以得到:

``` markdown
| X | Y | Z | Ans |
|---|---|---|---|
| F | F | F | F |
| F | F | T | T |
| F | T | F | T |
| F | T | T | T |
| T | F | F | F |
| T | F | T | T |
| T | T | F | F |
| T | T | T | T |
```


# Snippets

``` json
{
	"\\\\": {
		"prefix": "\\\\",
		"body": [
			"\\\\\\\\"
		],
		"description": "\\\\"
    },
	"singleLine": {
		"prefix": "\\\\$",
		"body": "$\\displaystyle ${1:${TM_SELECTED_TEXT}}$",
		"description": "subscript"
	},
	"multiLine": {
		"prefix": "\\\\$$",
		"body": [
            "$$",
            "${1:${TM_SELECTED_TEXT}}",
            "$$"
        ],
		"description": "subscript"
	},
	"cdots": {
		"prefix": "\\\\...",
		"body": "\\cdots ",
		"description": "\\cdots"
	},
	"cdot": {
		"prefix": "\\\\.",
		"body": "\\cdot ",
		"description": "\\cdot"
	},
	"d": {
		"prefix": "\\\\d",
		"body": [
			"{\\rm d}"
		],
		"description": "{\\rm d}"
	},
	"dx": {
		"prefix": "\\\\dx",
		"body": [
			"{\\rm d}x"
		],
		"description": "dx"
	},
	"dy": {
		"prefix": "\\\\dy",
		"body": [
			"{\\rm d}y"
		],
		"description": "dy"
	},
	"dt": {
		"prefix": "\\\\dt",
		"body": [
			"{\\rm d}t"
		],
		"description": "dt"
	},
	"set": {
		"prefix": "\\\\set",
		"body": [
			"\\{${1:${TM_SELECTED_TEXT}}\\\\}"
		],
		"description": "A set"
    },
	"angle": {
		"prefix": "\\\\angle",
		"body": [
			"\\langle ${1:${TM_SELECTED_TEXT}}\\rangle "
		],
		"description": "A angle"
    },
	"multiply": {
		"prefix": "\\\\multiply",
		"body": [
            "${1:\\alpha}${3:_}1\\times ${1:\\alpha}${3:_}2\\times \\cdots\\times ${1:\\alpha}${3:_}${2:n}"
		],
        "description": "A line with multiply"
    },
	"dotmultiply": {
		"prefix": "\\\\dotmultiply",
		"body": [
            "${1:\\alpha}${3:_}1\\cdot ${1:\\alpha}${3:_}2\\cdots ${1:\\alpha}${3:_}${2:n}"
		],
        "description": "A line with dot multiply"
    },
	"plus": {
		"prefix": "\\\\plus",
		"body": [
            "${1:\\alpha}${3:_}1+${1:\\alpha}${3:_}2+\\cdots+${1:\\alpha}${3:_}${2:n}"
		],
        "description": "A line with plus"
    },
	"comma": {
		"prefix": "\\\\comma",
		"body": [
            "${1:\\alpha}${3:_}1,${1:\\alpha}${3:_}2,\\cdots,${1:\\alpha}${3:_}${2:n}"
		],
        "description": "A line with comma"
    },
	"vdots": {
		"prefix": "\\\\vdots",
		"body": [
			"\\vdots &\\vdots & &\\vdots \\\\\\\\"
		],
        "description": "A line of vdots"
    },
    "aligned": {
        "prefix": "\\\\aligned",
        "body": [
            "\\begin{aligned}",
            "${1:${TM_SELECTED_TEXT}} \\\\\\\\",
            "\\end{aligned}"
        ],
        "description": "A scope of aligned"
    },
    "cases": {
        "prefix": "\\\\cases",
        "body": [
            "\\begin{cases}",
            "${1:${TM_SELECTED_TEXT}} \\\\\\\\",
            "\\end{cases}"
        ],
        "description": "A scope of cases"
    },
    "matrix": {
        "prefix": "\\\\matrix",
        "body": [
            "\\begin{matrix}",
            "${1:${TM_SELECTED_TEXT}} \\\\\\\\",
            "\\end{matrix}"
        ],
        "description": "A scope of matrix"
    },
    "bmatrix": {
        "prefix": "\\\\bmatrix",
        "body": [
            "\\begin{bmatrix}",
            "${1:${TM_SELECTED_TEXT}}",
            "\\end{bmatrix}"
        ],
        "description": "A scope of bmatrix"
    },
    "vmatrix": {
        "prefix": "\\\\vmatrix",
        "body": [
            "\\begin{vmatrix}",
            "${1:${TM_SELECTED_TEXT}}",
            "\\end{vmatrix}"
        ],
        "description": "A scope of vmatrix"
    },
    "pmatrix": {
        "prefix": "\\\\pmatrix",
        "body": [
            "\\begin{pmatrix}",
            "${1:${TM_SELECTED_TEXT}}",
            "\\end{pmatrix}"
        ],
        "description": "A scope of pmatrix"
    },
    "equations": {
        "prefix": "\\\\equations",
        "body": [
            "$$",
            "\\begin{cases}",
            "${1:k}_{11}${2:x}_1+${1:k}_{12}${2:x}_2+\\cdots+${1:k}_{1n}${2:x}_n=${3:b}_1 \\\\\\\\",
            "${1:k}_{21}${2:x}_1+${1:k}_{22}${2:x}_2+\\cdots+${1:k}_{2n}${2:x}_n=${3:b}_2 \\\\\\\\",
            "\\cdots \\\\\\\\",
            "${1:k}_{n1}${2:x}_1+${1:k}_{n2}${2:x}_2+\\cdots+${1:k}_{nn}${2:x}_n=${3:b}_n \\\\\\\\",
            "\\end{cases}",
            "$$"
        ],
        "description": "Equations"
    },
    "zeroEquations": {
        "prefix": "\\\\zeroequations",
        "body": [
            "$$",
            "\\begin{cases}",
            "${1:k}_{11}${2:x}_1+${1:k}_{12}${2:x}_2+\\cdots+${1:k}_{1n}${2:x}_n=0 \\\\\\\\",
            "${1:k}_{21}${2:x}_1+${1:k}_{22}${2:x}_2+\\cdots+${1:k}_{2n}${2:x}_n=0 \\\\\\\\",
            "\\cdots \\\\\\\\",
            "${1:k}_{n1}${2:x}_1+${1:k}_{n2}${2:x}_2+\\cdots+${1:k}_{nn}${2:x}_n=0 \\\\\\\\",
            "\\end{cases}",
            "$$"
        ],
        "description": "Equations"
    },
    "lim": {
        "prefix": "\\\\lim",
        "body": "\\lim_{${1:x}\\to ${2:\\infty}}$3",
        "description": "lim"
    },
    "sum": {
        "prefix": "\\\\sum",
        "body": "\\sum_{${1:i}=${2:1}}$3",
        "description": "sum"
    },
    "prod": {
        "prefix": "\\\\prod",
        "body": "\\prod_{${1:i}=${2:1}}$3",
        "description": "prod"
    },
    "ln": {
        "prefix": "\\\\ln",
        "body": "\\ln{${1:i}}$2",
        "description": "ln"
    },
    "log": {
        "prefix": "\\\\log",
        "body": "\\log_{${1:i}}{${2:i}}$3",
        "description": "log"
    },
    "bracket": {
        "prefix": "\\\\bracket",
        "body": "\\left ${1:${TM_SELECTED_TEXT}} \\right",
        "description": "bracket"
    },
    "c2vector": {
        "prefix": "\\\\c2vector",
        "body": "\\begin{pmatrix}${1:1}\\\\\\\\${2:1}\\end{pmatrix}",
        "description": "c2vector"
    },
    "c3vector": {
        "prefix": "\\\\c3vector",
        "body": "\\begin{pmatrix}${1:1}\\\\\\\\${2:1}\\\\\\\\${3:1}\\end{pmatrix}",
        "description": "c3vector"
    },
    "c4vector": {
        "prefix": "\\\\c4vector",
        "body": "\\begin{pmatrix}${1:1}\\\\\\\\${2:1}\\\\\\\\${3:1}\\\\\\\\${4:1}\\end{pmatrix}",
        "description": "c4vector"
    },
    "c5vector": {
        "prefix": "\\\\c5vector",
        "body": "\\begin{pmatrix}${1:1}\\\\\\\\${2:1}\\\\\\\\${3:1}\\\\\\\\${4:1}\\\\\\\\${5:1}\\end{pmatrix}",
        "description": "c5vector"
    },
    "r2vector": {
        "prefix": "\\\\r2vector",
        "body": "\\begin{pmatrix}${1:1}&${2:1}\\end{pmatrix}",
        "description": "r2vector"
    },
    "r3vector": {
        "prefix": "\\\\r3vector",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}\\end{pmatrix}",
        "description": "r3vector"
    },
    "r4vector": {
        "prefix": "\\\\r4vector",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\end{pmatrix}",
        "description": "r4vector"
    },
    "r5vector": {
        "prefix": "\\\\r5vector",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}&${4:1}&${5:1}\\end{pmatrix}",
        "description": "r5vector"
    },
    "b22matrix": {
        "prefix": "\\\\b22matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\end{bmatrix}",
        "description": "b22matrix"
    },
    "b23matrix": {
        "prefix": "\\\\b23matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\end{bmatrix}",
        "description": "b23matrix"
    },
    "b32matrix": {
        "prefix": "\\\\b32matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\end{bmatrix}",
        "description": "b32matrix"
    },
    "b33matrix": {
        "prefix": "\\\\b33matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\end{bmatrix}",
        "description": "b33matrix"
    },
    "b42matrix": {
        "prefix": "\\\\b42matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\end{bmatrix}",
        "description": "b42matrix"
    },
    "b43matrix": {
        "prefix": "\\\\b43matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\end{bmatrix}",
        "description": "b43matrix"
    },
    "b44matrix": {
        "prefix": "\\\\b44matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\\\\\\\${13:1}&${14:1}&${15:1}&${16:1}\\end{bmatrix}",
        "description": "b44matrix"
    },
    "b24matrix": {
        "prefix": "\\\\b24matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}\\end{bmatrix}",
        "description": "b24matrix"
    },
    "b34matrix": {
        "prefix": "\\\\b34matrix",
        "body": "\\begin{bmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\\\\\\\${10:1}&${11:1}&${12:1}\\end{bmatrix}",
        "description": "b34matrix"
    },
    "v22matrix": {
        "prefix": "\\\\v22matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\end{vmatrix}",
        "description": "v22matrix"
    },
    "v23matrix": {
        "prefix": "\\\\v23matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\end{vmatrix}",
        "description": "v23matrix"
    },
    "v32matrix": {
        "prefix": "\\\\v32matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\end{vmatrix}",
        "description": "v32matrix"
    },
    "v33matrix": {
        "prefix": "\\\\v33matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\end{vmatrix}",
        "description": "v33matrix"
    },
    "v42matrix": {
        "prefix": "\\\\v42matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\end{vmatrix}",
        "description": "v42matrix"
    },
    "v43matrix": {
        "prefix": "\\\\v43matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\end{vmatrix}",
        "description": "v43matrix"
    },
    "v44matrix": {
        "prefix": "\\\\v44matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\\\\\\\${13:1}&${14:1}&${15:1}&${16:1}\\end{vmatrix}",
        "description": "v44matrix"
    },
    "v24matrix": {
        "prefix": "\\\\v24matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}\\end{vmatrix}",
        "description": "v24matrix"
    },
    "v34matrix": {
        "prefix": "\\\\v34matrix",
        "body": "\\begin{vmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\\\\\\\${10:1}&${11:1}&${12:1}\\end{vmatrix}",
        "description": "v34matrix"
    },
    "p22matrix": {
        "prefix": "\\\\p22matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\end{pmatrix}",
        "description": "p22matrix"
    },
    "p23matrix": {
        "prefix": "\\\\p23matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\end{pmatrix}",
        "description": "p23matrix"
    },
    "p32matrix": {
        "prefix": "\\\\p32matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\end{pmatrix}",
        "description": "p32matrix"
    },
    "p33matrix": {
        "prefix": "\\\\p33matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\end{pmatrix}",
        "description": "p33matrix"
    },
    "p42matrix": {
        "prefix": "\\\\p42matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\end{pmatrix}",
        "description": "p42matrix"
    },
    "p43matrix": {
        "prefix": "\\\\p43matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\end{pmatrix}",
        "description": "p43matrix"
    },
    "p44matrix": {
        "prefix": "\\\\p44matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}&${7:1}&${8:1}\\\\\\\\${9:1}&${10:1}&${11:1}&${12:1}\\\\\\\\${13:1}&${14:1}&${15:1}&${16:1}\\end{pmatrix}",
        "description": "p44matrix"
    },
    "p24matrix": {
        "prefix": "\\\\p24matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}\\\\\\\\${3:1}&${4:1}\\\\\\\\${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}\\end{pmatrix}",
        "description": "p24matrix"
    },
    "p34matrix": {
        "prefix": "\\\\p34matrix",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&${3:1}\\\\\\\\${4:1}&${5:1}&${6:1}\\\\\\\\${7:1}&${8:1}&${9:1}\\\\\\\\${10:1}&${11:1}&${12:1}\\end{pmatrix}",
        "description": "p34matrix"
    },
    "frac": {
        "prefix": "\\\\frac",
        "body": "\\frac{${1:${TM_SELECTED_TEXT}}}{$2}",
        "description": "frac"
    },
    "sqrt": {
        "prefix": "\\\\sqrt",
        "body": "\\sqrt{${1:${TM_SELECTED_TEXT}}}",
        "description": "sqrt"
    },
    "sqrt3": {
        "prefix": "\\\\sqrt3",
        "body": "\\sqrt[3]{${1:${TM_SELECTED_TEXT}}}",
        "description": "sqrt"
    },
    "sqrtn": {
        "prefix": "\\\\sqrtn",
        "body": "\\sqrt[${2:n}]{${1:${TM_SELECTED_TEXT}}}",
        "description": "sqrt"
    },
    "pi2": {
        "prefix": "\\\\pi2",
        "body": "\\frac{\\pi}{2}",
        "description": "pi2"
    },
    "pi3": {
        "prefix": "\\\\pi3",
        "body": "\\frac{\\pi}{3}",
        "description": "pi3"
    },
    "pi4": {
        "prefix": "\\\\pi4",
        "body": "\\frac{\\pi}{4}",
        "description": "pi4"
    },
    "pi6": {
        "prefix": "\\\\pi6",
        "body": "\\frac{\\pi}{6}",
        "description": "pi6"
    },
    "-1": {
        "prefix": "\\\\-1",
        "body": "^{-1}",
        "description": "-1"
    },
    "N": {
        "prefix": "\\\\N",
        "body": "\\mathbb{N}",
        "description": "N"
    },
    "R": {
        "prefix": "\\\\R",
        "body": "\\mathbb{R}",
        "description": "R"
    },
    "Q": {
        "prefix": "\\\\Q",
        "body": "\\mathbb{Q}",
        "description": "Q"
    },
    "Z": {
        "prefix": "\\\\Z",
        "body": "\\mathbb{Z}",
        "description": "Z"
    },
    "C": {
        "prefix": "\\\\C",
        "body": "\\mathbb{C}",
        "description": "C"
    },
    "omission": {
        "prefix": "\\\\omission",
        "body": "\\begin{pmatrix}${1:1}&${2:1}&\\cdots&${4:1}\\\\\\\\${5:1}&${6:1}&\\cdots&${8:1}\\\\\\\\\\vdots&\\vdots&\\ddots&\\vdots\\\\\\\\${13:1}&${14:1}&\\cdots&${16:1}\\end{pmatrix}",
        "description": "p44matrix"
    },
    "xrightarrow": {
        "prefix": "\\\\xrightarrow",
        "body": "\\\\xrightarrow{${1}}",
        "description": "xrightarrow"
    },
    "bsa": {
        "prefix": "\\\\bsa",
        "body": "\\boldsymbol{a}",
        "description": "bsa"
    },
    "bsA": {
        "prefix": "\\\\bsA",
        "body": "\\boldsymbol{A}",
        "description": "bsA"
    },
    "bsb": {
        "prefix": "\\\\bsb",
        "body": "\\boldsymbol{b}",
        "description": "bsb"
    },
    "bsB": {
        "prefix": "\\\\bsB",
        "body": "\\boldsymbol{B}",
        "description": "bsB"
    },
    "bsc": {
        "prefix": "\\\\bsc",
        "body": "\\boldsymbol{c}",
        "description": "bsc"
    },
    "bsC": {
        "prefix": "\\\\bsC",
        "body": "\\boldsymbol{C}",
        "description": "bsC"
    },
    "bsd": {
        "prefix": "\\\\bsd",
        "body": "\\boldsymbol{d}",
        "description": "bsd"
    },
    "bsD": {
        "prefix": "\\\\bsD",
        "body": "\\boldsymbol{D}",
        "description": "bsD"
    },
    "bse": {
        "prefix": "\\\\bse",
        "body": "\\boldsymbol{e}",
        "description": "bse"
    },
    "bsE": {
        "prefix": "\\\\bsE",
        "body": "\\boldsymbol{E}",
        "description": "bsE"
    },
    "bsf": {
        "prefix": "\\\\bsf",
        "body": "\\boldsymbol{f}",
        "description": "bsf"
    },
    "bsF": {
        "prefix": "\\\\bsF",
        "body": "\\boldsymbol{F}",
        "description": "bsF"
    },
    "bsg": {
        "prefix": "\\\\bsg",
        "body": "\\boldsymbol{g}",
        "description": "bsg"
    },
    "bsG": {
        "prefix": "\\\\bsG",
        "body": "\\boldsymbol{G}",
        "description": "bsG"
    },
    "bsi": {
        "prefix": "\\\\bsi",
        "body": "\\boldsymbol{i}",
        "description": "bsi"
    },
    "bsI": {
        "prefix": "\\\\bsI",
        "body": "\\boldsymbol{I}",
        "description": "bsI"
    },
    "bsj": {
        "prefix": "\\\\bsj",
        "body": "\\boldsymbol{j}",
        "description": "bsj"
    },
    "bsJ": {
        "prefix": "\\\\bsJ",
        "body": "\\boldsymbol{J}",
        "description": "bsJ"
    },
    "bsk": {
        "prefix": "\\\\bsk",
        "body": "\\boldsymbol{k}",
        "description": "bsk"
    },
    "bsK": {
        "prefix": "\\\\bsK",
        "body": "\\boldsymbol{K}",
        "description": "bsK"
    },
    "bsl": {
        "prefix": "\\\\bsl",
        "body": "\\boldsymbol{l}",
        "description": "bsl"
    },
    "bsL": {
        "prefix": "\\\\bsL",
        "body": "\\boldsymbol{L}",
        "description": "bsL"
    },
    "bsr": {
        "prefix": "\\\\bsr",
        "body": "\\boldsymbol{r}",
        "description": "bsr"
    },
    "bsR": {
        "prefix": "\\\\bsR",
        "body": "\\boldsymbol{R}",
        "description": "bsR"
    },
    "bsv": {
        "prefix": "\\\\bsv",
        "body": "\\boldsymbol{v}",
        "description": "bsv"
    },
    "bsV": {
        "prefix": "\\\\bsV",
        "body": "\\boldsymbol{V}",
        "description": "bsV"
    },
    "bsu": {
        "prefix": "\\\\bsu",
        "body": "\\boldsymbol{u}",
        "description": "bsu"
    },
    "bsU": {
        "prefix": "\\\\bsU",
        "body": "\\boldsymbol{U}",
        "description": "bsU"
    },
    "bsx": {
        "prefix": "\\\\bsx",
        "body": "\\boldsymbol{x}",
        "description": "bsx"
    },
    "bsX": {
        "prefix": "\\\\bsX",
        "body": "\\boldsymbol{X}",
        "description": "bsX"
    },
    "bsy": {
        "prefix": "\\\\bsy",
        "body": "\\boldsymbol{y}",
        "description": "bsy"
    },
    "bsY": {
        "prefix": "\\\\bsY",
        "body": "\\boldsymbol{Y}",
        "description": "bsY"
    },
    "bsz": {
        "prefix": "\\\\bsz",
        "body": "\\boldsymbol{z}",
        "description": "bsz"
    },
    "bsZ": {
        "prefix": "\\\\bsZ",
        "body": "\\boldsymbol{Z}",
        "description": "bsZ"
    },
    "bsomega": {
        "prefix": "\\\\bsomega",
        "body": "\\boldsymbol{\\omega}",
        "description": "bsi"
    },
    "bsrho": {
        "prefix": "\\\\bsrho",
        "body": "\\boldsymbol{\\rho}",
        "description": "bsrho"
    },
    "bsphi": {
        "prefix": "\\\\bsphi",
        "body": "\\boldsymbol{\\varphi}",
        "description": "bsphi"
    },
    "ditaa": {
		"prefix": "\\\\ditaa",
		"body": [
			"```ditaa {cmd=true args=[\"-E\"] hide=true}",
			"${1}",
			"```"
		],
		"description": "ditaa"
	},
	"text": {
		"prefix": "\\\\text",
		"body": [
			"\\text{${1}}"
		],
		"description": "text"
	},
	"dd": {
		"prefix": "\\\\dd",
		"body": [
			"\\frac{{\\rm d}}{{\\rm d}${1}}"
		],
		"description": "text"
	},
	"ddt": {
		"prefix": "\\\\ddt",
		"body": [
			"\\frac{{\\rm d}}{{\\rm d}t}"
		],
		"description": "text"
	},
	"phi": {
		"prefix": "\\\\phi",
		"body": [
			"\\varphi"
		],
		"description": "phi"
	},
	"ms": {
		"prefix": "\\\\ms",
		"body": [
			" \\ \\text{${1:m}}/\\text{${2:s}}"
		],
		"description": "m per s"
	},
    "pd": {
		"prefix": "\\\\pd",
		"body": [
            "\\overset{\\cdot}{${1:x}}"
		],
		"description": "pd"
	},
	"pdd": {
		"prefix": "\\\\pdd",
		"body": [
			"\\overset{\\cdot\\cdot}{${1:x}}"
		],
		"description": "pdd"
	},
	"partial": {
		"prefix": "\\\\partial",
		"body": [
			"\\frac{\\partial ${1}}{\\partial ${2}}"
		],
		"description": "partial"
	},
	"parx": {
		"prefix": "\\\\parx",
		"body": [
			"\\frac{\\partial ${1}}{\\partial x}"
		],
		"description": "parx"
	},
	"pary": {
		"prefix": "\\\\pary",
		"body": [
			"\\frac{\\partial ${1}}{\\partial y}"
		],
		"description": "pary"
	},
	"parz": {
		"prefix": "\\\\parz",
		"body": [
			"\\frac{\\partial ${1}}{\\partial z}"
		],
		"description": "parz"
	}
}
```

# How to use it

Similarly to `Shift + Alt + ↑↓`, you can press `Shift + Alt + ← →` to copy what you select to left or right.

Similarly to `Alt + ↑↓`, you can press `Alt + ← →` to move what you select to left or right.

You can also press `Ctrl + Alt + U` to single the selections.

There are many snippets in the extension and you can input `\\` and get the auto-complete function.

**You can press `Shift + Ctrl + Alt + D` to define the selection.**

**You can press `Shift + Ctrl + Alt + E` to calculate the selection.**

**You can press `Shift + Ctrl + Alt + R` to replace the selection.**

# Install

Search `Orangex4` in vscode extensions market and install the one called "Better Markdown&Latex Shortcuts".

![img](https://s3.ax1x.com/2020/12/02/DIW5mF.png)

# Display

## Calculator

![Calculator](https://ae01.alicdn.com/kf/U775488c7dd0a4fa682ffed6b36ef12ab1.jpg)

## Copy

![copy](https://ae01.alicdn.com/kf/U03ce2e8b468c49d4b80f5399c2290ff72.jpg)

## Multicopy

![multicopy](https://ae01.alicdn.com/kf/U8e2d3c2e81264cb4a52d9dd2bab65eb0z.jpg)

## Move

![move](https://ae01.alicdn.com/kf/Ud043e489d79745469b7cca5bf59a45d63.jpg)

## Single Selections

![single](https://ae01.alicdn.com/kf/U9d8f4514fcbc4aa585e4ec98d177b8fb4.jpg)

# Snippets

|Snippet|Name|Code|
|---|---|---|
|\\\\|\\\\|\\\\|
|\\\\\$|single line|\$\\displaystyle \$|
|\\\\\$|multiline|\$\$<br />...<br />\$\$|
|\\\\-|subscript|_{ }|
|\\\\6|superscript|^{ }|
|\\\\...|prefix|\\cdots|
|\\\\.|cdot|\\cdot|
|\\\\d|partial sign 'd'|{\\rm d}|
|\\\\dx|partial sign 'dx'|{\\rm d}x|
|\\\\dy|partial sign 'dy'|{\\rm d}y|
|\\\\set|set bracket|\\{ \\}|
|\\\\angle|angle bracket|\\langle \\rangle|
|\\\\comma|alpha with comma|\\alpha_1,\\alpha_2,\\cdots,\\alpha_n|
|\\\\plus|alpha with plus|\\alpha_1+\\alpha_2+\\cdots+\\alpha_n|
|\\\\multiply|alpha with multiply|\\alpha_1\\times \\alpha_2\\times \\cdots\\times \\alpha_n|
|\\\\dotmultiply|alpha with dot multiply|\\alpha_1\\cdot \\alpha_2\\cdots \\alpha_n|
|\\\\mline|A line of matrix|\\alpha &\\beta &\\cdots &\\lambda \\\\|
|\\\\smline|A line of matrix with subscript|\\alpha_1 &\\alpha_2 &\\cdots &\\alpha_n \\\\|
|\\\\vdots|A line of vdots|\\vdots &\\vdots & &\\vdots \\\\|
|\\\\aligned|A scope of aligned|\$\$<br />\\begin{aligned} <br />...<br />\\end{aligned}<br />\$\$|
|\\\\matrix|A scope of matrix|\$\$<br />\\begin{matrix} <br />...<br />\\end{matrix}<br />\$\$|
|\\\\bmatrix|A scope of bmatrix|\\begin{bmatrix} <br />...<br />\\end{bmatrix}|
|\\\\vmatrix|A scope of vmatrix|\\begin{vmatrix} <br />...<br />\\end{vmatrix}|
|\\\\pmatrix|A scope of pmatrix|\\begin{pmatrix} <br />...<br />\\end{pmatrix}|
|\\\\equations|Equations|...|
|\\\\zeroequations|Zero equations|...|

# Display

![](https://ae01.alicdn.com/kf/U649466346e7a45368747001600b89921s.jpg)

![](https://s3.ax1x.com/2020/12/03/D7Btm9.gif)

![](https://s3.ax1x.com/2020/12/03/D7BNwR.gif)

![](https://s3.ax1x.com/2020/12/03/D7BJOJ.gif)

# Display (Source)

## Calculator

![Calculator](images/calculator.gif)

## Copy

![copy](images/copy.gif)

## Multicopy

![multicopy](images/multicopy.gif)

## Move

![move](images/move.gif)

## Single Selections

![single](images/single.gif)

## Snippets

![](images/plus.gif)

![](images/matrix.gif)

![](images/equations.gif)