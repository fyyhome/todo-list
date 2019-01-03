const DATEBASE_NAME = 'todo'
let DATABASE_VERSION = 2
let textDB;
const list_table = [
  {
    indexname: 'text_id',
    propname: 'text_id',
    unique: true
  },
  {
    indexname: 'text_status',
    propname: 'text_status',
    unique: false
  },
  {
    indexname: 'text_context',
    propname: 'text_context',
    unique: false
  },
  {
    indexname: 'text_setup',
    propname: 'text_setup',
    unique: false
  }
]


// function initWeb() {
//   return new Promise((resolve, reject) => {
//     createDB(DATEBASE_NAME, DATABASE_VERSION, 'text', 'text_id', list_table).then((res) => {
//       if (res) {
//         textDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
//         textDB.init().then((myres) => {
//           if (myres) {
//             resolve(true);
//           } else {
//             resolve(false);
//           }
//         })
//       }
//     })
//   })
// }

function initWeb() {
  return new Promise((resolve, reject) => {
    getVersion(DATEBASE_NAME).then((res) => {
      if (res > 0) {
        DATABASE_VERSION = res;
        includeObjectStore(DATEBASE_NAME, 'text').then((res1) => {
          if (!res1) {
            DATABASE_VERSION += 1;
          }
          createDB(DATEBASE_NAME, DATABASE_VERSION, 'text', 'text_id', list_table).then((res2) => {
            if (res2) {
              textDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
              textDB.init().then((res3) => {
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