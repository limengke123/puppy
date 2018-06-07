const storage = 'moneyList'
const initial = []

class Storage {
  constructor (storageName = storage, initialValue = initial) {
    this.storageName = storageName
    this.init(initialValue)
  }
  init (initialValue) {
    if (!this.take(this.storageName)) {
      this.save(this.stringify(initialValue))
    }
  }
  getLists () {
    return this.parse(this.take(this.storageName))
  }
  /**
   * addItem
   * removeItem
   * 现在被废弃
   * 现在直接全部覆盖操作
   * */
  addItem (item) {
    const _before = this.getLists()
    _before.unshift(item)
    this.save(this.stringify(_before))
  }
  removeItem (index) {
    const _before = this.getLists()
    _before.splice(index, 1)
    this.save(this.stringify(_before))
  }
  /**
   * 新增全部覆盖操作api
   * saveAll
   * */
  saveAll (data) {
    this.save(this.stringify(data))
  }
  parse (string) {
    return JSON.parse(string)
  }
  stringify (obj) {
    return JSON.stringify(obj)
  }
  save (string) {
    localStorage.setItem(this.storageName, string)
  }
  take (string) {
    return localStorage.getItem(this.storageName)
  }
}

export default Storage
