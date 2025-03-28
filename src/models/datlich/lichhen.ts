import useInitModel from '@/hooks/useInitModel';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { ETrangThaiLichHen } from '@/services/DatLich/LichHen/constants';

export default () => {
  const [visibleFormDatLich, setVisibleFormDatLich] = useState<boolean>(false);
  const [trangThaiFilter, setTrangThaiFilter] = useState<ETrangThaiLichHen | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  
  const objInit = useInitModel<any>('lich-hen');

;

  const kiemTraLichTrung = async (values: any, nhanVienList: any[]): Promise<boolean> => {
    try {
      if (!values.ngayHen || !values.gioHen || !values.idNhanVien || !values.idDichVu) {
        message.error('Thiếu thông tin để kiểm tra lịch hẹn');
        return false;
      }

      const nhanVien = nhanVienList?.find((nv: any) => nv._id === values.idNhanVien);
      if (!nhanVien) {
        message.error('Không tìm thấy thông tin nhân viên!');
        return false;
      }

      const lichHenHienTai = objInit.data.filter((item: any) => 
        item.ngayHen === values.ngayHen && 
        item.gioHen === values.gioHen && 
        item.idNhanVien === values.idNhanVien &&
        (values._id ? item._id !== values._id : true) 
      );

      if (lichHenHienTai.length > 0) {
        message.error('Nhân viên đã có lịch hẹn vào thời gian này!');
        return false;
      }

      const lichHenTrongNgay = objInit.data.filter((item: any) => 
        item.ngayHen === values.ngayHen && 
        item.idNhanVien === values.idNhanVien &&
        (values._id ? item._id !== values._id : true) 
      );

      if (lichHenTrongNgay.length >= nhanVien.soKhachToiDa) {
        message.error(`Nhân viên ${nhanVien.hoTen} đã đạt số lượng khách tối đa (${nhanVien.soKhachToiDa}) trong ngày!`);
        return false;
      }

      return true;
    } catch (error) {
      console.log('Lỗi kiểm tra lịch trùng:', error);
      return false;
    }
  };

  const capNhatTrangThaiLichHen = async (id: string, trangThai: ETrangThaiLichHen) => {
    try {
      const lichHen = objInit.data.find((item: any) => item._id === id);
      if (!lichHen) {
        message.error('Không tìm thấy lịch hẹn!');
        return false;
      }

      lichHen.trangThai = trangThai;
      objInit.putModel(id, lichHen).then(() => {
        message.success('Cập nhật trạng thái thành công!');
      });
      
      return true;
    } catch (error) {
      console.log('Lỗi cập nhật trạng thái:', error);
      return false;
    }
  };

  

  return {
    ...objInit,
    visibleFormDatLich,
    setVisibleFormDatLich,
    trangThaiFilter,
    setTrangThaiFilter,
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    kiemTraLichTrung,
    capNhatTrangThaiLichHen,
  };
}; 