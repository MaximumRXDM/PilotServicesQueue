let isLoggedIn = false;

document.getElementById('loginToggle').onclick = function () {
    const loginContainer = document.getElementById('loginContainer');
    loginContainer.classList.toggle('hidden');
};

document.getElementById('loginButton').onclick = function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Laurent' && password === 'Thierry1234') {
        isLoggedIn = true;
        alert('Login successful!');
        document.getElementById('logoutButton').classList.remove('hidden');
        document.getElementById('loginContainer').classList.add('hidden');
        loadQueue(); // Load queue after login
    } else {
        alert('Invalid username or password.');
    }
};

document.getElementById('logoutButton').onclick = function () {
    isLoggedIn = false;
    alert('Logged out successfully.');
    this.classList.add('hidden');
};

document.getElementById('addToQueueButton').onclick = function () {
    const customerName = document.getElementById('customerName').value;
    if (isLoggedIn && customerName) {
        db.collection('queue').add({ name: customerName }).then(() => {
            document.getElementById('customerName').value = ''; // Clear the input
            loadQueue(); // Reload the queue
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    } else if (!isLoggedIn) {
        alert('You must be logged in to add to the queue.');
    } else {
        alert('Please enter a customer name.');
    }
};

function loadQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = ''; // Clear the current list
    db.collection('queue').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const li = document.createElement('li');
            li.textContent = doc.data().name;
            queueList.appendChild(li);
        });
    });
}

// Load the initial queue on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQueue();
});
