import Column from '@/components/Column';
import DashCards from '@/components/authorsComponents/DashCards';
import { DashDataTable } from '@/components/authorsComponents/DashDataTable';
import React from 'react'

function Dashboard() {
  return (
    <Column  className="flex-1">
      <DashCards />
      <DashDataTable/>
    </Column>
  );
}

export default Dashboard;
