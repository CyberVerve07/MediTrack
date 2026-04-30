import { Suspense } from 'react';
import { PharmacyDashboardPremium } from '@/components/pharmacy/pharmacy-dashboard-premium';
import { PharmacySkeleton } from '@/components/pharmacy/pharmacy-skeleton';

export default function PharmacyPage() {
  return (
    <div className="flex-1 p-6 md:p-8">
      <Suspense fallback={<PharmacySkeleton />}>
        <PharmacyDashboardPremium />
      </Suspense>
    </div>
  );
}
