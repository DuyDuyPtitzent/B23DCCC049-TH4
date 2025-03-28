
const LOCAL_STORAGE_KEY = "soVanBangList";

/**
 * Lấy danh sách sổ văn bằng từ localStorage
 */
export async function getAllSoVanBang(): Promise<SoVanBang[]> {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Tạo mới sổ văn bằng
 */
export async function createSoVanBang(nam: number, soThuTuHienTai: number): Promise<SoVanBang> {
  const newSoVanBang = { maSoVanBang: `SB${nam}_${soThuTuHienTai}`, nam, soThuTuHienTai };
  const danhSach = await getAllSoVanBang();
  danhSach.push(newSoVanBang);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(danhSach));
  return newSoVanBang;
}

/**
 * Xóa sổ văn bằng theo mã số
 */
export async function deleteSoVanBang(maSoVanBang: string): Promise<void> {
  const danhSach = (await getAllSoVanBang()).filter((svb) => svb.maSoVanBang !== maSoVanBang);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(danhSach));
}
