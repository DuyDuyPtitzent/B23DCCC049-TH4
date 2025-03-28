import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Table, Popconfirm, message } from "antd";
import type { TruongThongTin } from '@/models/Vanbang/Thongtinvanbang';
import { getTruongThongTin, saveTruongThongTin } from "@/services/Vanbang/Thongtinvanbang";

const { Option } = Select;

const CauHinhTruongThongTin: React.FC = () => {
  const [truongThongTinList, setTruongThongTinList] = useState<TruongThongTin[]>([]);
  const [editingTruong, setEditingTruong] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const truongThongTin = getTruongThongTin();
    setTruongThongTinList(truongThongTin);
  }, []);

  const handleAddTruong = (values: any) => {
    if (editingTruong) {
      const updatedList = truongThongTinList.map((item) =>
        item.tenTruong === editingTruong
          ? { tenTruong: values.tenTruong, kieuDuLieu: values.kieuDuLieu }
          : item
      );
      saveTruongThongTin(updatedList);
      setTruongThongTinList(updatedList);
      setEditingTruong(null);
      message.success("Chỉnh sửa trường thông tin thành công!");
    } else {
      const newTruong = {
        tenTruong: values.tenTruong,
        kieuDuLieu: values.kieuDuLieu,
      };
      const updatedList = [...truongThongTinList, newTruong];
      saveTruongThongTin(updatedList);
      setTruongThongTinList(updatedList);
      message.success("Thêm trường thông tin thành công!");
    }
    form.resetFields();
  };

  const handleEditTruong = (truong: TruongThongTin) => {
    setEditingTruong(truong.tenTruong);
    form.setFieldsValue({
      tenTruong: truong.tenTruong,
      kieuDuLieu: truong.kieuDuLieu,
    });
  };

  const handleDeleteTruong = (tenTruong: string) => {
    const updatedList = truongThongTinList.filter((item) => item.tenTruong !== tenTruong);
    saveTruongThongTin(updatedList);
    setTruongThongTinList(updatedList);
    message.success("Xóa trường thông tin thành công!");
  };

  const columns = [
    { title: "Tên trường", dataIndex: "tenTruong", key: "tenTruong" },
    { title: "Kiểu dữ liệu", dataIndex: "kieuDuLieu", key: "kieuDuLieu" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: TruongThongTin) => (
        <>
          <Button
            type="link"
            onClick={() => handleEditTruong(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteTruong(record.tenTruong)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Cấu hình Trường Thông tin Văn bằng</h1>
      <Form form={form} layout="inline" onFinish={handleAddTruong} style={{ marginBottom: 20 }}>
        <Form.Item
          name="tenTruong"
          rules={[{ required: true, message: "Nhập tên trường" }]}
        >
          <Input placeholder="Tên trường (VD: Dân tộc)" />
        </Form.Item>
        <Form.Item
          name="kieuDuLieu"
          rules={[{ required: true, message: "Chọn kiểu dữ liệu" }]}
        >
          <Select placeholder="Kiểu dữ liệu">
            <Option value="String">String</Option>
            <Option value="Number">Number</Option>
            <Option value="Date">Date</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingTruong ? "Cập nhật" : "Thêm trường"}
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={truongThongTinList} columns={columns} rowKey="tenTruong" />
    </div>
  );
};

export default CauHinhTruongThongTin;