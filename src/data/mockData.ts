import { Asset, Mission, Zone, AppEvent, Alert, C2Node, SIGINTContact, AssetOrder } from './types';

export const initialC2Hierarchy: C2Node[] = [
  {
    id: 'c2-1', name: 'EUCOM J3 Operations', role: 'COMBATANT_CMD', commander: 'GEN. Richardson',
    subordinateIds: ['c2-2', 'c2-3'], assetIds: [], classification: 'TOP SECRET//SCI',
  },
  {
    id: 'c2-2', name: 'JTF-ATLANTIC', role: 'JTF', commander: 'VADM. Torres', parentId: 'c2-1',
    subordinateIds: ['c2-4', 'c2-5'], assetIds: [], classification: 'TOP SECRET',
  },
  {
    id: 'c2-3', name: 'JTF-EAST', role: 'JTF', commander: 'LTG. Novak', parentId: 'c2-1',
    subordinateIds: [], assetIds: [], classification: 'SECRET',
  },
  {
    id: 'c2-4', name: '3rd ISR Wing', role: 'BRIGADE', commander: 'COL. Mercer', parentId: 'c2-2',
    subordinateIds: [], assetIds: ['a1', 'a6', 'a3', 'a7'], classification: 'SECRET',
  },
  {
    id: 'c2-5', name: 'TF NEPTUNE', role: 'BATTALION', commander: 'CDR. Vasquez', parentId: 'c2-2',
    subordinateIds: [], assetIds: ['a5', 'a2'], classification: 'SECRET',
  },
];

