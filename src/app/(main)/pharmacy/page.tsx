import { Suspense } from 'react';
import { PharmacyDashboard } from '@/components/pharmacy/pharmacy-dashboard';
import { PharmacySkeleton } from '@/components/pharmacy/pharmacy-skeleton';

export default function PharmacyPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pharmacy</h2>
      </div>
      <Suspense fallback={<PharmacySkeleton />}>
        <PharmacyDashboard />
      </Suspense>
    </div>
  );
}
