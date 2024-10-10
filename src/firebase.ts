import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDzrSWs8TOa2yQA99z3p_6_W8SJ2SZiOYQ',
  authDomain: 'server-driven-ui-36c75.firebaseapp.com',
  databaseURL: 'https://server-driven-ui-36c75-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'server-driven-ui-36c75',
  storageBucket: 'server-driven-ui-36c75.appspot.com',
  messagingSenderId: '573268430782',
  appId: '1:573268430782:web:a57e96279546c157a3f3ef',
  measurementId: 'G-B825SSMLXP'
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)
const storage = getStorage(firebaseApp)

export { database, storage }
