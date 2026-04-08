import { useAppStore } from '@/store/useAppStore';
import { Eye, EyeOff, Radio } from 'lucide-react';

export function LayerFilters() {
  const showOp = useAppStore((s) => s.showOperationalZones);
  const showRes = useAppStore((s) => s.showRestrictedZones);
  const showSIG = useAppStore((s) => s.showSIGINT);
  const showWP = useAppStore((s) => s.showWaypoints);
  const toggleOp = useAppStore((s) => s.toggleOperationalZones);
  const toggleRes = useAppStore((s) => s.toggleRestrictedZones);
  const toggleSIG = useAppStore((s) => s.toggleSIGINT);
  const toggleWP = useAppStore((s) => s.toggleWaypoints);

  return (
    <div className="space-y-1">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 mb-2">Map Layers</h3>
      <LayerToggle label="AO / Operational Zones" active={showOp} onToggle={toggleOp} color="text-primary" />
      <LayerToggle label="NFZ / KEZ / MEZ / FSA" active={showRes} onToggle={toggleRes} color="text-destructive" />
      <LayerToggle label="SIGINT Contacts" active={showSIG} onToggle={toggleSIG} color="text-warning" />
      <LayerToggle label="Order Waypoints" active={showWP} onToggle={toggleWP} color="text-primary" />
    </div>
  );
}

function LayerToggle({ label, active, onToggle, color }: { label: string; active: boolean; onToggle: () => void; color: string }) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-secondary/50 transition-colors">
      {active ? <Eye className={`h-3 w-3 ${color}`} /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
      <span className={active ? '' : 'text-muted-foreground'}>{label}</span>
    </button>
  );
}
