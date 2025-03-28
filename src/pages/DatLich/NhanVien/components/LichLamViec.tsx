import React, { useState, useEffect } from 'react';
import { Table, TimePicker, Button, Checkbox, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { thuTrongTuan } from '@/services/DatLich/NhanVien/constants';

interface LichLamViecProps {
  lichLamViec: any[];
  onChange: (lichLamViec: any[]) => void;
}

const LichLamViec: React.FC<LichLamViecProps> = ({ lichLamViec = [], onChange }) => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    setDataSource(
      lichLamViec.map((lich) => ({
        ...lich,
        key: `${lich.thu}-${Date.now()}`,
        gioLamMoment: moment(lich.gioLam, 'HH:mm'),
        gioNghiMoment: moment(lich.gioNghi, 'HH:mm'),
      }))
    );
  }, [lichLamViec]);

  const handleAdd = () => {
    const newData = {
      key: Date.now().toString(),
      thu: [],
      gioLam: '08:00',
      gioNghi: '17:00',
      gioLamMoment: moment('08:00', 'HH:mm'),
      gioNghiMoment: moment('17:00', 'HH:mm'),
    };
    setDataSource((prev) => [...prev, newData]);
  };

  const handleDelete = (key: string) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
  };

  const handleChange = (key: string, field: string, value: any) => {
    setDataSource((prev) => {
      const newData = prev.map((item) => (item.key === key ? { ...item, [field]: value } : item));
      onChange(
        newData
          .filter((lich) => lich.thu.length > 0)
          .map(({ key: itemKey, gioLamMoment, gioNghiMoment, ...rest }) => ({
            ...rest,
            gioLam: gioLamMoment?.format('HH:mm'),
            gioNghi: gioNghiMoment?.format('HH:mm'),
          }))
      );
      return newData;
    });
  };

  const handleThuChange = (value: number, checked: boolean, key: string) => {
    setDataSource((prev) => {
      const newData = prev.map((item) => {
        if (item.key === key) {
          const newThu = checked ? [...item.thu, value] : item.thu.filter((thu: number) => thu !== value);
          return { ...item, thu: newThu };
        }
        return item;
      });
      onChange(
        newData
          .filter((lich) => lich.thu.length > 0)
          .map(({ key: itemKey, gioLamMoment, gioNghiMoment, ...rest }) => ({
            ...rest,
            gioLam: gioLamMoment?.format('HH:mm'),
            gioNghi: gioNghiMoment?.format('HH:mm'),
          }))
      );
      return newData;
    });
  };

  const columns = [
    {
      title: 'Thứ',
      dataIndex: 'thu',
      key: 'thu',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          {thuTrongTuan.map((thu) => (
            <Checkbox
              key={thu.value}
              checked={record.thu.includes(thu.value)}
              onChange={(e) => handleThuChange(thu.value, e.target.checked, record.key)}
            >
              {thu.label}
            </Checkbox>
          ))}
        </Space>
      ),
    },
    {
      title: 'Giờ làm',
      dataIndex: 'gioLamMoment',
      key: 'gioLamMoment',
      width: 150,
      render: (gioLamMoment: moment.Moment, record: any) => (
        <TimePicker
          value={gioLamMoment}
          format="HH:mm"
          minuteStep={30}
          onChange={(time) => handleChange(record.key, 'gioLamMoment', time)}
        />
      ),
    },
    {
      title: 'Giờ nghỉ',
      dataIndex: 'gioNghiMoment',
      key: 'gioNghiMoment',
      width: 150,
      render: (gioNghiMoment: moment.Moment, record: any) => (
        <TimePicker
          value={gioNghiMoment}
          format="HH:mm"
          minuteStep={30}
          onChange={(time) => handleChange(record.key, 'gioNghiMoment', time)}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          size="small"
        />
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm lịch làm việc
      </Button>
      <Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
    </div>
  );
};

export default LichLamViec;