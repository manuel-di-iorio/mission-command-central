import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { MapView } from '@/components/map/MapView';
import { AssetList } from '@/components/sidebar/AssetList';
import { MissionList } from '@/components/sidebar/MissionList';
import { LayerFilters } from '@/components/sidebar/LayerFilters';
import { AssetDetail } from '@/components/panels/AssetDetail';
import { MissionDetail } from '@/components/panels/MissionDetail';
import { MissionForm } from '@/components/panels/MissionForm';
import { OrderForm } from '@/components/panels/OrderForm';
import { EventLog } from '@/components/panels/EventLog';
import { AlertPanel } from '@/components/panels/AlertPanel';
import { AnalyticsPanel } from '@/components/panels/AnalyticsPanel';
import { ComsecPanel } from '@/components/panels/ComsecPanel';
import { C2Panel } from '@/components/panels/C2Panel';
import { SIGINTPanel } from '@/components/panels/SIGINTPanel';
import { LogisticsPanel } from '@/components/panels/LogisticsPanel';
import { ThreatMatrix } from '@/components/panels/ThreatMatrix';
import { SecureComms } from '@/components/panels/SecureComms';
import { WeatherPanel } from '@/components/panels/WeatherPanel';
import { Satellite, BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, ShieldCheck, Zap, Shield, Radio, Package, X, MessageSquare, Cloud, Target, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatusBar = () => {
  const assets = useAppStore((s) => s.assets);
  const missions = useAppStore((s) => s.missions);
  const alerts = useAppStore((s) => s.alerts);
  const sigintContacts = useAppStore((s) => s.sigintContacts);
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;
  const highThreats = sigintContacts.filter(s => s.threat === 'HIGH' || s.threat === 'CRITICAL').length;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const compromised = assets.filter(a => a.telemetry.encryptionStatus !== 'AES-256' && a.status !== 'offline' && a.status !== 'destroyed').length;

  return (
    <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-6 shrink-0 z-50">
      {/* Classification banner inline */}
      <div className="bg-destructive/80 text-destructive-foreground px-3 py-0.5 rounded text-[8px] font-bold tracking-[0.2em] font-mono">
        TS//SCI
      </div>
      <div className="flex items-center gap-2.5">
        <div className="bg-primary/20 p-1 rounded">
          <Satellite className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col -gap-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/90 uppercase leading-tight">United Global Command</span>
          <span className="text-[7px] font-mono text-primary/70 tracking-widest leading-tight">UGC STANAG 4677 // LEVEL 4 AUTHORIZED</span>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-auto font-mono-data text-muted-foreground text-[10px]">
        <div className="flex items-center gap-3 bg-secondary/30 px-2 py-1 rounded border border-border/50">
          <div className="flex items-center gap-1.5 border-r border-border/50 pr-2">
            <ShieldCheck className="h-3 w-3 text-success" />
            <span className={cn("font-bold text-[9px]", compromised > 0 ? 'text-destructive' : 'text-success')}>
              COMSEC: {compromised > 0 ? `${compromised} BREACH` : 'SECURE'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3" />
            <span className={cn("font-bold text-[9px]", highThreats > 0 ? 'text-destructive' : 'text-success')}>
              SIGINT: {highThreats > 0 ? `${highThreats} HIGH` : 'CLEAR'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">ASSETS:</span>
          <span className="text-foreground font-bold">{assets.filter((a) => a.status !== 'offline' && a.status !== 'destroyed').length}/{assets.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">OPS:</span>
          <span className="text-foreground font-bold">{missions.filter((m) => m.status === 'active').length}</span>
        </div>
        {activeAlerts > 0 && (
          <div className="flex items-center gap-2 text-destructive animate-pulse-glow bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">
            <span className="font-bold">⚠ {activeAlerts} ALERTS</span>
          </div>
        )}
        <div className="bg-secondary/50 px-3 py-1 rounded text-foreground font-bold border border-border/50 tabular-nums">
          {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}Z
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
      <button onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-12 z-50 bg-border text-foreground hover:bg-primary hover:text-primary-foreground border border-border rounded-full p-0.5 transition-colors shadow-lg">
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={cn("flex-1 overflow-y-auto p-3 space-y-6 transition-opacity duration-300", collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
        <div className="flex items-center gap-2 px-1 mb-2">
          <LayoutDashboard className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">JFACC Dashboard</h2>
        </div>
        <ThreatMatrix />
        <ComsecPanel />
        <WeatherPanel />
        <AlertPanel />
        <AssetList />
        <div className="pt-2"><MissionList /></div>
        <div className="border-t border-border/50 pt-4"><LayerFilters /></div>
      </div>

      <div className={cn("p-2 border-t border-border/50 bg-card/80 space-y-1", collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
        <button onClick={() => setRightPanel('c2')} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all">
          <Shield className="h-3.5 w-3.5" /> C2 Structure
        </button>
        <button onClick={() => setRightPanel('sigint')} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all">
          <Radio className="h-3.5 w-3.5" /> SIGINT Feed
        </button>
        <button onClick={() => setRightPanel('logistics')} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all">
          <Package className="h-3.5 w-3.5" /> Logistics
        </button>
        <button onClick={() => setRightPanel('comms')} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all">
          <MessageSquare className="h-3.5 w-3.5" /> Secure Comms
        </button>
        <button onClick={() => setRightPanel('analytics')} className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium bg-secondary hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30 transition-all">
          <BarChart3 className="h-3.5 w-3.5" /> Intel Analytics
        </button>
      </div>
    </div>
  );
};

const RightPanel = () => {
  const rightPanel = useAppStore((s) => s.rightPanel);
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  if (rightPanel === 'none') return null;

  const panelTitle: Record<string, string> = {
    analytics: 'Intel Analytics', c2: 'Command & Control', sigint: 'Signal Intelligence', logistics: 'Logistics & Supply', comms: 'Secure Communications',
  };

  const showHeader = ['analytics', 'comms'].includes(rightPanel);

  return (
    <div className="w-80 border-l border-border bg-card shrink-0 overflow-hidden flex flex-col">
      {rightPanel === 'asset-detail' && <div className="overflow-y-auto flex-1"><AssetDetail /></div>}
      {rightPanel === 'mission-detail' && <div className="overflow-y-auto flex-1"><MissionDetail /></div>}
      {rightPanel === 'mission-form' && <div className="overflow-y-auto flex-1"><MissionForm /></div>}
      {rightPanel === 'order-form' && <div className="overflow-y-auto flex-1"><OrderForm /></div>}
      {rightPanel === 'analytics' && (
        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">{panelTitle[rightPanel]}</h2>
            <button onClick={() => setRightPanel('none')} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <AnalyticsPanel />
        </div>
      )}
      {rightPanel === 'c2' && <div className="overflow-y-auto flex-1"><C2Panel /></div>}
      {rightPanel === 'sigint' && <div className="overflow-y-auto flex-1"><SIGINTPanel /></div>}
      {rightPanel === 'logistics' && <div className="overflow-y-auto flex-1"><LogisticsPanel /></div>}
      {rightPanel === 'comms' && <div className="flex-1 flex flex-col overflow-hidden"><SecureComms /></div>}
    </div>
  );
};

export default function DashboardLayout() {
  const updateAssetPositions = useAppStore((s) => s.updateAssetPositions);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => updateAssetPositions(), 5000);
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
                <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-tighter">LIVE COP // MGRS GRID ENABLED // UGC UNCLASSIFIED</span>
              </div>
            </div>
            <MapView />
          </div>
          <div className="h-52 border-t border-border/50 bg-card/30 backdrop-blur-sm shrink-0 overflow-hidden">
            <EventLog />
          </div>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
