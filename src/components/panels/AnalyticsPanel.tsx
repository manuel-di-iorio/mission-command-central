import { useAppStore } from '@/store/useAppStore';
import { Shield, TrendingUp, AlertTriangle, Zap, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsPanel() {
  const assets = useAppStore((s) => s.assets);
  const missions = useAppStore((s) => s.missions);
  const alerts = useAppStore((s) => s.alerts);
  const sigintContacts = useAppStore((s) => s.sigintContacts);

  const operationalAssets = assets.filter((a) => a.status === 'operational' || a.status === 'deployed').length;
  const activeMissions = missions.filter((m) => m.status === 'active').length;
  const avgRisk = missions.length > 0 ? Math.round(missions.reduce((sum, m) => sum + m.riskScore, 0) / missions.length) : 0;
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;
  const highThreats = sigintContacts.filter(s => s.threat === 'HIGH' || s.threat === 'CRITICAL').length;

  const assetTypeData = [
    { name: 'UAV', value: assets.filter(a => a.type === 'UAV').length, color: '#00f2ff' },
    { name: 'Fixed-Wing', value: assets.filter(a => a.type === 'fixed-wing').length, color: '#7000ff' },
    { name: 'Rotary', value: assets.filter(a => a.type === 'rotary-wing').length, color: '#00ff88' },
    { name: 'Ground', value: assets.filter(a => ['APC', 'MBT', 'IFV'].includes(a.type)).length, color: '#ffaa00' },
    { name: 'Naval', value: assets.filter(a => ['frigate', 'submarine', 'patrol-boat'].includes(a.type)).length, color: '#22d3ee' },
    { name: 'SAT', value: assets.filter(a => a.type === 'satellite').length, color: '#a855f7' },
  ].filter(d => d.value > 0);

  const readinessData = [
    { status: 'C1', count: assets.filter(a => a.readiness === 'C1').length },
    { status: 'C2', count: assets.filter(a => a.readiness === 'C2').length },
    { status: 'C3', count: assets.filter(a => a.readiness === 'C3').length },
    { status: 'C4', count: assets.filter(a => a.readiness === 'C4').length },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Force Ready" value={operationalAssets} total={assets.length} icon={<Zap className="h-3 w-3" />} color="text-success" />
        <StatCard label="Active Ops" value={activeMissions} total={missions.length} icon={<Shield className="h-3 w-3" />} color="text-primary" />
        <StatCard label="Avg Threat" value={avgRisk} icon={<TrendingUp className="h-3 w-3" />} color={avgRisk >= 60 ? 'text-warning' : 'text-success'} />
        <StatCard label="SIGINT Threats" value={highThreats} icon={<AlertTriangle className="h-3 w-3" />} color={highThreats > 0 ? 'text-destructive' : 'text-success'} />
      </div>

      <div className="panel-border rounded-lg p-3 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-3 w-3 text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Force Readiness (NATO)</span>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={readinessData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
              <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
              <YAxis hide />
              <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} itemStyle={{ color: '#00f2ff' }} />
              <Bar dataKey="count" fill="hsl(185, 70%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-32 w-full flex items-center gap-4">
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetTypeData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                  {assetTypeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1">
            {assetTypeData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-[9px] uppercase tracking-tighter">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-muted-foreground">{d.name}:</span>
                <span className="font-bold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, total, icon, color }: { label: string; value: number; total?: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="panel-border rounded-lg p-3 bg-gradient-to-br from-card to-card/50">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`${color} bg-background p-1 rounded-md border border-border/50`}>{icon}</span>
        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className={`text-xl font-bold font-mono-data tracking-tighter ${color}`}>
        {value}{total !== undefined && <span className="text-xs text-muted-foreground font-normal ml-1">/{total}</span>}
      </p>
    </div>
  );
}
