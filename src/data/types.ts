export type AssetType = 'drone' | 'aircraft' | 'satellite' | 'ground-vehicle' | 'naval';
export type AssetStatus = 'active' | 'offline' | 'in-mission';
export type MissionStatus = 'draft' | 'active' | 'completed';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  position: [number, number]; // [lat, lng]
  speed: number;
  heading: number;
  lastUpdate: string;
}

export interface Mission {
  id: string;
  name: string;
  objective: string;
  assignedAssets: string[];
  area: [number, number]; // center point
  areaRadius: number; // km
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: MissionStatus;
  riskScore: number;
  createdAt: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'operational' | 'restricted';
  center: [number, number];
  radius: number;
  color: string;
}

export interface AppEvent {
  id: string;
  timestamp: string;
  type: 'mission_created' | 'asset_assigned' | 'status_update' | 'alert' | 'position_update';
  message: string;
  severity: AlertSeverity;
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  dismissed: boolean;
}
