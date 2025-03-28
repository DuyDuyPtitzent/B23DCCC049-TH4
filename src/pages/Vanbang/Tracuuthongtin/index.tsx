import React, { useState } from "react";
import { Button, Form, Input, Table, DatePicker, message } from "antd";
import { ThongTinVanBang, TruongThongTin } from "@/models/Vanbang/Thongtinvanbang";
import {
    getLuotTraCuu,
    incrementLuotTraCuu,
} from "@/services/Vanbang/Tracuuvanbang";
import { getThongTinVanBang,
    getTruongThongTin
} from "@/services/Vanbang/Thongtinvanbang";
  

  const TraCuuVanBang: React.FC = () => {
    const [form] = Form.useForm();
    const [ketQuaTimKiem, setKetQuaTimKiem] = useState<ThongTinVanBang[]>([]);
    const [truongThongTinList, setTruongThongTinList] = useState<TruongThongTin[]>([]);
  
    React.useEffect(() => {
      setTruongThongTinList(getTruongThongTin());
    }, []);
  
    const handleTraCuu = (values: any) => {
      const { soHieuVanBang, soVaoSo, maSinhVien, hoTen, ngaySinh } = values;
  
      const filledFields = [
        soHieuVanBang,
        soVaoSo,
        maSinhVien,
        hoTen,
        ngaySinh ? ngaySinh.format("YYYY-MM-DD") : undefined,
      ].filter((field) => field !== undefined && field !== "");
      if (filledFields.length < 2) {
        message.error("Vui lòng nhập ít nhất 2 tham số để tra cứu!");
        return;
      }
  
      const thongTinList = getThongTinVanBang();
      const ketQua = thongTinList.filter((item) => {
        return (
          (!soHieuVanBang || item.soHieuVanBang.includes(soHieuVanBang)) &&
          (!soVaoSo || item.soVaoSo === Number(soVaoSo)) &&
          (!maSinhVien || item.maSinhVien.includes(maSinhVien)) &&
          (!hoTen || item.hoTen.toLowerCase().includes(hoTen.toLowerCase())) &&
          (!ngaySinh || item.ngaySinh === ngaySinh.format("YYYY-MM-DD"))
        );
      });
  
      if (ketQua.length > 0) {
        ketQua.forEach((item) => incrementLuotTraCuu(item.loaiTotNghiep));
        setKetQuaTimKiem(ketQua);
        message.success(`Tìm thấy ${ketQua.length} kết quả!`);
      } else {
        setKetQuaTimKiem([]);
        message.warning("Không tìm thấy kết quả nào!");
      }
    };
  
    const columns = [
      { title: "Số vào sổ", dataIndex: "soVaoSo", key: "soVaoSo" },
      { title: "Số hiệu VB", dataIndex: "soHieuVanBang", key: "soHieuVanBang" },
      { title: "Mã SV", dataIndex: "maSinhVien", key: "maSinhVien" },
      { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
      { title: "Ngày sinh", dataIndex: "ngaySinh", key: "ngaySinh" },
      { title: "Số QĐ", dataIndex: "soQD", key: "soQD" },
      { title: "Loại tốt nghiệp", dataIndex: "loaiTotNghiep", key: "loaiTotNghiep" },
      { title: "Sổ văn bằng", dataIndex: "maSoVanBang", key: "maSoVanBang" },
      ...truongThongTinList.map((truong) => ({
        title: truong.tenTruong,
        dataIndex: truong.tenTruong,
        key: truong.tenTruong,
      })),
    ];
  
    return (
      <div style={{ padding: 20 }}>
        <h1>Tra cứu Văn bằng</h1>
        <Form
          form={form}
          layout="inline"
          onFinish={handleTraCuu}
          style={{ marginBottom: 20, flexWrap: "wrap" }}
        >
          <Form.Item name="soHieuVanBang" label="Số hiệu văn bằng">
            <Input placeholder="VD: VB1/2023" />
          </Form.Item>
          <Form.Item name="soVaoSo" label="Số vào sổ">
            <Input type="number" placeholder="VD: 1" />
          </Form.Item>
          <Form.Item name="maSinhVien" label="Mã sinh viên">
            <Input placeholder="VD: SV001" />
          </Form.Item>
          <Form.Item name="hoTen" label="Họ tên">
            <Input placeholder="VD: Nguyễn Văn A" />
          </Form.Item>
          <Form.Item name="ngaySinh" label="Ngày sinh">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tra cứu
            </Button>
          </Form.Item>
        </Form>
  
        <h2>Kết quả tìm kiếm</h2>
        <Table
          dataSource={ketQuaTimKiem}
          columns={columns}
          rowKey={(record) => `${record.maSoVanBang}-${record.soVaoSo}`}
          pagination={false}
        />
  
        <h2>Tổng số lượt tra cứu theo loại tốt nghiệp</h2>
        <ul>
          {Object.entries(getLuotTraCuu()).map(([loaiTotNghiep, soLuot]) => (
            <li key={loaiTotNghiep}>
              {loaiTotNghiep}: {soLuot} lượt
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TraCuuVanBang;