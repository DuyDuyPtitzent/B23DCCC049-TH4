
const LOCAL_STORAGE_KEY_MASOVANBANG = "masovanbang";

/**
 * Lấy danh sách sổ văn bằng từ localStorage
 */
export function getAllSoVanBang() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_SOVANBANG);
  return data ? JSON.parse(data) : [];
}

/**
 * Tạo mới sổ văn bằng
 */
export function createSoVanBang(data: { nam: number; soThuTu: number }) {
  const danhSach = getAllSoVanBang();
  const newSoVanBang = {
    maSoVanBang: `SB${data.nam}_${data.soThuTu}`, // Định dạng mã số văn bằng
    nam: data.nam,
    soThuTuHienTai: data.soThuTu,
  };
  danhSach.push(newSoVanBang);
  localStorage.setItem(LOCAL_STORAGE_KEY_SOVANBANG, JSON.stringify(danhSach));

  // ✅ Cập nhật danh sách mã số văn bằng
  const maSoVanBangList = getAllMaSoVanBang();
  maSoVanBangList.push(newSoVanBang.maSoVanBang);
  localStorage.setItem(LOCAL_STORAGE_KEY_MASOVANBANG, JSON.stringify(maSoVanBangList));

  return newSoVanBang;
}

/**
 * Lấy danh sách mã số văn bằng từ localStorage
 */
export function getAllMaSoVanBang() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_MASOVANBANG);
  return data ? JSON.parse(data) : [];
}