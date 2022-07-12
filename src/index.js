import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth()

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

// grab a single document
const docRef = doc(db, 'books', 'CyvE8b1G35EDYo9STO35')

// getDoc(docRef).then((doc) => {
//     console.log(doc.data(), doc.id)
// })

// subscribing a particular document
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// update properties on a single document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', updateForm.id.value)
    updateDoc(docRef, {
        title: 'updated title',
    }).then(() => {
        updateForm.reset()
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user created: ', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginButton = document.querySelector('.login')
loginButton.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    signInWithEmailAndPassword(auth, email, password).then((cred) => {
        // console.log('user logged in: ', cred.user)
    }).catch((err) => {
        console.log(err.message)
    })
})

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log('the user logged out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user)
})

// unsubscirbing from changes