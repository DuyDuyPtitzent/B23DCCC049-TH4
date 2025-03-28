import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, DatePicker, Select, Popconfirm, message } from "antd";
import { ThongTinVanBang, SoVanBang, TruongThongTin } from "@/models/Vanbang/Thongtinvanbang"; // Cập nhật import
import {
  getThongTinVanBang,
  saveThongTinVanBang,
  getSoVanBang,
  getTruongThongTin,
} from "@/services/Vanbang/Thongtinvanbang"; // Cập nhật tên file
import { getAllQuyetDinhTotNghiep } from "@/services/Vanbang/Quyetdinhtotnghiep"; // Cập nhật tên file

const { Option } = Select;

const ThongTinVanBangComponent: React.FC = (): JSX.Element => {
  const [thongTinList, setThongTinList] = useState<ThongTinVanBang[]>([]);
  const [soVanBangList, setSoVanBangList] = useState<SoVanBang[]>([]);
  const [truongThongTinList, setTruongThongTinList] = useState<TruongThongTin[]>([]);
  const [quyetDinhList, setQuyetDinhList] = useState<any[]>([]);
  const [form] = Form.useForm();

  const loaiTotNghiepOptions = ["Yếu", "Trung bình", "Khá", "Giỏi", "Xuất sắc"];
  const heDaoTaoOptions = ["Chính quy", "Đào tạo từ xa", "Sau đại học", "Liên thông"];

  useEffect(() => {
    const fetchData = () => {
      const thongTin = getThongTinVanBang();
      const soVanBangRaw = getSoVanBang();
      const truongThongTin = getTruongThongTin();
      const quyetDinh = getAllQuyetDinhTotNghiep();

      // Lọc danh sách sổ văn bằng để chỉ lấy các mục duy nhất dựa trên maSoVanBang
      const uniqueSoVanBang = Array.from(
        new Map(soVanBangRaw.map((sb) => [sb.maSoVanBang, sb])).values()
      );

      setThongTinList(thongTin);
      setSoVanBangList(uniqueSoVanBang);
      setTruongThongTinList(truongThongTin);
      setQuyetDinhList(quyetDinh);
    };
    fetchData();
  }, []);

  const handleAddThongTin = (values: any) => {
    try {
      const maSoVanBang = values.maSoVanBang;
      const selectedSoVanBang = soVanBangList.find((sb) => sb.maSoVanBang === maSoVanBang);
      if (!selectedSoVanBang) throw new Error("Sổ văn bằng không tồn tại");

      const year = selectedSoVanBang.nam.toString();
      const vanBangInSameSo = thongTinList.filter((item) => item.maSoVanBang === maSoVanBang);
      const newSoVaoSo = vanBangInSameSo.length + 1;
      const newSoHieuVanBang = `VB${newSoVaoSo}/${year}`;

      const newThongTin: ThongTinVanBang = {
        soVaoSo: newSoVaoSo,
        soHieuVanBang: newSoHieuVanBang,
        maSinhVien: values.maSinhVien,
        hoTen: values.hoTen,
        ngaySinh: values.ngaySinh ? values.ngaySinh.format("YYYY-MM-DD") : "",
        soQD: values.soQD,
        loaiTotNghiep: values.loaiTotNghiep,
        heDaoTao: values.heDaoTao, // Thêm trường heDaoTao
        maSoVanBang: maSoVanBang,
      };

      truongThongTinList.forEach((truong) => {
        newThongTin[truong.tenTruong] =
          truong.kieuDuLieu === "Date" && values[truong.tenTruong]
            ? values[truong.tenTruong].format("YYYY-MM-DD")
            : values[truong.tenTruong];
      });

      const updatedList = [...thongTinList, newThongTin];
      saveThongTinVanBang(updatedList);
      setThongTinList(updatedList);
      form.resetFields();
      message.success("Thêm thông tin văn bằng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm văn bằng:", error);
      message.error("Thêm văn bằng thất bại!");
    }
  };

  const handleDeleteThongTin = (soVaoSo: number, maSoVanBang: string) => {
    try {
      const updatedList = thongTinList.filter(
        (item) => !(item.soVaoSo === soVaoSo && item.maSoVanBang === maSoVanBang)
      );
      saveThongTinVanBang(updatedList);
      setThongTinList(updatedList);
      message.success("Xóa thành công");
    } catch (error) {
      console.error("Lỗi khi xóa văn bằng:", error);
      message.error("Xóa văn bằng thất bại!");
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
    { title: "Hệ đào tạo", dataIndex: "heDaoTao", key: "heDaoTao" }, // Thêm cột Hệ đào tạo
    { title: "Sổ văn bằng", dataIndex: "maSoVanBang", key: "maSoVanBang" },
    ...truongThongTinList.map((truong) => ({
      title: truong.tenTruong,
      dataIndex: truong.tenTruong,
      key: truong.tenTruong,
    })),
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_: any, record: ThongTinVanBang) => (
    //     <Popconfirm
    //       title="Bạn có chắc chắn muốn xóa?"
    //       onConfirm={() => handleDeleteThongTin(record.soVaoSo, record.maSoVanBang)}
    //       okText="Có"
    //       cancelText="Không"
    //     >
    //       <Button type="primary" danger>
    //         Xóa
    //       </Button>
    //     </Popconfirm>
    //   ),
    // },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý Thông tin Văn bằng</h1>
      <Form
        form={form}
        layout="inline"
        onFinish={handleAddThongTin}
        style={{ marginBottom: 20, flexWrap: "wrap" }}
      >
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
        <Form.Item
          name="maSinhVien"
          rules={[{ required: true, message: "Nhập mã sinh viên" }]}
        >
          <Input placeholder="Mã SV" />
        </Form.Item>
        <Form.Item name="hoTen" rules={[{ required: true, message: "Nhập họ tên" }]}>
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          name="ngaySinh"
          rules={[{ required: true, message: "Chọn ngày sinh" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="soQD" rules={[{ required: true, message: "Chọn số QĐ" }]}>
          <Select placeholder="Chọn số QĐ">
            {quyetDinhList.map((qd) => (
              <Option key={qd.soQD} value={qd.soQD}>
                {qd.soQD} ({qd.trichYeu})
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="loaiTotNghiep"
          rules={[{ required: true, message: "Chọn loại tốt nghiệp" }]}
        >
          <Select placeholder="Chọn loại tốt nghiệp">
            {loaiTotNghiepOptions.map((loai) => (
              <Option key={loai} value={loai}>
                {loai}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="heaoTao"
          rules={[{ required: true, message: "Chọn hệ đào tạo" }]}
        >
          <Select placeholder="Chọn hệ đào tạo">
            {heDaoTaoOptions.map((he) => (
              <Option key={he} value={he}>
                {he}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {truongThongTinList.map((truong) => (
          <Form.Item
            key={truong.tenTruong}
            name={truong.tenTruong}
            rules={[{ required: true, message: `Nhập ${truong.tenTruong}` }]}
          >
            {truong.kieuDuLieu === "Date" ? (
              <DatePicker format="YYYY-MM-DD" placeholder={truong.tenTruong} />
            ) : (
              <Input
                type={truong.kieuDuLieu === "Number" ? "number" : "text"}
                placeholder={truong.tenTruong}
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm văn bằng
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={thongTinList}
        columns={columns}
        rowKey={(record) => `${record.maSoVanBang}-${record.soVaoSo}`}
      />
    </div>
  );
};

export default ThongTinVanBangComponent;