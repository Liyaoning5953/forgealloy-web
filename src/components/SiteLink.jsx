import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

// GitHub Pages serves every route as /path/ and 301s the slash-less form, so a
// slash-less href costs one extra hop for every internal link a crawler follows.
// These wrappers emit the URL that is actually served. Routing behaviour does not
// change: React Router matches the trailing-slash form to the same route.
const ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function splitOnce(value, separator) {
  const index = value.indexOf(separator);
  return index === -1 ? [value, ''] : [value.slice(0, index), value.slice(index + 1)];
}

export function withTrailingSlash(to) {
  if (typeof to !== 'string' || !to.startsWith('/')) return to;
  if (ABSOLUTE.test(to) || to.startsWith('#')) return to;

  const [beforeHash, hash] = splitOnce(to, '#');
  const [path, query] = splitOnce(beforeHash, '?');
  if (path.endsWith('/')) return to;

  // Leave real files alone: /sitemap.xml, /downloads/spec.pdf and the like.
  const lastSegment = path.slice(path.lastIndexOf('/') + 1);
  if (lastSegment.includes('.')) return to;

  return `${path}/${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

export function Link({ to, ...rest }) {
  return <RouterLink to={typeof to === 'string' ? withTrailingSlash(to) : to} {...rest} />;
}

export function NavLink({ to, ...rest }) {
  return <RouterNavLink to={typeof to === 'string' ? withTrailingSlash(to) : to} {...rest} />;
}

export default Link;
