// Khởi tạo menu ban đầu
let menu = ["rau xào", "thịt luộc", "gà rán"];

// Hàm lưu trữ menu vào localStorage
function saveMenu(menu) {
    localStorage.setItem('menu', JSON.stringify(menu)); // Chuyển đổi mảng menu thành chuỗi JSON và lưu vào localStorage
}

// Hàm lấy menu từ localStorage
function loadMenu() {
    return JSON.parse(localStorage.getItem('menu')) || menu; // Lấy chuỗi JSON từ localStorage, chuyển đổi thành mảng, nếu không có thì dùng menu ban đầu
}

// Hàm hiển thị menu
function displayMenu() {
    const menu = loadMenu(); // Lấy menu từ localStorage
    const menuList = document.getElementById('menuList'); // Lấy phần tử HTML để hiển thị menu
    menuList.innerHTML = ''; // Xóa nội dung cũ của menu

    // Duyệt qua mảng menu và thêm từng món ăn vào menuList
    for (let i = 0; i < menu.length; i++) {
        const menuItemDiv = document.createElement('div'); // Tạo một phần tử div mới
        menuItemDiv.className = 'menu-item'; // Thêm lớp 'menu-item' vào phần tử div
        menuItemDiv.innerText = menu[i]; // Đặt nội dung của phần tử div là tên món ăn
        menuList.appendChild(menuItemDiv); // Thêm phần tử div vào menuList
    }
}

// Hàm xử lý các hành động của người dùng
function handleAction() {
    const action = document.getElementById('inputAction').value.toUpperCase(); // Lấy giá trị từ ô nhập và chuyển đổi thành chữ hoa
    const menu = loadMenu(); // Lấy menu từ localStorage
    let message = ''; // Khởi tạo thông điệp trống

    // Kiểm tra hành động của người dùng
    if (action === 'C') {
        const newItem = prompt('Mời người dùng nhập món ăn muốn thêm vào menu'); // Yêu cầu người dùng nhập món ăn mới
        if (newItem) {
            menu.push(newItem); // Thêm món mới vào menu
            saveMenu(menu); // Lưu menu vào localStorage
            displayMenu(); // Hiển thị menu mới
            message = 'Đã thêm món ăn vào menu.'; // Đặt thông điệp xác nhận
        }
    } else if (action === 'R') {
        message = 'Menu hiện tại: ' + menu; // Hiển thị menu 
    } else if (action === 'U') {
        const oldItem = prompt('Mời người dùng nhập vào tên món muốn update'); // Yêu cầu người dùng nhập món cần cập nhật
        const index = menu.indexOf(oldItem); // Tìm vị trí của món cần cập nhật trong menu
        if (index !== -1) {
            const newItem = prompt('Mời người dùng nhập vào tên món ăn mới'); // Yêu cầu người dùng nhập món mới
            menu[index] = newItem; // Cập nhật món mới vào vị trí tìm được
            saveMenu(menu); // Lưu menu vào localStorage
            displayMenu(); // Hiển thị menu mới
            message = 'Đã cập nhật món ăn.'; // Đặt thông điệp xác nhận
        } else {
            message = 'Món ăn không tồn tại trong menu.'; // Đặt thông điệp thông báo món ăn không tồn tại
        }
    } else if (action === 'D') {
        const itemToDelete = prompt('Mời người dùng nhập vào tên món muốn Delete'); // Yêu cầu người dùng nhập món cần xóa
        const index = menu.indexOf(itemToDelete); // Tìm vị trí của món cần xóa trong menu
        if (index !== -1) {
            menu.splice(index, 1); // Xóa món khỏi menu
            saveMenu(menu); // Lưu menu vào localStorage
            displayMenu(); // Hiển thị menu mới
            message = 'Đã xóa món ăn khỏi menu.'; // Đặt thông điệp xác nhận
        } else {
            message = 'Món ăn không tồn tại trong menu.'; // Đặt thông điệp thông báo món ăn không tồn tại
        }
    } else {
        message = 'Hãy nhập một ký tự hợp lệ: C, R, U, hoặc D.'; // Thông báo nhập ký tự không hợp lệ
    }

    document.getElementById('message').innerText = message; // Hiển thị thông điệp tới người dùng
    document.getElementById('inputAction').value = ''; // Xóa nội dung trong ô nhập
}

// Hiển thị menu lần đầu tiên khi trang được tải
displayMenu();
