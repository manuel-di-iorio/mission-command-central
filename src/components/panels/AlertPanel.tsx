import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, X, Bell, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const severityStyles: Record<string, { bg: string; border: string; icon: string }> = {
  critical: { bg: 'bg-destructive/10', border: 'border-destructive/30', icon: 'text-destructive' },
  security: { bg: 'bg-destructive/20 animate-pulse-glow', border: 'border-destructive/50', icon: 'text-destructive' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', icon: 'text-warning' },
  info: { bg: 'bg-primary/10', border: 'border-primary/30', icon: 'text-primary' },
};

const classColors: Record<string, string> = {
  'UNCLASSIFIED': 'text-muted-foreground', 'CONFIDENTIAL': 'text-success',
  'SECRET': 'text-warning', 'TOP SECRET': 'text-destructive', 'TOP SECRET//SCI': 'text-destructive',
};

export function AlertPanel() {
  const alerts = useAppStore((s) => s.alerts);
  const dismissAlert = useAppStore((s) => s.dismissAlert);
  const active = alerts.filter((a) => !a.dismissed);

  if (active.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 px-1 mb-1">
        <Bell className="h-3 w-3 text-destructive animate-pulse-glow" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Alerts ({active.length})</span>
      </div>
      {active.map((alert) => {
        const style = severityStyles[alert.severity];
        return (
          <div key={alert.id} className={cn(style.bg, 'border', style.border, 'rounded p-2 text-xs relative')}>
            <button onClick={() => dismissAlert(alert.id)} className="absolute top-1 right-1 text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-1 mb-0.5">
              <AlertTriangle className={cn('h-3 w-3', style.icon)} />
              <span className="font-medium">{alert.title}</span>
            </div>
            <p className="text-muted-foreground text-[10px] pr-4">{alert.message}</p>
            <div className={cn('text-[7px] font-mono font-bold mt-1', classColors[alert.classification])}>{alert.classification}</div>
          </div>
        );
      })}
    </div>
  );
}
