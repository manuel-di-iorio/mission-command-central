import { useAppStore } from '@/store/useAppStore';
import { Shield, ChevronRight, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const roleLabels: Record<string, string> = {
  COMBATANT_CMD: 'CCMD', JTF: 'JTF', DIVISION: 'DIV', BRIGADE: 'BDE', BATTALION: 'BN', COMPANY: 'CO', PLATOON: 'PLT',
};

const classColors: Record<string, string> = {
  'UNCLASSIFIED': 'text-muted-foreground', 'CONFIDENTIAL': 'text-success',
  'SECRET': 'text-warning', 'TOP SECRET': 'text-destructive', 'TOP SECRET//SCI': 'text-destructive',
};

export function C2Panel() {
  const c2Nodes = useAppStore((s) => s.c2Nodes);
  const assets = useAppStore((s) => s.assets);
  const selectAsset = useAppStore((s) => s.selectAsset);

  const rootNodes = c2Nodes.filter(n => !n.parentId);

  const renderNode = (nodeId: string, depth: number = 0) => {
    const node = c2Nodes.find(n => n.id === nodeId);
    if (!node) return null;
    const nodeAssets = assets.filter(a => node.assetIds.includes(a.id));

    return (
      <div key={node.id} className={cn('border-l border-border/30', depth > 0 && 'ml-3')}>
        <div className="panel-border rounded-lg p-2.5 mb-1.5 bg-card/60 hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn('text-[8px] font-bold px-1.5 py-0.5 rounded border',
                depth === 0 ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-secondary border-border/50 text-muted-foreground'
              )}>
                {roleLabels[node.role]}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase">{node.name}</div>
                <div className="text-[8px] text-muted-foreground flex items-center gap-1">
                  <Star className="h-2 w-2" /> {node.commander}
                </div>
              </div>
            </div>
            <div className={cn('text-[7px] font-mono font-bold', classColors[node.classification])}>
              {node.classification}
            </div>
          </div>

          {nodeAssets.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {nodeAssets.map(a => (
                <button key={a.id} onClick={() => selectAsset(a.id)}
                  className="w-full text-left text-[9px] px-2 py-0.5 rounded hover:bg-secondary/50 flex items-center justify-between">
                  <span className="font-medium">{a.callsign}</span>
                  <span className={cn('text-[8px]',
                    a.status === 'operational' ? 'text-success' : a.status === 'deployed' ? 'text-warning' : 'text-destructive'
                  )}>{a.status} · {a.readiness}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {node.subordinateIds.map(subId => renderNode(subId, depth + 1))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-tight">Command Structure (C2)</h2>
      </div>
      <div className="space-y-1">
        {rootNodes.map(n => renderNode(n.id))}
      </div>
    </div>
  );
}
