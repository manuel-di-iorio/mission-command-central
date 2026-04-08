import { create } from 'zustand';
import { Asset, Mission, Zone, AppEvent, Alert, C2Node, SIGINTContact, AssetOrder } from '@/data/types';
import { initialAssets, initialMissions, initialZones, initialEvents, initialAlerts, initialC2Hierarchy, initialSIGINTContacts, initialOrders } from '@/data/mockData';

interface AppState {
  assets: Asset[];
  missions: Mission[];
  zones: Zone[];
  events: AppEvent[];
  alerts: Alert[];
  c2Nodes: C2Node[];
  sigintContacts: SIGINTContact[];
  orders: AssetOrder[];
  selectedAssetId: string | null;
  selectedMissionId: string | null;
  rightPanel: 'none' | 'asset-detail' | 'mission-detail' | 'mission-form' | 'analytics' | 'order-form' | 'logistics' | 'c2' | 'sigint';
  showOperationalZones: boolean;
  showRestrictedZones: boolean;
  showSIGINT: boolean;
  showWaypoints: boolean;
  mapClickPosition: [number, number] | null;

  selectAsset: (id: string | null) => void;
  selectMission: (id: string | null) => void;
  setRightPanel: (panel: AppState['rightPanel']) => void;
  toggleOperationalZones: () => void;
  toggleRestrictedZones: () => void;
  toggleSIGINT: () => void;
  toggleWaypoints: () => void;
  setMapClickPosition: (pos: [number, number] | null) => void;
  addMission: (mission: Mission) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
  dismissAlert: (id: string) => void;
  addEvent: (event: AppEvent) => void;
  updateAssetPositions: () => void;
  computeRiskScore: (area: [number, number], assetIds: string[]) => number;
  suggestAssets: (missionArea: [number, number]) => Asset[];
  issueOrder: (order: AssetOrder) => void;
  updateAssetStatus: (assetId: string, status: Asset['status']) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  assets: initialAssets,
  missions: initialMissions,
  zones: initialZones,
  events: initialEvents,
  alerts: initialAlerts,
  c2Nodes: initialC2Hierarchy,
  sigintContacts: initialSIGINTContacts,
  orders: initialOrders,
  selectedAssetId: null,
  selectedMissionId: null,
  rightPanel: 'none',
  showOperationalZones: true,
  showRestrictedZones: true,
  showSIGINT: true,
  showWaypoints: true,
  mapClickPosition: null,

  selectAsset: (id) => set({ selectedAssetId: id, selectedMissionId: null, rightPanel: id ? 'asset-detail' : 'none' }),
  selectMission: (id) => set({ selectedMissionId: id, selectedAssetId: null, rightPanel: id ? 'mission-detail' : 'none' }),
  setRightPanel: (panel) => set({ rightPanel: panel }),
  toggleOperationalZones: () => set((s) => ({ showOperationalZones: !s.showOperationalZones })),
  toggleRestrictedZones: () => set((s) => ({ showRestrictedZones: !s.showRestrictedZones })),
  toggleSIGINT: () => set((s) => ({ showSIGINT: !s.showSIGINT })),
  toggleWaypoints: () => set((s) => ({ showWaypoints: !s.showWaypoints })),
  setMapClickPosition: (pos) => set({ mapClickPosition: pos }),

