import { LuotTraCuu } from "@/models/Vanbang/Thongtinvanbang";

export const getLuotTraCuu = (): LuotTraCuu => {
    const data = localStorage.getItem("luotTraCuu");
    return data ? JSON.parse(data) : {};
  };
  
  export const saveLuotTraCuu = (data: LuotTraCuu): void => {
    localStorage.setItem("luotTraCuu", JSON.stringify(data));
  };
  
  export const incrementLuotTraCuu = (loaiTotNghiep: string): void => {
    const luotTraCuu = getLuotTraCuu();
    luotTraCuu[loaiTotNghiep] = (luotTraCuu[loaiTotNghiep] || 0) + 1;
    saveLuotTraCuu(luotTraCuu);
  };