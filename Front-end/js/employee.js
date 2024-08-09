// Biến toàn cục
let currentId = "";      // Lưu ID nhân viên hiện tại từ URL
let data = {};           // Lưu trữ dữ liệu nhân viên để gửi khi form được submit
const port = 7211;       // Cổng số cho máy chủ API cục bộ

/**
 * Khởi tạo ứng dụng khi trang được tải xong
 */
window.onload = function () {
    init(); // Gọi hàm khởi tạo
};

/**
 * Hàm khởi tạo
 * - Lấy ID nhân viên hiện tại từ URL
 * - Khởi tạo các sự kiện
 */
function init() {
    currentId = getCurrentId(); // Lấy ID nhân viên hiện tại từ tham số URL
    console.log(typeof currentId); // In kiểu dữ liệu của currentId để kiểm tra
    console.log(currentId); // In giá trị của currentId để kiểm tra
    initEvents(); // Khởi tạo các sự kiện và xử lý
}

/**
 * Thiết lập các sự kiện và các trình xử lý sự kiện
 */
function initEvents() {
    // Nếu có ID hợp lệ, tải thông tin nhân viên, ngược lại tạo mã nhân viên mới
    if (currentId !== "" && currentId !== "0") {
        loadEmployeeById();
    } else {
        getNewEmployeeCode();
    }

    // Ngăn chặn hành vi mặc định của form khi gửi
    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    // Thêm sự kiện khi nhấn nút thêm
    document.getElementById("button-add").addEventListener('click', buttonAddOnClick);
}

/**
 * Tải thông tin nhân viên theo ID và cập nhật form
 */
function loadEmployeeById() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees/${currentId}`, requestOptions)
        .then(response => response.json())
        .then(employeeData => {
            // Cập nhật các trường trong form với dữ liệu nhân viên
            document.getElementById('employee-code').value = employeeData.employeeCode;
            document.getElementById('fullname').value = employeeData.fullName;
            document.getElementById('date-of-birth').value = employeeData.dateOfBirth?.split('T')[0] ?? null;
            document.querySelector(`input[name="gender"][value="${employeeData.gender === 1 ? 'male' : employeeData.gender === 2 ? 'female' : 'other'}"]`).checked = true;
            document.getElementById('identification-number').value = employeeData.identityNumber;
            document.getElementById('issue-date').value = employeeData.identityDate?.split('T')[0] ?? null;
            document.getElementById('place-of-issue').value = employeeData.identityPlace;
            document.getElementById('address').value = employeeData.address;
            document.getElementById('mobile-phone').value = employeeData.phoneNumber;
            document.getElementById('landline-phone').value = employeeData.landlineNumber;
            document.getElementById('email').value = employeeData.email;
            document.getElementById('bank-account').value = employeeData.bankAccount;
            document.getElementById('bank-name').value = employeeData.bankName;
            document.getElementById('brach').value = employeeData.brach;

            // Chọn giá trị trong các dropdown
            document.getElementById('department').value = employeeData.departmentName;
            document.getElementById('position').value = employeeData.positionName;
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu nhân viên:', error));
}

/**
 * Lấy mã nhân viên mới và cập nhật trường mã nhân viên
 */
function getNewEmployeeCode() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees/CreteEmp/NewCode`, requestOptions)
        .then(response => response.text())
        .then(newCode => {
            document.getElementById('employee-code').value = newCode;
        })
        .catch(error => console.error('Lỗi khi lấy mã nhân viên mới:', error));
}

/**
 * Lấy ID hiện tại từ tham số URL
 * @returns {string} ID hiện tại từ URL
 */
function getCurrentId() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    return params.get('id'); // Trả về giá trị của tham số 'id'
}

/**
 * Xử lý sự kiện nhấn nút thêm/sửa
 */
function buttonAddOnClick() {
    const form = document.getElementById('register-form');

    // Kiểm tra tính hợp lệ của form trước khi thực hiện thêm hoặc cập nhật
    if (form.checkValidity()) {
        getDataEmployee(form); // Lấy dữ liệu từ form
        if (currentId === "0") {
            addNewEmployee(); // Thực hiện thêm mới nhân viên
        } else {
            updateEmployee(); // Thực hiện cập nhật thông tin nhân viên
        }
    }
}

/**
 * Thực hiện thêm nhân viên mới
 */
function addNewEmployee() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: body,
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("Thêm mới thành công!");
                window.location.href = `http://127.0.0.1:5500/pages/index.html`; // Chuyển hướng về trang chính
            } else {
                showErrorPopup("Thông báo lỗi", "Lỗi thêm mới nhân viên", result.errors);
            }
        })
        .catch(error => console.error('Lỗi khi thêm nhân viên:', error));
}

/**
 * Thực hiện cập nhật thông tin nhân viên
 */
function updateEmployee() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: body,
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees/Update`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("Cập nhật thành công!");
                window.location.href = `http://127.0.0.1:5500/pages/index.html`; // Chuyển hướng về trang chính
            } else {
                showErrorPopup("Thông báo lỗi", "Lỗi cập nhật thông tin nhân viên", result.errors);
            }
        })
        .catch(error => console.error('Lỗi khi cập nhật nhân viên:', error));
}

/**
 * Lấy dữ liệu từ form và chuẩn bị cho việc gửi
 * @param {HTMLFormElement} form - Form chứa dữ liệu nhân viên
 */
function getDataEmployee(form) {
    const formData = new FormData(form);
    const formDataObj = {};

    // Nếu ID không phải là mã mới, thêm ID vào đối tượng dữ liệu
    if (currentId !== "0") {
        formDataObj['employeeId'] = currentId;
    }

    // Chuyển đổi dữ liệu từ FormData thành đối tượng
    formData.forEach((value, key) => {
        if (key === 'gender') {
            formDataObj[key] = value === 'male' ? 1 : value === 'female' ? 2 : 3;
        } else {
            formDataObj[key] = value || null;
        }
    });

    data = formDataObj;
    console.log("Dữ liệu chuẩn bị gửi:", JSON.stringify(data, null, 2));
}

/**
 * Hiển thị thông báo lỗi trong popup
 * @param {string} title - Tiêu đề của popup
 * @param {string} message - Thông điệp chính của popup
 * @param {string[]} errors - Danh sách các lỗi để hiển thị
 */
function showErrorPopup(title, message, errors) {
    let popup = document.querySelector("#popup");
    popup.querySelector(".popup-header").firstElementChild.innerHTML = title;
    let errorList = errors && errors.length > 0 ? errors.map(error => `<li>${error}</li>`).join('') : '';
    popup.querySelector(".popup-body").innerHTML = `<p>${message}</p><ul>${errorList}</ul>`;
    popup.style.display = "block"; // Hiển thị popup
}
