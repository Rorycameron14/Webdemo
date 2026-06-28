import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and application settings.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Account</h2></CardHeader>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-semibold">
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500 mt-0.5">Admin account via Firebase Authentication</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Environment configuration</h2></CardHeader>
          <CardBody>
            <p className="text-sm text-gray-500 mb-4">
              Application settings are managed via environment variables. Update the <code className="bg-gray-100 rounded px-1 py-0.5 text-xs text-gray-700">.env</code> files in both <code className="bg-gray-100 rounded px-1 py-0.5 text-xs text-gray-700">client/</code> and <code className="bg-gray-100 rounded px-1 py-0.5 text-xs text-gray-700">server/</code> directories.
            </p>
            <div className="space-y-2">
              {[
                ['Database', 'PostgreSQL via DB_* variables in server/.env'],
                ['Email', 'Nodemailer via SMTP_* variables in server/.env'],
                ['Firebase', 'Service account JSON referenced by FIREBASE_SERVICE_ACCOUNT_PATH'],
                ['File uploads', 'Stored in /uploads, configurable via UPLOAD_DIR'],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-3 text-sm py-2 border-b border-gray-50 last:border-0">
                  <span className="font-medium text-gray-700 w-24 shrink-0">{key}</span>
                  <span className="text-gray-500">{val}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
