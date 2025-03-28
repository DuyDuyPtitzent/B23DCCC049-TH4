import useInitModel from '@/hooks/useInitModel';
import { useEffect } from 'react';

export default () => {
  const objInit = useInitModel<any>('dich-vu');

  // Thêm dữ liệu mẫu khi khởi tạo
  useEffect(() => {
    if (!objInit.data || objInit.data.length === 0) {
      const dichVuMau = [
        {
          _id: '1',
          maDichVu: 'DV001',
          tenDichVu: 'Cắt tóc nam',
          moTa: 'Cắt tóc kiểu nam',
          giaTien: 100000,
          thoiGianThucHien: 30,
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '2',
          maDichVu: 'DV002',
          tenDichVu: 'Làm móng',
          moTa: 'Làm móng tay và chân',
          giaTien: 150000,
          thoiGianThucHien: 60,
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '3',
          maDichVu: 'DV003',
          tenDichVu: 'Massage',
          moTa: 'Massage toàn thân',
          giaTien: 300000,
          thoiGianThucHien: 90,
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        },
        {
          _id: '4',
          maDichVu: 'DV004',
          tenDichVu: 'Làm tóc',
          moTa: 'Làm và nhuộm tóc',
          giaTien: 250000,
          thoiGianThucHien: 120,
          trangThai: true,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        }
      ];
      
      objInit.setData(dichVuMau);
    }
  }, []);

  return {
    ...objInit
  };
}; 