import { useAppStore } from '@/store/useAppStore';
import { X, Target, AlertTriangle, Users, MapPin } from 'lucide-react';

export function MissionDetail() {
  const missions = useAppStore((s) => s.missions);
  const selectedMissionId = useAppStore((s) => s.selectedMissionId);
  const selectMission = useAppStore((s) => s.selectMission);
  const assets = useAppStore((s) => s.assets);
  const updateMission = useAppStore((s) => s.updateMission);

  const mission = missions.find((m) => m.id === selectedMissionId);
  if (!mission) return null;

  const assignedAssets = assets.filter((a) => mission.assignedAssets.includes(a.id));
  const riskColor = mission.riskScore >= 70 ? 'text-destructive' : mission.riskScore >= 40 ? 'text-warning' : 'text-success';
  const riskBg = mission.riskScore >= 70 ? 'bg-destructive/10' : mission.riskScore >= 40 ? 'bg-warning/10' : 'bg-success/10';

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold">{mission.name}</h2>
        </div>
        <button onClick={() => selectMission(null)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground">{mission.objective}</p>

      <div className="grid grid-cols-2 gap-2">
        <div className="panel-border rounded p-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Priority</p>
          <p className="text-xs font-medium capitalize">{mission.priority}</p>
        </div>
        <div className="panel-border rounded p-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Status</p>
          <p className="text-xs font-medium capitalize">{mission.status}</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className={`rounded p-3 ${riskBg}`}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className={`h-4 w-4 ${riskColor}`} />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Risk Analysis</span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-2xl font-bold font-mono-data ${riskColor}`}>{mission.riskScore}</span>
          <span className="text-xs text-muted-foreground mb-1">/100</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
          <div className={`h-1.5 rounded-full transition-all ${mission.riskScore >= 70 ? 'bg-destructive' : mission.riskScore >= 40 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${mission.riskScore}%` }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          {mission.riskScore >= 70 ? 'High risk — consider additional assets or route change.' :
           mission.riskScore >= 40 ? 'Moderate risk — monitor conditions closely.' :
           'Low risk — conditions favorable for operation.'}
        </p>
      </div>

      {/* Assigned Assets */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <Users className="h-3 w-3 text-muted-foreground" />
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Assigned Assets ({assignedAssets.length})</p>
        </div>
        {assignedAssets.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">No assets assigned</p>
        ) : (
          assignedAssets.map((a) => (
            <div key={a.id} className="panel-border rounded p-2 mt-1 text-xs flex items-center justify-between">
              <span>{a.name}</span>
              <span className={`capitalize ${a.status === 'active' ? 'text-success' : a.status === 'offline' ? 'text-destructive' : 'text-warning'}`}>{a.status}</span>
            </div>
          ))
        )}
      </div>

      {/* Area */}
      <div className="panel-border rounded p-2">
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Area Center</p>
        </div>
        <p className="font-mono-data text-primary">
          {mission.area[0].toFixed(4)}° N, {Math.abs(mission.area[1]).toFixed(4)}° W
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Radius: {mission.areaRadius} km</p>
      </div>

      {/* Status actions */}
      {mission.status === 'draft' && (
        <button
          onClick={() => updateMission(mission.id, { status: 'active' })}
          className="w-full py-2 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          Activate Mission
        </button>
      )}
      {mission.status === 'active' && (
        <button
          onClick={() => updateMission(mission.id, { status: 'completed' })}
          className="w-full py-2 rounded bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
        >
          Mark Completed
        </button>
      )}
    </div>
  );
}
