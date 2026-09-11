// Honest placeholder for content that must come from the factory (photos, footage).
// Never substitutes generated/fake imagery for real evidence.
export default function PendingPanel({ label = 'Factory footage — pending verification', ratio = '16/9' }) {
  return (
    <div className="pending-panel" data-component="pending-panel" style={{ aspectRatio: ratio }}>
      <span className="pending-panel-frame" aria-hidden="true" />
      <span className="pending-panel-label">{label}</span>
    </div>
  );
}
