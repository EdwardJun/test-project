const DBName = 'spaDB' // 数据库名称
const DBVersion = 2 // 数据库版本

export default {
  db: null, // 数据库
  userId: '',
  sessionStoreName: 'session', // 仓库名称
  openDB (userId, category, callBack) {
    let that = this
    let request = indexedDB.open(DBName + '-' + category + userId, DBVersion)
    request.onsuccess = function (e) {
      console.log('success------------')
      that.db = e.target.result
      callBack && callBack()
    }
    request.onerror = function (e) {}
    request.onupgradeneeded = function (e) {
      console.log('onupgradeneeded------------')
      let db = that.db = e.target.result
      let sessionStoreName = that.sessionStoreName
      let objectStoreNames = db.objectStoreNames

      if (!objectStoreNames.contains(sessionStoreName)) {
        let store = db.createObjectStore(sessionStoreName, {keyPath: 'id', autoIncrement: false})
        store.createIndex('name', 'name', {unique: false})
        store.createIndex('index', 'id', {unique: true})
      }
    }
  },
  closeDB () {
    let that = this
    if (that.db) {
      that.db.close()
    }
  },
  saveSession (sessionList) {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    sessionList.map(session => {
      store.put(session)
    })
  },
  /**
   * 使用游标获取多条数据，并修改数据
   * @param {*} name 索引字段
   * @param {*} age 改变的值
   */
  updateSessionByName (name, age) {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    let index = store.index('name')
    // 第一个参数是搜索范围，第二个参数是搜索方向
    // 创建游标，并指定游标方向
    let req = index.openCursor(IDBKeyRange.only(name))
    let [cursor, record] = ['', []]
    req.onsuccess = function () {
      cursor = this.result
      if (cursor) {
        // console.log(cursor)
        record.push(cursor.value)
        cursor.continue()
      } else {
        record.map(item => {
          item.age = age
          store.put(item) // 更新记录
        })
      }
    }
  },
  // 通过存储空间的键找到对应的数据
  updateSessionById (sessionId, age) {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    let req = store.get(sessionId)
    req.onsuccess = function (e) {
      let user = this.result
      // console.log(user)
      if (user) {
        user.age = age
        store.put(user)
      }
    }
  },
  deleteDataById (sessionId) {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    store.delete(sessionId)
  },
  deleteDataByName (name) {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    let index = store.index('name')
    let req = index.openCursor(IDBKeyRange.only(name))
    let [cursor, record] = ['', []]
    req.onsuccess = function () {
      cursor = this.result
      if (cursor) {
        record.push(cursor.value)
        cursor.continue()
        // console.log(cursor)
      } else {
        // console.log(record)
        record.map(item => {
          store.delete(item.id)
        })
      }
    }
  },
  deleteIndexDB () {
    let that = this
    let storeName = that.sessionStoreName
    let transaction = that.db.transaction(storeName, 'readwrite')
    let store = transaction.objectStore(storeName)
    store.clear()
  }
}