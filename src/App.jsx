import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, FileSearch, Database, Activity, Clock, LogOut, Crosshair, Smartphone, ChevronDown } from 'lucide-react';

const CLUES = [
  {
    id: 'laptop', title: 'sys_exec_mail.eml', icon: <Terminal size={24} />, type: 'Metadata',
    toolName: 'Atlas', toolColor: 'text-blue-400', borderColor: 'border-blue-500', bgGlow: 'shadow-blue-500/70',
    surface: 'L.CHEN to E.VALE [09:45 AM]: "Keep digging into my files and you\'ll regret it. Last warning."',
    hidden: 'ATLAS METADATA INJECTION: Timestamp spoofed. Actual execution: -24hrs. Origin IP traced to D.CROSS (Executive Suite).',
    pos: { top: '39%', left: '7%', width: '27%', height: '38%' }
  },
  {
    id: 'cctv', title: 'cam_4_feed.mp4', icon: <Activity size={24} />, type: 'Lineage',
    toolName: 'Manta', toolColor: 'text-purple-400', borderColor: 'border-purple-500', bgGlow: 'shadow-purple-500/70',
    surface: 'VISUAL DATA: Subject L.CHEN recorded aggressively entering E.VALE office at 09:30 AM.',
    hidden: 'MANTA LINEAGE BREAK: Chain of custody altered. M.KESSLER executed OVERWRITE_LIVE_FEED at 09:40 AM. Source file: "Leon_Argument_LastWeek.mp4".',
    pos: { top: '19%', left: '68.5%', width: '26%', height: '20%' }
  },
  {
    id: 'vendor', title: 'expense_auth.pdf', icon: <Database size={24} />, type: 'Quality',
    toolName: 'Qalibrate', toolColor: 'text-emerald-400', borderColor: 'border-emerald-500', bgGlow: 'shadow-emerald-500/70',
    surface: 'DOCUMENT: $50,000 vendor payout authorization. Signatures visually intact. Formatting standard.',
    hidden: 'QALIBRATE CRITICAL ALERT: Data toxicity detected. Tax ID [000-00-0000] invalid. Routing to Cayman shell entity. Signature verified as copy-paste clone.',
    pos: { top: '40%', left: '64.5%', width: '31%', height: '35%' }
  },
  {
    id: 'trash', title: 'confession.txt', icon: <FileSearch size={24} />, type: 'System',
    toolName: 'SysLog', toolColor: 'text-slate-400', borderColor: 'border-slate-500', bgGlow: 'shadow-slate-500/70',
    surface: 'PHYSICAL NOTE: "I am sorry. Ethan left me no choice. - Leon"',
    hidden: 'SYSTEM LOG MATCH: Printer metadata missing. Creation timestamp 09:52 AM (2 mins POST-DEATH). Status: PLANTED DECOY.',
    pos: { top: '75%', left: '6%', width: '13%', height: '22%' }
  }
];

