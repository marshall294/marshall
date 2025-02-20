const db = firebase.database();

function addSchool() {
    const schoolName = document.getElementById("newSchool").value;
    if (schoolName) {
        const newSchoolRef = db.ref('schools').push();
        newSchoolRef.set({ name: schoolName });
        document.getElementById("newSchool").value = ''; // Clear input
        alert("School added!");
    } else {
        alert("Please enter a school name.");
    }
}

function addStudent() {
    const studentName = document.getElementById("newStudent").value;
    if (studentName) {
        const newStudentRef = db.ref('students').push();
        newStudentRef.set({ name: studentName });
        document.getElementById("newStudent").value = ''; // Clear input
        alert("Student added!");
    } else {
        alert("Please enter a student name.");
    }
}

function displayCurrentData() {
    const schoolList = document.getElementById("schoolList");
    const studentList = document.getElementById("studentList");

    db.ref('schools').on('value', snapshot => {
        schoolList.innerHTML = ''; // Clear existing list
        snapshot.forEach(childSnapshot => {
            const li = document.createElement("li");
            li.textContent = childSnapshot.val().name;
            schoolList.appendChild(li);
        });
    });

    db.ref('students').on('value', snapshot => {
        studentList.innerHTML = ''; // Clear existing list
        snapshot.forEach(childSnapshot => {
            const li = document.createElement("li");
            li.textContent = childSnapshot.val().name;
            studentList.appendChild(li);
        });
    });
}

window.onload = displayCurrentData;