export const initialAssets: Asset[] = [
  {
    id: 'a1', name: 'MQ-9A Block 5', callsign: 'REAPER-01', type: 'UAV', status: 'operational',
    position: [38.9072, -77.0369], speed: 120, heading: 45, altitude: 25000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: '3rd ISR Wing / Det. Alpha',
    supply: {
      ammunition: { current: 4, max: 4, type: 'AGM-114 Hellfire' },
      fuel: { current: 80, max: 100, unit: '%' },
      rations: 0, medical: 'full', spares: 'adequate'
    },
    telemetry: { battery: 85, signalStrength: 92, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a2', name: 'F/A-18E Super Hornet', callsign: 'HAWK-07', type: 'fixed-wing', status: 'deployed',
    position: [39.0997, -76.8486], speed: 450, heading: 180, altitude: 32000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-5', unitDesignation: 'VFA-143 / CVN-77',
    supply: {
      ammunition: { current: 2, max: 6, type: 'AIM-120D AMRAAM' },
      fuel: { current: 65, max: 100, unit: '%' },
      rations: 0, medical: 'full', spares: 'adequate'
    },
    telemetry: { battery: 90, signalStrength: 78, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a3', name: 'NROL-82 SIGINT', callsign: 'SENTINEL-3', type: 'satellite', status: 'operational',
    position: [38.8048, -77.0469], speed: 0, heading: 0, altitude: 400000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: 'NRO Det. 3',
    supply: {
      ammunition: { current: 0, max: 0, type: 'N/A' },
      fuel: { current: 95, max: 100, unit: '%' },
      rations: 0, medical: 'full', spares: 'adequate'
    },
    telemetry: { battery: 100, signalStrength: 99, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a4', name: 'M2A3 Bradley IFV', callsign: 'VIPER-12', type: 'IFV', status: 'damaged',
    position: [38.7849, -77.1013], speed: 0, heading: 90, lastUpdate: new Date().toISOString(),
    readiness: 'C4', commandAuthority: 'c2-4', unitDesignation: '2-3 INF / A Co.',
    supply: {
      ammunition: { current: 120, max: 900, type: '25mm M242' },
      fuel: { current: 5, max: 100, unit: '%' },
      rations: 1, medical: 'critical', spares: 'critical'
    },
    telemetry: { battery: 12, signalStrength: 0, encryptionStatus: 'COMSEC-FAIL', iff: 'FRIENDLY' },
  },
  {
    id: 'a5', name: 'DDG-115 USS Rafael Peralta', callsign: 'NEPTUNE-05', type: 'frigate', status: 'operational',
    position: [38.7609, -76.9841], speed: 25, heading: 270, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-5', unitDesignation: 'DESRON 28',
    supply: {
      ammunition: { current: 90, max: 96, type: 'SM-6 / ESSM' },
      fuel: { current: 92, max: 100, unit: '%' },
      rations: 45, medical: 'full', spares: 'adequate'
    },
    telemetry: { battery: 95, signalStrength: 88, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a6', name: 'RQ-170 Sentinel', callsign: 'GHOST-09', type: 'UAV', status: 'deployed',
    position: [39.0458, -77.1172], speed: 95, heading: 135, altitude: 50000, lastUpdate: new Date().toISOString(),
    readiness: 'C2', commandAuthority: 'c2-4', unitDesignation: '3rd ISR Wing / Det. Bravo',
    supply: {
      ammunition: { current: 0, max: 0, type: 'N/A (ISR only)' },
      fuel: { current: 35, max: 100, unit: '%' },
      rations: 0, medical: 'full', spares: 'low'
    },
    telemetry: { battery: 42, signalStrength: 65, encryptionStatus: 'compromised', iff: 'FRIENDLY' },
  },
  {
    id: 'a7', name: 'AH-64E Apache Guardian', callsign: 'EAGLE-02', type: 'rotary-wing', status: 'operational',
    position: [38.9532, -77.1467], speed: 145, heading: 315, altitude: 500, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: '1-101 AVN / B Trp.',
    supply: {
      ammunition: { current: 16, max: 16, type: 'AGM-114L Longbow' },
      fuel: { current: 72, max: 100, unit: '%' },
      rations: 0, medical: 'full', spares: 'adequate'
    },
    telemetry: { battery: 88, signalStrength: 82, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a8', name: 'M-ATV MRAP', callsign: 'TRACKER-14', type: 'APC', status: 'operational',
    position: [38.8816, -76.9386], speed: 60, heading: 0, lastUpdate: new Date().toISOString(),
    readiness: 'C2', commandAuthority: 'c2-4', unitDesignation: '2-3 INF / B Co.',
    supply: {
      ammunition: { current: 400, max: 1000, type: '7.62mm / .50 cal' },
      fuel: { current: 60, max: 100, unit: '%' },
      rations: 3, medical: 'partial', spares: 'low'
    },
    telemetry: { battery: 75, signalStrength: 94, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
];

export const initialOrders: AssetOrder[] = [
  {
    id: 'ord-1', assetId: 'a2', type: 'PATROL', issuedAt: new Date(Date.now() - 1800000).toISOString(),
    issuedBy: 'CDR. Vasquez', status: 'executing', priority: 'PRIORITY',
    description: 'CAP station BRAVO. Maintain 32000ft FL320. ROE: weapons tight.',
    waypoints: [
      { id: 'w1', position: [39.1, -76.85], label: 'CP ALPHA', type: 'CP' },
      { id: 'w2', position: [39.15, -76.90], label: 'STATION BRAVO', type: 'NAV' },
      { id: 'w3', position: [39.1, -76.95], label: 'CP CHARLIE', type: 'CP' },
    ]
  },
  {
    id: 'ord-2', assetId: 'a6', type: 'RECON', issuedAt: new Date(Date.now() - 3600000).toISOString(),
    issuedBy: 'COL. Mercer', status: 'executing', priority: 'IMMEDIATE',
    description: 'ISR sweep of GRID REF 38N 280 490. Identify all emitters. EMCON Alpha.',
    waypoints: [
      { id: 'w4', position: [39.05, -77.12], label: 'IP DELTA', type: 'IP' },
      { id: 'w5', position: [39.08, -77.08], label: 'NAI-1', type: 'NAV' },
      { id: 'w6', position: [39.03, -77.05], label: 'NAI-2', type: 'NAV' },
    ]
  },
];

export const initialSIGINTContacts: SIGINTContact[] = [
  {
    id: 'sig-1', type: 'ELINT', position: [39.02, -77.08], bearing: 245,
    frequency: '9.2 GHz', signalType: 'Pulse Doppler Radar (SA-21 Growler)',
    classification: 'SECRET', threat: 'HIGH', detectedAt: new Date(Date.now() - 120000).toISOString(),
    detectedBy: 'GHOST-09', status: 'active'
  },
  {
    id: 'sig-2', type: 'COMINT', position: [38.95, -77.15], bearing: 190,
    frequency: '243.0 MHz', signalType: 'UHF Tactical Net (encrypted)',
    classification: 'TOP SECRET', threat: 'MEDIUM', detectedAt: new Date(Date.now() - 300000).toISOString(),
    detectedBy: 'SENTINEL-3', status: 'active'
  },
  {
    id: 'sig-3', type: 'ELINT', position: [38.85, -76.92], bearing: 110,
    frequency: '2.8 GHz', signalType: 'Naval Search Radar (unknown class)',
    classification: 'SECRET', threat: 'LOW', detectedAt: new Date(Date.now() - 600000).toISOString(),
    detectedBy: 'NEPTUNE-05', status: 'identified'
  },
];

export const initialMissions: Mission[] = [
  {
    id: 'm1', name: 'Operation OVERWATCH', opordNumber: 'OPORD 01-26',
    objective: 'Establish persistent ISR coverage over NAI GRID 39N-077W. Provide BDA for follow-on strikes.',
    assignedAssets: ['a2', 'a6'], area: [39.0, -77.0], areaRadius: 15,
    priority: 'IMMEDIATE', status: 'active', riskScore: 72,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    classification: 'TOP SECRET', rulesOfEngagement: 'WEAPONS TIGHT. Engage only in self-defense or upon FLASH authorization from JTF-ATLANTIC.',
    commandAuthority: 'VADM. Torres / JTF-ATLANTIC',
    phases: [
      { id: 'ph1', name: 'Phase I - Deployment', description: 'Deploy ISR assets to AO', status: 'completed', startCondition: 'OPORD execution' },
      { id: 'ph2', name: 'Phase II - Collection', description: 'Continuous ISR sweep of NAIs', status: 'active', startCondition: 'Assets on station' },
      { id: 'ph3', name: 'Phase III - Exploitation', description: 'Process and disseminate intelligence', status: 'pending', startCondition: 'Priority targets identified' },
    ],
    logisticsRequirements: 'FARP DELTA fueling capability. Ammunition pre-positioned at FOB ECHO.',
  },
  {
    id: 'm2', name: 'Operation TRIDENT SHIELD', opordNumber: 'OPORD 02-26',
    objective: 'Maritime domain awareness in CHOP zone. Detect and track all surface contacts entering AO.',
    assignedAssets: ['a5'], area: [38.76, -76.98], areaRadius: 10,
    priority: 'PRIORITY', status: 'active', riskScore: 45,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    classification: 'SECRET', rulesOfEngagement: 'Standard maritime ROE. Challenge unknown contacts IAW LOAC.',
    commandAuthority: 'CDR. Vasquez / TF NEPTUNE',
    phases: [
      { id: 'ph4', name: 'Phase I - Transit', description: 'Deploy to patrol area', status: 'completed', startCondition: 'Departure from port' },
      { id: 'ph5', name: 'Phase II - Patrol', description: 'Systematic patrol of designated sectors', status: 'active', startCondition: 'Arrival at AO' },
    ],
    logisticsRequirements: 'Underway replenishment scheduled T+48hrs from USNS supply ship.',
  },
  {
    id: 'm3', name: 'Operation SHADOW ADVANCE', opordNumber: 'FRAGORD 03-26',
    objective: 'Ground reconnaissance of suspected staging area at GRID 38N 850 050. Avoid detection.',
    assignedAssets: [], area: [38.85, -77.05], areaRadius: 8,
    priority: 'ROUTINE', status: 'PLANORD', riskScore: 30,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    classification: 'SECRET', rulesOfEngagement: 'WEAPONS HOLD. No engagement. EMCON BRAVO. Exfil on compromise.',
    commandAuthority: 'COL. Mercer / 3rd ISR Wing',
    phases: [
      { id: 'ph6', name: 'Phase I - Infiltration', description: 'Covert approach to ORP', status: 'pending', startCondition: 'WARNORD issued' },
      { id: 'ph7', name: 'Phase II - Surveillance', description: '48hr hide site observation', status: 'pending', startCondition: 'ORP established' },
    ],
    logisticsRequirements: '72hr rations. Comms relay via SENTINEL-3. No resupply planned.',
  },
  {
    id: 'm4', name: 'Operation NIGHTSHADE', opordNumber: 'OPORD 04-26',
    objective: 'Time-sensitive target engagement. HVT extraction from compound at GRID 38N 920 080.',
    assignedAssets: ['a1', 'a7'], area: [38.92, -77.08], areaRadius: 5,
    priority: 'FLASH', status: 'active', riskScore: 88,
    createdAt: new Date(Date.now() - 600000).toISOString(),
    classification: 'TOP SECRET//SCI', rulesOfEngagement: 'WEAPONS FREE within KEZ. Deadly force authorized for HVT extraction. Minimize collateral damage.',
    commandAuthority: 'GEN. Richardson / EUCOM J3',
    phases: [
      { id: 'ph8', name: 'Phase I - Shaping', description: 'ISR preparation of battlespace', status: 'completed', startCondition: 'FLASH authorization' },
      { id: 'ph9', name: 'Phase II - Assault', description: 'Direct action on objective', status: 'active', startCondition: 'Conditions set' },
      { id: 'ph10', name: 'Phase III - Exfiltration', description: 'Secure HVT and extract', status: 'pending', startCondition: 'Objective secure' },
    ],
    logisticsRequirements: 'MEDEVAC standby at FARP ECHO. QRF on 15-min standby.',
  },
];

export const initialZones: Zone[] = [
  { id: 'z1', name: 'AO ATLANTIC', type: 'AO', center: [38.95, -77.05], radius: 12000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z2', name: 'AO CHESAPEAKE', type: 'AO', center: [38.80, -76.95], radius: 8000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z3', name: 'NFZ ALPHA (No-Fly Zone)', type: 'no-fly', center: [38.89, -77.01], radius: 5000, color: 'hsl(0, 70%, 50%)', classification: 'UNCLASSIFIED' },
  { id: 'z4', name: 'NFZ BRAVO (No-Fly Zone)', type: 'no-fly', center: [39.05, -77.10], radius: 3000, color: 'hsl(0, 70%, 50%)', classification: 'UNCLASSIFIED' },
  { id: 'z5', name: 'FSA ECHO (Fire Support Area)', type: 'FSA', center: [38.92, -77.08], radius: 4000, color: 'hsl(30, 90%, 55%)', classification: 'SECRET' },
  { id: 'z6', name: 'KEZ NIGHTSHADE', type: 'KEZ', center: [38.93, -77.07], radius: 2000, color: 'hsl(0, 100%, 40%)', classification: 'TOP SECRET' },
  { id: 'z7', name: 'MEZ SECTOR 4', type: 'MEZ', center: [39.02, -77.08], radius: 6000, color: 'hsl(280, 70%, 50%)', classification: 'SECRET' },
];

export const initialEvents: AppEvent[] = [
  { id: 'e1', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'OPORD_ISSUED', message: 'OPORD 01-26 "OVERWATCH" issued by JTF-ATLANTIC. Classification: TS.', severity: 'info', classification: 'TOP SECRET', originator: 'VADM. Torres' },
  { id: 'e2', timestamp: new Date(Date.now() - 3500000).toISOString(), type: 'ASSET_DEPLOYED', message: 'HAWK-07 (F/A-18E) deployed to CAP station BRAVO. Weapons tight.', severity: 'info', classification: 'SECRET', originator: 'CDR. Vasquez' },
  { id: 'e3', timestamp: new Date(Date.now() - 3000000).toISOString(), type: 'ORDER_ISSUED', message: 'ORDER: GHOST-09 tasked ISR sweep Grid 39N 280 490. EMCON Alpha.', severity: 'info', classification: 'SECRET', originator: 'COL. Mercer' },
  { id: 'e4', timestamp: new Date(Date.now() - 2000000).toISOString(), type: 'STATUS_CHANGE', message: 'VIPER-12 (M2A3 Bradley) status: DAMAGED. IED strike at GRID 38N 784 101. CASEVAC requested.', severity: 'critical', classification: 'SECRET', originator: '2-3 INF TOC' },
  { id: 'e5', timestamp: new Date(Date.now() - 1500000).toISOString(), type: 'CONTACT_REPORT', message: 'SIGINT: SA-21 pulse doppler radar detected BRG 245° from NAI-1. Threat: HIGH. MEZ active.', severity: 'warning', classification: 'TOP SECRET', originator: 'GHOST-09' },
  { id: 'e6', timestamp: new Date(Date.now() - 600000).toISOString(), type: 'OPORD_ISSUED', message: 'OPORD 04-26 "NIGHTSHADE" issued. FLASH priority. HVT extraction authorized.', severity: 'critical', classification: 'TOP SECRET//SCI', originator: 'GEN. Richardson' },
  { id: 'e7', timestamp: new Date(Date.now() - 300000).toISOString(), type: 'FRAGO_ISSUED', message: 'FRAGO: REAPER-01 rerouted to KEZ NIGHTSHADE for ISR overwatch. Weapons free within KEZ.', severity: 'warning', classification: 'TOP SECRET', originator: 'JTF-ATLANTIC J3' },
  { id: 'e8', timestamp: new Date(Date.now() - 120000).toISOString(), type: 'SECURITY_BREACH', message: 'COMSEC BREACH: GHOST-09 encryption compromised. Possible adversary EW activity in Sector 4.', severity: 'security', classification: 'TOP SECRET', originator: 'SIGINT FUSION CELL' },
  { id: 'e9', timestamp: new Date(Date.now() - 60000).toISOString(), type: 'SUPPLY_REQ', message: 'LOGREQ: VIPER-12 requires emergency fuel, medical, ammunition resupply. Priority: FLASH.', severity: 'warning', classification: 'SECRET', originator: '2-3 INF S4' },
  { id: 'e10', timestamp: new Date(Date.now() - 30000).toISOString(), type: 'SITREP', message: 'SITREP: TF NEPTUNE reports 3x unknown surface contacts BRG 110° 22nm from DDG-115. IFF: UNKNOWN.', severity: 'warning', classification: 'SECRET', originator: 'CDR. Vasquez' },
];

export const initialAlerts: Alert[] = [
  { id: 'al1', timestamp: new Date(Date.now() - 2000000).toISOString(), severity: 'critical', title: 'ASSET DAMAGED', message: 'VIPER-12 (M2A3 Bradley) sustained IED damage. CASEVAC and resupply required. Readiness: C4.', dismissed: false, classification: 'SECRET' },
  { id: 'al2', timestamp: new Date(Date.now() - 1500000).toISOString(), severity: 'warning', title: 'SAM THREAT DETECTED', message: 'SA-21 Growler radar detected in MEZ SECTOR 4. All aircraft maintain SA. GHOST-09 at risk.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al3', timestamp: new Date(Date.now() - 600000).toISOString(), severity: 'critical', title: 'FLASH: NIGHTSHADE AUTHORIZED', message: 'HVT extraction mission NIGHTSHADE authorized by EUCOM. WEAPONS FREE within KEZ.', dismissed: false, classification: 'TOP SECRET//SCI' },
  { id: 'al4', timestamp: new Date(Date.now() - 120000).toISOString(), severity: 'security', title: 'COMSEC BREACH', message: 'GHOST-09 AES-256 encryption compromised. Adversary EW capability confirmed. Switch to backup COMSEC.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al5', timestamp: new Date(Date.now() - 30000).toISOString(), severity: 'warning', title: 'UNKNOWN CONTACTS', message: '3x unknown surface contacts detected by DDG-115. IFF returns: UNKNOWN. Classification pending.', dismissed: false, classification: 'SECRET' },
];
