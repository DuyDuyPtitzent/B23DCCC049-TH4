import { ThongTinVanBang, TruongThongTin, SoVanBang } from "@/models/Vanbang/Thongtinvanbang";

export const getThongTinVanBang = (): ThongTinVanBang[] => {
  const data = localStorage.getItem("thongTinVanBang");
  return data ? JSON.parse(data) : [];
};

export const saveThongTinVanBang = (data: ThongTinVanBang[]): void => {
  localStorage.setItem("thongTinVanBang", JSON.stringify(data));
};

export const getTruongThongTin = (): TruongThongTin[] => {
  const data = localStorage.getItem("cauHinhTruongThongTin");
  return data ? JSON.parse(data) : [];
};

export const saveTruongThongTin = (data: TruongThongTin[]): void => {
  localStorage.setItem("cauHinhTruongThongTin", JSON.stringify(data));
};

export const getSoVanBang = (): SoVanBang[] => {
  const data = localStorage.getItem("soVanBangList");
  return data ? JSON.parse(data) : [];
};

export const saveSoVanBang = (data: SoVanBang[]): void => {
  localStorage.setItem("soVanBangList", JSON.stringify(data));
};