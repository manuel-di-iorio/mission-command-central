export type AssetType = 'UAV' | 'fixed-wing' | 'rotary-wing' | 'satellite' | 'APC' | 'MBT' | 'IFV' | 'frigate' | 'submarine' | 'patrol-boat';
export type AssetStatus = 'operational' | 'offline' | 'deployed' | 'RTB' | 'maintenance' | 'damaged' | 'destroyed';
export type MissionStatus = 'PLANORD' | 'WARNORD' | 'OPORD' | 'FRAGO' | 'active' | 'completed' | 'aborted' | 'failed';
export type AlertSeverity = 'critical' | 'warning' | 'info' | 'security';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ClassificationLevel = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET' | 'TOP SECRET//SCI';
export type NATOPriority = 'ROUTINE' | 'PRIORITY' | 'IMMEDIATE' | 'FLASH' | 'OVERRIDE';
export type ReadinessLevel = 'C1' | 'C2' | 'C3' | 'C4'; // NATO readiness
export type OrderType = 'MOVE' | 'PATROL' | 'ENGAGE' | 'RECON' | 'RTB' | 'HOLD' | 'RESUPPLY' | 'MEDEVAC' | 'EXFIL';

export interface Waypoint {
  id: string;
  position: [number, number];
  label: string;
  type: 'NAV' | 'IP' | 'CP' | 'RP' | 'LZ' | 'CAS' | 'FARP';
  eta?: string;
}

export interface AssetOrder {
  id: string;
  assetId: string;
  type: OrderType;
  waypoints: Waypoint[];
  issuedAt: string;
  issuedBy: string;
  status: 'pending' | 'acknowledged' | 'executing' | 'completed' | 'failed';
  priority: NATOPriority;
  description: string;
}

export interface SupplyStatus {
  ammunition: { current: number; max: number; type: string };
  fuel: { current: number; max: number; unit: string };
  rations: number; // days remaining
  medical: 'full' | 'partial' | 'critical' | 'depleted';
  spares: 'adequate' | 'low' | 'critical';
}

export interface Asset {
  id: string;
  name: string;
  callsign: string;
  type: AssetType;
  status: AssetStatus;
  position: [number, number];
  speed: number;
  heading: number;
  altitude?: number;
  lastUpdate: string;
  readiness: ReadinessLevel;
  commandAuthority: string;
  unitDesignation: string;
  supply: SupplyStatus;
  currentOrderId?: string;
  telemetry: {
    battery: number;
    signalStrength: number;
    encryptionStatus: 'AES-256' | 'compromised' | 'COMSEC-FAIL' | 'EMCON';
    iff: 'FRIENDLY' | 'HOSTILE' | 'UNKNOWN' | 'NEUTRAL'; // IFF transponder
  };
}

export interface C2Node {
  id: string;
  name: string;
  role: 'COMBATANT_CMD' | 'JTF' | 'DIVISION' | 'BRIGADE' | 'BATTALION' | 'COMPANY' | 'PLATOON';
  commander: string;
  parentId?: string;
  subordinateIds: string[];
  assetIds: string[];
  classification: ClassificationLevel;
}

export interface Mission {
  id: string;
  name: string;
  opordNumber: string;
  objective: string;
  assignedAssets: string[];
  area: [number, number];
  areaRadius: number;
  priority: NATOPriority;
  status: MissionStatus;
  riskScore: number;
  createdAt: string;
  classification: ClassificationLevel;
  rulesOfEngagement: string;
  commandAuthority: string;
  phases: MissionPhase[];
  logisticsRequirements: string;
}

export interface MissionPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  startCondition: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'AO' | 'restricted' | 'no-fly' | 'FSA' | 'KEZ' | 'MEZ' | 'surveillance';
  center: [number, number];
  radius: number;
  color: string;
  classification: ClassificationLevel;
}

export interface SIGINTContact {
  id: string;
  type: 'COMINT' | 'ELINT' | 'FISINT';
  position: [number, number];
  bearing: number;
  frequency?: string;
  signalType: string;
  classification: ClassificationLevel;
  threat: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedAt: string;
  detectedBy: string;
  status: 'active' | 'lost' | 'identified';
}

export interface AppEvent {
  id: string;
  timestamp: string;
  type: 'OPORD_ISSUED' | 'FRAGO_ISSUED' | 'ASSET_DEPLOYED' | 'CONTACT_REPORT' | 'STATUS_CHANGE' | 'SITREP' | 'MEDEVAC_REQ' | 'FIRES_REQUEST' | 'SUPPLY_REQ' | 'SECURITY_BREACH' | 'COMMS_LOST' | 'ORDER_ISSUED';
  message: string;
  severity: AlertSeverity;
  classification: ClassificationLevel;
  originator: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  dismissed: boolean;
  classification: ClassificationLevel;
}
