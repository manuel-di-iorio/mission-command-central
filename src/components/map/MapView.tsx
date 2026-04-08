import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useAppStore } from '@/store/useAppStore';
import { Asset } from '@/data/types';

const createIcon = (color: string, isSelected: boolean, label?: string) => {
  const size = isSelected ? 14 : 10;
  const border = isSelected ? 3 : 2;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="position:relative">
      <div style="
        width: ${size}px; height: ${size}px;
        background: ${color};
        border: ${border}px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.5)'};
        border-radius: 50%;
        box-shadow: 0 0 ${isSelected ? 16 : 8}px ${color};
      "></div>
      ${label ? `<div style="position:absolute;top:${size + 4}px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:8px;font-family:monospace;color:${color};text-shadow:0 0 3px rgba(0,0,0,0.8);font-weight:bold">${label}</div>` : ''}
    </div>`,
    iconSize: [size + border * 2, size + border * 2 + (label ? 16 : 0)],
    iconAnchor: [(size + border * 2) / 2, (size + border * 2) / 2],
  });
};

const sigintIcon = (threat: string) => {
  const color = threat === 'CRITICAL' ? '#ff0040' : threat === 'HIGH' ? '#ff6600' : threat === 'MEDIUM' ? '#ffaa00' : '#888';
  return L.divIcon({
    className: 'sigint-marker',
    html: `<div style="width:20px;height:20px;position:relative">
      <div style="width:20px;height:20px;border:2px solid ${color};border-radius:50%;animation:pulse 2s infinite;opacity:0.6"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:6px;height:6px;background:${color};border-radius:50%"></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const getAssetColor = (asset: Asset) => {
  switch (asset.status) {
    case 'operational': return 'hsl(142, 60%, 45%)';
    case 'deployed': return 'hsl(38, 90%, 55%)';
    case 'RTB': return 'hsl(200, 80%, 55%)';
    case 'offline': case 'destroyed': return 'hsl(0, 70%, 50%)';
    case 'damaged': return 'hsl(0, 70%, 65%)';
    case 'maintenance': return 'hsl(215, 12%, 50%)';
    default: return 'hsl(185, 70%, 50%)';
  }
};

const zoneColors: Record<string, { color: string; fillOpacity: number; dashArray?: string }> = {
  'AO': { color: 'hsl(185, 70%, 50%)', fillOpacity: 0.06 },
  'restricted': { color: 'hsl(0, 84%, 60%)', fillOpacity: 0.1, dashArray: '10 5' },
  'no-fly': { color: 'hsl(0, 100%, 50%)', fillOpacity: 0.15, dashArray: '10 5' },
  'FSA': { color: 'hsl(30, 90%, 55%)', fillOpacity: 0.08, dashArray: '5 5' },
  'KEZ': { color: 'hsl(0, 100%, 40%)', fillOpacity: 0.12 },
  'MEZ': { color: 'hsl(280, 70%, 50%)', fillOpacity: 0.08, dashArray: '15 5' },
  'surveillance': { color: 'hsl(280, 100%, 50%)', fillOpacity: 0.06 },
};

function MapClickHandler() {
  const setMapClickPosition = useAppStore((s) => s.setMapClickPosition);
  useMapEvents({ click: (e) => setMapClickPosition([e.latlng.lat, e.latlng.lng]) });
  return null;
}

export function MapView() {
  const assets = useAppStore((s) => s.assets);
  const zones = useAppStore((s) => s.zones);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);
  const showOperationalZones = useAppStore((s) => s.showOperationalZones);
  const showRestrictedZones = useAppStore((s) => s.showRestrictedZones);
  const showSIGINT = useAppStore((s) => s.showSIGINT);
  const showWaypoints = useAppStore((s) => s.showWaypoints);
  const missions = useAppStore((s) => s.missions);
  const sigintContacts = useAppStore((s) => s.sigintContacts);
  const orders = useAppStore((s) => s.orders);

  return (
    <MapContainer center={[38.9, -77.03]} zoom={10} className="h-full w-full" zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler />

      {/* Zones */}
      {zones
        .filter((z) => {
          if (z.type === 'AO') return showOperationalZones;
          return showRestrictedZones;
        })
        .map((zone) => {
          const style = zoneColors[zone.type] || zoneColors['AO'];
          return (
            <Circle key={zone.id} center={zone.center} radius={zone.radius}
              pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: style.fillOpacity, weight: 1, dashArray: style.dashArray }}
            >
              <Popup>
                <div className="text-[10px] font-bold uppercase p-1 font-mono">
                  <div className="mb-1 text-primary border-b border-primary/20">{zone.name}</div>
                  <div>TYPE: {zone.type}</div>
                  <div>RAD: {zone.radius / 1000} KM</div>
                  <div>CLASS: {zone.classification}</div>
                </div>
              </Popup>
            </Circle>
          );
        })}

      {/* Mission areas */}
      {missions.filter((m) => m.status === 'active').map((mission) => (
        <Circle key={mission.id} center={mission.area} radius={mission.areaRadius * 1000}
          pathOptions={{ color: 'hsl(38, 90%, 55%)', fillColor: 'hsl(38, 90%, 55%)', fillOpacity: 0.05, weight: 1 }}
        >
          <Popup><span className="text-xs font-semibold font-mono">{mission.opordNumber}: {mission.name}</span></Popup>
        </Circle>
      ))}

      {/* SIGINT contacts */}
      {showSIGINT && sigintContacts.filter(s => s.status === 'active').map((contact) => (
        <Marker key={contact.id} position={contact.position} icon={sigintIcon(contact.threat)}>
          <Popup>
            <div className="text-[10px] font-mono uppercase p-1 space-y-0.5">
              <div className="font-bold text-destructive">{contact.type} CONTACT</div>
              <div>SIG: {contact.signalType}</div>
              {contact.frequency && <div>FREQ: {contact.frequency}</div>}
              <div>THREAT: {contact.threat}</div>
              <div>DET BY: {contact.detectedBy}</div>
              <div>CLASS: {contact.classification}</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Order waypoints */}
      {showWaypoints && orders.filter(o => o.status === 'executing').map((order) => (
        <div key={order.id}>
          <Polyline
            positions={order.waypoints.map(w => w.position)}
            pathOptions={{ color: 'hsl(185, 70%, 50%)', weight: 1, dashArray: '8 4', opacity: 0.6 }}
          />
          {order.waypoints.map((wp) => (
            <CircleMarker key={wp.id} center={wp.position} radius={4}
              pathOptions={{ color: 'hsl(185, 70%, 50%)', fillColor: 'hsl(185, 70%, 50%)', fillOpacity: 0.8, weight: 1 }}
            >
              <Popup>
                <div className="text-[10px] font-mono uppercase font-bold">
                  {wp.label} ({wp.type})
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </div>
      ))}

      {/* Asset markers */}
      {assets.filter(a => a.status !== 'destroyed').map((asset) => (
        <Marker key={asset.id} position={asset.position}
          icon={createIcon(getAssetColor(asset), asset.id === selectedAssetId, asset.callsign)}
          eventHandlers={{ click: () => selectAsset(asset.id) }}
        >
          <Popup>
            <div className="text-[10px] font-mono uppercase space-y-0.5 p-1">
              <p className="font-bold text-sm">{asset.callsign}</p>
              <p>{asset.name} · {asset.type}</p>
              <p>STATUS: {asset.status} | IFF: {asset.telemetry.iff}</p>
              <p>UNIT: {asset.unitDesignation}</p>
              <p>READINESS: {asset.readiness}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
