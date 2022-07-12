import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDombaZ9iIZv8yrvNNGfI1dxb7klGHmMIY',
    authDomain: 'fir-v9-6a418.firebaseapp.com',
    projectId: 'fir-v9-6a418',
    storageBucket: 'fir-v9-6a418.appspot.com',
    messagingSenderId: '734596388116',
    appId: '1:734596388116:web:8116e8ca706bf7cff55e01',
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection reference
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef).then((snapshot) => {
    // console.log(snapshot.docs)
    const books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})
