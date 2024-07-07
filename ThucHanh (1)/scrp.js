// Sample data for employees
const employees = [
    {
        code: '11111',
        name: 'Tong Tien Dat',
        gender: 'Nam',
        dob: '11/02/2002',
        email: 'dat@gmail.com',
        address: 'HN',
    },
   
];

openToggle();

function openToggle() {
    slideBar.classList.add('expanded');
    toggleText.textContent = 'Đóng';
}


// Slide Bar Toggle
document.getElementById('toggleButton').addEventListener('click', function () {
    const slideBar = document.getElementById('slideBar');
    const toggleText = document.getElementById('toggleText');

    if (slideBar.classList.contains('expanded')) {
        slideBar.classList.remove('expanded');
        toggleText.textContent = 'Mở';
    } else {
        slideBar.classList.add('expanded');
        toggleText.textContent = 'Đóng';
    }
});

// Modal Handling
function openModal() {
    document.getElementById('employeeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

function handleSubmit(event) {
    event.preventDefault();

    const employees = {
        code: document.getElementById('employeeCode').value,
        name: document.getElementById('employeeName').value,
        position: document.getElementById('employeePosition').value,
        department: document.getElementById('employeeDepartment').value,
        dob: document.getElementById('employeeDob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        id: document.getElementById('employeeId').value,
        idDate: document.getElementById('employeeIdDate').value,
        issued: document.getElementById('employeeIssued').value,
        address: document.getElementById('employeeAddress').value,
        phone: document.getElementById('employeePhone').value,
        tel: document.getElementById('employeeTel').value,
        email: document.getElementById('employeeEmail').value,
        bankAccountNumber: document.getElementById('employeeBankAccountNumber').value,
        bankAccountName: document.getElementById('employeeBankAccountName').value,
        branch: document.getElementById('employeeBranch').value,
    };

    console.log(employees);

    // Thêm logic lưu dữ liệu nhân viên vào đây
    // ...

    // Sau khi lưu dữ liệu, đóng modal và xóa dữ liệu
    closeModal();
    document.getElementById('employeeForm').reset();
}


// Function to render the employee table
function renderTable() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.code}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td class="address">
                ${employee.address}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search employees
function search() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(keyword)
    );
    console.log('Search results:', filteredEmployees);
    // Render the filtered employees
    renderTable(filteredEmployees);
}

// Function to open modal
function openModal(employeeIndex = null) {
    document.getElementById('employeeModal').style.display = 'flex';
    if (employeeIndex !== null) {
        const employee = employees[employeeIndex];
        document.getElementById('employeeId').value = employeeIndex;
        document.getElementById('employeeName').value = employee.name;
        // Set other form fields accordingly
    }
}

// Function to close modal
function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
    document.getElementById('employeeForm').reset();
}

// Function to save employee
function saveEmployee() {
    const employeeIndex = document.getElementById('employeeId').value;
    const name = document.getElementById('employeeName').value;
    // Get other form fields similarly
    if (employeeIndex) {
        // Edit existing employee
        employees[employeeIndex].name = name;
        // Update other fields similarly
    } else {
        // Add new employee
        const newEmployee = {
            code: `NV${employees.length + 1}`.padStart(3, '0'),
            name,
            // Set other fields similarly
        };
        employees.push(newEmployee);
    }
    closeModal();
    renderTable();
}

// Function to delete employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable();
}

// Initialize the table
renderTable();
