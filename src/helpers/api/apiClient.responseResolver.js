import * as session from '../../helpers/auth/session';
import { urlRoute } from '../pathLinkUrl/url';
import { routes } from '../../routes';

export const serviceErrorRequestResponse = response => {
  if (response.data && response.data.message) {
    if (Array.isArray(response.data.message)) {
      response.data.message.forEach(message => {
      })
    } else if (typeof response.data.message === 'string') {
    }
  }
}

export const serviceUnauthorizedRequestResponse = () => {
  session.clearSession();
  window.location = urlRoute(routes.login.link());
}
