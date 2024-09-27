import { notFound } from 'next/navigation';
import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

async function getSpace(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/spaces/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function SpacePage({
  params
}: {
  params: { id: string };
}) {
  const space = await getSpace(params.id);

  if (!space) {
    notFound();
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome to {space.name} 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {/* The rest of your component content remains unchanged */}
            {/* ... */}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
