'use client';

// This component is no longer used and has been deprecated
// after removing the AI functionality from the application.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ImprovementNotesTab() {
  return (
     <Card>
      <CardHeader>
        <CardTitle>AI Health History Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">AI functionality has been removed.</p>
      </CardContent>
    </Card>
  )
}
