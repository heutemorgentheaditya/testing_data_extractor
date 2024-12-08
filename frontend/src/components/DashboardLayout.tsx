import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  User
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/dashboard' 
    },
    { 
      icon: FileText, 
      label: 'Upload PDF', 
      href: '/dashboard/upload' 
    },
    { 
      icon: History, 
      label: 'History', 
      href: '/dashboard/history' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/dashboard/settings' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          w-64 bg-white border-r border-gray-200 shadow-lg`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">PDF Extract</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 
                hover:text-indigo-600 transition-all group"
            >
              <item.icon className="w-5 h-5 mr-3 group-hover:text-indigo-600" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center px-4 py-3 space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
          <button 
            onClick={() => console.log('Logout clicked')}
            className="mt-2 w-full flex items-center px-4 py-2 text-red-600 rounded-lg 
              hover:bg-red-50 transition-all group"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-lg lg:hidden hover:bg-gray-100 ${
                isSidebarOpen ? 'hidden' : 'block'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Today's Date: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;