import { useState, useEffect } from 'react';
import { Shield, Lock, AlertTriangle, Fingerprint, KeyRound, Eye, EyeOff, ChevronRight, Satellite, ShieldCheck, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginProps {
  onAuthenticated: () => void;
}

export default function Login({ onAuthenticated }: LoginProps) {
  const [step, setStep] = useState<'warning' | 'credentials' | 'mfa' | 'verifying'>('warning');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setScanLine(p => (p + 1) % 100), 50);
    return () => clearInterval(t);
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setError('AUTHENTICATION FAILURE: All fields required');
      return;
    }
    setError('');
    setStep('mfa');
  };

  const handleMFA = () => {
    if (mfaCode.length < 6) {
      setError('INVALID TOKEN: 6-digit code required');
      return;
    }
    setError('');
    setStep('verifying');
    setTimeout(() => onAuthenticated(), 2500);
  };

  if (step === 'warning') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Classification banner */}
        <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
          ████ TOP SECRET // SCI // NOFORN ████
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full space-y-8">
            {/* Warning box */}
            <div className="border-2 border-warning/50 bg-warning/5 rounded-lg p-8 space-y-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-12 w-12 text-warning shrink-0 mt-1" />
                <div className="space-y-4">
                  <h1 className="text-xl font-bold text-warning tracking-wide">
                    ⚠ UNITED GLOBAL COMMAND WARNING ⚠
                  </h1>
                  <div className="text-sm text-foreground/80 space-y-3 leading-relaxed font-mono">
                    <p>
                      You are accessing a United Global Command (UGC) Information System (IS) that is provided for UGC-authorized use only.
                    </p>
                    <p>
                      By using this IS (which includes any device attached to this IS), you consent to the following conditions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                      <li>The UGC routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</li>
                      <li>At any time, the UGC may inspect and seize data stored on this IS.</li>
                      <li>Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any UGC-authorized purpose.</li>
                      <li>This IS includes security measures (e.g., authentication and access controls) to protect UGC interests — not for your personal benefit or privacy.</li>
                      <li>Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications.</li>
                    </ul>
                    <p className="text-warning/90 font-bold pt-2">
                      Unauthorized access to this system is a violation of UGC Digital Sovereignty Act, Article 42 and may result in criminal prosecution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('credentials')}
              className="w-full flex items-center justify-center gap-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 hover:border-primary/60 text-primary rounded-lg py-4 text-sm font-bold tracking-wider transition-all group"
            >
              <Shield className="h-5 w-5" />
              I UNDERSTAND AND CONSENT TO MONITORING
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-[10px] text-muted-foreground font-mono tracking-wider">
              JWICS // SIPRNet AUTHORIZED TERMINAL // {time.toISOString().replace('T', ' ').slice(0, 19)}Z
            </p>
          </div>
        </div>

        <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
          ████ TOP SECRET // SCI // NOFORN ████
        </div>
      </div>
    );
  }

  if (step === 'verifying') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
          ████ TOP SECRET // SCI // NOFORN ████
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="relative inline-flex">
              <div className="h-24 w-24 rounded-full border-2 border-primary/30 flex items-center justify-center animate-pulse">
                <Fingerprint className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-primary tracking-wider font-mono">VERIFYING CREDENTIALS</p>
              <div className="flex items-center justify-center gap-2">
                {['PKI Certificate', 'LDAP Bind', 'Clearance Level', 'Need-to-Know'].map((s, i) => (
                  <span key={s} className={cn(
                    "text-[9px] font-mono px-2 py-0.5 rounded border",
                    i < 3 ? "border-success/30 text-success bg-success/10" : "border-border text-muted-foreground animate-pulse"
                  )}>
                    {i < 3 ? '✓' : '⏳'} {s}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground font-mono mt-4">
                Establishing secure session via SIPRNet...
              </p>
            </div>
          </div>
        </div>
        <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
          ████ TOP SECRET // SCI // NOFORN ████
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top classification */}
      <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
        ████ TOP SECRET // SCI // NOFORN ████
      </div>

      <div className="flex-1 flex">
        {/* Left decorative panel */}
        <div className="hidden lg:flex w-96 bg-card/30 border-r border-border flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `linear-gradient(transparent ${scanLine}%, hsl(185 70% 50% / 0.03) ${scanLine + 1}%, transparent ${scanLine + 2}%)`
          }} />

          <div className="relative z-10 space-y-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Satellite className="h-16 w-16 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground tracking-wider">Joint Operations</h2>
              <h2 className="text-lg font-bold text-foreground tracking-wider">Command Platform</h2>
              <p className="text-[10px] text-primary/70 font-mono tracking-[0.2em] pt-2">
                NATO STANAG 4677 COMPLIANT
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {[
                { icon: ShieldCheck, label: 'AES-256 Encrypted', status: 'ACTIVE' },
                { icon: Radio, label: 'SIPRNet Connection', status: 'SECURE' },
                { icon: Lock, label: 'COMSEC Status', status: 'GREEN' },
              ].map(({ icon: Icon, label, status }) => (
                <div key={label} className="flex items-center gap-3 text-left bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                  <Icon className="h-4 w-4 text-success shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground block">{label}</span>
                    <span className="text-[10px] font-bold text-success font-mono">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 text-[9px] text-muted-foreground/50 font-mono text-center">
            SYSTEM BUILD: JOC-MIP-4.2.1-NATO<br />
            TERMINAL ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}
          </div>
        </div>

        {/* Main login area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-wide">
                {step === 'credentials' ? 'SECURE AUTHENTICATION' : 'MULTI-FACTOR VERIFICATION'}
              </h1>
              <p className="text-[11px] text-muted-foreground font-mono tracking-wider">
                {step === 'credentials' ? 'CAC / PKI CERTIFICATE REQUIRED' : 'ENTER TOKEN FROM AUTHORIZED DEVICE'}
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 text-[11px] text-destructive font-mono">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {step === 'credentials' && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase font-mono">
                    Service Number / Username
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="e.g. NATO-JOC-0451"
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono transition-all"
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase font-mono">
                    Passphrase
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono transition-all"
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                  <Fingerprint className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-foreground">Secure Identity Token Detected</p>
                    <p className="text-[9px] text-muted-foreground font-mono">PKI Certificate: UGC-DEF-01 // Valid</p>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3.5 text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Shield className="h-4 w-4" />
                  AUTHENTICATE
                </button>
              </div>
            )}

            {step === 'mfa' && (
              <div className="space-y-5">
                <div className="text-center space-y-2 bg-secondary/30 border border-border rounded-lg p-4">
                  <p className="text-[11px] text-foreground font-mono">
                    Token sent to authorized UGC-certified device
                  </p>
                  <p className="text-[9px] text-muted-foreground font-mono">
                    Device: ████-████-{username.slice(-4) || '0451'} // RSA SecurID
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase font-mono">
                    6-Digit Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={mfaCode[i] || ''}
                        className="w-12 h-14 bg-secondary/50 border border-border rounded-lg text-center text-xl font-bold text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          const newCode = mfaCode.split('');
                          newCode[i] = val;
                          setMfaCode(newCode.join(''));
                          if (val && i < 5) {
                            const next = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                            next?.focus();
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Backspace' && !mfaCode[i] && i > 0) {
                            const prev = (e.target as HTMLElement).parentElement?.children[i - 1] as HTMLInputElement;
                            prev?.focus();
                          }
                          if (e.key === 'Enter' && mfaCode.length === 6) handleMFA();
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleMFA}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3.5 text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <ShieldCheck className="h-4 w-4" />
                  VERIFY & ESTABLISH SESSION
                </button>

                <button
                  onClick={() => { setStep('credentials'); setMfaCode(''); setError(''); }}
                  className="w-full text-muted-foreground hover:text-foreground text-[11px] font-mono tracking-wider transition-colors py-2"
                >
                  ← RETURN TO CREDENTIALS
                </button>
              </div>
            )}

            {/* Footer info */}
            <div className="text-center space-y-2 pt-4 border-t border-border/50">
              <p className="text-[9px] text-muted-foreground/60 font-mono">
                SESSION ENCRYPTION: AES-256-GCM // TLS 1.3 // FIPS 140-2 LEVEL 3
              </p>
              <p className="text-[9px] text-muted-foreground/40 font-mono">
                {time.toISOString().replace('T', ' ').slice(0, 19)}Z // JWICS TERMINAL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom classification */}
      <div className="bg-destructive/90 text-destructive-foreground text-center py-1.5 text-[11px] font-bold tracking-[0.3em] font-mono">
        ████ TOP SECRET // SCI // NOFORN ████
      </div>
    </div>
  );
}
