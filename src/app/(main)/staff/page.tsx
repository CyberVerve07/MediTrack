import { Suspense } from 'react';
import { StaffDashboard } from '@/components/staff/staff-dashboard';
import { StaffSkeleton } from '@/components/staff/staff-skeleton';

export default function StaffPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
      </div>
      <Suspense fallback={<StaffSkeleton />}>
        <StaffDashboard />
      </Suspense>
    </div>
  );
}