const SUSPECTS = [
  { id: 'Daniel Cross', label: 'Daniel Cross (SVP Finance)' },
  { id: 'Mira Kessler', label: 'Mira Kessler (Admin)' },
  { id: 'Leon Chen', label: 'Leon Chen (Security)' }
];

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [timeLeft, setTimeLeft] = useState(300);
  const [activeFile, setActiveFile] = useState(null);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [killer, setKiller] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for custom dropdown

  useEffect(() => {
    if (screen !== 'game' && screen !== 'deduction') return;
    if (timeLeft <= 0) { setScreen('debrief'); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [screen, timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const runScan = (id) => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedFiles(prev => [...prev, id]);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black font-mono flex items-center justify-center overflow-hidden selection:bg-cyan-500/30">
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* --- INTRO SCREEN --- */}
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div 
            key="intro" exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[url('/bg-cyber.jpg')] bg-cover bg-center p-2"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
            <div className="z-10 flex flex-col items-center max-w-lg w-full text-center p-4 md:p-6 holo-panel rounded-xl border border-cyan-500/30 shadow-2xl max-h-full overflow-y-auto">
              <ShieldAlert className="text-cyan-500 mb-1 md:mb-2 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
              <h2 className="title-font text-[10px] md:text-xs text-cyan-400 tracking-widest mb-1 neon-text-cyan">EDM HUB TERMINAL</h2>
              <h1 className="title-font text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter leading-none">
                Project <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Blackout</span>
              </h1>
              
              <div className="text-slate-300 mb-3 md:mb-4 bg-black/50 p-2 md:p-3 rounded-lg border border-cyan-500/30 text-[9px] md:text-sm text-left w-full shadow-inner space-y-1 md:space-y-2">
                <div className="flex items-start gap-1 md:gap-2">
                  <span className="text-red-400 font-bold shrink-0">TARGET:</span> 
                  <span>Analyst Ethan Vale (Deceased)</span>
                </div>
                <div className="flex items-start gap-1 md:gap-2">
                  <span className="text-red-400 font-bold shrink-0">THREAT:</span> 
                  <span>System auto-wipes in <strong className="text-white">5 Mins</strong></span>
                </div>
                <div className="flex items-start gap-1 md:gap-2">
                  <span className="text-cyan-400 font-bold shrink-0">MISSION:</span> 
                  <span>Scan desk data. Identify true killer.</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 md:gap-2 text-[9px] md:text-xs text-slate-400 mb-3 md:mb-4 font-bold uppercase tracking-wider">
                <Smartphone size={12} className="shrink-0" /> Play in landscape mode
              </div>

              <button 
                onClick={() => setScreen('game')}
                className="w-full relative py-2.5 md:py-4 bg-cyan-600/90 hover:bg-cyan-500 text-white font-bold text-xs md:text-sm uppercase tracking-widest rounded shadow-[0_0_15px_rgba(6,182,212,0.6)] active:scale-95 transition-all"
              >
                Start Investigation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INTERACTIVE GAME WORKSPACE --- */}
      {(screen === 'game' || screen === 'deduction') && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="relative w-full h-full max-w-[calc(100vh*16/9)] max-h-[calc(100vw*9/16)] bg-black shadow-2xl overflow-hidden"
        >
          <img src="/bg-cyber.jpg" alt="Hacker Desk" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="scanlines z-10" />

          <div className="absolute z-10 flex items-center justify-center bg-[#0e1628] rounded shadow-inner" style={{ top: '41.5%', left: '40.5%', width: '19%', height: '14%' }}>
            <span className={`title-font font-bold text-[5vw] leading-none tracking-widest ${timeLeft < 60 ? 'text-red-500 animate-[pulse_0.5s_infinite] drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="absolute bottom-[6%] w-full flex justify-center z-30 pointer-events-none">
             <button 
                onClick={() => setScreen('deduction')}
                className="bg-red-600/90 hover:bg-red-500 text-white px-6 md:px-10 py-2 md:py-3 uppercase tracking-widest text-xs md:text-sm font-bold border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] rounded pointer-events-auto active:scale-95 transition-all"
             >
                Submit Deduction
             </button>
          </div>

          {screen === 'game' && CLUES.map((clue) => {
            const isScanned = scannedFiles.includes(clue.id);
            return (
              <div 
                key={clue.id} onClick={() => setActiveFile(clue)}
                className="absolute z-20 cursor-pointer group flex items-center justify-center transition-all"
                style={{ top: clue.pos.top, left: clue.pos.left, width: clue.pos.width, height: clue.pos.height }}
              >
                <div className={`absolute inset-0 rounded border-2 transition-all duration-300 ${isScanned ? `border-${clue.borderColor.split('-')[1]}-500/80 bg-${clue.borderColor.split('-')[1]}-500/20` : 'border-cyan-400/40 bg-cyan-500/10 group-hover:border-cyan-300 group-hover:bg-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`} />
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className={`relative z-10 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full backdrop-blur-sm border ${isScanned ? `bg-black/80 ${clue.borderColor} ${clue.toolColor} ${clue.bgGlow}` : 'bg-black/50 border-cyan-400/50 text-cyan-300'}`}>
                  {isScanned ? clue.icon : <Crosshair size={18} className="group-hover:animate-spin-slow" />}
                </motion.div>
              </div>
            );
          })}

          {/* DEDUCTION OVERLAY (With Custom Styled Dropdown) */}
          <AnimatePresence>
            {screen === 'deduction' && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2">
                <div className="bg-slate-900 border border-cyan-500/50 p-4 md:p-8 rounded-xl w-full max-w-md shadow-[0_0_50px_rgba(6,182,212,0.2)] text-center max-h-[95vh] overflow-visible">
                  <h2 className="title-font text-xl md:text-2xl text-red-500 mb-1">Final Deduction</h2>
                  <p className="text-slate-300 text-[10px] md:text-xs mb-4 border-b border-slate-700 pb-2">Submit the name of the mastermind.</p>
                  
                  {/* CUSTOM CYBERPUNK DROPDOWN */}
                  <div className="relative flex flex-col text-left mb-6">
                    <label className="text-[10px] md:text-xs text-cyan-400 mb-2 uppercase tracking-widest font-bold">Who ordered the hit?</label>
                    
                    {/* Select Trigger Box */}
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center justify-between bg-slate-950 border p-2 md:p-3 cursor-pointer transition-all rounded shadow-inner ${isDropdownOpen ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}
                    >
                      <span className={`text-xs md:text-sm ${killer ? 'text-white' : 'text-slate-500 font-bold tracking-wider'}`}>
                        {killer ? SUSPECTS.find(s => s.id === killer).label : 'SELECT TARGET ID...'}
                      </span>
                      <ChevronDown size={16} className={`text-cyan-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Dropdown Options Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-slate-950 border border-cyan-500/50 rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] overflow-hidden z-50"
                        >
                          {SUSPECTS.map((suspect) => (
                            <div 
                              key={suspect.id}
                              onClick={() => { setKiller(suspect.id); setIsDropdownOpen(false); }}
                              className="px-4 py-3 border-b border-slate-800 last:border-none text-slate-300 text-xs md:text-sm cursor-pointer hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors"
                            >
                              {suspect.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => { setScreen('game'); setIsDropdownOpen(false); }} className="flex-1 py-2 md:py-3 border border-slate-600 text-slate-300 hover:bg-slate-800 uppercase tracking-widest text-[10px] md:text-xs font-bold rounded">Back</button>
                    <button onClick={() => setScreen('debrief')} disabled={!killer} className="flex-1 py-2 md:py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white uppercase tracking-widest text-[10px] md:text-xs font-bold rounded shadow-[0_0_20px_rgba(239,68,68,0.4)]">Lock Answer</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* --- CLUE MODAL --- */}
      <AnimatePresence>
        {activeFile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`w-full max-w-lg max-h-[95vh] flex flex-col bg-slate-900 border ${scannedFiles.includes(activeFile.id) ? activeFile.borderColor : 'border-slate-700'} rounded-xl overflow-hidden shadow-2xl relative`}>
              {isScanning && <div className="absolute inset-0 bg-cyan-500/10 animate-[pulse_0.2s_infinite] pointer-events-none z-10" />}
              
              <div className="flex justify-between items-center p-2 md:p-4 border-b border-slate-700 bg-black/50 shrink-0">
                <div className="flex items-center gap-2 text-white font-bold title-font text-[11px] md:text-sm">
                  {activeFile.icon} {activeFile.title}
                </div>
                <button onClick={() => !isScanning && setActiveFile(null)} className="text-slate-500 hover:text-white p-1"><LogOut size={16}/></button>
              </div>

              <div className="p-3 md:p-6 space-y-3 overflow-y-auto">
                <div>
                  <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-widest">Initial Audit Data</div>
                  <div className="bg-slate-950 p-2 md:p-3 font-mono text-slate-300 text-[10px] md:text-xs border-l-2 border-slate-700">{activeFile.surface}</div>
                </div>

                {!scannedFiles.includes(activeFile.id) ? (
                  <button onClick={() => runScan(activeFile.id)} disabled={isScanning} className="w-full py-2.5 md:py-3 border border-cyan-500/50 bg-cyan-900/30 active:bg-cyan-900/60 text-cyan-400 font-bold uppercase tracking-widest transition-all text-[10px] md:text-xs">
                    {isScanning ? <span className="flex items-center justify-center gap-2 animate-pulse"><Activity className="animate-spin" size={14} /> EXECUTING {activeFile.toolName}...</span> : `Run ${activeFile.toolName} Analysis`}
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className={`text-[9px] ${activeFile.toolColor} mb-1 uppercase tracking-widest`}>{activeFile.toolName} Decryption Results</div>
                    <div className={`bg-slate-950 p-2 md:p-3 font-mono ${activeFile.toolColor} text-[10px] md:text-xs border-l-2 ${activeFile.borderColor} shadow-inner`}>
                      {activeFile.hidden}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DEBRIEF SCREEN --- */}
      {screen === 'debrief' && (
        <div className="z-50 absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur p-2">
          <div className="w-full max-w-md max-h-[95vh] overflow-y-auto p-4 md:p-6 bg-slate-900 border border-slate-700 rounded-xl text-center shadow-2xl">
            {timeLeft <= 0 ? (
              <>
                <h1 className="title-font text-2xl md:text-4xl text-red-500 mb-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">SYSTEM WIPED</h1>
                <p className="text-slate-300 text-[10px] md:text-sm mb-4">Time expired. The evidence is gone.</p>
              </>
            ) : killer === 'Daniel Cross' ? (
              <>
                <h1 className="title-font text-2xl md:text-4xl text-emerald-400 mb-2 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">SUCCESS</h1>
                <p className="text-white font-bold text-[11px] md:text-sm mb-2">Daniel Cross is the Mastermind.</p>
                <div className="text-slate-300 text-[9px] md:text-xs space-y-1 text-left bg-black/50 p-2 md:p-3 rounded border border-emerald-500/30">
                  <p>✓ <strong>Atlas</strong> proved Cross spoofed his metadata.</p>
                  <p>✓ <strong>Manta</strong> revealed the video lineage was altered.</p>
                  <p>✓ <strong>Qalibrate</strong> flagged the fake invoice.</p>
                </div>
              </>
            ) : (
              <>
                <h1 className="title-font text-2xl md:text-4xl text-red-500 mb-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">INCORRECT</h1>
                <p className="text-slate-300 text-[10px] md:text-sm mb-4">You accused <strong className="text-white">{killer}</strong>. The real killer, Daniel Cross, escaped.</p>
              </>
            )}
            <button onClick={() => window.location.reload()} className="mt-4 w-full py-2.5 md:py-3 border border-cyan-500 text-cyan-400 active:bg-cyan-500 active:text-white uppercase tracking-widest rounded transition-all font-bold text-[10px] md:text-xs">Reboot System</button>
          </div>
        </div>
      )}
    </div>
  );
}