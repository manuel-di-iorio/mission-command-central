import { Asset, Mission, Zone, AppEvent, Alert, C2Node, SIGINTContact, AssetOrder } from './types';

export const initialC2Hierarchy: C2Node[] = [
  {
    id: 'c2-1', name: 'EUCOM J3 Operations', role: 'COMBATANT_CMD', commander: 'GEN. Richardson',
    subordinateIds: ['c2-2', 'c2-3', 'c2-6'], assetIds: [], classification: 'TOP SECRET//SCI',
  },
  {
    id: 'c2-2', name: 'JTF-ATLANTIC', role: 'JTF', commander: 'VADM. Torres', parentId: 'c2-1',
    subordinateIds: ['c2-4', 'c2-5'], assetIds: [], classification: 'TOP SECRET',
  },
  {
    id: 'c2-3', name: 'JTF-EAST', role: 'JTF', commander: 'LTG. Novak', parentId: 'c2-1',
    subordinateIds: ['c2-7', 'c2-8'], assetIds: [], classification: 'SECRET',
  },
  {
    id: 'c2-4', name: '3rd ISR Wing', role: 'BRIGADE', commander: 'COL. Mercer', parentId: 'c2-2',
    subordinateIds: [], assetIds: ['a1', 'a6', 'a3', 'a7'], classification: 'SECRET',
  },
  {
    id: 'c2-5', name: 'TF NEPTUNE', role: 'BATTALION', commander: 'CDR. Vasquez', parentId: 'c2-2',
    subordinateIds: [], assetIds: ['a5', 'a2'], classification: 'SECRET',
  },
  {
    id: 'c2-6', name: 'JTF-BALTIC', role: 'JTF', commander: 'RADM. Lindqvist', parentId: 'c2-1',
    subordinateIds: ['c2-9', 'c2-10'], assetIds: [], classification: 'TOP SECRET',
  },
  {
    id: 'c2-7', name: '12th Armored BCT', role: 'BRIGADE', commander: 'COL. Kowalski', parentId: 'c2-3',
    subordinateIds: [], assetIds: ['a4', 'a8', 'a9', 'a10', 'a11'], classification: 'SECRET',
  },
  {
    id: 'c2-8', name: '5th SOF Group', role: 'BATTALION', commander: 'LTC. Blackwood', parentId: 'c2-3',
    subordinateIds: [], assetIds: ['a12', 'a13'], classification: 'TOP SECRET',
  },
  {
    id: 'c2-9', name: 'SNMG-2 (Standing NATO Maritime Group)', role: 'BRIGADE', commander: 'COMO. Andersen', parentId: 'c2-6',
    subordinateIds: [], assetIds: ['a14', 'a15', 'a16'], classification: 'SECRET',
  },
  {
    id: 'c2-10', name: '31st Fighter Wing (Aviano)', role: 'BRIGADE', commander: 'COL. Moretti', parentId: 'c2-6',
    subordinateIds: [], assetIds: ['a17', 'a18', 'a19', 'a20'], classification: 'SECRET',
  },
];

