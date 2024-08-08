// Biến toàn cục
let currentPage = 1;
let rowsPerPage = 20;
let employees = [];
let currentDelete;
let shouldFetchData = true;
let port = 7211;
let currentId = "0";
let toalPage;





/**
 * Lấy dữ liệu nhân viên từ API
 */
async function fetchEmployees() {
    try {
        const response = await fetch(`https://localhost:${port}/api/v1/Employees`);
        const data = await response.json();
        console.log(data);
        employees = data;
        totalPage = employees.length % 10 == 0 ? employees.length / 10 : employees.length / 10 + 1;
        renderTable();
        updateTotalRecords();
        renderPaging();
        shouldFetchData = false;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
    }
}

function renderPaging() {
    let select = document.getElementById("recordsPerPage");
    let options = ``;
    for (let i = 0; i < totalPage; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
}


/**
 * Hiển thị bảng nhân viên với phân trang
 */
function renderTable() {
    const tableBody = document.querySelector("#employeeTableBody");
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = employees.slice(start, end);

    paginatedItems.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${item.employeeCode}</td>
            <td>${item.fullName}</td>
            <td>${item.gender == 1 ? "Nam" : "Nữ" ?? ""}</td>
            <td>${item.dateOfBirth?.substring(0, 10) ?? ""}</td>
            <td>${item.email ?? ""}</td>
            <td style="position: relative;">
                ${item.address ?? ""}
                <div>
                    <button data-id="${item.employeeId}" class="button-edit"><img src="../assets/icon/info-48.png" alt=""></button>
                    <button data-id="${item.employeeId}" class="button-delete"><img src="../assets/icon/delete-48.png" alt=""></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    addDeleteButtonEvents();
    addEditButtonEvents();
}

/**
 * Chuyển đến trang trước
 */
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

/**
 * Chuyển đến trang tiếp theo
 */
function nextPage() {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
        currentPage++;
        renderTable();
    }
}

/**
 * Thêm sự kiện click cho các nút chỉnh sửa
 */
function addEditButtonEvents() {
    const buttons = document.querySelectorAll(".button-edit");
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const currentIdEdit = this.getAttribute('data-id');
            nextCreatePage(currentIdEdit);
        });
    });
}

/**
 * Thêm sự kiện click cho các nút xóa
 */
function addDeleteButtonEvents() {
    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            const employeeRow = event.target.closest('tr');
            const employeeCode = employeeRow.querySelector('td:nth-child(2)').textContent;

            const popup = document.querySelector("#popup");
            popup.querySelector(".popup-header").firstElementChild.innerHTML = "Bạn muốn xóa?";
            popup.querySelector(".popup-body").innerHTML = `<p>Bạn có chắc chắn muốn xóa nhân viên có mã ${employeeCode}?</p>`;
            popup.style.display = "block";
            currentDelete = this.getAttribute('data-id');
            console.log(`ID hiện tại được đặt thành: ${currentDelete}`);
        });
    });
}

/**
 * Xóa một nhân viên
 * @param {string} employeeId - ID của nhân viên cần xóa
 */
async function deleteEmployee(employeeId) {
    console.log('Đang xóa nhân viên có ID:', employeeId);
    if (!employeeId) {
        console.error('ID nhân viên không hợp lệ:', employeeId);
        alert('Mã nhân viên không hợp lệ');
        return;
    }

    try {
        const response = await fetch(`https://localhost:${port}/api/v1/Employees/${currentDelete}`, {
            method: "DELETE",
            redirect: "follow"
        });
        const result = await response.json();
        if (result.success) {
            alert("Xóa thành công!");
            fetchEmployees();
        }
    } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
    }
}

/**
 * Tìm kiếm nhân viên dựa trên đầu vào
 */
function searchEmployees() {
    const searchInput = document.querySelector('.search-input').value.toLowerCase();
    const rows = document.querySelectorAll("#employeeTableBody tr");

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchInput) ? "" : "none";
    });

    updateTotalRecords();
}

/**
 * Làm mới bảng nhân viên
 */
function refreshTable() {
    currentPage = 1;
    renderTable();
    shouldFetchData = true;
    fetchEmployees();
}

/**
 * Chuyển đến trang tạo/chỉnh sửa nhân viên
 * @param {string} id - ID của nhân viên cần chỉnh sửa, hoặc "0" cho nhân viên mới
 */
function nextCreatePage(id) {
    const newPageUrl = `http://127.0.0.1:5500/pages/employee.html?id=${id}`;
    window.location.href = newPageUrl;
}

/**
 * Cập nhật hiển thị tổng số bản ghi
 */
function updateTotalRecords() {
    const totalRecordsElement = document.getElementById('totalRecords');
    totalRecordsElement.textContent = employees.length;
}

// Các sự kiện lắng nghe
document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();

    document.getElementById('refresh-button').addEventListener('click', fetchEmployees);

    document.querySelector('.close-btn').onclick = function () {
        document.querySelector("#popup").style.display = 'none';
    };

    document.querySelector('.close-popup-btn').addEventListener('click', () => {
        deleteEmployee(currentDelete);
        document.querySelector("#popup").style.display = 'none';
    });

    document.querySelector('.search-input').addEventListener('input', searchEmployees);

    document.querySelector(".btn_add").addEventListener("click", () => nextCreatePage("0"));
});