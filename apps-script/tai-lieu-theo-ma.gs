/**
 * Tài liệu theo mã – Ms. Minh Thư (msminhthu.com, ô "Nhận tài liệu PDF bằng mã")
 *
 * Google Sheet: trang tính ĐẦU TIÊN, dòng 1 là tiêu đề.
 *   Cột A = Mã (vd: tongon10)   Cột B = Tên tài liệu   Cột C = Link Drive PDF
 * Trang web gửi ?ma=... và chỉ nhận về đúng 1 tài liệu khớp mã, nên không ai xem được cả danh sách.
 *
 * Cài một lần: Tiện ích mở rộng → Apps Script → dán mã này → Lưu → Triển khai → Tùy chọn triển khai mới
 *   → Loại: Ứng dụng web → Thực thi với tư cách: Tôi → Người có quyền truy cập: Bất kỳ ai → Triển khai.
 * Sau đó chỉ cần thêm/sửa dòng trong Sheet, trang web tự cập nhật (không phải triển khai lại).
 */
function chuanMa_(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function doGet(e) {
  var ma = chuanMa_(e && e.parameter && e.parameter.ma), out = {};
  if (ma) {
    var rows = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getDisplayValues();
    for (var i = 1; i < rows.length; i++) {
      var link = String(rows[i][2] || '').trim();
      if (chuanMa_(rows[i][0]) === ma && /^https:\/\//.test(link)) {
        out = { t: String(rows[i][1] || '').trim() || 'Tài liệu', u: link };
        break;
      }
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
