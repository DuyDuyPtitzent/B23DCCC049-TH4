import useInitModel from '@/hooks/useInitModel';
import { useState, useEffect } from 'react';

export default () => {
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  
  const objInit = useInitModel<any>('nhan-vien');

  useEffect(() => {
    if (!objInit.data || objInit.data.length === 0) {
      const nhanVienMau = [
        {
          _id: '1',
          maNhanVien: 'NV001',
          hoTen: 'Trần Văn Tuấn',
          soDienThoai: '0901234567',
          email: 'trantuan@gmail.com',
          gioiTinh: 'Nam',
          ngaySinh: '1990-05-15',
          diaChi: 'Hà Nội',
          chuyenMon: ['1', '3'],
          soKhachToiDa: 10,
          lichLamViec: [
            { thu: 1, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 2, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 3, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 4, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 5, gioLam: '08:00', gioNghi: '17:00' }
          ],
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '2',
          maNhanVien: 'NV002',
          hoTen: 'Nguyễn Thị Hương',
          soDienThoai: '0908765432',
          email: 'huong@gmail.com',
          gioiTinh: 'Nữ',
          ngaySinh: '1992-08-20',
          diaChi: 'TP. Hồ Chí Minh',
          chuyenMon: ['2', '4'],
          soKhachToiDa: 8,
          lichLamViec: [
            { thu: 1, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 2, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 3, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 4, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 5, gioLam: '08:00', gioNghi: '17:00' }
          ],
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '3',
          maNhanVien: 'NV003',
          hoTen: 'Lê Minh Quân',
          soDienThoai: '0977123456',
          email: 'lequan@gmail.com',
          gioiTinh: 'Nam',
          ngaySinh: '1988-12-10',
          diaChi: 'Đà Nẵng',
          chuyenMon: ['1', '4'],
          soKhachToiDa: 12,
          lichLamViec: [
            { thu: 1, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 3, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 5, gioLam: '08:00', gioNghi: '17:00' },
            { thu: 6, gioLam: '08:00', gioNghi: '17:00' }
          ],
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '4',
          maNhanVien: 'NV004',
          hoTen: 'Phạm Thị Lan',
          soDienThoai: '0966543210',
          email: 'lan@gmail.com',
          gioiTinh: 'Nữ',
          ngaySinh: '1995-03-25',
          diaChi: 'Hải Phòng',
          chuyenMon: ['2', '3'],
          soKhachToiDa: 9,
          lichLamViec: [
            { thu: 1, gioLam: '13:00', gioNghi: '21:00' },
            { thu: 2, gioLam: '13:00', gioNghi: '21:00' },
            { thu: 5, gioLam: '13:00', gioNghi: '21:00' },
            { thu: 6, gioLam: '13:00', gioNghi: '21:00' },
            { thu: 0, gioLam: '13:00', gioNghi: '21:00' }
          ],
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      objInit.setData(nhanVienMau);
    }
  }, []);

  const kiemTraNhanVienCoTheLam = async (idNhanVien: string, ngayHen: string, gioHen: string): Promise<boolean> => {
    try {
      const nhanVien = objInit.data.find((nv: any) => nv._id === idNhanVien);
      if (!nhanVien) return false;
      
      const ngay = new Date(ngayHen);
      const thu = ngay.getDay(); 
      
      const lichLamViec = nhanVien.lichLamViec.find((lich: any) => lich.thu === thu);
      if (!lichLamViec) return false; 
      
      if (gioHen < lichLamViec.gioLam || gioHen > lichLamViec.gioNghi) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.log('Lỗi kiểm tra lịch nhân viên:', error);
      return false;
    }
  };

  return {
    ...objInit,
    visibleForm,
    setVisibleForm,
    kiemTraNhanVienCoTheLam
  };
}; 