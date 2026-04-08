import { useAppStore } from '@/store/useAppStore';
import { Asset } from '@/data/types';
import { Plane, Radio, Satellite, Truck, Ship, Crosshair, Anchor, Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  UAV: Radio,
  'fixed-wing': Plane,
  'rotary-wing': Plane,
  satellite: Satellite,
  APC: Truck,
  MBT: Hexagon,
  IFV: Truck,
  frigate: Ship,
  submarine: Anchor,
  'patrol-boat': Ship,
};

const statusClass: Record<string, string> = {
  operational: 'bg-success',
  offline: 'bg-destructive',
  deployed: 'bg-warning',
  RTB: 'bg-primary',
  maintenance: 'bg-muted-foreground',
  damaged: 'bg-destructive',
  destroyed: 'bg-destructive',
};

const readinessColor: Record<string, string> = {
  C1: 'text-success',
  C2: 'text-warning',
  C3: 'text-destructive',
  C4: 'text-destructive',
};

export function AssetList() {
  const assets = useAppStore((s) => s.assets);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);

  return (
    <div className="space-y-1">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 mb-2">
        Force Disposition ({assets.length})
      </h3>
      {assets.map((asset) => {
        const Icon = typeIcons[asset.type] || Radio;
        const isSelected = asset.id === selectedAssetId;
        return (
          <button
            key={asset.id}
            onClick={() => selectAsset(isSelected ? null : asset.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all',
              isSelected ? 'bg-primary/10 border border-primary/30 glow-primary' : 'hover:bg-secondary/50'
            )}
          >
            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="flex-1 text-left min-w-0">
              <div className="truncate font-medium">{asset.callsign}</div>
              <div className="text-[9px] text-muted-foreground truncate">{asset.name}</div>
            </div>
            <span className={cn('text-[8px] font-bold font-mono', readinessColor[asset.readiness])}>{asset.readiness}</span>
            <span className={cn('h-2 w-2 rounded-full shrink-0', statusClass[asset.status])} />
          </button>
        );
      })}
    </div>
  );
}
