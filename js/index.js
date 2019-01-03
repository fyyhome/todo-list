const DATEBASE_NAME = 'todo'
let DATABASE_VERSION = 1
let myDB;
const list_table = [
  {
    indexname: 'todo_id',
    propname: 'todo_id',
    unique: true
  },
  {
    indexname: 'todo_status',
    propname: 'todo_status',
    unique: false
  },
  {
    indexname: 'todo_start',
    propname: 'todo_start',
    unique: false
  },
  {
    indexname: 'todo_end',
    propname: 'todo_end',
    unique: false
  },
  {
    indexname: 'todo_context',
    propname: 'todo_context',
    unique: false
  },
  {
    indexname: 'todo_setup',
    propname: 'todo_setup',
    unique: false
  }
]


function initWebList() {
  return new Promise((resolve, reject) => {
    getVersion(DATEBASE_NAME).then((res) => {
      if (res > 0) {
        DATABASE_VERSION = res;
        includeObjectStore(DATEBASE_NAME, 'list').then((res1) => {
          if (!res1) {
            DATABASE_VERSION += 1;
          }
          console.log(DATABASE_VERSION);
          createDB(DATEBASE_NAME, DATABASE_VERSION, 'list', 'todo_id', list_table).then((res2) => {
            if (res2) {
              myDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
              myDB.init().then((res3) => {
                if (res3) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              })
            }
          })
        })
      }
    })
  })
}