import { Disc, Gem, Globe, Trophy } from 'lucide-react';
import Reveal from './Reveal.jsx';

// Icon stats bar — factory-confirmed numbers (2026-08).
const STATS = [
  { icon: Disc, value: '500+', label: 'Wheel designs' },
  { icon: Gem, value: '10+', label: 'Years experience' },
  { icon: Globe, value: '80+', label: 'Countries served' },
  { icon: Trophy, value: '100%', label: 'Quality guarantee' },
];

export default function StatsBar() {
  return (
    <div className="stats-bar" data-component="stats-bar">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 60} className="stats-item">
          <s.icon size={26} strokeWidth={1.6} className="stats-icon" />
          <span className="stats-value">{s.value}</span>
          <span className="stats-label">{s.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
