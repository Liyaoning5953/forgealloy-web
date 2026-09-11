import { ON_REQUEST } from '../data/facts.js';

// Mission-control style spec readout. Null values render "On request".
export default function SpecTable({ rows }) {
  return (
    <div className="spec-table" data-component="spec-table">
      {rows.map((r) => (
        <div className="spec-cell" key={r.label}>
          <span className="spec-value">{r.value || ON_REQUEST}</span>
          <span className="spec-label">{r.label}</span>
        </div>
      ))}
    </div>
  );
}
