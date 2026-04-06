import { useAppStore } from '@/store/useAppStore';
import { Plane, Radio, Satellite, Truck, Ship, Navigation, Gauge, Clock, X } from 'lucide-react';

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
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">{asset.name}</h2>
        </div>
        <button onClick={() => selectAsset(null)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <InfoCard label="Status" value={asset.status} className={statusColors[asset.status]} />
          <InfoCard label="Type" value={asset.type} />
          <InfoCard label="Speed" value={`${asset.speed} kts`} icon={<Gauge className="h-3 w-3" />} />
          <InfoCard label="Heading" value={`${asset.heading}°`} icon={<Navigation className="h-3 w-3" />} />
        </div>

        <div className="panel-border rounded p-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Position</p>
          <p className="font-mono-data text-primary">
            {asset.position[0].toFixed(4)}° N, {Math.abs(asset.position[1]).toFixed(4)}° W
          </p>
        </div>

        <div className="panel-border rounded p-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Last Update</p>
          <div className="flex items-center gap-1 font-mono-data text-muted-foreground">
            <Clock className="h-3 w-3" />
            {new Date(asset.lastUpdate).toLocaleTimeString()}
          </div>
        </div>

        {assignedMissions.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Assigned Missions</p>
            {assignedMissions.map((m) => (
              <div key={m.id} className="text-xs panel-border rounded p-2 mt-1">
                {m.name} <span className="text-muted-foreground">({m.status})</span>
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
    <div className="panel-border rounded p-2">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
      <div className={`flex items-center gap-1 text-xs font-medium capitalize ${className}`}>
        {icon}
        {value}
      </div>
    </div>
  );
}
