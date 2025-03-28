import React from 'react';
import { Table, Space, Button, Tag, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
// import { ETrangThaiDichVu, trangThaiDichVuText, trangThaiDichVuColor } from '@/services/DatLich/DichVu/constants';

interface TableDichVuProps {
  onEdit: (record: any) => void;
}

interface IDichVuRecord {
  _id: string;
  maDichVu: string;
  tenDichVu: string;
  moTa: string;
  giaTien: number;
  thoiGianThucHien: number;
  trangThai: boolean;
  createdAt: string;
  updatedAt: string;
}

const TableDichVu: React.FC<TableDichVuProps> = ({ onEdit }) => {
  const { data, loading, deleteModel } = useModel('datlich.dichvu');

  const handleDelete = async (id: string) => {
    await deleteModel(id);
  };

  const columns = [
    {
      title: 'Mã dịch vụ',
      dataIndex: 'maDichVu',
      key: 'maDichVu'
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'tenDichVu',
      key: 'tenDichVu',
      sorter: (a: IDichVuRecord, b: IDichVuRecord) => a.tenDichVu.localeCompare(b.tenDichVu)
    },
    {
      title: 'Giá tiền',
      dataIndex: 'giaTien',
      key: 'giaTien',
      render: (giaTien: number) => giaTien.toLocaleString('vi-VN') + ' đ',
      sorter: (a: IDichVuRecord, b: IDichVuRecord) => a.giaTien - b.giaTien
    },
    {
      title: 'Thời gian thực hiện',
      dataIndex: 'thoiGianThucHien',
      key: 'thoiGianThucHien',
      render: (thoiGian: number) => `${thoiGian} phút`,
      sorter: (a: IDichVuRecord, b: IDichVuRecord) => a.thoiGianThucHien - b.thoiGianThucHien
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: boolean) => (
        <Tag color={trangThai ? 'green' : 'red'}>
          {trangThai ? 'Hoạt động' : 'Tạm ngưng'}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: IDichVuRecord) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa dịch vụ này?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TableDichVu;