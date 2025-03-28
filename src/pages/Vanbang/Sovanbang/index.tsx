import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm, message } from "antd";
import { SoVanBang } from "@/models/Vanbang/Thongtinvanbang"; // Cập nhật import phù hợp với models
import { getAllSoVanBang, createSoVanBang, deleteSoVanBang } from "@/services/Vanbang/Sovanbang"; // Dùng service riêng

const SoVanBangPage: React.FC = () => {
  const [soVanBangList, setSoVanBangList] = useState<SoVanBang[]>([]);
  const [newNam, setNewNam] = useState<number>(new Date().getFullYear());

  // Lấy dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      const localData = localStorage.getItem("soVanBangList");
      const data = localData ? JSON.parse(localData) : await getAllSoVanBang();
      setSoVanBangList(data);
    };
    fetchData();
  }, []);

  // Lưu danh sách sổ văn bằng vào localStorage
  const saveToLocalStorage = (data: SoVanBang[]) => {
    localStorage.setItem("soVanBangList", JSON.stringify(data));
  };

  const handleAddSoVanBang = async () => {
    if (!newNam) return;

    // Tính số thứ tự hiện tại dựa trên danh sách hiện có trong năm đó
    const soVanBangInYear = soVanBangList.filter((item) => item.nam === newNam);
    const newSoThuTu = soVanBangInYear.length + 1; // Tăng dần từ 1
    const newMaSoVanBang = `SB${newNam}`;

    const newSoVanBang = await createSoVanBang({ nam: newNam, soThuTu: newSoThuTu });
    const updatedList = [...soVanBangList, { ...newSoVanBang, maSoVanBang: newMaSoVanBang }];
    setSoVanBangList(updatedList);
    saveToLocalStorage(updatedList);
    message.success("Thêm sổ văn bằng thành công!");
  };

  const handleDeleteSoVanBang = async (maSoVanBang: string) => {
    await deleteSoVanBang(maSoVanBang);

    // Lọc danh sách sau khi xóa
    const updatedList = soVanBangList.filter((item) => item.maSoVanBang !== maSoVanBang);
    
    // Cập nhật lại toàn bộ danh sách trong cùng năm của sổ vừa xóa
    const nam = parseInt(maSoVanBang.split("_")[0].replace("SB", ""));
    const soVanBangInYear = updatedList.filter((item) => item.nam === nam);

    // Sắp xếp lại số thứ tự và mã số văn bằng
    const reindexedList = updatedList.map((item) => {
      if (item.nam === nam) {
        const newIndex = soVanBangInYear.findIndex((i) => i.maSoVanBang === item.maSoVanBang) + 1;
        return {
          ...item,
          soThuTuHienTai: newIndex,
          maSoVanBang: `SB${nam}_${newIndex}`,
        };
      }
      return item;
    });

    setSoVanBangList(reindexedList);
    saveToLocalStorage(reindexedList);
    message.success("Xóa thành công");
  };

  const columns = [
    { title: "Mã số vào sổ văn bằng", dataIndex: "maSoVanBang", key: "maSoVanBang" },
    { title: "Năm", dataIndex: "nam", key: "nam" },
    { title: "Số thứ tự hiện tại", dataIndex: "soThuTuHienTai", key: "soThuTuHienTai" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: SoVanBang) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDeleteSoVanBang(record.maSoVanBang)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Quản lý sổ văn bằng</h1>
      <Form layout="inline" style={{ marginBottom: 20 }}>
        <Form.Item>
          <Input
            type="number"
            value={newNam}
            onChange={(e) => setNewNam(parseInt(e.target.value))}
            placeholder="Nhập năm"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddSoVanBang}>
            Thêm sổ văn bằng
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={soVanBangList} columns={columns} rowKey="maSoVanBang" />
    </div>
  );
};

export default SoVanBangPage;