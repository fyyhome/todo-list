const DATEBASE_NAME = 'todo'
const DATABASE_VERSION = 2
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
    createDB(DATEBASE_NAME, DATABASE_VERSION, 'list', 'todo_id', list_table).then((res) => {
      if (res) {
        myDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
        myDB.init().then((myres) => {
          if (myres) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
      }
    })
  })
}