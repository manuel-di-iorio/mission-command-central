import { useAppStore } from '@/store/useAppStore';
import { Shield, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

export function AnalyticsPanel() {
  const assets = useAppStore((s) => s.assets);
  const missions = useAppStore((s) => s.missions);
  const alerts = useAppStore((s) => s.alerts);

  const activeAssets = assets.filter((a) => a.status === 'active').length;
  const offlineAssets = assets.filter((a) => a.status === 'offline').length;
  const activeMissions = missions.filter((m) => m.status === 'active').length;
  const avgRisk = Math.round(missions.reduce((sum, m) => sum + m.riskScore, 0) / missions.length);
  const highRisk = missions.filter((m) => m.riskScore >= 70).length;
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;

  // Anomaly detection
  const anomalies: string[] = [];
  if (offlineAssets > 0) anomalies.push(`${offlineAssets} asset(s) offline`);
  if (highRisk > 0) anomalies.push(`${highRisk} high-risk mission(s)`);
  const unassignedMissions = missions.filter((m) => m.status !== 'completed' && m.assignedAssets.length === 0);
  if (unassignedMissions.length > 0) anomalies.push(`${unassignedMissions.length} mission(s) without assets`);

  return (
    <div className="space-y-3 p-1">
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Active Assets" value={activeAssets} total={assets.length} icon={<Zap className="h-3 w-3" />} color="text-success" />
        <StatCard label="Active Missions" value={activeMissions} total={missions.length} icon={<Shield className="h-3 w-3" />} color="text-primary" />
        <StatCard label="Avg Risk Score" value={avgRisk} icon={<TrendingUp className="h-3 w-3" />} color={avgRisk >= 60 ? 'text-warning' : 'text-success'} />
        <StatCard label="Active Alerts" value={activeAlerts} icon={<AlertTriangle className="h-3 w-3" />} color={activeAlerts > 0 ? 'text-destructive' : 'text-success'} />
      </div>

      {anomalies.length > 0 && (
        <div className="panel-border rounded p-2">
          <div className="flex items-center gap-1 mb-2">
            <AlertTriangle className="h-3 w-3 text-warning" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Anomalies Detected</span>
          </div>
          {anomalies.map((a, i) => (
            <p key={i} className="text-xs text-warning flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-warning shrink-0" />
              {a}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, total, icon, color }: { label: string; value: number; total?: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="panel-border rounded p-2">
      <div className="flex items-center gap-1 mb-1">
        <span className={color}>{icon}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className={`text-lg font-bold font-mono-data ${color}`}>
        {value}{total !== undefined && <span className="text-xs text-muted-foreground font-normal">/{total}</span>}
      </p>
    </div>
  );
}
