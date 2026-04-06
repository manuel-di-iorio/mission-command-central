import { create } from 'zustand';
import { Asset, Mission, Zone, AppEvent, Alert, AssetStatus } from '@/data/types';
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
  suggestAssets: (missionArea: [number, number], priority: string) => Asset[];
}

// Simple store without zustand - using React patterns
// Actually let's use a simple zustand-like pattern with useState
// Since zustand isn't installed, let's use React context

export { initialAssets, initialMissions, initialZones, initialEvents, initialAlerts };
