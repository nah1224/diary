import { useState } from 'react';
import { diaryEntries as initialDiaryEntries } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Diary = () => {
  const [diaryEntries, setDiaryEntries] = useState(initialDiaryEntries);
  const [newEntry, setNewEntry] = useState({ date: '', title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      setDiaryEntries([...diaryEntries, { ...newEntry, id: Date.now(), date: newEntry.date || new Date().toISOString().split('T')[0] }]);
      setNewEntry({ date: '', title: '', content: '' });
      toast.success('Diary entry added successfully!');
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  const handleDeleteEntry = (id: number) => {
    setDiaryEntries(diaryEntries.filter(entry => entry.id !== id));
    toast.success('Diary entry deleted successfully!');
  };

  const filteredEntries = diaryEntries.filter(entry =>
    (entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || entry.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDate ? entry.date === searchDate : true)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Diary Entries</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} className="w-full md:w-auto" />
          <Input placeholder="Title" value={newEntry.title} onChange={e => setNewEntry({ ...newEntry, title: e.target.value })} />
          <Textarea placeholder="Content" value={newEntry.content} onChange={e => setNewEntry({ ...newEntry, content: e.target.value })} />
          <Button onClick={handleAddEntry}>Add Entry</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Entries</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search by keyword..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-grow" />
          <Input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} className="w-full md:w-auto" />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map(entry => (
          <Card key={entry.id}>
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-500">{entry.date}</p>
              <p className="text-gray-700">{entry.content.substring(0, 100)}...</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Diary;
