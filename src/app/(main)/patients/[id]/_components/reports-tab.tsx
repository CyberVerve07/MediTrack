import type { TestReport } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { format } from 'date-fns';

type ReportsTabProps = {
  reports: TestReport[];
};

export function ReportsTab({ reports }: ReportsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <ul className="grid gap-4">
            {reports.map(report => (
              <li
                key={report.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.category} -{' '}
                      {format(new Date(report.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="icon" asChild>
                  <a href={report.url} download>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download Report</span>
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            <p>No test reports available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
