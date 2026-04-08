import { useAppStore } from '@/store/useAppStore';
import { Plane, Radio, Satellite, Truck, Ship, Navigation, Gauge, X, Battery, Wifi, ShieldCheck, ShieldAlert, Fuel, Zap, Crosshair, Package, Hexagon, Anchor, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  UAV: Radio, 'fixed-wing': Plane, 'rotary-wing': Plane, satellite: Satellite,
  APC: Truck, MBT: Hexagon, IFV: Truck, frigate: Ship, submarine: Anchor, 'patrol-boat': Ship,
};

export function AssetDetail() {
  const assets = useAppStore((s) => s.assets);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);
  const missions = useAppStore((s) => s.missions);
  const orders = useAppStore((s) => s.orders);
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  const asset = assets.find((a) => a.id === selectedAssetId);
  if (!asset) return null;

  const Icon = typeIcons[asset.type] || Radio;
  const assignedMissions = missions.filter((m) => m.assignedAssets.includes(asset.id));
  const currentOrder = orders.find(o => o.id === asset.currentOrderId);

  const statusColors: Record<string, string> = {
    operational: 'text-success', offline: 'text-destructive', deployed: 'text-warning',
    RTB: 'text-primary', maintenance: 'text-muted-foreground', damaged: 'text-destructive animate-pulse', destroyed: 'text-destructive',
  };

  const readinessDesc: Record<string, string> = { C1: 'FULLY MISSION CAPABLE', C2: 'SUBSTANTIALLY CAPABLE', C3: 'MARGINALLY CAPABLE', C4: 'NOT MISSION CAPABLE' };

  return (
    <div className="p-4 space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-tight">{asset.callsign}</h2>
            <div className="text-[9px] text-muted-foreground">{asset.name}</div>
            <div className={cn("text-[9px] font-bold uppercase flex items-center gap-1 mt-0.5", statusColors[asset.status])}>
              <div className={cn("h-1 w-1 rounded-full", asset.status === 'operational' ? 'bg-success' : 'bg-destructive')} />
              {asset.status}
            </div>
          </div>
        </div>
        <button onClick={() => selectAsset(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InfoCard label="Platform" value={asset.type} />
        <InfoCard label="IFF" value={asset.telemetry.iff} className={asset.telemetry.iff === 'HOSTILE' ? 'text-destructive' : asset.telemetry.iff === 'UNKNOWN' ? 'text-warning' : 'text-success'} />
        <InfoCard label="Readiness" value={asset.readiness} className={asset.readiness === 'C1' ? 'text-success' : asset.readiness === 'C4' ? 'text-destructive' : 'text-warning'} />
        <InfoCard label="Speed" value={`${asset.speed} kts`} icon={<Gauge className="h-3 w-3" />} />
        <InfoCard label="Heading" value={`${asset.heading}°`} icon={<Navigation className="h-3 w-3" />} />
        {asset.altitude && <InfoCard label="Altitude" value={`${(asset.altitude / 1000).toFixed(1)}k ft`} />}
      </div>

      <div className="panel-border rounded-lg p-2.5 bg-muted/20">
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{readinessDesc[asset.readiness]}</p>
        <p className="text-[9px] text-muted-foreground">Unit: {asset.unitDesignation}</p>
      </div>

      {/* Supply Status */}
      <div className="panel-border rounded-lg p-3 space-y-2 bg-secondary/20">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1"><Package className="h-3 w-3" /> Logistics Status</p>
        <div className="grid grid-cols-2 gap-3">
          <TelemetryBar label="Fuel" value={asset.supply.fuel.current} icon={<Fuel className="h-3 w-3" />} color="bg-warning" />
          <TelemetryBar label="Signal" value={asset.telemetry.signalStrength} icon={<Wifi className="h-3 w-3" />} color="bg-success" />
          <TelemetryBar label="Battery" value={asset.telemetry.battery} icon={<Battery className="h-3 w-3" />} color="bg-primary" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[8px] uppercase font-bold text-muted-foreground">
              <div className="flex items-center gap-1"><Zap className="h-2.5 w-2.5" /> AMMO</div>
              <span>{asset.supply.ammunition.current}/{asset.supply.ammunition.max}</span>
            </div>
            <div className="text-[7px] text-muted-foreground">{asset.supply.ammunition.type}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <MiniStatus label="MED" value={asset.supply.medical} />
          <MiniStatus label="SPARES" value={asset.supply.spares} />
          {asset.supply.rations > 0 && <MiniStatus label="RATIONS" value={`${asset.supply.rations}d`} />}
        </div>
      </div>

      {/* COMSEC */}
      <div className={cn(
        "panel-border rounded-lg p-3 flex items-center justify-between",
        asset.telemetry.encryptionStatus === 'AES-256' ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
      )}>
        <div className="flex items-center gap-2">
          {asset.telemetry.encryptionStatus === 'AES-256' ? <ShieldCheck className="h-4 w-4 text-success" /> : <ShieldAlert className="h-4 w-4 text-destructive" />}
          <div>
            <p className="text-[9px] uppercase font-bold text-muted-foreground">COMSEC</p>
            <p className={cn("text-[10px] font-bold uppercase", asset.telemetry.encryptionStatus === 'AES-256' ? 'text-success' : 'text-destructive')}>
              {asset.telemetry.encryptionStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Current Order */}
      {currentOrder && (
        <div className="panel-border rounded-lg p-3 bg-primary/5 border-primary/20">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1 flex items-center gap-1"><Crosshair className="h-3 w-3" /> Current Order</p>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-primary">{currentOrder.type}</span>
            <span className="text-[8px] text-muted-foreground">{currentOrder.priority}</span>
          </div>
          <p className="text-[9px] text-foreground/80">{currentOrder.description}</p>
        </div>
      )}

      {/* Position */}
      <div className="panel-border rounded-lg p-3">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Grid Reference</p>
        <p className="font-mono-data text-primary">{asset.position[0].toFixed(6)}° N, {Math.abs(asset.position[1]).toFixed(6)}° W</p>
      </div>

      {assignedMissions.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Active Tasking</p>
          {assignedMissions.map((m) => (
            <div key={m.id} className="panel-border rounded-lg p-2 bg-primary/5 border-primary/20 flex items-center justify-between text-[10px] font-bold uppercase">
              <span>{m.name}</span>
              <span className="text-[8px] text-muted-foreground">{m.status}</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setRightPanel('order-form')}
        className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
        <Send className="h-3 w-3" /> Issue Order
      </button>
    </div>
  );
}

function InfoCard({ label, value, className = '', icon }: { label: string; value: string; className?: string; icon?: React.ReactNode }) {
  return (
    <div className="panel-border rounded-lg p-2.5 bg-card/50">
      <p className="text-[9px] uppercase font-medium text-muted-foreground mb-1 tracking-tighter">{label}</p>
      <div className={cn('flex items-center gap-1.5 text-xs font-bold uppercase', className)}>{icon}{value}</div>
    </div>
  );
}

function TelemetryBar({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[8px] uppercase font-bold text-muted-foreground">
        <div className="flex items-center gap-1">{icon} {label}</div>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-500", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniStatus({ label, value }: { label: string; value: string }) {
  const color = value === 'full' || value === 'adequate' ? 'text-success' : value === 'critical' || value === 'depleted' ? 'text-destructive' : 'text-warning';
  return (
    <div className="text-center">
      <div className="text-[7px] uppercase text-muted-foreground">{label}</div>
      <div className={cn('text-[8px] font-bold uppercase', color)}>{value}</div>
    </div>
  );
}
