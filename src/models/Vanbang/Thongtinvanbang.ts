export interface ThongTinVanBang {
    soVaoSo: number;
    soHieuVanBang: string;
    maSinhVien: string;
    hoTen: string;
    ngaySinh: string;
    soQD: string;
    loaiTotNghiep: string;
    heDaoTao: string; // Thêm trường heDaoTao
    maSoVanBang: string;
    [key: string]: any; // Cho phép các trường động
  }

export interface TruongThongTin {
    tenTruong: string;
    kieuDuLieu: "String" | "Number" | "Date";
  }
export interface LuotTraCuu {
    [loaiTotNghiep: string]: number; // Ví dụ: { "Khá": 5, "Giỏi": 3 }
  }
  export interface SoVanBang {
    maSoVanBang: string;
    nam: number;
    soThuTuHienTai: number;
  }
  export interface QuyetDinhTotNghiep {
    soQD: string; // VD: QĐ1/2023
    ngayBanHanh: string; // VD: 2023-03-15
    trichYeu: string; // VD: Tốt nghiệp đợt 1 năm 2023
    maSoVanBang: string; // Liên kết với sổ văn bằng, VD: SB2023
  }