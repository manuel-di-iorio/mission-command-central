import { create } from 'zustand';
import { Asset, Mission, Zone, AppEvent, Alert } from '@/data/types';
import { initialAssets, initialMissions, initialZones, initialEvents, initialAlerts } from '@/data/mockData';

interface AppState {
  assets: Asset[];
  missions: Mission[];
  zones: Zone[];
  events: AppEvent[];
  alerts: Alert[];
  selectedAssetId: string | null;
  selectedMissionId: string | null;
  rightPanel: 'none' | 'asset-detail' | 'mission-detail' | 'mission-form' | 'analytics';
  showOperationalZones: boolean;
  showRestrictedZones: boolean;
  mapClickPosition: [number, number] | null;

  selectAsset: (id: string | null) => void;
  selectMission: (id: string | null) => void;
  setRightPanel: (panel: AppState['rightPanel']) => void;
  toggleOperationalZones: () => void;
  toggleRestrictedZones: () => void;
  setMapClickPosition: (pos: [number, number] | null) => void;
  addMission: (mission: Mission) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
  dismissAlert: (id: string) => void;
  addEvent: (event: AppEvent) => void;
  updateAssetPositions: () => void;
  computeRiskScore: (area: [number, number], assetIds: string[]) => number;
  suggestAssets: (missionArea: [number, number]) => Asset[];
}

export const useAppStore = create<AppState>((set, get) => ({
  assets: initialAssets,
  missions: initialMissions,
  zones: initialZones,
  events: initialEvents,
  alerts: initialAlerts,
  selectedAssetId: null,
  selectedMissionId: null,
  rightPanel: 'none',
  showOperationalZones: true,
  showRestrictedZones: true,
  mapClickPosition: null,

  selectAsset: (id) => set({ selectedAssetId: id, selectedMissionId: null, rightPanel: id ? 'asset-detail' : 'none' }),
  selectMission: (id) => set({ selectedMissionId: id, selectedAssetId: null, rightPanel: id ? 'mission-detail' : 'none' }),
  setRightPanel: (panel) => set({ rightPanel: panel }),
  toggleOperationalZones: () => set((s) => ({ showOperationalZones: !s.showOperationalZones })),
  toggleRestrictedZones: () => set((s) => ({ showRestrictedZones: !s.showRestrictedZones })),
  setMapClickPosition: (pos) => set({ mapClickPosition: pos }),

  addMission: (mission) => set((s) => ({
    missions: [...s.missions, mission],
    events: [...s.events, {
      id: `e${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'mission_created' as const,
      message: `Mission "${mission.name}" created`,
      severity: 'info' as const,
    }],
  })),

  updateMission: (id, updates) => set((s) => ({
    missions: s.missions.map((m) => m.id === id ? { ...m, ...updates } : m),
  })),

  dismissAlert: (id) => set((s) => ({
    alerts: s.alerts.map((a) => a.id === id ? { ...a, dismissed: true } : a),
  })),

  addEvent: (event) => set((s) => ({ events: [...s.events, event] })),

  updateAssetPositions: () => set((s) => ({
    assets: s.assets.map((asset) => {
      if (asset.status === 'offline') return asset;
      const jitter = () => (Math.random() - 0.5) * 0.01;
      return {
        ...asset,
        position: [asset.position[0] + jitter(), asset.position[1] + jitter()] as [number, number],
        speed: asset.speed + Math.floor((Math.random() - 0.5) * 10),
        heading: (asset.heading + Math.floor((Math.random() - 0.5) * 20) + 360) % 360,
        lastUpdate: new Date().toISOString(),
      };
    }),
  })),

  computeRiskScore: (area, assetIds) => {
    const state = get();
    const nearRestricted = state.zones
      .filter((z) => z.type === 'restricted')
      .some((z) => {
        const dist = Math.sqrt(Math.pow(area[0] - z.center[0], 2) + Math.pow(area[1] - z.center[1], 2));
        return dist < 0.1;
      });
    const offlineAssets = assetIds.filter((id) => state.assets.find((a) => a.id === id)?.status === 'offline').length;
    let score = 20 + Math.random() * 20;
    if (nearRestricted) score += 30;
    if (offlineAssets > 0) score += offlineAssets * 15;
    if (assetIds.length === 0) score += 10;
    return Math.min(100, Math.round(score));
  },

  suggestAssets: (missionArea) => {
    const state = get();
    return state.assets
      .filter((a) => a.status === 'active')
      .sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.position[0] - missionArea[0], 2) + Math.pow(a.position[1] - missionArea[1], 2));
        const distB = Math.sqrt(Math.pow(b.position[0] - missionArea[0], 2) + Math.pow(b.position[1] - missionArea[1], 2));
        return distA - distB;
      })
      .slice(0, 3);
  },
}));
