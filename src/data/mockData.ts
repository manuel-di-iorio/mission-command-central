import { Asset, Mission, Zone, AppEvent, Alert } from './types';

export const initialAssets: Asset[] = [
  { id: 'a1', name: 'Reaper-01', type: 'drone', status: 'active', position: [38.9072, -77.0369], speed: 120, heading: 45, lastUpdate: new Date().toISOString() },
  { id: 'a2', name: 'Hawk-07', type: 'aircraft', status: 'in-mission', position: [39.0997, -76.8486], speed: 450, heading: 180, lastUpdate: new Date().toISOString() },
  { id: 'a3', name: 'Sentinel-3', type: 'satellite', status: 'active', position: [38.8048, -77.0469], speed: 0, heading: 0, lastUpdate: new Date().toISOString() },
  { id: 'a4', name: 'Viper-12', type: 'ground-vehicle', status: 'offline', position: [38.7849, -77.1013], speed: 0, heading: 90, lastUpdate: new Date().toISOString() },
  { id: 'a5', name: 'Neptune-05', type: 'naval', status: 'active', position: [38.7609, -76.9841], speed: 25, heading: 270, lastUpdate: new Date().toISOString() },
  { id: 'a6', name: 'Ghost-09', type: 'drone', status: 'in-mission', position: [39.0458, -77.1172], speed: 95, heading: 135, lastUpdate: new Date().toISOString() },
  { id: 'a7', name: 'Eagle-02', type: 'aircraft', status: 'active', position: [38.9532, -77.1467], speed: 380, heading: 315, lastUpdate: new Date().toISOString() },
  { id: 'a8', name: 'Tracker-14', type: 'ground-vehicle', status: 'active', position: [38.8816, -76.9386], speed: 60, heading: 0, lastUpdate: new Date().toISOString() },
];

export const initialMissions: Mission[] = [
  { id: 'm1', name: 'Operation Overwatch', objective: 'Aerial surveillance of sector 7', assignedAssets: ['a2', 'a6'], area: [39.0, -77.0], areaRadius: 15, priority: 'high', status: 'active', riskScore: 72, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'm2', name: 'Coastal Patrol', objective: 'Maritime border monitoring', assignedAssets: ['a5'], area: [38.76, -76.98], areaRadius: 10, priority: 'medium', status: 'active', riskScore: 45, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'm3', name: 'Recon Delta', objective: 'Ground reconnaissance in zone B', assignedAssets: [], area: [38.85, -77.05], areaRadius: 8, priority: 'low', status: 'draft', riskScore: 30, createdAt: new Date(Date.now() - 1800000).toISOString() },
];

export const initialZones: Zone[] = [
  { id: 'z1', name: 'Op Zone Alpha', type: 'operational', center: [38.95, -77.05], radius: 12000, color: 'hsl(185, 70%, 50%)' },
  { id: 'z2', name: 'Op Zone Bravo', type: 'operational', center: [38.80, -76.95], radius: 8000, color: 'hsl(185, 70%, 50%)' },
  { id: 'z3', name: 'No-Fly Zone 1', type: 'restricted', center: [38.89, -77.01], radius: 5000, color: 'hsl(0, 70%, 50%)' },
  { id: 'z4', name: 'No-Fly Zone 2', type: 'restricted', center: [39.05, -77.10], radius: 3000, color: 'hsl(0, 70%, 50%)' },
];

export const initialEvents: AppEvent[] = [
  { id: 'e1', timestamp: new Date(Date.now() - 300000).toISOString(), type: 'mission_created', message: 'Mission "Operation Overwatch" created', severity: 'info' },
  { id: 'e2', timestamp: new Date(Date.now() - 250000).toISOString(), type: 'asset_assigned', message: 'Hawk-07 assigned to Operation Overwatch', severity: 'info' },
  { id: 'e3', timestamp: new Date(Date.now() - 200000).toISOString(), type: 'status_update', message: 'Viper-12 went offline', severity: 'warning' },
  { id: 'e4', timestamp: new Date(Date.now() - 150000).toISOString(), type: 'alert', message: 'High risk detected in Operation Overwatch', severity: 'critical' },
  { id: 'e5', timestamp: new Date(Date.now() - 100000).toISOString(), type: 'mission_created', message: 'Mission "Coastal Patrol" created', severity: 'info' },
  { id: 'e6', timestamp: new Date(Date.now() - 50000).toISOString(), type: 'position_update', message: 'Ghost-09 entered restricted zone', severity: 'warning' },
];

export const initialAlerts: Alert[] = [
  { id: 'al1', timestamp: new Date(Date.now() - 200000).toISOString(), severity: 'warning', title: 'Asset Offline', message: 'Viper-12 has gone offline. Last known position recorded.', dismissed: false },
  { id: 'al2', timestamp: new Date(Date.now() - 150000).toISOString(), severity: 'critical', title: 'High Risk Mission', message: 'Operation Overwatch risk score exceeds threshold (72/100).', dismissed: false },
  { id: 'al3', timestamp: new Date(Date.now() - 50000).toISOString(), severity: 'warning', title: 'Zone Violation', message: 'Ghost-09 detected near restricted airspace.', dismissed: false },
];
