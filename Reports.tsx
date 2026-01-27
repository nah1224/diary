import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Reports = () => {

  const handleGenerateReport = () => {
    toast.info('Report generation functionality is not yet implemented.');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>Select reporting criteria to generate a report.</p>
            <div className="flex flex-col md:flex-row gap-4">
                <Input type="date" className="flex-grow" />
                <Input type="date" className="flex-grow" />
            </div>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Output</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Your generated report will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