  addMission: (mission) => set((s) => ({
    missions: [...s.missions, mission],
    events: [...s.events, {
      id: `e${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'OPORD_ISSUED' as const,
      message: `${mission.opordNumber} "${mission.name}" issued. Priority: ${mission.priority}.`,
      severity: 'info' as const,
      classification: mission.classification,
      originator: mission.commandAuthority,
    }],
  })),

  updateMission: (id, updates) => set((s) => ({
    missions: s.missions.map((m) => m.id === id ? { ...m, ...updates } : m),
  })),

  dismissAlert: (id) => set((s) => ({
    alerts: s.alerts.map((a) => a.id === id ? { ...a, dismissed: true } : a),
  })),

  addEvent: (event) => set((s) => ({ events: [...s.events, event] })),

  issueOrder: (order) => set((s) => ({
    orders: [...s.orders, order],
    assets: s.assets.map(a => a.id === order.assetId ? { ...a, currentOrderId: order.id, status: order.type === 'RTB' ? 'RTB' as const : 'deployed' as const } : a),
    events: [...s.events, {
      id: `e${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'ORDER_ISSUED' as const,
      message: `ORDER: ${s.assets.find(a => a.id === order.assetId)?.callsign} tasked ${order.type}. ${order.description}`,
      severity: order.priority === 'FLASH' || order.priority === 'OVERRIDE' ? 'critical' as const : 'info' as const,
      classification: 'SECRET' as const,
      originator: order.issuedBy,
    }],
  })),

  updateAssetStatus: (assetId, status) => set((s) => ({
    assets: s.assets.map(a => a.id === assetId ? { ...a, status } : a),
  })),

  updateAssetPositions: () => set((s) => ({
    assets: s.assets.map((asset) => {
      if (asset.status === 'offline' || asset.status === 'maintenance' || asset.status === 'damaged' || asset.status === 'destroyed') return asset;
      const jitter = () => (Math.random() - 0.5) * 0.005;

      const newSupply = {
        ...asset.supply,
        fuel: { ...asset.supply.fuel, current: Math.max(0, asset.supply.fuel.current - (Math.random() * 0.1)) },
      };

      return {
        ...asset,
        position: [asset.position[0] + jitter(), asset.position[1] + jitter()] as [number, number],
        speed: Math.max(0, asset.speed + Math.floor((Math.random() - 0.5) * 5)),
        heading: (asset.heading + Math.floor((Math.random() - 0.5) * 10) + 360) % 360,
        lastUpdate: new Date().toISOString(),
        supply: newSupply,
        telemetry: {
          ...asset.telemetry,
          battery: Math.max(0, asset.telemetry.battery - (Math.random() * 0.05)),
          signalStrength: Math.min(100, Math.max(0, asset.telemetry.signalStrength + (Math.random() - 0.5) * 2)),
        },
      };
    }),
  })),

  computeRiskScore: (area, assetIds) => {
    const state = get();
    const nearRestricted = state.zones
      .filter((z) => z.type === 'restricted' || z.type === 'no-fly' || z.type === 'KEZ')
      .some((z) => {
        const dist = Math.sqrt(Math.pow(area[0] - z.center[0], 2) + Math.pow(area[1] - z.center[1], 2));
        return dist < 0.1;
      });
    const nearSIGINT = state.sigintContacts
      .filter(s => s.threat === 'HIGH' || s.threat === 'CRITICAL')
      .some(s => {
        const dist = Math.sqrt(Math.pow(area[0] - s.position[0], 2) + Math.pow(area[1] - s.position[1], 2));
        return dist < 0.15;
      });
    const offlineAssets = assetIds.filter((id) => {
      const a = state.assets.find((a) => a.id === id);
      return a?.status === 'offline' || a?.status === 'damaged';
    }).length;
    let score = 20 + Math.random() * 20;
    if (nearRestricted) score += 30;
    if (nearSIGINT) score += 25;
    if (offlineAssets > 0) score += offlineAssets * 15;
    if (assetIds.length === 0) score += 10;
    return Math.min(100, Math.round(score));
  },

  suggestAssets: (missionArea) => {
    const state = get();
    return state.assets
      .filter((a) => a.status === 'operational')
      .sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.position[0] - missionArea[0], 2) + Math.pow(a.position[1] - missionArea[1], 2));
        const distB = Math.sqrt(Math.pow(b.position[0] - missionArea[0], 2) + Math.pow(b.position[1] - missionArea[1], 2));
        return distA - distB;
      })
      .slice(0, 3);
  },
}));
