import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, X, Bell } from 'lucide-react';

const severityStyles: Record<string, { bg: string; border: string; icon: string }> = {
  critical: { bg: 'bg-destructive/10', border: 'border-destructive/30', icon: 'text-destructive' },
  security: { bg: 'bg-destructive/20 animate-pulse-glow', border: 'border-destructive/50 shadow-glow-destructive', icon: 'text-destructive' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', icon: 'text-warning' },
  info: { bg: 'bg-primary/10', border: 'border-primary/30', icon: 'text-primary' },
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
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Alerts ({active.length})</span>
      </div>
      {active.map((alert) => {
        const style = severityStyles[alert.severity];
        return (
          <div key={alert.id} className={`${style.bg} border ${style.border} rounded p-2 text-xs relative`}>
            <button onClick={() => dismissAlert(alert.id)} className="absolute top-1 right-1 text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-1 mb-0.5">
              <AlertTriangle className={`h-3 w-3 ${style.icon}`} />
              <span className="font-medium">{alert.title}</span>
            </div>
            <p className="text-muted-foreground text-[10px] pr-4">{alert.message}</p>
          </div>
        );
      })}
    </div>
  );
}
