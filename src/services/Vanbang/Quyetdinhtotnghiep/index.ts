import { QuyetDinhTotNghiep } from "@/models/Vanbang/Thongtinvanbang";

export const getAllQuyetDinhTotNghiep = (): QuyetDinhTotNghiep[] => {
  const data = localStorage.getItem("quyetDinhTotNghiepList");
  return data ? JSON.parse(data) : [];
};

export const createQuyetDinhTotNghiep = async (data: QuyetDinhTotNghiep): Promise<QuyetDinhTotNghiep> => {
  const currentList = getAllQuyetDinhTotNghiep();
  if (currentList.some((item) => item.soQD === data.soQD)) {
    throw new Error(`Quyết định ${data.soQD} đã tồn tại!`);
  }
  const updatedList = [...currentList, data];
  localStorage.setItem("quyetDinhTotNghiepList", JSON.stringify(updatedList));
  return data;
};

export const deleteQuyetDinhTotNghiep = async (soQD: string): Promise<void> => {
  const currentList = getAllQuyetDinhTotNghiep();
  const updatedList = currentList.filter((item) => item.soQD !== soQD);
  localStorage.setItem("quyetDinhTotNghiepList", JSON.stringify(updatedList));
};