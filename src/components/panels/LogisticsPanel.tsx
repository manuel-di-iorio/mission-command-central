import { useAppStore } from '@/store/useAppStore';
import { Package, Fuel, Zap, AlertTriangle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LogisticsPanel() {
  const assets = useAppStore((s) => s.assets);

  const criticalAssets = assets.filter(a =>
    a.supply.fuel.current < 20 ||
    a.supply.medical === 'critical' || a.supply.medical === 'depleted' ||
    a.supply.spares === 'critical' ||
    (a.supply.ammunition.max > 0 && a.supply.ammunition.current / a.supply.ammunition.max < 0.2)
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-tight">Logistics Overview</h2>
      </div>

      {criticalAssets.length > 0 && (
        <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-center gap-1 text-[10px] font-bold text-destructive uppercase mb-1">
            <AlertTriangle className="h-3 w-3" /> {criticalAssets.length} Asset(s) Require Resupply
          </div>
          <div className="space-y-0.5">
            {criticalAssets.map(a => (
              <div key={a.id} className="text-[9px] text-foreground">{a.callsign} — {a.unitDesignation}</div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {assets.map(asset => {
          const fuelPct = asset.supply.fuel.current;
          const ammoPct = asset.supply.ammunition.max > 0 ? (asset.supply.ammunition.current / asset.supply.ammunition.max) * 100 : -1;

          return (
            <div key={asset.id} className="panel-border rounded-lg p-3 space-y-2 bg-card/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase">{asset.callsign}</div>
                  <div className="text-[8px] text-muted-foreground">{asset.name}</div>
                </div>
                <div className={cn('text-[8px] font-bold uppercase',
                  asset.readiness === 'C1' ? 'text-success' : asset.readiness === 'C4' ? 'text-destructive' : 'text-warning'
                )}>{asset.readiness}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <SupplyBar label="FUEL" value={fuelPct} icon={<Fuel className="h-2.5 w-2.5" />} unit={`${Math.round(fuelPct)}%`} />
                {ammoPct >= 0 && (
                  <SupplyBar label="AMMO" value={ammoPct} icon={<Zap className="h-2.5 w-2.5" />} unit={`${asset.supply.ammunition.current}/${asset.supply.ammunition.max}`} />
                )}
              </div>

              <div className="flex gap-2">
                <MiniPill label="MED" value={asset.supply.medical} />
                <MiniPill label="SPARES" value={asset.supply.spares} />
                {asset.supply.rations > 0 && <MiniPill label="RATIONS" value={`${asset.supply.rations}d`} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SupplyBar({ label, value, icon, unit }: { label: string; value: number; icon: React.ReactNode; unit: string }) {
  const color = value > 50 ? 'bg-success' : value > 20 ? 'bg-warning' : 'bg-destructive';
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[8px] uppercase font-bold text-muted-foreground">
        <div className="flex items-center gap-1">{icon} {label}</div>
        <span>{unit}</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div className={cn('h-full transition-all duration-500', color)} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

function MiniPill({ label, value }: { label: string; value: string }) {
  const color = value === 'full' || value === 'adequate' ? 'text-success bg-success/10 border-success/20'
    : value === 'critical' || value === 'depleted' ? 'text-destructive bg-destructive/10 border-destructive/20'
    : 'text-warning bg-warning/10 border-warning/20';
  return (
    <div className={cn('text-[7px] font-bold uppercase px-1.5 py-0.5 rounded border', color)}>
      {label}: {value}
    </div>
  );
}
