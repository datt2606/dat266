// Data of employees
const employees = [
    {
        code: 'EMP001',
        name: 'Nguyễn Văn A',
        gender: 'Nam',
        dob: '01/01/1990',
        email: 'nguyenvana@gmail.com',
        address: 'Hà Đông, Hà Nội',
    },
    {
        code: 'EMP002',
        name: 'Trần Thị B',
        gender: 'Nữ',
        dob: '05/05/1992',
        email: 'tranthib@gmail.com',
        address: 'Thanh Xuân, Hà Nội',
    },
    {
        code: 'EMP003',
        name: 'Lê Văn C',
        gender: 'Nam',
        dob: '12/12/1985',
        email: 'levanc@gmail.com',
        address: 'Cầu Giấy, Hà Nội',
    },
    {
        code: 'EMP004',
        name: 'Hoàng Thị D',
        gender: 'Nữ',
        dob: '23/09/1993',
        email: 'hoangthid@gmail.com',
        address: 'Ba Đình, Hà Nội',
    },
    {
        code: 'EMP005',
        name: 'Phạm Văn E',
        gender: 'Nam',
        dob: '17/07/1988',
        email: 'phamvane@gmail.com',
        address: 'Tây Hồ, Hà Nội',
    },
    {
        code: 'EMP006',
        name: 'Vũ Thị F',
        gender: 'Nữ',
        dob: '08/08/1995',
        email: 'vuthif@gmail.com',
        address: 'Hoàng Mai, Hà Nội',
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

});


//render the employee table
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



// Function to delete employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable();
}

// Initialize the table
renderTable();
