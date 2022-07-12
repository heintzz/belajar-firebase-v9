import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, 
    orderBy, serverTimestamp
} from 'firebase/firestore'

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

// queries
// 2nd params -> where('author', '==', 'hasnan regard')
const q = query(colRef, orderBy('createdAt'))


// getDocs(colRef)
//     .then((snapshot) => {
// console.log(snapshot.docs)
//         const books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// real-time collection data
onSnapshot(q, (snapshot) => {
    const books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

//  adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // async
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        // special firestore timestamp
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset()
    })
})
