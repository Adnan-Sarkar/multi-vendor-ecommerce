const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface VendorOrder {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  itemCount: number;
}

const mockOrders: VendorOrder[] = [
  { id: 'ORD-9001', customerName: 'John Doe', date: '2026-05-12', amount: 154.50, status: 'Pending', itemCount: 2 },
  { id: 'ORD-9002', customerName: 'Jane Smith', date: '2026-05-11', amount: 499.00, status: 'Processing', itemCount: 1 },
  { id: 'ORD-9003', customerName: 'Alice Johnson', date: '2026-05-10', amount: 89.99, status: 'Shipped', itemCount: 3 },
  { id: 'ORD-9004', customerName: 'Bob Brown', date: '2026-05-09', amount: 1250.00, status: 'Delivered', itemCount: 1 },
];

export async function getVendorOrders(): Promise<VendorOrder[]> {
  await delay(1000);
  return mockOrders;
}
