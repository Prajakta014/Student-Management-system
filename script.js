// ✅ Cleaned & Corrected JavaScript for Student Management System

let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

window.onload = function() {
    // Redirect to register if not logged in
    if (window.location.pathname.includes("index.html") && localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "register.html";
    }

    // Load theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        const toggle = document.getElementById("darkToggle");
        if (toggle) toggle.checked = true;
    }

    // Render saved students
    renderTable();
};

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const age = document.getElementById("age").value.trim();
    const degree = document.getElementById("degree").value.trim();

    if (!name || !email || !grade || !age || !degree) {
        alert("Please fill all fields.");
        return;
    }

    if (editId === null) {
        const student = {
            id: students.length + 1,
            name,
            email,
            grade,
            age,
            degree,
        };
        students.push(student);
    } else {
        students[editId] = {
            id: students[editId].id,
            name,
            email,
            grade,
            age,
            degree,
        };
        editId = null;
        document.getElementById("submit").innerText = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));
    clearForm();
    renderTable();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("age").value = "";
    document.getElementById("degree").value = "";
}

function renderTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    students.forEach((student, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>
        <i class="fa-solid fa-pen" onclick="editStudent(${index})"></i>
        <i class="fa-solid fa-trash" onclick="deleteStudent(${index})"></i>
      </td>
    `;
        tbody.appendChild(tr);

        // Optional: row click to view profile
        tr.addEventListener("click", () => {
            localStorage.setItem("selectedStudent", JSON.stringify(student));
            window.location.href = "profile.html";
        });
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    students.forEach((s, i) => (s.id = i + 1)); // Reassign IDs
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("grade").value = student.grade;
    document.getElementById("age").value = student.age;
    document.getElementById("degree").value = student.degree;
    editId = index;
    document.getElementById("submit").innerText = "Update Student";
}

function search() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(keyword) ||
        s.email.toLowerCase().includes(keyword) ||
        s.degree.toLowerCase().includes(keyword)
    );

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    filtered.forEach((student, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>
        <i class="fa-solid fa-pen" onclick="editStudent(${students.indexOf(student)})"></i>
        <i class="fa-solid fa-trash" onclick="deleteStudent(${students.indexOf(student)})"></i>
      </td>
    `;
        tbody.appendChild(tr);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
}

function goToDashboard() {
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "index.html";
    } else {
        alert("Please login first!");
    }
}

function goToDashboard() {
    window.location.href = "index.html"; // or your actual dashboard path
}