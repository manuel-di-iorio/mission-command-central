import { Cloud, Wind, Eye, Thermometer, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

const weatherData = {
  temperature: 12,
  windSpeed: 18,
  windDirection: 'NW',
  windGusts: 28,
  visibility: 8.5,
  ceiling: 3200,
  precipitation: 'None',
  humidity: 65,
  pressure: 1013,
  conditions: 'SCT035 BKN080',
  forecast: 'Deteriorating. Frontal system ETA 0600Z. Expect IMC conditions.',
  flyingCategory: 'GREEN' as 'GREEN' | 'AMBER' | 'RED',
  metar: 'METAR LIPA 091250Z 31018G28KT 8500 SCT035 BKN080 12/07 Q1013 NOSIG',
};

export function WeatherPanel() {
  const catColor = weatherData.flyingCategory === 'GREEN' ? 'text-success' : weatherData.flyingCategory === 'AMBER' ? 'text-warning' : 'text-destructive';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Cloud className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">METOC / Weather</h3>
      </div>

      {/* Flying category */}
      <div className={cn("border rounded-lg p-2 text-center", 
        weatherData.flyingCategory === 'GREEN' ? 'border-success/30 bg-success/5' : 
        weatherData.flyingCategory === 'AMBER' ? 'border-warning/30 bg-warning/5' : 'border-destructive/30 bg-destructive/5'
      )}>
        <p className="text-[9px] text-muted-foreground font-mono">FLYING CATEGORY</p>
        <p className={cn("text-sm font-bold font-mono tracking-widest", catColor)}>{weatherData.flyingCategory}</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-secondary/30 border border-border/50 rounded p-2">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Thermometer className="h-3 w-3" /> TEMP
          </div>
          <p className="text-sm font-bold font-mono text-foreground">{weatherData.temperature}°C</p>
        </div>
        <div className="bg-secondary/30 border border-border/50 rounded p-2">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Wind className="h-3 w-3" /> WIND
          </div>
          <p className="text-sm font-bold font-mono text-foreground">{weatherData.windDirection} {weatherData.windSpeed}kt</p>
          <p className="text-[9px] text-warning font-mono">G{weatherData.windGusts}kt</p>
        </div>
        <div className="bg-secondary/30 border border-border/50 rounded p-2">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Eye className="h-3 w-3" /> VIS
          </div>
          <p className="text-sm font-bold font-mono text-foreground">{weatherData.visibility}km</p>
        </div>
        <div className="bg-secondary/30 border border-border/50 rounded p-2">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Droplets className="h-3 w-3" /> CEIL
          </div>
          <p className="text-sm font-bold font-mono text-foreground">{weatherData.ceiling}ft</p>
        </div>
      </div>

      {/* METAR */}
      <div className="bg-secondary/20 border border-border/30 rounded p-2">
        <p className="text-[8px] text-muted-foreground font-mono mb-1">METAR</p>
        <p className="text-[9px] text-foreground/70 font-mono break-all leading-relaxed">{weatherData.metar}</p>
      </div>

      {/* Forecast */}
      <div className="bg-warning/5 border border-warning/20 rounded p-2">
        <p className="text-[8px] text-warning font-mono font-bold mb-1">FORECAST</p>
        <p className="text-[9px] text-foreground/70 font-mono leading-relaxed">{weatherData.forecast}</p>
      </div>
    </div>
  );
}
