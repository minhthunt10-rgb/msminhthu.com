// Tài liệu PDF theo mã. Mỗi dòng: "id": ["iv", "dữ liệu"] — tên + link Drive đã mã hoá bằng chính mã,
// nên đọc mã nguồn không thấy link. Thêm mã mới: nhờ Claude tạo dòng (id = 16 ký tự đầu SHA-256("id|" + mã)).
// Sửa file này thì tăng số ?v= ở thẻ <script src="ma-tai-lieu.js?v=N"> trong index.html để HS thấy mã mới ngay.
// Link Web app Apps Script của Google Sheet "Tài liệu theo mã" (apps-script/tai-lieu-theo-ma.gs). Để trống = chưa dùng Sheet.
window.SHEET_TAI_LIEU = "https://script.google.com/macros/s/AKfycby50JA_yWavxaQdaUWRtMZib2xlaE5p3fKk7qJRFM7h7TK_v8IgozM5CUx4eDFvZB9ryQ/exec";

window.MA_TAI_LIEU = {
  "ff4b2a6b193f6835": ["jGEh5nTPNl8tcSLk", "6AVNC40RuqoPnBE617XAirm8jvSxbbx+THSdEwp69C6wZqDB1zuNL2M0JCqRc1t1XeBD1b5B/nBIMNQUoj1Czo/mxn21L3IWlU+f8i5cPGhj8mrlo5gu1QWn9/98IpcZW4H1iZBBWVKwzcYRk7K8gkBVxUCEbygLPOn1yWH6WGQPrf+knESbdlCkcbAI5i7D4668YZcPAdIzE+NAqngQVDHarPiZD+8MokWe5CjwCzk="],
};
