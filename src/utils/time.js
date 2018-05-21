
class Time {
  constructor (range) {
    this.range = range
  }
  getDateObj (time) {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      return time
    } else {
      return new Date(time)
    }
  }
  getRange () {
    /**
     * @param range 接受一个时间对象数组或是单个时间对象
     * @return 时间戳范围数组
     * */
    let timeArr
    if (Array.isArray(this.range)) {
      const [startDay, endDay] = this.range
      timeArr = [this.getSingleDayFirst(this.getDateObj(startDay)), this.getSingleDayLast(this.getDateObj(endDay))]
    } else {
      timeArr = [this.getSingleDayFirst(this.getDateObj(this.range)), this.getSingleDayLast(this.getDateObj(this.range))]
    }
    return timeArr
  }
  getSingleDayLast (date) {
    console.log(date)
    return new Date(date.setDate(date.getDate() + 1)).setHours(0, 0, 0, 0)
  }
  getSingleDayFirst (date) {
    return date.setHours(0, 0, 0, 0)
  }
}

export default Time
