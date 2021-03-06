let defaultPrefix = 'test_'

export default {
  dateFormat (date, format = 'yyyy-MM-dd hh:mm:ss') {
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
  },
  parseDateFormat (longtime, type) { // 格式化Date.parse的时间类型
    let d = new Date(longtime)
    let month = d.getMonth() + 1
    let day = d.getDate()
    let hour = d.getHours()
    let min = d.getMinutes()
    let sec = d.getSeconds()
    hour = (hour > 9 ? hour : '0' + hour)
    min = (min > 9 ? min : '0' + min)
    sec = (sec < 10 ? '0' + sec : sec)
    let str = d.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
    return type == 'long' ? (str + ' ' + hour + ':' + min + ':' + sec) : str
  },
  stringToDate (str) { // 字符串YYYY-MM-DD hh:mm:ss 转日期Date类型
    if (!str) return
    let tArr = str.split(' ')
    let dateArr = tArr[0].split('-')
    let timeArr
    let date = new Date()
    if (dateArr.length == 3) {
        date.setFullYear(dateArr[0] - 0, dateArr[1] - 1, dateArr[2] - 0)
    }
    if (tArr[1]) {
        timeArr = tArr[1].split(':')
        if (timeArr[0]) {
            date.setHours(timeArr[0] - 0)
        }
        if (timeArr[1]) {
            date.setMinutes(timeArr[1] - 0)
        }
        if (timeArr[2]) {
            date.setSeconds(timeArr[2] - 0)
        }
    }
    return date
  }
}