import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, Send, MapPin } from 'lucide-react';
import { AssetOrder, OrderType, NATOPriority } from '@/data/types';

const orderTypes: OrderType[] = ['MOVE', 'PATROL', 'ENGAGE', 'RECON', 'RTB', 'HOLD', 'RESUPPLY', 'MEDEVAC', 'EXFIL'];

export function OrderForm() {
  const setRightPanel = useAppStore((s) => s.setRightPanel);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const assets = useAppStore((s) => s.assets);
  const mapClickPosition = useAppStore((s) => s.mapClickPosition);
  const issueOrder = useAppStore((s) => s.issueOrder);

  const asset = assets.find(a => a.id === selectedAssetId);

  const [orderType, setOrderType] = useState<OrderType>('MOVE');
  const [priority, setPriority] = useState<NATOPriority>('PRIORITY');
  const [description, setDescription] = useState('');
  const [issuedBy, setIssuedBy] = useState('');

  const handleSubmit = () => {
    if (!asset || !description.trim() || !issuedBy.trim()) return;
    const order: AssetOrder = {
      id: `ord-${Date.now()}`,
      assetId: asset.id,
      type: orderType,
      priority,
      description,
      issuedBy,
      issuedAt: new Date().toISOString(),
      status: 'pending',
      waypoints: mapClickPosition ? [{
        id: `wp-${Date.now()}`,
        position: mapClickPosition,
        label: `WP-${orderType}`,
        type: orderType === 'RECON' ? 'RP' : orderType === 'MOVE' ? 'NAV' : 'CP',
      }] : [],
    };
    issueOrder(order);
    setRightPanel('asset-detail');
  };

  if (!asset) return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold">Issue Order</h2>
        <button onClick={() => setRightPanel('none')} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <p className="text-xs text-muted-foreground">Select an asset first to issue orders.</p>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Issue Order — {asset.callsign}</h2>
        <button onClick={() => setRightPanel('asset-detail')} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>

      <div className="panel-border rounded-lg p-2.5 bg-primary/5">
        <div className="text-[9px] text-muted-foreground uppercase mb-0.5">Target Asset</div>
        <div className="text-xs font-bold uppercase">{asset.callsign} — {asset.name}</div>
        <div className="text-[9px] text-muted-foreground">{asset.unitDesignation} · {asset.readiness}</div>
      </div>

      <div className="space-y-3">
        <Field label="Order Type">
          <div className="grid grid-cols-3 gap-1">
            {orderTypes.map(t => (
              <button key={t} onClick={() => setOrderType(t)}
                className={`py-1.5 rounded text-[9px] font-bold uppercase transition-colors ${
                  orderType === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}>{t}</button>
            ))}
          </div>
        </Field>

        <Field label="Priority">
          <div className="flex gap-1">
            {(['ROUTINE', 'PRIORITY', 'IMMEDIATE', 'FLASH'] as NATOPriority[]).map(p => (
              <button key={p} onClick={() => setPriority(p)}
                className={`flex-1 py-1 rounded text-[9px] font-bold uppercase transition-colors ${
                  priority === p ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}>{p}</button>
            ))}
          </div>
        </Field>

        <Field label="Issuing Authority">
          <input value={issuedBy} onChange={e => setIssuedBy(e.target.value)} placeholder="Rank + Name..."
            className="w-full bg-secondary/50 border border-border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
        </Field>

        <Field label="Order Description">
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Detailed order instructions..." rows={3}
            className="w-full bg-secondary/50 border border-border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        </Field>

        {mapClickPosition && (
          <div className="panel-border rounded-lg p-2.5 bg-success/5 border-success/20">
            <div className="flex items-center gap-1 text-[9px] uppercase text-muted-foreground"><MapPin className="h-3 w-3" /> Waypoint from map click</div>
            <div className="font-mono-data text-primary text-xs mt-1">
              {mapClickPosition[0].toFixed(5)}° N, {Math.abs(mapClickPosition[1]).toFixed(5)}° W
            </div>
          </div>
        )}

        <button onClick={handleSubmit} disabled={!description.trim() || !issuedBy.trim()}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <Send className="h-3.5 w-3.5" /> Transmit Order
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
