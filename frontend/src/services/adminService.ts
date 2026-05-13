const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface VendorApplication {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  appliedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const mockApplications: VendorApplication[] = [
  { id: 'APP-001', storeName: 'Tech Haven', ownerName: 'Mike Ross', email: 'mike@techhaven.com', appliedDate: '2026-05-13', status: 'Pending' },
  { id: 'APP-002', storeName: 'Organic Foods Co.', ownerName: 'Sarah Smith', email: 'sarah@organicfoods.com', appliedDate: '2026-05-12', status: 'Pending' },
  { id: 'APP-003', storeName: 'Sneaker City', ownerName: 'James Bond', email: 'james@sneakercity.com', appliedDate: '2026-05-10', status: 'Approved' },
];

export async function getPendingVendorApplications(): Promise<VendorApplication[]> {
  await delay(1000);
  return mockApplications.filter(app => app.status === 'Pending');
}
