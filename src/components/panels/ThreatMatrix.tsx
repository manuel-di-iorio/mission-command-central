import { useAppStore } from '@/store/useAppStore';
import { Shield, AlertTriangle, Target, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThreatMatrix() {
  const sigintContacts = useAppStore((s) => s.sigintContacts);
  const assets = useAppStore((s) => s.assets);
  const alerts = useAppStore((s) => s.alerts);

  const threatLevels = {
    CRITICAL: sigintContacts.filter(s => s.threat === 'CRITICAL').length,
    HIGH: sigintContacts.filter(s => s.threat === 'HIGH').length,
    MEDIUM: sigintContacts.filter(s => s.threat === 'MEDIUM').length,
    LOW: sigintContacts.filter(s => s.threat === 'LOW').length,
  };

  const compromisedAssets = assets.filter(a => a.telemetry.encryptionStatus === 'compromised' || a.telemetry.encryptionStatus === 'COMSEC-FAIL');
  const hostileContacts = sigintContacts.filter(s => s.status === 'active');
  const activeAlerts = alerts.filter(a => !a.dismissed && (a.severity === 'critical' || a.severity === 'security'));

  const overallThreat = threatLevels.CRITICAL > 0 ? 'CRITICAL' : threatLevels.HIGH > 0 ? 'HIGH' : threatLevels.MEDIUM > 0 ? 'ELEVATED' : 'LOW';

  const threatColor: Record<string, string> = {
    CRITICAL: 'text-destructive',
    HIGH: 'text-destructive',
    ELEVATED: 'text-warning',
    LOW: 'text-success',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Threat Assessment Matrix</h3>
      </div>

      {/* Overall threat level */}
      <div className={cn(
        "border rounded-lg p-3 text-center",
        overallThreat === 'CRITICAL' ? 'border-destructive/50 bg-destructive/10 animate-pulse-glow' :
        overallThreat === 'HIGH' ? 'border-destructive/30 bg-destructive/5' :
        overallThreat === 'ELEVATED' ? 'border-warning/30 bg-warning/5' :
        'border-success/30 bg-success/5'
      )}>
        <p className="text-[9px] text-muted-foreground font-mono">FORCE PROTECTION CONDITION</p>
        <p className={cn("text-lg font-bold font-mono tracking-widest", threatColor[overallThreat])}>{overallThreat}</p>
      </div>

      {/* Threat grid */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(threatLevels).map(([level, count]) => (
          <div key={level} className="bg-secondary/30 border border-border/50 rounded p-2 text-center">
            <p className="text-[9px] text-muted-foreground font-mono">{level}</p>
            <p className={cn("text-lg font-bold font-mono", count > 0 ? (
              level === 'CRITICAL' || level === 'HIGH' ? 'text-destructive' : level === 'MEDIUM' ? 'text-warning' : 'text-success'
            ) : 'text-muted-foreground')}>{count}</p>
          </div>
        ))}
      </div>

      {/* Key indicators */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between bg-secondary/20 px-2 py-1.5 rounded text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Crosshair className="h-3 w-3" /> Active SIGINT Contacts
          </span>
          <span className={cn("font-bold", hostileContacts.length > 0 ? 'text-warning' : 'text-success')}>{hostileContacts.length}</span>
        </div>
        <div className="flex items-center justify-between bg-secondary/20 px-2 py-1.5 rounded text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Shield className="h-3 w-3" /> COMSEC Breaches
          </span>
          <span className={cn("font-bold", compromisedAssets.length > 0 ? 'text-destructive' : 'text-success')}>{compromisedAssets.length}</span>
        </div>
        <div className="flex items-center justify-between bg-secondary/20 px-2 py-1.5 rounded text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <AlertTriangle className="h-3 w-3" /> Critical Alerts
          </span>
          <span className={cn("font-bold", activeAlerts.length > 0 ? 'text-destructive' : 'text-success')}>{activeAlerts.length}</span>
        </div>
      </div>
    </div>
  );
}
