import { useAppointmentData } from '../../../hooks/useAppointmentData';
import { Card } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import AppointmentCountCard from './components/AppointmentCountCard';
import FilterControls from './components/FilterControls';
import RevenueTable from './components/RevenueTable';
import RevenueChart from './components/RevenueChart';

const BaoCaoPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'ngay' | 'thang'>('ngay');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(moment());

  const {
    filteredAppointments,
    revenueByService,
    revenueByEmployee
  } = useAppointmentData(filterType, selectedDate);

  useEffect(() => {
    console.log('Revenue by Service:', revenueByService);
    console.log('Revenue by Employee:', revenueByEmployee);
  }, [revenueByService, revenueByEmployee]);

  const handleFilterChange = (e: any) => {
    setFilterType(e.target.value);
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
  };

  return (
    <Card
      title="Báo cáo thống kê"
      extra={
        <FilterControls
          filterType={filterType}
          selectedDate={selectedDate}
          onFilterChange={handleFilterChange}
          onDateChange={handleDateChange}
        />
      }
    >
      <AppointmentCountCard count={filteredAppointments.length} />

      <RevenueTable title="Dịch vụ" data={revenueByService} />
      <RevenueChart
        title="Doanh thu theo dịch vụ"
        data={Object.entries(revenueByService).map(([name, revenue]) => ({ name, revenue }))}
      />

      <RevenueTable title="Nhân viên" data={revenueByEmployee} />
      <RevenueChart
        title="Doanh thu theo nhân viên "
        data={Object.entries(revenueByEmployee).map(([name, revenue]) => ({ name, revenue }))}
      />
    </Card>
  );
};

export default BaoCaoPage;