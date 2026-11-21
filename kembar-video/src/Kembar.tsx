import React from 'react';
import {Audio, staticFile, AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence} from 'remotion';

// Karakter orisinal: Rara (topi merah) dan Rio (ikat kepala hijau)
const Kid: React.FC<{x: number; y: number; cap: string; shirt: string; flip?: boolean; talk?: boolean}> = ({x, y, cap, shirt, flip, talk}) => {
  const f = useCurrentFrame();
  const bounce = Math.sin(f / 5 + x) * 8;
  const mouth = talk ? 10 + Math.abs(Math.sin(f / 2.5)) * 18 : 8;
  const blink = f % 90 < 4 ? 1 : 12;
  return (
    <g transform={`translate(${x},${y + bounce}) scale(${flip ? -1 : 1},1)`}>
      <rect x={-70} y={90} width={140} height={150} rx={50} fill={shirt} />
      <rect x={-50} y={230} width={36} height={70} rx={14} fill="#6b4a2f" />
      <rect x={14} y={230} width={36} height={70} rx={14} fill="#6b4a2f" />
      <circle cx={0} cy={0} r={100} fill="#f2b987" />
      <path d="M-104 -20 A104 104 0 0 1 104 -20 Z" fill={cap} />
      <rect x={-110} y={-26} width={220} height={22} rx={11} fill={cap} />
      <ellipse cx={-36} cy={10} rx={11} ry={blink} fill="#222" />
      <ellipse cx={36} cy={10} rx={11} ry={blink} fill="#222" />
      <circle cx={-62} cy={40} r={14} fill="#f08c7a" opacity={0.6} />
      <circle cx={62} cy={40} r={14} fill="#f08c7a" opacity={0.6} />
      <ellipse cx={0} cy={52} rx={22} ry={mouth} fill="#7a2b2b" />
    </g>
  );
};

const Kite: React.FC<{frame: number}> = ({frame}) => {
  const x = 780 + Math.sin(frame / 18) * 60;
  const y = 380 + Math.cos(frame / 22) * 40;
  return (
    <g>
      <path d={`M${x} ${y + 90} Q ${x - 160} 1000 330 1330`} stroke="#fff" strokeWidth={4} fill="none" />
      <g transform={`translate(${x},${y}) rotate(${Math.sin(frame / 18) * 12})`}>
        <polygon points="0,-110 80,0 0,110 -80,0" fill="#ffcc33" />
        <polygon points="0,-110 80,0 0,0" fill="#ff5a5f" />
        <polygon points="0,110 -80,0 0,0" fill="#3b82f6" />
      </g>
    </g>
  );
};

const Subtitle: React.FC<{text: string}> = ({text}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', bottom: 180, left: 60, right: 60, textAlign: 'center', opacity: o}}>
      <span style={{fontFamily: 'sans-serif', fontWeight: 800, fontSize: 64, color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '14px 28px', borderRadius: 24, lineHeight: 1.5}}>{text}</span>
    </div>
  );
};

export const Kembar: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});
  const cloud = (frame * 1.2) % 1400 - 250;
  const sunY = 260 + Math.sin(frame / 40) * 10;
  const rara = frame >= 90 && frame < 180 || frame >= 300 && frame < 390;
  const rio = frame >= 180 && frame < 300 || frame >= 390;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#7ec8f5,#d9f2ff)'}}>
      <Audio src={staticFile('musik.wav')} volume={0.6} />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <circle cx={200} cy={sunY} r={90} fill="#ffd54a" />
        <g transform={`translate(${cloud},180)`} fill="#fff"><ellipse cx={0} cy={0} rx={110} ry={50} /><ellipse cx={70} cy={-25} rx={70} ry={45} /></g>
        <g transform={`translate(${(cloud * 0.6 + 500) % 1400 - 200},420)`} fill="#fff" opacity={0.9}><ellipse cx={0} cy={0} rx={80} ry={36} /><ellipse cx={50} cy={-18} rx={50} ry={32} /></g>
        <ellipse cx={250} cy={1300} rx={600} ry={260} fill="#7fcf6b" />
        <ellipse cx={900} cy={1340} rx={600} ry={240} fill="#6bbf5a" />
        <rect x={0} y={1300} width={1080} height={620} fill="#58a84a" />
        {/* rumah kampung */}
        <g transform="translate(790,1050)">
          <rect x={0} y={80} width={240} height={170} fill="#c98f55" />
          <polygon points="-30,80 120,-30 270,80" fill="#a63d2f" />
          <rect x={95} y={150} width={50} height={100} fill="#5b3a20" />
        </g>
        <Kite frame={frame} />
        <g style={{transformOrigin: '330px 1330px'}} transform={`scale(${pop})`}>
          <Kid x={300} y={1330} cap="#e5383b" shirt="#f4a261" talk={!!rara} />
          <Kid x={520} y={1350} cap="#2d9a4b" shirt="#4895ef" flip talk={!!rio} />
        </g>
      </svg>
      <Sequence from={0} durationInFrames={90}><Title /></Sequence>
      <Sequence from={90} durationInFrames={90}><Subtitle text="Rara: Rio, lihat! Layang-layangnya tinggi sekali!" /></Sequence>
      <Sequence from={180} durationInFrames={120}><Subtitle text="Rio: Ayo kita main sampai sore, Rara!" /></Sequence>
      <Sequence from={300} durationInFrames={90}><Subtitle text="Rara: Tapi jangan lupa pulang makan ya!" /></Sequence>
      <Sequence from={390} durationInFrames={60}><Subtitle text="Rio: Siap! Hari yang seru! 🪁" /></Sequence>
    </AbsoluteFill>
  );
};

const Title: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 10}});
  return (
    <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', transform: `scale(${s})`}}>
      <div style={{fontFamily: 'sans-serif', fontWeight: 900, fontSize: 110, color: '#fff', textShadow: '0 8px 0 #e5383b'}}>Rara &amp; Rio</div>
      <div style={{fontFamily: 'sans-serif', fontWeight: 700, fontSize: 56, color: '#1d3557', marginTop: 10}}>Main Layang-Layang</div>
    </div>
  );
};
