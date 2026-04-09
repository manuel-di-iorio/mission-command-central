import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { MessageSquare, Send, Lock, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  classification: string;
  channel: string;
}

const mockMessages: Message[] = [
  { id: '1', from: 'JOC-ACTUAL', to: 'ALL STATIONS', content: 'SITREP: All units report status. OPREP-3 due NLT 1800Z.', timestamp: new Date(Date.now() - 300000).toISOString(), classification: 'SECRET', channel: 'CMD-NET' },
  { id: '2', from: 'EAGLE-6', to: 'JOC-ACTUAL', content: 'WILCO. TF EAGLE reports REDCON-1. All elements in position. Awaiting FRAGO.', timestamp: new Date(Date.now() - 180000).toISOString(), classification: 'SECRET', channel: 'CMD-NET' },
  { id: '3', from: 'SIGINT-OPS', to: 'JOC-ACTUAL', content: 'FLASH: New ELINT contact BRG 045, 15km. Assessed SA-15 GAUNTLET. Updating COP.', timestamp: new Date(Date.now() - 60000).toISOString(), classification: 'TOP SECRET', channel: 'INTEL-NET' },
];

export function SecureComms() {
  const [messages] = useState<Message[]>(mockMessages);
  const [newMsg, setNewMsg] = useState('');
  const [channel, setChannel] = useState('CMD-NET');
  const events = useAppStore((s) => s.events);

  const channels = ['CMD-NET', 'INTEL-NET', 'LOG-NET', 'FIRES-NET'];

  const addEvent = useAppStore((s) => s.addEvent);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    addEvent({
      id: `e${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'SITREP',
      message: `[${channel}] JOC-OPERATOR: ${newMsg}`,
      severity: 'info',
      classification: 'SECRET',
      originator: 'JOC-OPERATOR',
    });
    setNewMsg('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Secure Comms</h3>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-success font-mono">
          <Lock className="h-3 w-3" /> AES-256
        </div>
      </div>

      {/* Channel selector */}
      <div className="flex gap-1 p-2 border-b border-border/50">
        {channels.map(ch => (
          <button
            key={ch}
            onClick={() => setChannel(ch)}
            className={cn(
              "px-2 py-1 rounded text-[9px] font-mono font-bold transition-all",
              ch === channel ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
            )}
          >
            <Radio className="h-2.5 w-2.5 inline mr-1" />
            {ch}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.filter(m => m.channel === channel || channel === 'CMD-NET').map(msg => (
          <div key={msg.id} className="bg-secondary/20 border border-border/30 rounded p-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary font-mono">{msg.from}</span>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[8px] font-mono px-1 rounded",
                  msg.classification === 'TOP SECRET' ? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
                )}>{msg.classification}</span>
                <span className="text-[9px] text-muted-foreground font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}Z
                </span>
              </div>
            </div>
            <p className="text-[10px] text-foreground/80 font-mono leading-relaxed">{msg.content}</p>
          </div>
        ))}
        {/* Show recent events as messages */}
        {events.slice(0, 3).map(evt => (
          <div key={evt.id} className="bg-secondary/10 border border-border/20 rounded p-2 opacity-70">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground font-mono">{evt.originator}</span>
              <span className="text-[9px] text-muted-foreground font-mono">
                {new Date(evt.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}Z
              </span>
            </div>
            <p className="text-[10px] text-foreground/60 font-mono">{evt.message}</p>
          </div>
        ))}
      </div>

      {/* Send */}
      <div className="p-2 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder={`Transmit on ${channel}...`}
            className="flex-1 bg-secondary/30 border border-border rounded px-3 py-2 text-[11px] text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded px-3 transition-all">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
