import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const publicLinks = [
  { to: '/jobs', label: 'Browse Jobs' },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <Navbar links={publicLinks} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
