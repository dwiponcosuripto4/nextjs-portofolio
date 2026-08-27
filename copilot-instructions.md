# Instruksi Pengembangan

## Perubahan Tampilan Mobile

Saat pengguna mengatakan "pada mobile", "di mobile", atau meminta perbaikan tampilan mobile:

1. Terapkan perubahan hanya pada viewport mobile.
2. Periksa breakpoint, media query, dan class responsif yang sudah ada.
3. Gunakan aturan khusus mobile jika memungkinkan.
4. Jangan mengubah tampilan, layout, ukuran, jarak, warna, tipografi, atau interaksi pada desktop.
5. Pertahankan tampilan desktop seperti sebelumnya.
6. Periksa tampilan pada lebar sekitar 375px dan 430px.
7. Pastikan tampilan desktop sekitar 1280px tidak berubah.
8. Hindari mengubah style dasar jika masalah dapat diselesaikan dengan aturan khusus mobile.
9. Jangan menjalankan atau meminta pengguna menjalankan `npm run dev` karena server biasanya sudah berjalan.
10. Jangan menjalankan atau meminta pengguna menjalankan `npm run lint` secara otomatis.
11. Jalankan lint hanya jika pengguna memintanya secara langsung atau lint diperlukan untuk mendiagnosis error tertentu.
12. Jika pengujian manual diperlukan, minta pengguna mengulangi pengecekan secara manual.
13. Dalam ringkasan akhir, jelaskan bahwa perubahan hanya berlaku untuk mobile dan tampilan desktop tetap dipertahankan.