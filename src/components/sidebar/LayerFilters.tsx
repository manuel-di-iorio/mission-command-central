import { useAppStore } from '@/store/useAppStore';
import { Eye, EyeOff } from 'lucide-react';

export function LayerFilters() {
  const showOp = useAppStore((s) => s.showOperationalZones);
  const showRes = useAppStore((s) => s.showRestrictedZones);
  const toggleOp = useAppStore((s) => s.toggleOperationalZones);
  const toggleRes = useAppStore((s) => s.toggleRestrictedZones);

  return (
    <div className="space-y-1">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 mb-2">
        Map Layers
      </h3>
      <button onClick={toggleOp} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-secondary/50 transition-colors">
        {showOp ? <Eye className="h-3 w-3 text-primary" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
        <span className={showOp ? '' : 'text-muted-foreground'}>Operational Zones</span>
      </button>
      <button onClick={toggleRes} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-secondary/50 transition-colors">
        {showRes ? <Eye className="h-3 w-3 text-destructive" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
        <span className={showRes ? '' : 'text-muted-foreground'}>Restricted Zones</span>
      </button>
    </div>
  );
}
