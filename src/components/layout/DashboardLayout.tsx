import { useState, useEffect } from 'react';
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
import { ComsecPanel } from '@/components/panels/ComsecPanel';
import { Satellite, BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatusBar = () => {
  const assets = useAppStore((s) => s.assets);
  const missions = useAppStore((s) => s.missions);
  const alerts = useAppStore((s) => s.alerts);
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-6 shrink-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary/20 p-1 rounded">
          <Satellite className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col -gap-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/90 uppercase leading-tight">Mission Command Central</span>
          <span className="text-[7px] font-mono text-primary/70 tracking-widest leading-tight">SECURE TRANSMISSION // LEVEL 4 AUTHORIZED</span>
        </div>
      </div>
      <div className="flex items-center gap-6 ml-auto font-mono-data text-muted-foreground text-[10px]">
        <div className="flex items-center gap-3 bg-secondary/30 px-2 py-1 rounded border border-border/50">
          <div className="flex items-center gap-1.5 border-r border-border/50 pr-2">
            <ShieldCheck className="h-3 w-3 text-success" />
            <span className="text-success font-bold text-[9px]">COMSEC: SECURE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-warning" />
            <span className="text-warning font-bold text-[9px]">THREAT: LOW</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">ASSETS:</span>
          <span className="text-foreground font-bold">{assets.filter((a) => a.status !== 'offline').length}/{assets.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">ACTIVE MISSIONS:</span>
          <span className="text-foreground font-bold">{missions.filter((m) => m.status === 'active').length}</span>
        </div>
        {activeAlerts > 0 && (
          <div className="flex items-center gap-2 text-destructive animate-pulse-glow bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">
            <span className="font-bold">⚠ {activeAlerts} SYSTEM ALERTS</span>
          </div>
        )}
        <div className="bg-secondary/50 px-3 py-1 rounded text-foreground font-bold border border-border/50 tabular-nums">
          {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const LeftSidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) => {
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  return (
    <div className={cn(
      "border-r border-border bg-card/50 backdrop-blur-md flex flex-col shrink-0 transition-all duration-300 ease-in-out relative",
      collapsed ? "w-12" : "w-64"
    )}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-12 z-50 bg-border text-foreground hover:bg-primary hover:text-primary-foreground border border-border rounded-full p-0.5 transition-colors shadow-lg"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={cn("flex-1 overflow-y-auto p-3 space-y-6 transition-opacity duration-300", collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
        <div className="flex items-center gap-2 px-1 mb-2">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Joint Ops Command</h2>
        </div>
        <ComsecPanel />
        <AlertPanel />
        <AssetList />
        <div className="pt-2">
          <MissionList />
        </div>
        <div className="border-t border-border/50 pt-4">
          <LayerFilters />
        </div>
      </div>

      <div className={cn("p-2 border-t border-border/50 bg-card/80", collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
        <button
          onClick={() => setRightPanel('analytics')}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all"
        >
          <BarChart3 className="h-4 w-4" />
          Intel Analytics
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
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateAssetPositions();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateAssetPositions]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background selection:bg-primary/30">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar collapsed={leftSidebarCollapsed} setCollapsed={setLeftSidebarCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative bg-muted/5">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-card/80 backdrop-blur-md border border-border/50 px-3 py-1.5 rounded-lg shadow-2xl flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-tighter">LIVE TACTICAL FEED // GRID ENABLED</span>
              </div>
            </div>
            <MapView />
          </div>
          <div className="h-60 border-t border-border/50 bg-card/30 backdrop-blur-sm shrink-0 overflow-hidden">
            <EventLog />
          </div>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
