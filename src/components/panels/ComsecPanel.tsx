import { useAppStore } from '@/store/useAppStore';
import { useShallow } from 'zustand/react/shallow';
import { ShieldCheck, ShieldAlert, Radio, Lock, Unlock, Wifi, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ComsecPanel() {
  const assets = useAppStore(useShallow((s) => s.assets.filter(a => a.status !== 'offline' && a.status !== 'destroyed')));

  const compromisedCount = assets.filter(a => a.telemetry.encryptionStatus !== 'AES-256').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <ShieldCheck className="h-4 w-4" />
          COMSEC Status
        </div>
        {compromisedCount > 0 && (
          <div className="flex items-center gap-1 text-[8px] text-destructive font-bold animate-pulse">
            <AlertTriangle className="h-3 w-3" /> {compromisedCount} BREACH
          </div>
        )}
      </div>

      <div className="space-y-2">
        {assets.map((asset) => (
          <div key={asset.id} className="panel-border rounded-lg p-2.5 bg-card/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radio className={cn("h-4 w-4", asset.telemetry.encryptionStatus === 'compromised' || asset.telemetry.encryptionStatus === 'COMSEC-FAIL' ? 'text-destructive' : 'text-primary')} />
                {asset.telemetry.encryptionStatus === 'AES-256' && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-success rounded-full border border-card" />
                )}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-foreground">{asset.callsign}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all duration-500",
                      asset.telemetry.signalStrength > 70 ? 'bg-success' :
                      asset.telemetry.signalStrength > 30 ? 'bg-warning' : 'bg-destructive'
                    )} style={{ width: `${asset.telemetry.signalStrength}%` }} />
                  </div>
                  <span className="text-[8px] font-mono text-muted-foreground">{Math.round(asset.telemetry.signalStrength)}% SIG</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {asset.telemetry.encryptionStatus === 'AES-256' ? (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-success/10 border border-success/20 text-[8px] font-bold text-success uppercase">
                  <Lock className="h-2 w-2" /> AES-256
                </div>
              ) : asset.telemetry.encryptionStatus === 'compromised' ? (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-destructive/10 border border-destructive/20 text-[8px] font-bold text-destructive uppercase animate-pulse">
                  <ShieldAlert className="h-2 w-2" /> BREACH
                </div>
              ) : asset.telemetry.encryptionStatus === 'EMCON' ? (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning/10 border border-warning/20 text-[8px] font-bold text-warning uppercase">
                  <Wifi className="h-2 w-2" /> EMCON
                </div>
              ) : (
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-destructive/10 border border-destructive/20 text-[8px] font-bold text-destructive uppercase">
                  <Unlock className="h-2 w-2" /> FAIL
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
        <div className="text-[9px] font-bold text-primary uppercase mb-2">Network Encryption Health</div>
        <div className="flex gap-1 h-1.5">
          {assets.map((a, i) => (
            <div key={i} className={cn("flex-1 rounded-full", a.telemetry.encryptionStatus === 'AES-256' ? 'bg-primary' : 'bg-destructive')} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[8px] font-mono text-muted-foreground">
          <span>COMPROMISED: {compromisedCount}</span>
          <span>NODES: {assets.length}</span>
        </div>
      </div>
    </div>
  );
}
