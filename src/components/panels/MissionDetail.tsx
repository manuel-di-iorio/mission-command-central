import { useAppStore } from '@/store/useAppStore';
import { X, Target, Users, MapPin, Shield, ScrollText, AlertOctagon, Clock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const classificationColors: Record<string, string> = {
    'UNCLASSIFIED': 'text-muted-foreground bg-muted/10 border-muted/20',
    'CONFIDENTIAL': 'text-success bg-success/10 border-success/20',
    'SECRET': 'text-warning bg-warning/10 border-warning/20',
    'TOP SECRET': 'text-destructive bg-destructive/10 border-destructive/20 animate-pulse',
    'TOP SECRET//SCI': 'text-destructive bg-destructive/10 border-destructive/20 animate-pulse',
  };

  const priorityColors: Record<string, string> = {
    'ROUTINE': 'text-muted-foreground', 'PRIORITY': 'text-foreground',
    'IMMEDIATE': 'text-warning', 'FLASH': 'text-destructive', 'OVERRIDE': 'text-destructive animate-pulse',
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 shadow-glow-primary">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-[8px] font-mono text-muted-foreground">{mission.opordNumber}</div>
            <h2 className="text-sm font-bold uppercase tracking-tight">{mission.name}</h2>
            <div className={cn("text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border inline-block mt-1", classificationColors[mission.classification])}>
              {mission.classification}
            </div>
          </div>
        </div>
        <button onClick={() => selectMission(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>

      <div className="space-y-4">
        <div className="panel-border rounded-lg p-3 bg-secondary/10">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1"><ScrollText className="h-3 w-3" /> Objective</p>
          <p className="text-xs text-foreground font-medium leading-relaxed">{mission.objective}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="panel-border rounded-lg p-2.5 bg-card/50">
            <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1 tracking-tighter">Priority</p>
            <p className={cn("text-xs font-bold uppercase tracking-wide", priorityColors[mission.priority])}>{mission.priority}</p>
          </div>
          <div className="panel-border rounded-lg p-2.5 bg-card/50">
            <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1 tracking-tighter">Status</p>
            <p className="text-xs font-bold uppercase tracking-wide">{mission.status}</p>
          </div>
        </div>

        <div className="panel-border rounded-lg p-2.5 bg-card/50">
          <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1 tracking-tighter">Command Authority</p>
          <p className="text-xs font-bold">{mission.commandAuthority}</p>
        </div>

        {/* Mission Phases */}
        <div className="panel-border rounded-lg p-3 space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1"><Layers className="h-3 w-3" /> Mission Phases</p>
          {mission.phases.map((phase) => (
            <div key={phase.id} className={cn("p-2 rounded border text-[10px]",
              phase.status === 'active' ? 'bg-primary/10 border-primary/30' :
              phase.status === 'completed' ? 'bg-success/10 border-success/30' : 'bg-secondary/10 border-border/50'
            )}>
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase">{phase.name}</span>
                <span className={cn("text-[8px] font-bold uppercase",
                  phase.status === 'active' ? 'text-primary' : phase.status === 'completed' ? 'text-success' : 'text-muted-foreground'
                )}>{phase.status}</span>
              </div>
              <p className="text-muted-foreground mt-0.5">{phase.description}</p>
            </div>
          ))}
        </div>

        {/* ROE */}
        <div className="panel-border rounded-lg p-3 space-y-2 border-primary/10">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1.5"><Shield className="h-3 w-3 text-primary" /> Rules of Engagement</p>
          <div className="p-2 bg-background/50 rounded border border-border/50">
            <p className="text-[10px] text-foreground/80 italic font-medium leading-normal">{mission.rulesOfEngagement}</p>
          </div>
        </div>

        {/* Risk */}
        <div className={cn('rounded-lg p-3 border', mission.riskScore >= 70 ? 'border-destructive/30' : 'border-border/50', riskBg)}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className={cn('h-4 w-4', riskColor)} />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Threat Assessment</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className={cn('text-xl font-bold font-mono-data', riskColor)}>{mission.riskScore}</span>
              <span className="text-[8px] text-muted-foreground uppercase">/100</span>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div className={cn("h-full rounded-full transition-all duration-1000",
              mission.riskScore >= 70 ? 'bg-destructive' : mission.riskScore >= 40 ? 'bg-warning' : 'bg-success'
            )} style={{ width: `${mission.riskScore}%` }} />
          </div>
        </div>

        {/* Force Assignment */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Force Assignment ({assignedAssets.length})</p>
          </div>
          <div className="space-y-1.5">
            {assignedAssets.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic bg-secondary/10 p-2 rounded text-center border border-dashed border-border/50">Awaiting force allocation</p>
            ) : (
              assignedAssets.map((a) => (
                <div key={a.id} className="panel-border rounded-lg p-2 text-[10px] font-bold uppercase bg-card/60 flex items-center justify-between border-primary/5">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-1.5 w-1.5 rounded-full", a.status === 'operational' ? 'bg-success' : 'bg-warning')} />
                    {a.callsign}
                  </div>
                  <span className="text-muted-foreground font-mono text-[8px]">{a.readiness}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Logistics */}
        <div className="panel-border rounded-lg p-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Logistics Requirements</p>
          <p className="text-[10px] text-foreground/80">{mission.logisticsRequirements}</p>
        </div>

        {/* Geolocation */}
        <div className="panel-border rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">AO Center</p>
          </div>
          <div className="p-2.5 bg-secondary/20 rounded border border-border/50 font-mono-data text-[10px] text-primary flex items-center justify-between">
            <div>{mission.area[0].toFixed(5)}° N, {Math.abs(mission.area[1]).toFixed(5)}° W</div>
            <div className="text-muted-foreground text-[8px]">RAD: {mission.areaRadius}KM</div>
          </div>
        </div>

        <div className="pt-2">
          {(mission.status === 'PLANORD' || mission.status === 'WARNORD') ? (
            <button onClick={() => updateMission(mission.id, { status: 'active' })}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-glow-primary border border-primary/20">
              Execute OPORD
            </button>
          ) : mission.status === 'active' ? (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => updateMission(mission.id, { status: 'completed' })}
                className="py-2.5 rounded-lg bg-success/20 text-success text-[10px] font-bold uppercase tracking-widest hover:bg-success/30 transition-all border border-success/30">
                Mission Complete
              </button>
              <button onClick={() => updateMission(mission.id, { status: 'aborted' })}
                className="py-2.5 rounded-lg bg-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-widest hover:bg-destructive/30 transition-all border border-destructive/30">
                Abort Mission
              </button>
            </div>
          ) : (
            <div className="py-2.5 rounded-lg bg-secondary/50 text-muted-foreground text-[10px] font-bold uppercase tracking-widest text-center border border-border/50">
              Mission Archived
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
