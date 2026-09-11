import { PROCESS_STEPS } from '../data/facts.js';
import Reveal from './Reveal.jsx';

export default function ProcessStrip() {
  return (
    <div className="process-strip" data-component="process-strip">
      {PROCESS_STEPS.map((s, i) => (
        <Reveal key={s.n} delay={(i % 3) * 60} className="process-step">
          <span className="process-num">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}
