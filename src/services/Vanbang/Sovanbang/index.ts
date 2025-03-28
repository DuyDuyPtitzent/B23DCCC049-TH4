import { SoVanBang } from "@/models/Vanbang/Thongtinvanbang";

export const getAllSoVanBang = (): SoVanBang[] => {
  const data = localStorage.getItem("soVanBangList");
  return data ? JSON.parse(data) : [];
};

export const createSoVanBang = async (data: { nam: number; soThuTu: number }): Promise<SoVanBang> => {
  const newSoVanBang: SoVanBang = {
    maSoVanBang: `SB${data.nam}_${data.soThuTu}`,
    nam: data.nam,
    soThuTuHienTai: data.soThuTu,
  };
  return newSoVanBang; // Giả lập tạo mới, không cần async nếu chỉ dùng localStorage
};

export const deleteSoVanBang = async (maSoVanBang: string): Promise<void> => {
  const currentList = getAllSoVanBang();
  const updatedList = currentList.filter((item) => item.maSoVanBang !== maSoVanBang);
  localStorage.setItem("soVanBangList", JSON.stringify(updatedList));
};