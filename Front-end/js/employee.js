// Biến toàn cục
let currentId = "";
let data = {};
const port = 7129;

// Khởi tạo khi trang web được load
window.onload = function () {
    init();
};

// Hàm khởi tạo
function init() {
    currentId = getCurrentId();
    console.log(typeof currentId);
    console.log(currentId);
    initEvents();
}

// Khởi tạo các sự kiện
function initEvents() {
    if (currentId !== "" && currentId !== "0") {
        loadEmployeeById();
    } else {
        getNewEmployeeCode();
    }

    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    document.getElementById("button-add").addEventListener('click', buttonAddOnClick);
}

// Load thông tin nhân viên theo ID
function loadEmployeeById() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees/${currentId}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Điền thông tin nhân viên vào form
            document.getElementById('employee-code').value = data.employeeCode;
            document.getElementById('fullname').value = data.fullName;
            document.getElementById('date-of-birth').value = data.dateOfBirth?.split('T')[0] ?? null;
            document.querySelector(`input[name="gender"][value="${data.gender === 1 ? 'male' : data.gender === 2 ? 'female' : 'other'}"]`).checked = true;
            document.getElementById('identification-number').value = data.identityNumber;
            document.getElementById('issue-date').value = data.identityDate?.split('T')[0] ?? null;
            document.getElementById('place-of-issue').value = data.identityPlace;
            document.getElementById('address').value = data.address;
            document.getElementById('mobile-phone').value = data.phoneNumber;
            document.getElementById('landline-phone').value = data.landlineNumber;
            document.getElementById('email').value = data.email;
            document.getElementById('bank-account').value = data.bankAccount;
            document.getElementById('bank-name').value = data.bankName;
            document.getElementById('brach').value = data.brach;

            // Chọn giá trị trong các select
            document.getElementById('department').value = data.departmentId;
            document.getElementById('position').value = data.positionId;
        })
        .catch((error) => console.error(error));
}

// Lấy mã nhân viên mới
function getNewEmployeeCode() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees/CreteEmp/NewCode`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            document.getElementById('employee-code').value = result;
        })
        .catch((error) => console.error(error));
}

// Lấy ID hiện tại từ URL
function getCurrentId() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    return params.get('id');
}

// Xử lý khi nhấn nút thêm/sửa
function buttonAddOnClick() {
    const form = document.getElementById('register-form');

    if (form.checkValidity()) {
        getDataEmployee(form);
        debugger;
        if (currentId === "0") {
            addNewEmployee();
        } else {
            updateEmployee();
        }
    }
}

// Thêm nhân viên mới
function addNewEmployee() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`https://localhost:${port}/api/v1/Employees`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                alert("Thêm mới thành công!");
                const newPageUrl = `http://127.0.0.1:5500/pages/index.html`;
                window.location.href = newPageUrl;
            } else {
                showErrorPopup("Thông báo lỗi", "Lỗi thêm mới nhân viên", result.errors);
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

// Cập nhật thông tin nhân viên
function updateEmployee() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    debugger;
    fetch(`https://localhost:${port}/api/v1/Employees/Update`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                alert("Cập nhật thành công!");
                const newPageUrl = `http://127.0.0.1:5500/pages/index.html`;
                window.location.href = newPageUrl;
            } else {
                showErrorPopup("Thông báo lỗi", "Lỗi sửa mới nhân viên", result.errors);
            }
        })
        .catch((error) => {
            console.error(error)
        });
}

// Lấy dữ liệu từ form
function getDataEmployee(form) {
    const formData = new FormData(form);

    const formDataObj = {};
    if (currentId !== "0") {
        formDataObj['employeeId'] = currentId;
    }
    formData.forEach((value, key) => {
        // Xử lý radio buttons
        if (key === 'gender') {
            if (value === 'male') {
                formDataObj[key] = 1;
            } else if (value === 'female') {
                formDataObj[key] = 2;
            } else {
                formDataObj[key] = 3;
            }
        } else {
            formDataObj[key] = value || null;
        }
    });

    data = formDataObj;
    console.log(JSON.stringify(data, null, 2));
}

// Hiển thị popup lỗi
function showErrorPopup(title, message, errors) {
    let popup = document.querySelector("#popup");
    popup.querySelector(".popup-header").firstElementChild.innerHTML = title;
    let errorList = ``;
    if (errors && errors.length > 0) {
        for (const error of errors) {
            errorList += `<li>${error}</li>`;
        }
    }
    popup.querySelector(".popup-body").innerHTML = `<p>${message}</p>${errorList}`;
    popup.style.display = "block";
}