import { useAppStore } from '@/store/useAppStore';
import { Plane, Radio, Satellite, Truck, Ship, Navigation, Gauge, Clock, X, Battery, Wifi, ShieldCheck, ShieldAlert, Fuel, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  drone: Radio,
  aircraft: Plane,
  satellite: Satellite,
  'ground-vehicle': Truck,
  naval: Ship,
};

export function AssetDetail() {
  const assets = useAppStore((s) => s.assets);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);
  const missions = useAppStore((s) => s.missions);

  const asset = assets.find((a) => a.id === selectedAssetId);
  if (!asset) return null;

  const Icon = typeIcons[asset.type] || Radio;
  const assignedMissions = missions.filter((m) => m.assignedAssets.includes(asset.id));

  const statusColors: Record<string, string> = {
    active: 'text-success',
    offline: 'text-destructive',
    'in-mission': 'text-warning',
    'maintenance': 'text-muted-foreground',
    'jammed': 'text-destructive animate-pulse',
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-tight">{asset.name}</h2>
            <div className={cn("text-[9px] font-bold uppercase flex items-center gap-1", statusColors[asset.status])}>
              <div className={cn("h-1 w-1 rounded-full", asset.status === 'active' ? 'bg-success' : 'bg-destructive')} />
              {asset.status.replace('-', ' ')}
            </div>
          </div>
        </div>
        <button onClick={() => selectAsset(null)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <InfoCard label="Type" value={asset.type} />
          <InfoCard label="Classification" value="Classified" className="text-primary" />
          <InfoCard label="Speed" value={`${asset.speed} kts`} icon={<Gauge className="h-3 w-3" />} />
          <InfoCard label="Heading" value={`${asset.heading}°`} icon={<Navigation className="h-3 w-3" />} />
        </div>

        <div className="panel-border rounded-lg p-3 space-y-3 bg-secondary/20">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Live Telemetry</p>
          <div className="grid grid-cols-2 gap-4">
            <TelemetryBar label="Battery" value={asset.telemetry.battery} icon={<Battery className="h-3 w-3" />} color="bg-primary" />
            <TelemetryBar label="Signal" value={asset.telemetry.signalStrength} icon={<Wifi className="h-3 w-3" />} color="bg-success" />
            {asset.telemetry.fuel !== undefined && (
              <TelemetryBar label="Fuel" value={asset.telemetry.fuel} icon={<Fuel className="h-3 w-3" />} color="bg-warning" />
            )}
            {asset.telemetry.ammunition !== undefined && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[8px] uppercase font-bold text-muted-foreground">
                  <div className="flex items-center gap-1"><Zap className="h-2.5 w-2.5" /> AMMO</div>
                  <span>{asset.telemetry.ammunition} RDS</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={cn(
          "panel-border rounded-lg p-3 flex items-center justify-between",
          asset.telemetry.encryptionStatus === 'secure' ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
        )}>
          <div className="flex items-center gap-2">
            {asset.telemetry.encryptionStatus === 'secure' ? <ShieldCheck className="h-4 w-4 text-success" /> : <ShieldAlert className="h-4 w-4 text-destructive" />}
            <div>
              <p className="text-[9px] uppercase font-bold text-muted-foreground">Encryption</p>
              <p className={cn("text-[10px] font-bold uppercase", asset.telemetry.encryptionStatus === 'secure' ? 'text-success' : 'text-destructive')}>
                {asset.telemetry.encryptionStatus}
              </p>
            </div>
          </div>
          <div className="text-[8px] font-mono text-muted-foreground">COMM-LINK: SAT-0{asset.id.slice(-1)}</div>
        </div>

        <div className="panel-border rounded-lg p-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Position Coordinates</p>
          <p className="font-mono-data text-primary text-xs">
            {asset.position[0].toFixed(6)}° N<br />
            {Math.abs(asset.position[1]).toFixed(6)}° W
          </p>
        </div>

        {assignedMissions.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Operational Mandates</p>
            {assignedMissions.map((m) => (
              <div key={m.id} className="text-[10px] font-bold uppercase panel-border rounded-lg p-2 bg-primary/5 border-primary/20 flex items-center justify-between">
                <span>{m.name}</span>
                <span className="text-muted-foreground text-[8px]">{m.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value, className = '', icon }: { label: string; value: string; className?: string; icon?: React.ReactNode }) {
  return (
    <div className="panel-border rounded-lg p-2.5 bg-card/50">
      <p className="text-[9px] uppercase font-medium text-muted-foreground mb-1 tracking-tighter">{label}</p>
      <div className={`flex items-center gap-1.5 text-xs font-bold uppercase ${className}`}>
        {icon}
        {value}
      </div>
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
