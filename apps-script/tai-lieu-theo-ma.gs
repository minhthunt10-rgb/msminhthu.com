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

// Cột C có thể là link chữ hoặc "thẻ file" Drive (chip) – thẻ chỉ hiện tên file, link nằm trong RichText
function layLink_(rich, text) {
  if (rich) {
    if (rich.getLinkUrl()) return rich.getLinkUrl();
    var runs = rich.getRuns();
    for (var k = 0; k < runs.length; k++) if (runs[k].getLinkUrl()) return runs[k].getLinkUrl();
  }
  return String(text || '').trim();
}

function doGet(e) {
  var ma = chuanMa_(e && e.parameter && e.parameter.ma), out = {};
  if (ma) {
    var range = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange();
    var rows = range.getDisplayValues(), rich = range.getRichTextValues();
    for (var i = 1; i < rows.length; i++) {
      if (chuanMa_(rows[i][0]) !== ma) continue;
      var link = layLink_(rich[i][2], rows[i][2]);
      if (/^https:\/\//.test(link)) {
        out = { t: String(rows[i][1] || '').trim() || 'Tài liệu', u: link };
        break;
      }
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
