import { clearSession } from '../auth/session';
import { urlRoute } from '../pathLinkUrl/url';

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
  clearSession();
  window.location = urlRoute('/');
}

export const serviceErrorFetchData = () => {
}