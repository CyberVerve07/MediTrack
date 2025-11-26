import type { Billing } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

type BillingTabProps = {
  billing: Billing | undefined;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function BillingTab({ billing }: BillingTabProps) {
    if (!billing) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Billing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No billing information available for this patient.</p>
                </CardContent>
            </Card>
        )
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billing.items.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">{currencyFormatter.format(item.unitPrice)}</TableCell>
                <TableCell className="text-right">{currencyFormatter.format(item.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2 pt-4">
        <Separator />
        <div className="flex w-full justify-end text-lg font-semibold">
            <div className='w-1/4 flex justify-between'>
                <span>Total</span>
                <span>{currencyFormatter.format(billing.total)}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
