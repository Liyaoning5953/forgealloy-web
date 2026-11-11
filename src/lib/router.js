// Everything React Router exports, with Link/NavLink replaced by the versions that
// emit trailing-slash URLs. The explicit exports below take precedence over the
// star re-export, so pages import from here exactly as they used to from the
// library itself.
export * from 'react-router-dom';
export { Link, NavLink } from '../components/SiteLink.jsx';
