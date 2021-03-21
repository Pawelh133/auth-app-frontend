import { urlRoute } from './url';

class PathLink {
  constructor(path, link) {
    this.path = urlRoute(path);
    this.link =
      link && typeof link === 'function'
        ? p => urlRoute(link(p))
        : () => urlRoute(link) || urlRoute(path);
  }
}

export default PathLink;
