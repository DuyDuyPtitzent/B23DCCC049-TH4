import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, DatePicker, Select, Popconfirm, message } from "antd";
import { QuyetDinhTotNghiep, SoVanBang } from "@/models/Vanbang/Thongtinvanbang"; // Cập nhật import
import {
  getAllQuyetDinhTotNghiep,
  createQuyetDinhTotNghiep,
  deleteQuyetDinhTotNghiep,
} from "@/services/Vanbang/Quyetdinhtotnghiep"; // Cập nhật tên file
import { getAllSoVanBang } from "@/services/Vanbang/Sovanbang"; // Cập nhật tên file

const { Option } = Select;

const VanBangQuyetDinhThiTotNghiep: React.FC = () => {
  const [quyetDinhList, setQuyetDinhList] = useState<QuyetDinhTotNghiep[]>([]);
  const [soVanBangList, setSoVanBangList] = useState<SoVanBang[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const quyetDinh = await getAllQuyetDinhTotNghiep();
      const soVanBangRaw = await getAllSoVanBang();

      // Lọc danh sách sổ văn bằng để chỉ lấy các mục duy nhất dựa trên maSoVanBang
      const uniqueSoVanBang = Array.from(
        new Map(soVanBangRaw.map((sb) => [sb.maSoVanBang, sb])).values()
      );

      setQuyetDinhList(quyetDinh);
      setSoVanBangList(uniqueSoVanBang);
    };
    fetchData();
  }, []);

  const handleAddQuyetDinh = async (values: any) => {
    try {
      const newQuyetDinh: QuyetDinhTotNghiep = {
        soQD: values.soQD,
        ngayBanHanh: values.ngayBanHanh.format("YYYY-MM-DD"),
        trichYeu: values.trichYeu,
        maSoVanBang: values.maSoVanBang,
      };
      const createdQuyetDinh = await createQuyetDinhTotNghiep(newQuyetDinh);
      setQuyetDinhList([...quyetDinhList, createdQuyetDinh]);
      form.resetFields();
      message.success("Thêm quyết định tốt nghiệp thành công!");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleDeleteQuyetDinh = async (soQD: string) => {
    await deleteQuyetDinhTotNghiep(soQD);
    setQuyetDinhList(quyetDinhList.filter((item) => item.soQD !== soQD));
    message.success("Xóa thành công");
  };

  const columns = [
    { title: "Số QĐ", dataIndex: "soQD", key: "soQD" },
    { title: "Ngày ban hành", dataIndex: "ngayBanHanh", key: "ngayBanHanh" },
    { title: "Trích yếu", dataIndex: "trichYeu", key: "trichYeu" },
    { title: "Sổ văn bằng", dataIndex: "maSoVanBang", key: "maSoVanBang" },
    
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý Quyết định Tốt nghiệp</h1>
      <Form
        form={form}
        layout="inline"
        onFinish={handleAddQuyetDinh}
        style={{ marginBottom: 20, flexWrap: "wrap" }}
      >
        <Form.Item
          name="soQD"
          rules={[{ required: true, message: "Nhập số QĐ" }]}
        >
          <Input placeholder="VD: QĐ1/2023" />
        </Form.Item>
        <Form.Item
          name="ngayBanHanh"
          rules={[{ required: true, message: "Chọn ngày ban hành" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="trichYeu"
          rules={[{ required: true, message: "Nhập trích yếu" }]}
        >
          <Input placeholder="Trích yếu" />
        </Form.Item>
        <Form.Item
          name="maSoVanBang"
          rules={[{ required: true, message: "Chọn sổ văn bằng" }]}
        >
          <Select placeholder="Chọn sổ văn bằng">
            {soVanBangList.map((sb) => (
              <Option key={sb.maSoVanBang} value={sb.maSoVanBang}>
                {sb.maSoVanBang}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm quyết định
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={quyetDinhList} columns={columns} rowKey="soQD" />
    </div>
  );
};

export default VanBangQuyetDinhThiTotNghiep;