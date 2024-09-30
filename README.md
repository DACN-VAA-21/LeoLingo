Để tải và cập nhật code từ một repository GitHub về máy tính của bạn, bạn có thể làm theo các bước dưới đây:

### **1. Cài đặt Git**
Trước tiên, bạn cần cài đặt Git trên máy tính của mình nếu chưa cài đặt:
- Tải Git từ trang chính thức: [https://git-scm.com/](https://git-scm.com/)
- Cài đặt Git theo hướng dẫn trên trang web.

### **2. Clone repository về máy tính**
Clone là quá trình sao chép toàn bộ repository từ GitHub về máy tính của bạn. Để thực hiện:
- Mở terminal hoặc command prompt.
- Điều hướng đến thư mục bạn muốn lưu trữ code.
- Gõ lệnh sau để clone repository:

```bash
git clone <URL của repository>
```

Ví dụ:

```bash
git clone https://github.com/username/repository.git
```

### **3. Cập nhật code từ repository**
Khi có những thay đổi mới trên GitHub, bạn cần cập nhật code về máy tính. Bạn có thể sử dụng lệnh:

```bash
git pull origin <branch>
```

Lệnh này sẽ kéo toàn bộ thay đổi từ nhánh (branch) bạn chỉ định trên GitHub về máy. Nếu không có nhánh cụ thể, thường bạn sẽ dùng nhánh `main` hoặc `master`:

```bash
git pull origin main
```

### **Tóm tắt các lệnh Git cơ bản:**
- `git clone <URL>`: Clone repository từ GitHub về máy tính.
- `git pull origin <branch>`: Cập nhật code từ GitHub về máy.
- `git add .`: Thêm tất cả các thay đổi vào git.
- `git commit -m "message"`: Commit các thay đổi với thông điệp.
- `git push origin <branch>`: Đẩy thay đổi lên GitHub.
- `git status`: Kiểm tra trạng thái các file trong repo.




### **1. Tạo file `.env` và cấu hình biến môi trường**
Trước tiên, bạn cần tạo một file `.env` trong thư mục gốc của dự án (thư mục chứa tất cả các file chính).

1. Mở thư mục chính của dự án. (Giả sử dự án của bạn có tên là `LeoLingo`).
2. Tạo một file mới có tên là `.env`.
3. Thêm hai trường thông tin sau vào file `.env`:

   ```plaintext
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

4. **Lấy giá trị cho hai key này từ trang web của Clerk**:
   - Đăng nhập vào tài khoản Clerk của bạn.
   - Điều hướng đến phần **API Keys** hoặc **Settings** của dự án bạn đã tạo trên Clerk.
   - Sao chép giá trị của **Publishable Key** vào trường `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
   - Sao chép giá trị của **Secret Key** vào trường `CLERK_SECRET_KEY`.
   - Sau đó, dán các key tương ứng vào file `.env`:

     ```plaintext
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Giá trị lấy từ Clerk>
     CLERK_SECRET_KEY=<Giá trị lấy từ Clerk>
     ```

### **2. Cài đặt các gói cần thiết với `npm install`**
Sau khi bạn đã cấu hình file `.env`, bước tiếp theo là cài đặt các gói cần thiết cho dự án bằng lệnh `npm install`.

1. Mở **terminal** hoặc **command prompt**.
2. Kiểm tra xem bạn đã ở trong đúng thư mục dự án chưa. Thư mục của dự án phải là **LeoLingo**. Bạn có thể kiểm tra bằng lệnh sau:

   ```bash
   pwd
   ```

   Lệnh này sẽ hiển thị đường dẫn hiện tại. Đảm bảo đường dẫn kết thúc bằng `LeoLingo`.

   Nếu chưa ở đúng thư mục, sử dụng lệnh sau để chuyển đến thư mục dự án:

   ```bash
   cd /path/to/LeoLingo
   ```

   (Thay `/path/to/LeoLingo` bằng đường dẫn thực tế đến thư mục dự án trên máy của bạn).

3. Khi bạn đã ở trong thư mục đúng, nhập lệnh sau để cài đặt tất cả các gói phụ thuộc:

   ```bash
   npm install
   ```

   Lệnh này sẽ tải và cài đặt tất cả các thư viện và module cần thiết dựa trên file `package.json` của dự án.

### **3. Chạy dự án với lệnh `npm run dev`**
Sau khi cài đặt các gói thành công, bạn có thể chạy ứng dụng để xem sản phẩm trên trình duyệt:

1. Nhập lệnh sau vào terminal để khởi động server phát triển (development server):

   ```bash
   npm run dev
   ```

2. Nếu mọi thứ đã được cấu hình chính xác, bạn sẽ thấy một thông báo trong terminal cho biết ứng dụng đã được khởi động, và một liên kết **localhost** sẽ được hiển thị, tương tự như sau:

   ```plaintext
   Local: http://localhost:3000
   ```

3. Mở trình duyệt và truy cập vào liên kết này (http://localhost:3000) để xem sản phẩm của bạn đang chạy.

### **Lưu ý quan trọng:**
- Hãy chắc chắn rằng bạn đã thêm đúng các **Clerk API Keys** vào file `.env`.
- Kiểm tra kỹ đường dẫn trong terminal để đảm bảo bạn đang ở trong thư mục gốc của dự án trước khi chạy lệnh `npm install` hoặc `npm run dev`.

Nếu có bất kỳ lỗi nào xảy ra trong quá trình này, bạn có thể kiểm tra lại cấu hình hoặc thông báo lỗi trong terminal để khắc phục.
