const fs = require('fs');
const path = require('path');

// 1. กำหนด path ของไฟล์ environment.ts ที่ต้องการแก้ไข
//    (Path นี้ควรสัมพันธ์กับ Root Directory ของโปรเจกต์ Angular)
const environmentPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// 2. ดึงค่าตัวแปรจาก Vercel (process.env)
const apiUrl = process.env.NG_APP_API_URL || 'http://localhost:3000/api'; // ใส่ค่า default สำหรับการ run dev

// 3. เนื้อหาใหม่ของไฟล์ environment.ts
const fileContent = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

// 4. เขียนไฟล์ใหม่
fs.writeFileSync(environmentPath, fileContent, (err) => {
  if (err) {
    console.error('❌ Failed to write environment file:', err);
    process.exit(1);
  }
  console.log(`✅ environment.ts updated with apiUrl: ${apiUrl}`);
});