export const initialAssets: Asset[] = [
  // ============ ORIGINAL ASSETS (DC Area) ============
  {
    id: 'a1', name: 'MQ-9A Block 5', callsign: 'REAPER-01', type: 'UAV', status: 'operational',
    position: [38.9072, -77.0369], speed: 120, heading: 45, altitude: 25000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: '3rd ISR Wing / Det. Alpha',
    supply: { ammunition: { current: 4, max: 4, type: 'AGM-114 Hellfire' }, fuel: { current: 80, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 85, signalStrength: 92, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a2', name: 'F/A-18E Super Hornet', callsign: 'HAWK-07', type: 'fixed-wing', status: 'deployed',
    position: [39.0997, -76.8486], speed: 450, heading: 180, altitude: 32000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-5', unitDesignation: 'VFA-143 / CVN-77',
    supply: { ammunition: { current: 2, max: 6, type: 'AIM-120D AMRAAM' }, fuel: { current: 65, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 90, signalStrength: 78, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a3', name: 'NROL-82 SIGINT', callsign: 'SENTINEL-3', type: 'satellite', status: 'operational',
    position: [38.8048, -77.0469], speed: 0, heading: 0, altitude: 400000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: 'NRO Det. 3',
    supply: { ammunition: { current: 0, max: 0, type: 'N/A' }, fuel: { current: 95, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 100, signalStrength: 99, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a4', name: 'M2A3 Bradley IFV', callsign: 'VIPER-12', type: 'IFV', status: 'damaged',
    position: [38.7849, -77.1013], speed: 0, heading: 90, lastUpdate: new Date().toISOString(),
    readiness: 'C4', commandAuthority: 'c2-7', unitDesignation: '2-3 INF / A Co.',
    supply: { ammunition: { current: 120, max: 900, type: '25mm M242' }, fuel: { current: 5, max: 100, unit: '%' }, rations: 1, medical: 'critical', spares: 'critical' },
    telemetry: { battery: 12, signalStrength: 0, encryptionStatus: 'COMSEC-FAIL', iff: 'FRIENDLY' },
  },
  {
    id: 'a5', name: 'DDG-115 USS Rafael Peralta', callsign: 'NEPTUNE-05', type: 'frigate', status: 'operational',
    position: [38.7609, -76.9841], speed: 25, heading: 270, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-5', unitDesignation: 'DESRON 28',
    supply: { ammunition: { current: 90, max: 96, type: 'SM-6 / ESSM' }, fuel: { current: 92, max: 100, unit: '%' }, rations: 45, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 95, signalStrength: 88, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a6', name: 'RQ-170 Sentinel', callsign: 'GHOST-09', type: 'UAV', status: 'deployed',
    position: [39.0458, -77.1172], speed: 95, heading: 135, altitude: 50000, lastUpdate: new Date().toISOString(),
    readiness: 'C2', commandAuthority: 'c2-4', unitDesignation: '3rd ISR Wing / Det. Bravo',
    supply: { ammunition: { current: 0, max: 0, type: 'N/A (ISR only)' }, fuel: { current: 35, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'low' },
    telemetry: { battery: 42, signalStrength: 65, encryptionStatus: 'compromised', iff: 'FRIENDLY' },
  },
  {
    id: 'a7', name: 'AH-64E Apache Guardian', callsign: 'EAGLE-02', type: 'rotary-wing', status: 'operational',
    position: [38.9532, -77.1467], speed: 145, heading: 315, altitude: 500, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-4', unitDesignation: '1-101 AVN / B Trp.',
    supply: { ammunition: { current: 16, max: 16, type: 'AGM-114L Longbow' }, fuel: { current: 72, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 88, signalStrength: 82, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a8', name: 'M-ATV MRAP', callsign: 'TRACKER-14', type: 'APC', status: 'operational',
    position: [38.8816, -76.9386], speed: 60, heading: 0, lastUpdate: new Date().toISOString(),
    readiness: 'C2', commandAuthority: 'c2-7', unitDesignation: '2-3 INF / B Co.',
    supply: { ammunition: { current: 400, max: 1000, type: '7.62mm / .50 cal' }, fuel: { current: 60, max: 100, unit: '%' }, rations: 3, medical: 'partial', spares: 'low' },
    telemetry: { battery: 75, signalStrength: 94, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ NEW GROUND ASSETS (Eastern Europe) ============
  {
    id: 'a9', name: 'M1A2 SEPv3 Abrams', callsign: 'IRONHORSE-01', type: 'MBT', status: 'operational',
    position: [54.3520, 18.6466], speed: 0, heading: 45, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-7', unitDesignation: '1-66 AR / A Co.',
    supply: { ammunition: { current: 40, max: 42, type: '120mm M829A4 APFSDS' }, fuel: { current: 88, max: 100, unit: '%' }, rations: 5, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 92, signalStrength: 95, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a10', name: 'M1A2 SEPv3 Abrams', callsign: 'IRONHORSE-02', type: 'MBT', status: 'operational',
    position: [54.3680, 18.6800], speed: 15, heading: 90, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-7', unitDesignation: '1-66 AR / A Co.',
    supply: { ammunition: { current: 38, max: 42, type: '120mm M829A4 APFSDS' }, fuel: { current: 75, max: 100, unit: '%' }, rations: 5, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 88, signalStrength: 91, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a11', name: 'M2A3 Bradley IFV', callsign: 'VIPER-21', type: 'IFV', status: 'operational',
    position: [54.4010, 18.5700], speed: 30, heading: 180, lastUpdate: new Date().toISOString(),
    readiness: 'C2', commandAuthority: 'c2-7', unitDesignation: '2-3 INF / C Co.',
    supply: { ammunition: { current: 780, max: 900, type: '25mm M242 / TOW-2B' }, fuel: { current: 55, max: 100, unit: '%' }, rations: 3, medical: 'full', spares: 'low' },
    telemetry: { battery: 70, signalStrength: 88, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ SOF ASSETS ============
  {
    id: 'a12', name: 'MH-60M Black Hawk (DAP)', callsign: 'SHADOW-06', type: 'rotary-wing', status: 'deployed',
    position: [50.0755, 19.7900], speed: 160, heading: 60, altitude: 200, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-8', unitDesignation: '160th SOAR / A Co.',
    supply: { ammunition: { current: 1200, max: 1200, type: '7.62mm / 2.75" FFAR' }, fuel: { current: 62, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 95, signalStrength: 70, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a13', name: 'MC-130J Commando II', callsign: 'NIGHTOWL-03', type: 'fixed-wing', status: 'operational',
    position: [51.1000, 16.8800], speed: 280, heading: 270, altitude: 28000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-8', unitDesignation: '352nd SOW / 67th SOS',
    supply: { ammunition: { current: 0, max: 0, type: 'N/A (SOF Transport)' }, fuel: { current: 70, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 90, signalStrength: 85, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ NATO MARITIME (Baltic) ============
  {
    id: 'a14', name: 'HDMS Absalon (L16)', callsign: 'VIKING-01', type: 'frigate', status: 'operational',
    position: [55.6761, 12.5683], speed: 18, heading: 350, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-9', unitDesignation: 'SNMG-2 / Danish Navy',
    supply: { ammunition: { current: 60, max: 64, type: 'Mk 41 VLS / Harpoon' }, fuel: { current: 82, max: 100, unit: '%' }, rations: 30, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 98, signalStrength: 92, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a15', name: 'FGS Sachsen (F219)', callsign: 'TEUTONIC-03', type: 'frigate', status: 'operational',
    position: [56.1500, 11.8000], speed: 22, heading: 30, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-9', unitDesignation: 'SNMG-2 / Deutsche Marine',
    supply: { ammunition: { current: 30, max: 32, type: 'SM-2 / RAM' }, fuel: { current: 68, max: 100, unit: '%' }, rations: 25, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 94, signalStrength: 90, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a16', name: 'Type 212A Submarine', callsign: 'PHANTOM-01', type: 'submarine', status: 'deployed',
    position: [55.2000, 14.5000], speed: 8, heading: 90, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-9', unitDesignation: 'SNMG-2 / U-35 (German Navy)',
    supply: { ammunition: { current: 12, max: 12, type: 'DM2A4 Torpedo / IDAS' }, fuel: { current: 90, max: 100, unit: '%' }, rations: 20, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 80, signalStrength: 30, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ AIR ASSETS (Aviano / Mediterranean) ============
  {
    id: 'a17', name: 'F-35A Lightning II', callsign: 'VENOM-01', type: 'fixed-wing', status: 'operational',
    position: [46.0319, 12.5965], speed: 0, heading: 0, altitude: 0, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-10', unitDesignation: '31st FW / 510th FS',
    supply: { ammunition: { current: 4, max: 4, type: 'AIM-120D / GBU-53/B' }, fuel: { current: 100, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 100, signalStrength: 98, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a18', name: 'F-35A Lightning II', callsign: 'VENOM-02', type: 'fixed-wing', status: 'deployed',
    position: [43.5000, 15.0000], speed: 520, heading: 120, altitude: 38000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-10', unitDesignation: '31st FW / 510th FS',
    supply: { ammunition: { current: 2, max: 4, type: 'AIM-120D / GBU-53/B' }, fuel: { current: 55, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 92, signalStrength: 88, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a19', name: 'E-3A AWACS (NATO)', callsign: 'MAGIC-41', type: 'fixed-wing', status: 'deployed',
    position: [48.2082, 16.3738], speed: 380, heading: 90, altitude: 35000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-10', unitDesignation: 'NATO AEW&C Force / Geilenkirchen',
    supply: { ammunition: { current: 0, max: 0, type: 'N/A (AEW&C)' }, fuel: { current: 60, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 88, signalStrength: 99, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a20', name: 'MQ-9A Block 5', callsign: 'REAPER-14', type: 'UAV', status: 'deployed',
    position: [41.6500, 15.2800], speed: 130, heading: 45, altitude: 22000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-10', unitDesignation: '31st FW / Det. ISR',
    supply: { ammunition: { current: 2, max: 4, type: 'AGM-114 Hellfire' }, fuel: { current: 48, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 70, signalStrength: 75, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ ADDITIONAL ASSETS (Mediterranean & Black Sea) ============
  {
    id: 'a21', name: 'CVN-69 USS Dwight D. Eisenhower', callsign: 'IKE-ACTUAL', type: 'frigate', status: 'operational',
    position: [35.5000, 18.5000], speed: 20, heading: 60, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-2', unitDesignation: 'CSG-2 / NAVEUR',
    supply: { ammunition: { current: 3200, max: 3500, type: 'Mixed ordnance / VLS' }, fuel: { current: 85, max: 100, unit: '%' }, rations: 90, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 99, signalStrength: 96, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a22', name: 'P-8A Poseidon', callsign: 'TRIDENT-08', type: 'fixed-wing', status: 'deployed',
    position: [36.8000, 22.0000], speed: 340, heading: 300, altitude: 25000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-2', unitDesignation: 'VP-16 / NAS Sigonella',
    supply: { ammunition: { current: 6, max: 6, type: 'Mk 54 Torpedo / AGM-84 Harpoon' }, fuel: { current: 58, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 85, signalStrength: 92, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a23', name: 'RQ-4D Phoenix (NATO AGS)', callsign: 'ALLIANCE-01', type: 'UAV', status: 'deployed',
    position: [40.6000, 17.9500], speed: 310, heading: 70, altitude: 55000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-1', unitDesignation: 'NATO AGS Force / Sigonella',
    supply: { ammunition: { current: 0, max: 0, type: 'N/A (GMTI/SAR)' }, fuel: { current: 72, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 78, signalStrength: 94, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a24', name: 'Leopard 2A7+', callsign: 'PANZER-03', type: 'MBT', status: 'operational',
    position: [54.5200, 18.5300], speed: 0, heading: 270, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-7', unitDesignation: 'PzBtl 393 / Bundeswehr',
    supply: { ammunition: { current: 42, max: 42, type: '120mm DM63 APFSDS' }, fuel: { current: 95, max: 100, unit: '%' }, rations: 5, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 94, signalStrength: 90, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },
  {
    id: 'a25', name: 'Eurofighter Typhoon', callsign: 'STORM-05', type: 'fixed-wing', status: 'deployed',
    position: [57.5000, 21.0000], speed: 580, heading: 0, altitude: 40000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: 'c2-6', unitDesignation: 'NATO Baltic Air Policing / Luftwaffe',
    supply: { ammunition: { current: 6, max: 6, type: 'AIM-120 / IRIS-T' }, fuel: { current: 45, max: 100, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 90, signalStrength: 86, encryptionStatus: 'AES-256', iff: 'FRIENDLY' },
  },

  // ============ HOSTILE / UNKNOWN CONTACTS ============
  {
    id: 'a26', name: 'Unknown Surface Contact', callsign: 'SKUNK-01', type: 'patrol-boat', status: 'operational',
    position: [55.8000, 19.5000], speed: 28, heading: 200, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: '', unitDesignation: 'UNKNOWN',
    supply: { ammunition: { current: 0, max: 0, type: 'UNKNOWN' }, fuel: { current: 0, max: 0, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 0, signalStrength: 0, encryptionStatus: 'AES-256', iff: 'UNKNOWN' },
  },
  {
    id: 'a27', name: 'Unknown Surface Contact', callsign: 'SKUNK-02', type: 'patrol-boat', status: 'operational',
    position: [55.6500, 19.8000], speed: 22, heading: 215, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: '', unitDesignation: 'UNKNOWN',
    supply: { ammunition: { current: 0, max: 0, type: 'UNKNOWN' }, fuel: { current: 0, max: 0, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 0, signalStrength: 0, encryptionStatus: 'AES-256', iff: 'UNKNOWN' },
  },
  {
    id: 'a28', name: 'Hostile Fighter (Su-35S)', callsign: 'BANDIT-01', type: 'fixed-wing', status: 'deployed',
    position: [56.5000, 24.0000], speed: 600, heading: 250, altitude: 30000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: '', unitDesignation: 'HOSTILE',
    supply: { ammunition: { current: 0, max: 0, type: 'UNKNOWN' }, fuel: { current: 0, max: 0, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 0, signalStrength: 0, encryptionStatus: 'AES-256', iff: 'HOSTILE' },
  },
  {
    id: 'a29', name: 'Hostile Fighter (Su-35S)', callsign: 'BANDIT-02', type: 'fixed-wing', status: 'deployed',
    position: [56.3000, 24.3000], speed: 580, heading: 240, altitude: 28000, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: '', unitDesignation: 'HOSTILE',
    supply: { ammunition: { current: 0, max: 0, type: 'UNKNOWN' }, fuel: { current: 0, max: 0, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 0, signalStrength: 0, encryptionStatus: 'AES-256', iff: 'HOSTILE' },
  },
  {
    id: 'a30', name: 'Kilo-Class Submarine', callsign: 'GOBLIN-01', type: 'submarine', status: 'deployed',
    position: [37.0000, 19.0000], speed: 6, heading: 310, lastUpdate: new Date().toISOString(),
    readiness: 'C1', commandAuthority: '', unitDesignation: 'HOSTILE',
    supply: { ammunition: { current: 0, max: 0, type: 'UNKNOWN' }, fuel: { current: 0, max: 0, unit: '%' }, rations: 0, medical: 'full', spares: 'adequate' },
    telemetry: { battery: 0, signalStrength: 15, encryptionStatus: 'AES-256', iff: 'HOSTILE' },
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
  {
    id: 'ord-3', assetId: 'a18', type: 'PATROL', issuedAt: new Date(Date.now() - 900000).toISOString(),
    issuedBy: 'COL. Moretti', status: 'executing', priority: 'PRIORITY',
    description: 'DCA sweep Adriatic corridor. Intercept any non-squawking contacts. ROE: weapons tight.',
    waypoints: [
      { id: 'w7', position: [44.0, 14.5], label: 'FENCE IN', type: 'NAV' },
      { id: 'w8', position: [43.0, 15.5], label: 'CAP SOUTH', type: 'CP' },
      { id: 'w9', position: [42.0, 16.0], label: 'TURN POINT', type: 'NAV' },
      { id: 'w10', position: [43.5, 15.0], label: 'REJOIN', type: 'RP' },
    ]
  },
  {
    id: 'ord-4', assetId: 'a25', type: 'PATROL', issuedAt: new Date(Date.now() - 600000).toISOString(),
    issuedBy: 'RADM. Lindqvist', status: 'executing', priority: 'IMMEDIATE',
    description: 'Baltic Air Policing QRA. Intercept BANDIT-01/02 approaching NATO airspace. WEAPONS TIGHT.',
    waypoints: [
      { id: 'w11', position: [57.0, 21.5], label: 'SCRAMBLE PT', type: 'IP' },
      { id: 'w12', position: [56.8, 23.0], label: 'INTERCEPT', type: 'CAS' },
      { id: 'w13', position: [57.2, 20.5], label: 'RTB ŠIAULIAI', type: 'RP' },
    ]
  },
  {
    id: 'ord-5', assetId: 'a22', type: 'RECON', issuedAt: new Date(Date.now() - 2400000).toISOString(),
    issuedBy: 'VADM. Torres', status: 'executing', priority: 'PRIORITY',
    description: 'ASW patrol eastern Med. Track GOBLIN-01 (Kilo-class). Deploy sonobuoy pattern.',
    waypoints: [
      { id: 'w14', position: [37.0, 20.0], label: 'DATUM', type: 'NAV' },
      { id: 'w15', position: [36.5, 19.5], label: 'BARRIER-1', type: 'NAV' },
      { id: 'w16', position: [36.0, 20.5], label: 'BARRIER-2', type: 'NAV' },
    ]
  },
];

export const initialSIGINTContacts: SIGINTContact[] = [
  // Original DC area
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
  // Baltic / Eastern Europe
  {
    id: 'sig-4', type: 'ELINT', position: [56.0, 23.5], bearing: 90,
    frequency: '10.0 GHz', signalType: 'S-400 Triumph Engagement Radar',
    classification: 'TOP SECRET', threat: 'CRITICAL', detectedAt: new Date(Date.now() - 60000).toISOString(),
    detectedBy: 'MAGIC-41', status: 'active'
  },
  {
    id: 'sig-5', type: 'COMINT', position: [55.9, 21.5], bearing: 75,
    frequency: '375.0 MHz', signalType: 'VHF Mil Net (Russian encoding)',
    classification: 'TOP SECRET//SCI', threat: 'HIGH', detectedAt: new Date(Date.now() - 180000).toISOString(),
    detectedBy: 'ALLIANCE-01', status: 'active'
  },
  {
    id: 'sig-6', type: 'ELINT', position: [54.8, 20.2], bearing: 120,
    frequency: '5.6 GHz', signalType: 'Pantsir-S1 Track Radar',
    classification: 'SECRET', threat: 'HIGH', detectedAt: new Date(Date.now() - 240000).toISOString(),
    detectedBy: 'STORM-05', status: 'active'
  },
  // Mediterranean
  {
    id: 'sig-7', type: 'ELINT', position: [36.5, 19.0], bearing: 200,
    frequency: '3.0 GHz', signalType: 'MR-90 Orekh (Kilo-class periscope radar)',
    classification: 'TOP SECRET', threat: 'HIGH', detectedAt: new Date(Date.now() - 90000).toISOString(),
    detectedBy: 'TRIDENT-08', status: 'active'
  },
  {
    id: 'sig-8', type: 'COMINT', position: [42.5, 18.0], bearing: 150,
    frequency: '118.5 MHz', signalType: 'Civilian ATC intercept (anomalous)',
    classification: 'CONFIDENTIAL', threat: 'LOW', detectedAt: new Date(Date.now() - 500000).toISOString(),
    detectedBy: 'VENOM-02', status: 'identified'
  },
  {
    id: 'sig-9', type: 'FISINT', position: [55.3, 15.0], bearing: 45,
    frequency: 'N/A', signalType: 'Nuclear instrumentation signature (anomalous)',
    classification: 'TOP SECRET//SCI', threat: 'CRITICAL', detectedAt: new Date(Date.now() - 45000).toISOString(),
    detectedBy: 'SENTINEL-3', status: 'active'
  },
  {
    id: 'sig-10', type: 'ELINT', position: [43.0, 16.5], bearing: 90,
    frequency: '8.5 GHz', signalType: 'Surface Search Radar (Buyan-M corvette)',
    classification: 'SECRET', threat: 'MEDIUM', detectedAt: new Date(Date.now() - 320000).toISOString(),
    detectedBy: 'REAPER-14', status: 'active'
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
  // ============ NEW MISSIONS ============
  {
    id: 'm5', name: 'Operation BALTIC SENTINEL', opordNumber: 'OPORD 05-26',
    objective: 'Establish enhanced air policing posture over Baltic states. Intercept and identify all non-NATO aircraft approaching alliance airspace.',
    assignedAssets: ['a25', 'a19'], area: [56.5, 22.0], areaRadius: 50,
    priority: 'IMMEDIATE', status: 'active', riskScore: 78,
    createdAt: new Date(Date.now() - 5400000).toISOString(),
    classification: 'TOP SECRET', rulesOfEngagement: 'WEAPONS TIGHT. Visual identification required. Engage only in self-defense. Shadow and escort non-compliant aircraft.',
    commandAuthority: 'RADM. Lindqvist / JTF-BALTIC',
    phases: [
      { id: 'ph11', name: 'Phase I - QRA Posture', description: 'Establish 24/7 QRA alert at Šiauliai AB', status: 'completed', startCondition: 'Force deployment' },
      { id: 'ph12', name: 'Phase II - Active Patrol', description: 'Continuous CAP along NATO border', status: 'active', startCondition: 'QRA established' },
      { id: 'ph13', name: 'Phase III - Escalation Response', description: 'Surge operations if BANDIT activity increases', status: 'pending', startCondition: 'THREATCON elevated' },
    ],
    logisticsRequirements: 'AAR tanker support from Geilenkirchen. Weapons loadout: 4x AIM-120, 2x IRIS-T per sortie.',
  },
  {
    id: 'm6', name: 'Operation POSEIDON WATCH', opordNumber: 'OPORD 06-26',
    objective: 'Locate, track, and maintain contact on GOBLIN-01 (Kilo-class SSK) operating in eastern Mediterranean. Deny access to NATO SLOCs.',
    assignedAssets: ['a22', 'a16', 'a21'], area: [36.5, 19.5], areaRadius: 40,
    priority: 'IMMEDIATE', status: 'active', riskScore: 65,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    classification: 'TOP SECRET', rulesOfEngagement: 'WEAPONS TIGHT. Track and report only. Engage only if hostile intent confirmed. Coordinate with CSG-2.',
    commandAuthority: 'VADM. Torres / JTF-ATLANTIC',
    phases: [
      { id: 'ph14', name: 'Phase I - Search', description: 'Deploy sonobuoy barriers along probable transit routes', status: 'active', startCondition: 'Last known datum' },
      { id: 'ph15', name: 'Phase II - Track', description: 'Prosecute contact and maintain track', status: 'pending', startCondition: 'Regain contact' },
      { id: 'ph16', name: 'Phase III - Hold', description: 'Shadow submarine until it exits AO', status: 'pending', startCondition: 'Confirmed track' },
    ],
    logisticsRequirements: 'Sonobuoy resupply from NAS Sigonella. P-8A rotation every 8hrs.',
  },
  {
    id: 'm7', name: 'Operation IRON CURTAIN', opordNumber: 'OPORD 07-26',
    objective: 'Forward deployment of NATO eFP battlegroup to Suwałki corridor. Deter and defend against incursion.',
    assignedAssets: ['a9', 'a10', 'a11', 'a24'], area: [54.4, 18.6], areaRadius: 20,
    priority: 'PRIORITY', status: 'active', riskScore: 55,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    classification: 'SECRET', rulesOfEngagement: 'WEAPONS HOLD. Engage only upon confirmed hostile action. ROE cards issued to all personnel.',
    commandAuthority: 'COL. Kowalski / 12th Armored BCT',
    phases: [
      { id: 'ph17', name: 'Phase I - Deployment', description: 'Road march to forward defensive positions', status: 'completed', startCondition: 'Deployment order' },
      { id: 'ph18', name: 'Phase II - Defense', description: 'Occupy and improve battle positions', status: 'active', startCondition: 'Arrival at positions' },
      { id: 'ph19', name: 'Phase III - Counter-attack', description: 'Prepared counter-attack plan if penetration occurs', status: 'pending', startCondition: 'Enemy penetration' },
    ],
    logisticsRequirements: 'Class V pre-positioned at ASP GDANSK. Fuel MSR via Corridor ALPHA. Medical: Role 2 at BSA.',
  },
  {
    id: 'm8', name: 'Operation NIGHT TALON', opordNumber: 'FRAGORD 08-26',
    objective: 'SOF direct action raid on HVT compound in eastern AO. Extract intelligence materials. Minimize civilian casualties.',
    assignedAssets: ['a12', 'a13'], area: [50.08, 19.80], areaRadius: 8,
    priority: 'FLASH', status: 'WARNORD', riskScore: 92,
    createdAt: new Date(Date.now() - 900000).toISOString(),
    classification: 'TOP SECRET//SCI', rulesOfEngagement: 'WEAPONS FREE on confirmed hostile targets. PID required. Minimize collateral. Capture preferred over kill.',
    commandAuthority: 'LTG. Novak / JTF-EAST',
    phases: [
      { id: 'ph20', name: 'Phase I - Infiltration', description: 'HALO insert via MC-130J', status: 'pending', startCondition: 'EXORD received' },
      { id: 'ph21', name: 'Phase II - Actions on Objective', description: 'Assault compound, secure HVT, SSE', status: 'pending', startCondition: 'Team on ground' },
      { id: 'ph22', name: 'Phase III - Exfil', description: 'Extract via MH-60M to FOB', status: 'pending', startCondition: 'Objective secure' },
    ],
    logisticsRequirements: 'FRIES/SPIES equipment. Trauma kits x12. ISR feed from REAPER-14. MEDEVAC on 5-min standby.',
  },
];

export const initialZones: Zone[] = [
  // Original DC area
  { id: 'z1', name: 'AO ATLANTIC', type: 'AO', center: [38.95, -77.05], radius: 12000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z2', name: 'AO CHESAPEAKE', type: 'AO', center: [38.80, -76.95], radius: 8000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z3', name: 'NFZ ALPHA (No-Fly Zone)', type: 'no-fly', center: [38.89, -77.01], radius: 5000, color: 'hsl(0, 70%, 50%)', classification: 'UNCLASSIFIED' },
  { id: 'z4', name: 'NFZ BRAVO (No-Fly Zone)', type: 'no-fly', center: [39.05, -77.10], radius: 3000, color: 'hsl(0, 70%, 50%)', classification: 'UNCLASSIFIED' },
  { id: 'z5', name: 'FSA ECHO (Fire Support Area)', type: 'FSA', center: [38.92, -77.08], radius: 4000, color: 'hsl(30, 90%, 55%)', classification: 'SECRET' },
  { id: 'z6', name: 'KEZ NIGHTSHADE', type: 'KEZ', center: [38.93, -77.07], radius: 2000, color: 'hsl(0, 100%, 40%)', classification: 'TOP SECRET' },
  { id: 'z7', name: 'MEZ SECTOR 4', type: 'MEZ', center: [39.02, -77.08], radius: 6000, color: 'hsl(280, 70%, 50%)', classification: 'SECRET' },

  // Baltic / Eastern Europe
  { id: 'z8', name: 'AO BALTIC SHIELD', type: 'AO', center: [56.0, 20.0], radius: 150000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z9', name: 'NFZ KALININGRAD (Hostile)', type: 'no-fly', center: [54.72, 20.50], radius: 80000, color: 'hsl(0, 70%, 50%)', classification: 'SECRET' },
  { id: 'z10', name: 'MEZ S-400 RANGE (Est.)', type: 'MEZ', center: [55.8, 23.0], radius: 200000, color: 'hsl(280, 70%, 50%)', classification: 'TOP SECRET' },
  { id: 'z11', name: 'SUWAŁKI CORRIDOR', type: 'restricted', center: [54.3, 22.9], radius: 40000, color: 'hsl(30, 90%, 55%)', classification: 'SECRET' },
  { id: 'z12', name: 'AO GDANSK', type: 'AO', center: [54.4, 18.6], radius: 25000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z13', name: 'NATO ADIZ BOUNDARY', type: 'surveillance', center: [56.5, 22.0], radius: 120000, color: 'hsl(45, 90%, 55%)', classification: 'UNCLASSIFIED' },

  // Mediterranean
  { id: 'z14', name: 'AO MEDITERRANEAN EAST', type: 'AO', center: [36.0, 20.0], radius: 200000, color: 'hsl(185, 70%, 50%)', classification: 'SECRET' },
  { id: 'z15', name: 'ASW BOX ALPHA', type: 'surveillance', center: [36.5, 19.5], radius: 80000, color: 'hsl(200, 60%, 50%)', classification: 'TOP SECRET' },
  { id: 'z16', name: 'SLOC CORRIDOR ALPHA', type: 'restricted', center: [37.5, 17.0], radius: 50000, color: 'hsl(30, 90%, 55%)', classification: 'SECRET' },
  { id: 'z17', name: 'FSA ADRIATIC', type: 'FSA', center: [42.5, 16.0], radius: 30000, color: 'hsl(30, 90%, 55%)', classification: 'SECRET' },

  // SOF area
  { id: 'z18', name: 'AO NIGHT TALON', type: 'restricted', center: [50.08, 19.80], radius: 15000, color: 'hsl(0, 100%, 40%)', classification: 'TOP SECRET//SCI' },
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
  // New events for expanded theater
  { id: 'e11', timestamp: new Date(Date.now() - 5000000).toISOString(), type: 'OPORD_ISSUED', message: 'OPORD 05-26 "BALTIC SENTINEL" issued. Enhanced Air Policing activated for Baltic AOR.', severity: 'info', classification: 'TOP SECRET', originator: 'RADM. Lindqvist' },
  { id: 'e12', timestamp: new Date(Date.now() - 4500000).toISOString(), type: 'OPORD_ISSUED', message: 'OPORD 07-26 "IRON CURTAIN" issued. eFP battlegroup to forward positions Suwałki corridor.', severity: 'info', classification: 'SECRET', originator: 'COL. Kowalski' },
  { id: 'e13', timestamp: new Date(Date.now() - 200000).toISOString(), type: 'CONTACT_REPORT', message: 'CONTACT: 2x Su-35S (BANDIT-01/02) detected BRG 090° 85nm from ADIZ. Speed 600kt, heading 250°. QRA scrambled.', severity: 'critical', classification: 'TOP SECRET', originator: 'MAGIC-41 (AWACS)' },
  { id: 'e14', timestamp: new Date(Date.now() - 150000).toISOString(), type: 'ASSET_DEPLOYED', message: 'STORM-05 (Typhoon) scrambled from Šiauliai for Baltic intercept. WEAPONS TIGHT.', severity: 'warning', classification: 'SECRET', originator: 'NATO CAOC Uedem' },
  { id: 'e15', timestamp: new Date(Date.now() - 100000).toISOString(), type: 'CONTACT_REPORT', message: 'SIGINT: S-400 engagement radar detected. Track ID SIG-4. MEZ SECTOR extends 200km. All aircraft WARNED.', severity: 'critical', classification: 'TOP SECRET', originator: 'SIGINT FUSION CELL' },
  { id: 'e16', timestamp: new Date(Date.now() - 80000).toISOString(), type: 'CONTACT_REPORT', message: 'ASW: TRIDENT-08 regained contact GOBLIN-01. Bearing 200° from datum. Deploying sonobuoy barrier.', severity: 'warning', classification: 'TOP SECRET', originator: 'VP-16 TACCO' },
  { id: 'e17', timestamp: new Date(Date.now() - 50000).toISOString(), type: 'CONTACT_REPORT', message: 'FISINT: Anomalous nuclear instrumentation signature detected by SENTINEL-3. Position 55.3N 15.0E. Analysis ongoing.', severity: 'security', classification: 'TOP SECRET//SCI', originator: 'NSA/CSS' },
  { id: 'e18', timestamp: new Date(Date.now() - 25000).toISOString(), type: 'FRAGO_ISSUED', message: 'WARNORD: Op NIGHT TALON. 5th SOF Group prepare for HALO insertion. EXORD pending J3 approval.', severity: 'critical', classification: 'TOP SECRET//SCI', originator: 'LTG. Novak' },
  { id: 'e19', timestamp: new Date(Date.now() - 15000).toISOString(), type: 'SITREP', message: 'SITREP: SNMG-2 reports 2x SKUNK contacts (patrol boats) heading south at 25kts. IFF: UNKNOWN. Challenging.', severity: 'warning', classification: 'SECRET', originator: 'COMO. Andersen' },
];

export const initialAlerts: Alert[] = [
  { id: 'al1', timestamp: new Date(Date.now() - 2000000).toISOString(), severity: 'critical', title: 'ASSET DAMAGED', message: 'VIPER-12 (M2A3 Bradley) sustained IED damage. CASEVAC and resupply required. Readiness: C4.', dismissed: false, classification: 'SECRET' },
  { id: 'al2', timestamp: new Date(Date.now() - 1500000).toISOString(), severity: 'warning', title: 'SAM THREAT DETECTED', message: 'SA-21 Growler radar detected in MEZ SECTOR 4. All aircraft maintain SA. GHOST-09 at risk.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al3', timestamp: new Date(Date.now() - 600000).toISOString(), severity: 'critical', title: 'FLASH: NIGHTSHADE AUTHORIZED', message: 'HVT extraction mission NIGHTSHADE authorized by EUCOM. WEAPONS FREE within KEZ.', dismissed: false, classification: 'TOP SECRET//SCI' },
  { id: 'al4', timestamp: new Date(Date.now() - 120000).toISOString(), severity: 'security', title: 'COMSEC BREACH', message: 'GHOST-09 AES-256 encryption compromised. Adversary EW capability confirmed. Switch to backup COMSEC.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al5', timestamp: new Date(Date.now() - 30000).toISOString(), severity: 'warning', title: 'UNKNOWN CONTACTS', message: '3x unknown surface contacts detected by DDG-115. IFF returns: UNKNOWN. Classification pending.', dismissed: false, classification: 'SECRET' },
  // New alerts
  { id: 'al6', timestamp: new Date(Date.now() - 200000).toISOString(), severity: 'critical', title: 'HOSTILE AIRCRAFT - BALTIC', message: '2x Su-35S (BANDIT-01/02) approaching NATO ADIZ. QRA scrambled. STORM-05 intercepting.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al7', timestamp: new Date(Date.now() - 100000).toISOString(), severity: 'critical', title: 'S-400 ENGAGEMENT RADAR', message: 'S-400 Triumph engagement radar active. 200km MEZ threatens all NATO air operations in Baltic AOR.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al8', timestamp: new Date(Date.now() - 80000).toISOString(), severity: 'warning', title: 'SUBMARINE CONTACT REGAINED', message: 'GOBLIN-01 (Kilo-class) reacquired by TRIDENT-08. Heading 310° toward SLOC CORRIDOR.', dismissed: false, classification: 'TOP SECRET' },
  { id: 'al9', timestamp: new Date(Date.now() - 45000).toISOString(), severity: 'security', title: 'FISINT: NUCLEAR ANOMALY', message: 'Anomalous nuclear instrumentation signature detected. SENTINEL-3 collection. NSA/CSS analyzing.', dismissed: false, classification: 'TOP SECRET//SCI' },
  { id: 'al10', timestamp: new Date(Date.now() - 25000).toISOString(), severity: 'critical', title: 'SOF MISSION WARNORD', message: 'Op NIGHT TALON WARNORD issued. 5th SOF Group preparing HALO insertion. FLASH priority.', dismissed: false, classification: 'TOP SECRET//SCI' },
];
