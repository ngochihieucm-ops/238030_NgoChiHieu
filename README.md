# Hệ Thống Quản Lý Nhân Sự (HR Management System)

## Thông tin sinh viên
- **Họ và tên:** Ngô Chí Hiếu
- **Mã số sinh viên (MSSV):** 238030
- **Lớp:** DH23TIN09

---

## 1. Mô tả ngắn gọn hệ thống
Hệ thống Quản lý Nhân sự là một ứng dụng web full-stack hỗ trợ doanh nghiệp quản lý hồ sơ nhân viên hiệu quả. Hệ thống cung cấp các chức năng cốt lõi bao gồm: xem danh sách, thêm mới, tìm kiếm theo tên hoặc mã nhân viên, cập nhật thông tin và xóa hồ sơ nhân viên một cách trực quan, nhanh chóng.

---

## 2. Công nghệ sử dụng
- **Frontend:** React.js, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Containerization & Deployment:** Docker, Docker Hub, Render
- **Version Control:** Git & GitHub

---

## 3. Hướng dẫn chạy ứng dụng ở môi trường phát triển (Local Development)

### Yêu cầu chuẩn bị:
- Đã cài đặt Node.js và Git trên máy tính.
- Đã có tài khoản MongoDB Atlas và cấu hình chuỗi kết nối.

### Các bước thực hiện:

1. **Clone repository về máy:**
   ```bash
   git clone [https://github.com/ngochihieucm-ops/238030_NgoChiHieu.git](https://github.com/ngochihieucm-ops/238030_NgoChiHieu.git)
   cd 238030_NgoChiHieu
   Chạy Backend:

Bash
cd backend
npm install
Tạo file .env trong thư mục backend với nội dung:

Đoạn mã
PORT=5000
MONGO_URI=chuoi_ket_noi_mongodb_atlas_cua_ban
Khởi động server:

Bash
node server.js
Chạy Frontend:

Mở một terminal mới, di chuyển vào thư mục frontend:

Bash
cd frontend
npm install
npm start
Truy cập ứng dụng trên trình duyệt tại địa chỉ: http://localhost:3000

4. Các liên kết dự án (Links)
GitHub Repository: https://github.com/ngochihieucm-ops/238030_NgoChiHieu

Docker Hub Backend: (https://hub.docker.com/repository/docker/ngochihieu/backend)

Docker Hub Frontend: (https://hub.docker.com/repository/docker/ngochihieu/frontend)

Render App (Frontend): (Cập nhật link ứng dụng Render của bạn tại đây)

Render API (Backend): (Cập nhật link API Render của bạn tại đây)

MongoDB Atlas: (MONGO_URI=mongodb+srv://ngochihieucm_db_user:hieu123456@cluster0.znps2dq.mongodb.net/238030_NgoChiHieu?retryWrites=true&w=majority)


### Hướng dẫn cách lưu và cập nhật:
1. Bạn thay thế các phần link trong mục **4. Các liên kết dự án** bằng đường link thực tế của bạn (nếu có).
2. Sau khi dán xong, bạn nhấn **`Ctrl + S`** để lưu lại file `README.md`.
3. Mở Terminal ở thư mục gốc và chạy lệnh cập nhật lên GitHub:
   ```bash
   git add README.md
   git commit -m "Update complete README.md"
   git push origin main