export function timeFormat(timestamp) {
    if (!timestamp) {
        return null;
    }

    // 转换时间戳为毫秒并生成日期对象
    const date = new Date(timestamp * 1000);

    // 获取年份
    const y = date.getFullYear();

    // 获取月份并补齐两位
    const m = String(date.getMonth() + 1).padStart(2, '0');

    // 获取日期并补齐两位
    const d = String(date.getDate()).padStart(2, '0');

    // 获取小时并补齐两位
    const h = String(date.getHours()).padStart(2, '0');

    // 获取分钟并补齐两位
    const mm = String(date.getMinutes()).padStart(2, '0');

    // 获取秒数并补齐两位
    const s = String(date.getSeconds()).padStart(2, '0');

    // 拼接成格式化的时间字符串
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}


export function addressFormat(str) {
    let arr = []
    arr = str.split('')
    let arrTarget = []
    arr.map((item, index) => {
        if (index <= 1 || index > 25) {
            arrTarget.push(item)
        }
    })
    return arrTarget.join('')
}

export function addressFilter(value) {
    if (value === undefined) return
    let arr = value.split('')
    let targetStr
    let targetArr = []
    arr.map((item, index) => {
        if (index <= 6 || index >= arr.length - 7) {
            targetArr.push(item)
        }
    })
    targetArr.splice(7, 0, '...')
    targetStr = targetArr.join('')
    return targetStr
}

export function amountFormat(str) {
    let num = Number(str);// string => number
    let result = num.toFixed(4);// number => string.toFixed(4)
    return result
}

export function numberFormat(number) {
    number = '' + number
    let int = number
    int = int.split('').reverse().join('')
    let temp = ''
    for (let i = 0; i < int.length; i++) {
        temp += int[i]
        if ((i + 1) % 3 === 0 && i !== int.length - 1) {
            temp += ','
        }
    }
    temp = temp.split('').reverse().join('')
    return temp
}