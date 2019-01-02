const DATEBASE_NAME = 'todo'
const DATABASE_VERSION = 2
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


function initWeb() {
  return new Promise((resolve, reject) => {
    createDB(DATEBASE_NAME, DATABASE_VERSION, 'text', 'text_id', list_table).then((res) => {
      if (res) {
        textDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
        textDB.init().then((myres) => {
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

// function initWeb() {
//   return new Promise((resolve, reject) => {
//     connectDB(DATEBASE_NAME, DATABASE_VERSION).then((res) => {
//       if (res) {
//         createTable(res, 'text', 'text_id', list_table).then((myres) => {
//           console.log('here')
//           if (myres) {
//             textDB = new openDB(DATEBASE_NAME, DATABASE_VERSION);
//             textDB.init().then((myres1) => {
//               if (myres1) {
//                 resolve(true);
//               } else {
//                 resolve(false);
//               }
//             })
//           } else {
//             resolve(false);
//           }
//         })
//       } else {
//         resolve(false);
//       }
//     })
//   })
// }