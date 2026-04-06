import { useAppStore } from '@/store/useAppStore';
import { Clock, AlertTriangle, Target, Radio, MapPin } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  mission_created: Target,
  asset_assigned: Radio,
  status_update: AlertTriangle,
  alert: AlertTriangle,
  position_update: MapPin,
};

const severityColors: Record<string, string> = {
  info: 'border-l-primary',
  warning: 'border-l-warning',
  critical: 'border-l-destructive',
};

export function EventLog() {
  const events = useAppStore((s) => s.events);
  const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="panel-border rounded overflow-hidden">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Event Log</span>
        <span className="ml-auto text-[10px] text-muted-foreground">{events.length}</span>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {sorted.map((event) => {
          const Icon = typeIcons[event.type] || Clock;
          return (
            <div key={event.id} className={`flex items-start gap-2 px-3 py-2 border-l-2 ${severityColors[event.severity]} hover:bg-secondary/30 transition-colors`}>
              <Icon className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs truncate">{event.message}</p>
                <p className="text-[10px] text-muted-foreground font-mono-data">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
