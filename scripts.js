// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKO-II4w5VACzt2TcS8wsyLDmfShTosWg",
  authDomain: "thierryservice-7f21e.firebaseapp.com",
  projectId: "thierryservice-7f21e",
  storageBucket: "thierryservice-7f21e.appspot.com",
  messagingSenderId: "293564910548",
  appId: "1:293564910548:web:0edb81d5da7d210482e441",
  measurementId: "G-8R981X99HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Reference to the queue collection
const queueRef = collection(db, "queue");

// Function to display queue items
async function displayQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = ''; // Clear the list
    const snapshot = await getDocs(queueRef);
    snapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.data().name;
        queueList.appendChild(li);
    });
}

// Add item to the queue
document.getElementById('addQueueForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const queueItem = document.getElementById('queueItem').value;
    try {
        await addDoc(queueRef, { name: queueItem });
        displayQueue(); // Refresh the displayed queue
        document.getElementById('addQueueForm').reset(); // Reset form
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Initial display of queue items
displayQueue();
