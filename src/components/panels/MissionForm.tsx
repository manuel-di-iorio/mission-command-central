import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, Sparkles } from 'lucide-react';
import { Mission, NATOPriority, ClassificationLevel } from '@/data/types';

export function MissionForm() {
  const setRightPanel = useAppStore((s) => s.setRightPanel);
  const addMission = useAppStore((s) => s.addMission);
  const assets = useAppStore((s) => s.assets);
  const mapClickPosition = useAppStore((s) => s.mapClickPosition);
  const computeRiskScore = useAppStore((s) => s.computeRiskScore);
  const suggestAssets = useAppStore((s) => s.suggestAssets);

  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [priority, setPriority] = useState<NATOPriority>('PRIORITY');
  const [classification, setClassification] = useState<ClassificationLevel>('SECRET');
  const [roe, setRoe] = useState('');
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [areaCenter, setAreaCenter] = useState<[number, number]>(mapClickPosition || [38.9, -77.0]);
  const [areaRadius, setAreaRadius] = useState(10);

  const riskScore = computeRiskScore(areaCenter, selectedAssetIds);
  const suggested = suggestAssets(areaCenter);
  const isValid = name.trim().length > 0 && objective.trim().length > 0 && roe.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    const mission: Mission = {
      id: `m${Date.now()}`,
      name,
      opordNumber: `OPORD ${String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')}-26`,
      objective,
      assignedAssets: selectedAssetIds,
      area: areaCenter,
      areaRadius,
      priority,
      status: 'PLANORD',
      riskScore,
      createdAt: new Date().toISOString(),
      classification,
      rulesOfEngagement: roe,
      commandAuthority: 'Current User',
      phases: [
        { id: `ph-${Date.now()}-1`, name: 'Phase I - Preparation', description: 'Force preparation and deployment', status: 'pending', startCondition: 'OPORD execution' },
        { id: `ph-${Date.now()}-2`, name: 'Phase II - Execution', description: 'Main operation execution', status: 'pending', startCondition: 'Forces in position' },
      ],
      logisticsRequirements: 'Standard logistics package. See LOGORD annex.',
    };
    addMission(mission);
    setRightPanel('none');
  };

  const toggleAsset = (id: string) => {
    setSelectedAssetIds((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const priorities: NATOPriority[] = ['ROUTINE', 'PRIORITY', 'IMMEDIATE', 'FLASH'];
  const classifications: ClassificationLevel[] = ['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET', 'TOP SECRET'];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">New OPORD</h2>
        <button onClick={() => setRightPanel('none')} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>

      <div className="space-y-3">
        <Field label="Mission Name">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Operation..." className="w-full bg-secondary/50 border border-border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
        </Field>

        <Field label="Objective">
          <textarea value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Mission objective..." rows={2} className="w-full bg-secondary/50 border border-border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        </Field>

        <Field label="Rules of Engagement">
          <textarea value={roe} onChange={(e) => setRoe(e.target.value)} placeholder="WEAPONS TIGHT / FREE / HOLD..." rows={2} className="w-full bg-secondary/50 border border-border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        </Field>

        <Field label="NATO Priority">
          <div className="flex gap-1">
            {priorities.map((p) => (
              <button key={p} onClick={() => setPriority(p)}
                className={`flex-1 py-1 rounded text-[9px] uppercase font-medium transition-colors ${
                  priority === p ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >{p}</button>
            ))}
          </div>
        </Field>

        <Field label="Classification">
          <div className="flex gap-1">
            {classifications.map((c) => (
              <button key={c} onClick={() => setClassification(c)}
                className={`flex-1 py-1 rounded text-[8px] uppercase font-medium transition-colors ${
                  classification === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >{c.replace('TOP ', 'TS/')}</button>
            ))}
          </div>
        </Field>

        <Field label={`AO Center ${mapClickPosition ? '(from map)' : ''}`}>
          <div className="font-mono-data text-primary text-xs">{areaCenter[0].toFixed(4)}° N, {Math.abs(areaCenter[1]).toFixed(4)}° W</div>
          {mapClickPosition && (
            <button onClick={() => setAreaCenter(mapClickPosition)} className="text-[10px] text-primary mt-1 hover:underline">Use map click position</button>
          )}
        </Field>

        <div className="panel-border rounded p-2">
          <div className="flex items-center gap-1 mb-2">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Recommended Assets (Proximity)</span>
          </div>
          <div className="space-y-1">
            {suggested.map((a) => (
              <button key={a.id} onClick={() => toggleAsset(a.id)}
                className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                  selectedAssetIds.includes(a.id) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                }`}>
                {a.callsign} <span className="text-muted-foreground">({a.type} · {a.readiness})</span>
              </button>
            ))}
          </div>
        </div>

        <Field label="Force Assignment">
          <div className="max-h-24 overflow-y-auto space-y-0.5">
            {assets.map((a) => (
              <label key={a.id} className="flex items-center gap-2 text-xs py-0.5 cursor-pointer hover:bg-secondary/30 px-1 rounded">
                <input type="checkbox" checked={selectedAssetIds.includes(a.id)} onChange={() => toggleAsset(a.id)} className="rounded" />
                <span>{a.callsign}</span>
                <span className={`ml-auto text-[10px] ${a.status === 'operational' ? 'text-success' : a.status === 'offline' || a.status === 'damaged' ? 'text-destructive' : 'text-warning'}`}>{a.status}</span>
              </label>
            ))}
          </div>
        </Field>

        <div className={`rounded p-2 ${riskScore >= 70 ? 'bg-destructive/10' : riskScore >= 40 ? 'bg-warning/10' : 'bg-success/10'}`}>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Threat Assessment</span>
          <p className={`text-lg font-bold font-mono-data ${riskScore >= 70 ? 'text-destructive' : riskScore >= 40 ? 'text-warning' : 'text-success'}`}>{riskScore}/100</p>
        </div>

        <button onClick={handleSubmit} disabled={!isValid}
          className="w-full py-2 rounded bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          Issue PLANORD
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">{label}</label>
      {children}
    </div>
  );
}
