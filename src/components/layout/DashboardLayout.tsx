import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { MapView } from '@/components/map/MapView';
import { AssetList } from '@/components/sidebar/AssetList';
import { MissionList } from '@/components/sidebar/MissionList';
import { LayerFilters } from '@/components/sidebar/LayerFilters';
import { AssetDetail } from '@/components/panels/AssetDetail';
import { MissionDetail } from '@/components/panels/MissionDetail';
import { MissionForm } from '@/components/panels/MissionForm';
import { EventLog } from '@/components/panels/EventLog';
import { AlertPanel } from '@/components/panels/AlertPanel';
import { AnalyticsPanel } from '@/components/panels/AnalyticsPanel';
import { Satellite, BarChart3 } from 'lucide-react';

const StatusBar = () => {
  const assets = useAppStore((s) => s.assets);
  const missions = useAppStore((s) => s.missions);
  const alerts = useAppStore((s) => s.alerts);
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;

  return (
    <div className="h-8 border-b border-border bg-card flex items-center px-4 gap-6 shrink-0">
      <div className="flex items-center gap-2">
        <Satellite className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold tracking-wide">MISSION INTEL</span>
      </div>
      <div className="flex items-center gap-4 ml-auto font-mono-data text-muted-foreground">
        <span>ASSETS: <span className="text-foreground">{assets.filter((a) => a.status !== 'offline').length}/{assets.length}</span></span>
        <span>MISSIONS: <span className="text-foreground">{missions.filter((m) => m.status === 'active').length}</span></span>
        {activeAlerts > 0 && <span className="text-destructive animate-pulse-glow">⚠ {activeAlerts} ALERTS</span>}
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

const LeftSidebar = () => {
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  return (
    <div className="w-56 border-r border-border bg-card flex flex-col shrink-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        <AlertPanel />
        <AssetList />
        <div className="border-t border-border pt-3">
          <MissionList />
        </div>
        <div className="border-t border-border pt-3">
          <LayerFilters />
        </div>
      </div>
      <div className="p-2 border-t border-border">
        <button
          onClick={() => setRightPanel('analytics')}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded text-xs bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <BarChart3 className="h-3 w-3" />
          Analytics
        </button>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const rightPanel = useAppStore((s) => s.rightPanel);
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  if (rightPanel === 'none') return null;

  return (
    <div className="w-72 border-l border-border bg-card shrink-0 overflow-y-auto">
      {rightPanel === 'asset-detail' && <AssetDetail />}
      {rightPanel === 'mission-detail' && <MissionDetail />}
      {rightPanel === 'mission-form' && <MissionForm />}
      {rightPanel === 'analytics' && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Analytics Overview</h2>
            <button onClick={() => setRightPanel('none')} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
          </div>
          <AnalyticsPanel />
        </div>
      )}
    </div>
  );
};

export default function DashboardLayout() {
  const updateAssetPositions = useAppStore((s) => s.updateAssetPositions);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateAssetPositions();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateAssetPositions]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <MapView />
          </div>
          <div className="h-52 border-t border-border bg-card shrink-0 overflow-hidden p-2">
            <EventLog />
          </div>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
