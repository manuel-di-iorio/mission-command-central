import { useAppStore } from '@/store/useAppStore';
import { Clock, AlertTriangle, Target, Radio, MapPin, ShieldAlert, Send, Package, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  OPORD_ISSUED: Target,
  FRAGO_ISSUED: Target,
  ASSET_DEPLOYED: Send,
  CONTACT_REPORT: Crosshair,
  STATUS_CHANGE: AlertTriangle,
  SITREP: Radio,
  MEDEVAC_REQ: AlertTriangle,
  FIRES_REQUEST: Crosshair,
  SUPPLY_REQ: Package,
  SECURITY_BREACH: ShieldAlert,
  COMMS_LOST: Radio,
  ORDER_ISSUED: Send,
};

const severityColors: Record<string, string> = {
  info: 'border-l-primary',
  warning: 'border-l-warning',
  critical: 'border-l-destructive',
  security: 'border-l-destructive animate-pulse bg-destructive/5',
};

const classificationBadge: Record<string, string> = {
  'UNCLASSIFIED': 'text-muted-foreground',
  'CONFIDENTIAL': 'text-success',
  'SECRET': 'text-warning',
  'TOP SECRET': 'text-destructive',
  'TOP SECRET//SCI': 'text-destructive font-bold',
};

export function EventLog() {
  const events = useAppStore((s) => s.events);
  const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="panel-border rounded overflow-hidden h-full flex flex-col">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2 shrink-0">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Operations Log (OPREP)</span>
        <span className="ml-auto text-[10px] text-muted-foreground">{events.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map((event) => {
          const Icon = typeIcons[event.type] || Clock;
          return (
            <div key={event.id} className={cn('flex items-start gap-2 px-3 py-2 border-l-2', severityColors[event.severity], 'hover:bg-secondary/30 transition-colors')}>
              <Icon className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn('text-[7px] font-mono font-bold uppercase', classificationBadge[event.classification])}>{event.classification}</span>
                  <span className="text-[7px] text-muted-foreground font-mono">{event.type}</span>
                </div>
                <p className="text-xs">{event.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] text-muted-foreground font-mono-data">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour12: false })}
                  </p>
                  <span className="text-[8px] text-muted-foreground">— {event.originator}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
