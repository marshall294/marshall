        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFsHg9fK6IDnHbuxmBleEfIIfVGsuLDik",
  authDomain: "profile-b825d.firebaseapp.com",
  projectId: "profile-b825d",
  storageBucket: "profile-b825d.firebasestorage.app",
  messagingSenderId: "925276859161",
  appId: "1:925276859161:web:194c60f6dbd9f1ef8bf388"
};

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Wait until DOM is fully loaded before executing the code
        document.addEventListener('DOMContentLoaded', () => {
            const playerForm = document.getElementById('playerForm');
            const playersGrid = document.getElementById('playersGrid');

            // Handle form submission
            playerForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const fullName = document.getElementById('fullName').value;
                const nickname = document.getElementById('nickname').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const dob = document.getElementById('dob').value;
                const position = document.getElementById('position').value;
                const height = document.getElementById('height').value;
                const country = document.getElementById('country').value;
                const state = document.getElementById('state').value;
                const lga = document.getElementById('lga').value;
                const formerClub = document.getElementById('formerClub').value;
                const presentClub = document.getElementById('presentClub').value;

                const playerData = {
                    fullName,
                    nickname,
                    phone,
                    email,
                    address,
                    dob,
                    position,
                    height,
                    country,
                    state,
                    lga,
                    formerClub,
                    presentClub
                };

                try {
                    // Check if a player with the same name and email already exists
                    const playersRef = collection(db, "players");
                    const q = query(playersRef, where("fullName", "==", fullName), where("email", "==", email));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        alert("Player profile already submitted, if not correct contact Marshall Jacob on Whatsapp (+2348102341648).");
                        return; // Stop further form submission
                    }

                    // Get the total number of players to assign a correct image and card number
                    const totalPlayersSnapshot = await getDocs(playersRef);
                    const totalPlayers = totalPlayersSnapshot.size;

                    // Assign image based on total players count (player1.png, player2.png, etc.)
                    const playerImage = `player${totalPlayers + 1}.png`;

                    // Add player data with the image path and card number to Firestore
                    const docRef = await addDoc(playersRef, {
                        ...playerData,
                        playerImage,  // Add the image to the player data
                        cardNumber: totalPlayers + 1 // Add the card number to the player data
                    });

                    alert('Player registered successfully!');
                    playerForm.reset();
                    loadPlayers();
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            });

            // Load players from Firestore and display them
            const loadPlayers = async () => {
                const querySnapshot = await getDocs(collection(db, "players"));
                playersGrid.innerHTML = ''; // Clear the grid before displaying new players

                querySnapshot.forEach(doc => {
                    const player = doc.data();
                    const playerCard = document.createElement('div');
                    playerCard.classList.add('player-card');

                    // Use the player image stored in Firestore
                    const playerImage = player.playerImage;
                    const cardNumber = player.cardNumber; // Use the card number from Firestore

                    playerCard.innerHTML = `
                        <img src="${playerImage}" alt="Player Image">
                        <h3>${player.fullName} (${player.nickname})</h3>
                        <table>
                            <tr><th>Position</th><td>${player.position}</td></tr>
                            <tr><th>Phone</th><td>${player.phone}</td></tr>
                            <tr><th>Email</th><td>${player.email}</td></tr>
                            <tr><th>Address</th><td>${player.address}</td></tr>
                            <tr><th>DOB</th><td>${player.dob}</td></tr>
                            <tr><th>Height</th><td>${player.height} cm</td></tr>
                            <tr><th>Country</th><td>${player.country}</td></tr>
                            <tr><th>State of Origin</th><td>${player.state}</td></tr>
                            <tr><th>LGA</th><td>${player.lga}</td></tr>
                            <tr><th>Former Club</th><td>${player.formerClub}</td></tr>
                            <tr><th>Present Club</th><td>${player.presentClub}</td></tr>
                        </table>
                    `;

                    playersGrid.appendChild(playerCard);
                });
            };

            // Initial load of players
            loadPlayers();
        });