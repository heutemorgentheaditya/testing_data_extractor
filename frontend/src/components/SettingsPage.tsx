import { useState } from 'react';
import { 
  User, 
  Bell, 
  FileDown, 
  Key, 
  Save,
  Copy
} from 'lucide-react';

const SettingsPage = () => {
  const [apiKey] = useState('sk-12345678-abcd-efgh-ijkl');
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    processingComplete: true,
    extractionFailed: true
  });

  const [exportSettings, setExportSettings] = useState({
    format: 'xlsx',
    includeHeaders: true,
    dateFormat: 'MM/DD/YYYY'
  });

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">
                {key.split(/(?=[A-Z])/).join(' ')}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => 
                    setNotifications(prev => ({
                      ...prev,
                      [key]: !prev[key]
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Export Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileDown className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Export Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={exportSettings.format}
              onChange={(e) => 
                setExportSettings(prev => ({
                  ...prev,
                  format: e.target.value
                }))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="xlsx">Excel (XLSX)</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exportSettings.includeHeaders}
                onChange={() => 
                  setExportSettings(prev => ({
                    ...prev,
                    includeHeaders: !prev.includeHeaders
                  }))
                }
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">Include Column Headers</span>
            </label>
          </div>
        </div>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">API Key</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
            />
            <button
              onClick={copyApiKey}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;