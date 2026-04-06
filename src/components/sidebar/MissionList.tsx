import { useAppStore } from '@/store/useAppStore';
import { Target } from 'lucide-react';

const priorityColor: Record<string, string> = {
  low: 'text-muted-foreground',
  medium: 'text-foreground',
  high: 'text-warning',
  critical: 'text-destructive',
};

const statusBadge: Record<string, string> = {
  draft: 'bg-secondary text-secondary-foreground',
  active: 'bg-primary/20 text-primary',
  completed: 'bg-success/20 text-success',
};

export function MissionList() {
  const missions = useAppStore((s) => s.missions);
  const selectedMissionId = useAppStore((s) => s.selectedMissionId);
  const selectMission = useAppStore((s) => s.selectMission);
  const setRightPanel = useAppStore((s) => s.setRightPanel);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Missions ({missions.length})
        </h3>
        <button
          onClick={() => setRightPanel('mission-form')}
          className="text-[10px] text-primary hover:text-primary/80 transition-colors"
        >
          + New
        </button>
      </div>
      {missions.map((mission) => {
        const isSelected = mission.id === selectedMissionId;
        return (
          <button
            key={mission.id}
            onClick={() => selectMission(isSelected ? null : mission.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all ${
              isSelected ? 'bg-primary/10 border border-primary/30 glow-primary' : 'hover:bg-secondary/50'
            }`}
          >
            <Target className={`h-3.5 w-3.5 shrink-0 ${priorityColor[mission.priority]}`} />
            <div className="flex-1 text-left min-w-0">
              <p className="truncate">{mission.name}</p>
              <p className="text-[10px] text-muted-foreground">Risk: {mission.riskScore}%</p>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded ${statusBadge[mission.status]}`}>
              {mission.status}
            </span>
          </button>
        );
      })}
    </div>
  );
}
