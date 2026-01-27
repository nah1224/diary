import { useState } from 'react';
import { appointments as initialAppointments } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [newAppointment, setNewAppointment] = useState({ title: '', description: '', date: '', time: '' });

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
      setNewAppointment({ title: '', description: '', date: '', time: '' });
      toast.success('Appointment added successfully!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appointment deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={newAppointment.title} onChange={e => setNewAppointment({ ...newAppointment, title: e.target.value })} />
          <Input placeholder="Description" value={newAppointment.description} onChange={e => setNewAppointment({ ...newAppointment, description: e.target.value })} />
          <div className="flex flex-col md:flex-row gap-4">
            <Input type="date" value={newAppointment.date} onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })} className="flex-grow" />
            <Input type="time" value={newAppointment.time} onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })} className="flex-grow" />
          </div>
          <Button onClick={handleAddAppointment}>Add Appointment</Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map(appointment => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>{appointment.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700">{appointment.description}</p>
              <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
              <div className="flex justify-end space-x-2">
                 <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
