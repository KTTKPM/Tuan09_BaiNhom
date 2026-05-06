Dưới đây là nội dung từ hai hình ảnh trên đã được chuyển đổi sang định dạng Markdown (.md) để bạn dễ dàng lưu trữ và sử dụng:

---

# Kế Hoạch Phân Công và Triển Khai Hệ Thống

## 1. Phân công 5 người

### **Người 1 – Frontend (ReactJS)**

- **UI:**
  - Login
  - Xem tour
  - Đặt tour
- **Gọi:**
  - Chỉ gọi Orchestrator
  - Không gọi service khác

### **Người 2 – Orchestrator Service**

- **API:**
  - `POST /book-tour`
- **Flow trong Orchestrator:**
  1. Validate user (User Service)
  2. Lấy thông tin tour (Tour Service)
  3. Tạo booking (Booking Service)
  4. Gọi Payment Service
  5. Trả kết quả về Frontend
- **Ghi chú:** Tất cả đều là REST call

### **Người 3 – User Service**

- **API:**
  - `POST /login`
  - `GET /users/{id}`

### **Người 4 – Tour Service**

- **API:**
  - `GET /tours`
  - `GET /tours/{id}`

### **Người 5 – Booking + Payment Service**

- **Booking API:**
  - `POST /bookings`
- **Payment API:**
  - `POST /payments`
- **Logic:**
  - Random success/fail (Thành công/Thất bại ngẫu nhiên)

---

## 2. Triển khai trên LAN

| Service          | IP                |
| :--------------- | :---------------- |
| **Orchestrator** | 192.168.1.10:8080 |
| **User**         | 192.168.1.11:8081 |
| **Tour**         | 192.168.1.12:8082 |
| **Booking**      | 192.168.1.13:8083 |
| **Payment**      | 192.168.1.14:8084 |
| **Frontend**     | 192.168.1.15:3000 |

---

## 3. Flow chi tiết

### **Flow đặt tour**

1.  **Frontend** → **Orchestrator**
2.  **Orchestrator** thực hiện các lệnh gọi:
    - Gọi **User Service**
    - Gọi **Tour Service**
    - Gọi **Booking Service**
    - Gọi **Payment Service**
3.  **Trả kết quả về Frontend**
