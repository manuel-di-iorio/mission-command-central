import { useAppStore } from '@/store/useAppStore';
import { Radio, AlertTriangle, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

const threatColors: Record<string, string> = {
  CRITICAL: 'text-destructive bg-destructive/10 border-destructive/30',
  HIGH: 'text-warning bg-warning/10 border-warning/30',
  MEDIUM: 'text-foreground bg-secondary/20 border-border/50',
  LOW: 'text-muted-foreground bg-muted/10 border-border/30',
};

export function SIGINTPanel() {
  const sigintContacts = useAppStore((s) => s.sigintContacts);
  const activeContacts = sigintContacts.filter(s => s.status === 'active');

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-tight">SIGINT Feed</h2>
        </div>
        <div className="text-[9px] font-mono text-muted-foreground">{activeContacts.length} active</div>
      </div>

      <div className="space-y-2">
        {sigintContacts.map(contact => (
          <div key={contact.id} className={cn('panel-border rounded-lg p-3 space-y-2', contact.status === 'lost' && 'opacity-50')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className={cn('h-4 w-4', contact.threat === 'HIGH' || contact.threat === 'CRITICAL' ? 'text-destructive' : 'text-muted-foreground')} />
                <div>
                  <div className="text-[10px] font-bold uppercase">{contact.type} Contact</div>
                  <div className="text-[8px] text-muted-foreground">DET BY: {contact.detectedBy}</div>
                </div>
              </div>
              <div className={cn('text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase', threatColors[contact.threat])}>
                {contact.threat}
              </div>
            </div>

            <div className="text-[10px] text-foreground/80 font-medium">{contact.signalType}</div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground">
              {contact.frequency && <div>FREQ: <span className="text-foreground">{contact.frequency}</span></div>}
              <div>BRG: <span className="text-foreground">{contact.bearing}°</span></div>
              <div>POS: <span className="text-primary">{contact.position[0].toFixed(3)}°N</span></div>
              <div>STATUS: <span className={contact.status === 'active' ? 'text-warning' : 'text-muted-foreground'}>{contact.status.toUpperCase()}</span></div>
            </div>

            <div className={cn('text-[7px] font-mono font-bold',
              contact.classification === 'TOP SECRET' ? 'text-destructive' : 'text-warning'
            )}>{contact.classification}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
