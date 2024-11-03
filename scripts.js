// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Elements
const loginSection = document.getElementById('login-section');
const loginToggle = document.getElementById('login-toggle');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const queueList = document.getElementById('queue-list');

// Toggle Login Section
loginToggle.addEventListener('click', () => {
    loginSection.style.display = loginSection.style.display === 'none' ? 'block' : 'none';
});

// Admin Login
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "Laurent" && password === "Thierry1234") {
        alert("Logged in successfully!");
        loginSection.style.display = 'none';
        logoutButton.style.display = 'block';
        loadQueue();
    } else {
        alert("Incorrect username or password.");
    }
});

// Admin Logout
logoutButton.addEventListener('click', () => {
    alert("Logged out.");
    logoutButton.style.display = 'none';
    queueList.innerHTML = ""; // Clear queue on logout
});

// Load Queue from Firestore
function loadQueue() {
    db.collection("queue").orderBy("timestamp", "asc").get()
        .then((snapshot) => {
            queueList.innerHTML = ""; // Clear current list
            snapshot.forEach((doc) => {
                const data = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = `${data.name} - ${data.status}`;
                queueList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error loading queue:", error);
        });
}

// Initial Queue Display for All Users
loadQueue();
