import { useAppStore } from '@/store/useAppStore';
import { Asset } from '@/data/types';
import { Plane, Radio, Satellite, Truck, Ship } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  drone: Radio,
  aircraft: Plane,
  satellite: Satellite,
  'ground-vehicle': Truck,
  naval: Ship,
};

const statusClass: Record<string, string> = {
  active: 'bg-success',
  offline: 'bg-destructive',
  'in-mission': 'bg-warning',
};

export function AssetList() {
  const assets = useAppStore((s) => s.assets);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);

  return (
    <div className="space-y-1">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 mb-2">
        Assets ({assets.length})
      </h3>
      {assets.map((asset) => {
        const Icon = typeIcons[asset.type] || Radio;
        const isSelected = asset.id === selectedAssetId;
        return (
          <button
            key={asset.id}
            onClick={() => selectAsset(isSelected ? null : asset.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all ${
              isSelected ? 'bg-primary/10 border border-primary/30 glow-primary' : 'hover:bg-secondary/50'
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="flex-1 text-left truncate">{asset.name}</span>
            <span className={`h-2 w-2 rounded-full shrink-0 ${statusClass[asset.status]}`} />
          </button>
        );
      })}
    </div>
  );
}
