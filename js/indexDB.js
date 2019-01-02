// 新建数据库
function createDB(name, version, tablename, key, indexarr) {
  return new Promise((resolve, reject) => {
    let openRequest = window.indexedDB.open(name, version);
    let db;
    openRequest.onupgradeneeded = (event) => {
      db = event.target.result;
      createTable(db, tablename, key, indexarr).then((res) => {
        if (res) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    }
    openRequest.onsuccess = (event) => {
      resolve(true);
    };
    openRequest.onerror = () => {
      resolve(false);
    }
  })
}


// 建表
function createTable(db, tablename, key, indexarr) {
  return new Promise((resolve, reject) => {
    let objectStore;
    if (db.objectStoreNames.contains(tablename)) {
      resolve(false);
    } else {
      if (key) {
        console.log(db)
        objectStore = db.createObjectStore(tablename, { keyPath: key, autoIncrement: true });
        for (let item of indexarr) {
          objectStore.createIndex(item.indexname, item.propname, { unique: item.unique });
        }
        resolve(true);
      } else {
        db.createObjectStore(tablename, { autoIncrement: true });
        for (let item of indexarr) {
          objectStore.createIndex(item.indexname, item.propname, { unique: item.unique });
        }
        resolve(true);
      }
    }
  })
}

// 打开数据库
function connectDB(name, version) {
  return new Promise((resolve, reject) => {
    let openRequest = window.indexedDB.open(name, version);
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    }
    openRequest.onerror = () => {
      resolve(false);
    }
  })
}

function openDB(name, version) {
  this.name = name;
  this.version = version;
  this.db = null;
}

openDB.prototype.init = function() {
  return new Promise((resolve, reject) => {
    let openRequest = window.indexedDB.open(this.name, this.version);
    openRequest.onupgradeneeded = (event) => {
      this.db = event.target.result;
    }
    openRequest.onsuccess = () => {
      this.db = openRequest.result;
      resolve(true);
    }
    openRequest.onerror = () => {
      resolve(false);
    }
  })
}

openDB.prototype.insert = function(tablename, value) {
  return new Promise((resolve, reject) => {
    let objectStore = this.db.transaction(tablename, 'readwrite')
      .objectStore(tablename);
    let request = objectStore.add(value);
    request.onsuccess = () => {
      resolve(true);
    }
    request.onerror = () => {
      resolve(false);
    }
  })
}

openDB.prototype.delete = function (tablename, index) {
  return new Promise((resolve, reject) => {
    let objectStore = this.db.transaction(tablename, 'readwrite')
      .objectStore(tablename);
    let request = objectStore.delete(index);
    request.onsuccess = () => {
      resolve(true);
    }
    request.onerror = () => {
      resolve(false);
    }
  })
}

// 如果主键是自动生成的，则无法用主键查询
openDB.prototype.select = function(tablename, key, type, value) {
  return new Promise((resolve, reject) => {
    let objectStore = this.db.transaction(tablename, 'readwrite')
      .objectStore(tablename);
    let openCursor = objectStore.openCursor();
    let rs = [];
    openCursor.onsuccess = (event) => {
      let cursor = event.target.result;
      switch(type) {
        case this.MORE:
          if (cursor) {
            if (cursor.value[key] > value) {
              rs.push(cursor.value)
            }
            cursor.continue();  /////////// 这tm是个坑， 这句代码会继续触发openCursor事件，也就类似goto
          } else {
            resolve(rs);
          }
          break;
        case this.EQUAL:
          if (cursor) {
            if (cursor.value[key] === value) {
              rs.push(cursor.value)
            }
            cursor.continue();
          } else {
            resolve(rs)
          }
          break;
        case this.LESS:
          if (cursor) {
            if (cursor.value[key] < value) {
              rs.push(cursor.value)
            }
            cursor.continue();
          } else {
            resolve(rs)
          }
          break;
        case this.MORE_EQUAL:
          if (cursor) {
            if (cursor.value[key] >= value) {
              rs.push(cursor.value)
            }
            cursor.continue();
          } else {
            resolve(rs)
          }
          break;
        case this.LESS_EQUAL:
          if (cursor) {
            if (cursor.value[key] <= value) {
              rs.push(cursor.value)
            }
            cursor.continue();
          } else {
            resolve(rs)
          }
          break;
        case this.NOT_EQUAL:
          if (cursor) {
            if (cursor.value[key] !== value) {
              rs.push(cursor.value)
            }
            cursor.continue();
          } else {
            resolve(rs)
          }
          break;
        default: 
          resolve(rs);
          break;
      }
    }
    openCursor.onerror = () => {
      console.log('select error')
      resolve([]);
    }
  })
}

// id 是主键的值
openDB.prototype.update = function(tablename, id, prop, val) {
  return new Promise((resolve, reject) => {
    let objectStore = this.db.transaction([tablename], 'readwrite')
      .objectStore(tablename);
    let getReq = objectStore.get(id);
    getReq.onsuccess = (event) => {
      let data = event.target.result;
      data[prop] = val;
      let request = objectStore.put(data);
      request.onsuccess = () => {
        resolve(true);
      }
      request.onerror = () => {
        resolve(false);
      }
    }
    getReq.onerror = () => {
      resolve(false)
    }
  })
}

openDB.prototype.MORE = '>';
openDB.prototype.EQUAL = '=';
openDB.prototype.LESS = '<';
openDB.prototype.MORE_EQUAL = '>=';
openDB.prototype.LESS_EQUAL = '<=';
openDB.prototype.NOT_EQUAL = '!=';
