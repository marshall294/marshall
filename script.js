// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function populateDropdowns() {
    const schoolSelect = document.getElementById("schoolSelect");
    const studentSelect = document.getElementById("studentSelect");

    db.ref('schools').on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const schoolName = childSnapshot.val().name;
            const option = document.createElement("option");
            option.value = `${childSnapshot.key}.html`;
            option.textContent = schoolName;
            schoolSelect.appendChild(option);
        });
    });

    db.ref('students').on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const studentName = childSnapshot.val().name;
            const option = document.createElement("option");
            option.value = `${childSnapshot.key}.html`;
            option.textContent = studentName;
            studentSelect.appendChild(option);
        });
    });
}

window.onload = populateDropdowns;

function redirectToSchool() {
    const schoolSelect = document.getElementById("schoolSelect");
    const selectedSchool = schoolSelect.value;
    if (selectedSchool) {
        window.location.href = selectedSchool;
    }
}

function redirectToStudent() {
    const studentSelect = document.getElementById("studentSelect");
    const selectedStudent = studentSelect.value;
    if (selectedStudent) {
        window.location.href = selectedStudent;
    }
}
