import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ setSidebarOpen }: { setSidebarOpen: (isOpen: boolean) => void }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b lg:hidden">
      <h1 className="text-xl font-bold">Diary</h1>
      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
        <Menu />
      </Button>
    </header>
  );
};

export default Header;
