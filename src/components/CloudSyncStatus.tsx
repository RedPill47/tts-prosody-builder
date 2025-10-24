import { useState, useEffect } from 'react';
import { Cloud, CloudOff, LogIn, LogOut, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { fullSync } from '../utils/cloudSync';
import AuthModal from './AuthModal';

const CloudSyncStatus = () => {
  const { user, signOut, isConfigured } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  // Auto-sync when user logs in
  useEffect(() => {
    if (user) {
      handleSync();
    }
  }, [user]);

  const handleSync = async () => {
    if (!user) return;

    setSyncStatus('syncing');

    const result = await fullSync(user.id);

    if (result.success) {
      setSyncStatus('success');
      setLastSynced(new Date());
      setTimeout(() => setSyncStatus('idle'), 2000);
    } else {
      setSyncStatus('error');
      console.error('Sync failed:', result.error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setSyncStatus('idle');
    setLastSynced(null);
  };

  // If Supabase is not configured, don't show anything
  if (!isConfigured) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-3 text-sm">
        {user ? (
          <>
            {/* Sync Status Indicator */}
            <div className="flex items-center gap-2">
              {syncStatus === 'syncing' && (
                <div className="flex items-center gap-1 text-blue-600">
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Syncing...</span>
                </div>
              )}
              {syncStatus === 'success' && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} />
                  <span>Synced</span>
                </div>
              )}
              {syncStatus === 'error' && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle size={16} />
                  <span>Sync failed</span>
                </div>
              )}
              {syncStatus === 'idle' && lastSynced && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Cloud size={16} />
                  <span>Last synced: {lastSynced.toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-2 border-l pl-3 border-gray-300">
              <span className="text-gray-700">{user.email}</span>
              <button
                onClick={handleSync}
                disabled={syncStatus === 'syncing'}
                className="p-1 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                title="Sync now"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={handleSignOut}
                className="p-1 text-gray-600 hover:text-gray-700"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Not signed in */}
            <div className="flex items-center gap-2 text-gray-600">
              <CloudOff size={16} />
              <span>Offline mode</span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          </>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default CloudSyncStatus;
