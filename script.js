document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');
    const editIndexInput = document.getElementById('editIndex'); // Hidden input to track the index

    // Load students from localStorage on page load
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Display existing students
    displayStudents();

    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNo = document.getElementById('contactNo').value.trim();
        const editIndex = editIndexInput.value;

        // Validate input
        if (!studentName.match(/^[A-Za-z\s]+$/)) {
            alert('Student name should contain only letters.');
            return;
        }

        if (!studentID || !email || !contactNo) {
            alert('Please fill all fields.');
            return;
        }

        // Create new student object
        const newStudent = {
            studentName,
            studentID,
            email,
            contactNo
        };

        if (editIndex === "") {
            // Add new student to array and update localStorage if not in edit mode
            students.push(newStudent);
        } else {
            // Update the existing student in the array
            students[editIndex] = newStudent;
            editIndexInput.value = ""; // Reset the hidden input after editing
        }

        // Update localStorage
        localStorage.setItem('students', JSON.stringify(students));

        // Reset the form
        studentForm.reset();

        // Re-display the students
        displayStudents();
    });

    // Display students in the table
    function displayStudents() {
        studentTableBody.innerHTML = '';

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.studentName}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contactNo}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    // Edit student function
    window.editStudent = function(index) {
        const student = students[index];

        document.getElementById('studentName').value = student.studentName;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNo').value = student.contactNo;
        editIndexInput.value = index; // Set the hidden input to the current index
    };

    // Delete student function
    window.deleteStudent = function(index) {
        students.splice(index, 1); // Remove student from array
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };
});
