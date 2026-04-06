import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useAppStore } from '@/store/useAppStore';
import { Asset } from '@/data/types';

// Custom icon creation
const createIcon = (color: string, isSelected: boolean) => {
  const size = isSelected ? 14 : 10;
  const border = isSelected ? 3 : 2;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: ${border}px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.5)'};
      border-radius: 50%;
      box-shadow: 0 0 ${isSelected ? 16 : 8}px ${color};
    "></div>`,
    iconSize: [size + border * 2, size + border * 2],
    iconAnchor: [(size + border * 2) / 2, (size + border * 2) / 2],
  });
};

const getAssetColor = (asset: Asset) => {
  switch (asset.status) {
    case 'active': return 'hsl(142, 60%, 45%)';
    case 'in-mission': return 'hsl(38, 90%, 55%)';
    case 'offline': return 'hsl(0, 70%, 50%)';
  }
};

function MapClickHandler() {
  const setMapClickPosition = useAppStore((s) => s.setMapClickPosition);
  useMapEvents({
    click: (e) => {
      setMapClickPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function MapView() {
  const assets = useAppStore((s) => s.assets);
  const zones = useAppStore((s) => s.zones);
  const selectedAssetId = useAppStore((s) => s.selectedAssetId);
  const selectAsset = useAppStore((s) => s.selectAsset);
  const showOperationalZones = useAppStore((s) => s.showOperationalZones);
  const showRestrictedZones = useAppStore((s) => s.showRestrictedZones);
  const missions = useAppStore((s) => s.missions);

  return (
    <MapContainer
      center={[38.9, -77.03]}
      zoom={10}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler />

      {/* Zones */}
      {zones
        .filter((z) => {
          if (z.type === 'operational') return showOperationalZones;
          return showRestrictedZones;
        })
        .map((zone) => (
          <Circle
            key={zone.id}
            center={zone.center}
            radius={zone.radius}
            pathOptions={{
              color: 
                zone.type === 'restricted' ? 'hsl(0, 84%, 60%)' : 
                zone.type === 'no-fly' ? 'hsl(0, 100%, 50%)' :
                zone.type === 'surveillance' ? 'hsl(280, 100%, 50%)' :
                'hsl(185, 70%, 50%)',
              fillColor: 
                zone.type === 'restricted' ? 'hsl(0, 84%, 60%)' : 
                zone.type === 'no-fly' ? 'hsl(0, 100%, 50%)' :
                zone.type === 'surveillance' ? 'hsl(280, 100%, 50%)' :
                'hsl(185, 70%, 50%)',
              fillOpacity: zone.type === 'no-fly' ? 0.15 : 0.08,
              weight: zone.type === 'no-fly' ? 2 : 1,
              dashArray: (zone.type === 'restricted' || zone.type === 'no-fly') ? '10 5' : undefined,
            }}
          >
            <Popup>
              <div className="text-[10px] font-bold uppercase p-1">
                <div className="mb-1 text-primary border-b border-primary/20">{zone.name}</div>
                <div className="text-muted-foreground">TYPE: {zone.type}</div>
                <div className="text-muted-foreground">RAD: {zone.radius / 1000} KM</div>
              </div>
            </Popup>
          </Circle>
        ))}

      {/* Mission areas */}
      {missions
        .filter((m) => m.status === 'active')
        .map((mission) => (
          <Circle
            key={mission.id}
            center={mission.area}
            radius={mission.areaRadius * 1000}
            pathOptions={{
              color: 'hsl(38, 90%, 55%)',
              fillColor: 'hsl(38, 90%, 55%)',
              fillOpacity: 0.05,
              weight: 1,
            }}
          >
            <Popup>
              <span className="text-xs font-semibold">{mission.name}</span>
            </Popup>
          </Circle>
        ))}

      {/* Asset markers */}
      {assets.map((asset) => (
        <Marker
          key={asset.id}
          position={asset.position}
          icon={createIcon(getAssetColor(asset), asset.id === selectedAssetId)}
          eventHandlers={{ click: () => selectAsset(asset.id) }}
        >
          <Popup>
            <div className="text-xs">
              <p className="font-semibold">{asset.name}</p>
              <p>{asset.type} · {asset.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
