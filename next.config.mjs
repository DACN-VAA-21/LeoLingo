/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin", // Sửa lỗi chính tả
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Thêm dấu phẩy giữa PUT và DELETE
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes 0-9/*", // Sửa định dạng
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Tùy chọn thêm nếu dùng cookie
          },
        ],
      },
    ];
  },
};

export default nextConfig;
