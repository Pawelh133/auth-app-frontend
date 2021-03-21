import { ROUTING_PREFIX } from "../../config";

export const urlRoute = url => {
  return url
    ? `${ROUTING_PREFIX ? `${ROUTING_PREFIX}` : ''}${url}`.replace(/\/\//g, '/')
    : '';
};

export function getUrlParams() {
  const _urlSearch = window.location.search;

  return _urlSearch
    .substr(1)
    .split('&')
    .reduce((acc, v) => {
      const [key, value] = v.split('=');
      if (key && value) {
        acc[key] = value;
      }

      return acc;
    }, {});
}

export function setUrlParams(url, { key, value }) {
  const [_url, _olderParams] = url.split('?');

  if (_olderParams) {
    const _parsedParams = _olderParams.split('&').reduce((acc, v) => {
      const [key, value] = v.split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    let _isReplaced = false;

    const _parsedObject = Object.keys(_parsedParams).map(_key => {
      if (_key === key) {
        _parsedParams[_key] = value;
        _isReplaced = true;
      }
      return { key: _key, value: _parsedParams[_key] };
    });

    const _mapParsedParams = _parsedObject
      .map(v => `${v.key}=${v.value}`)
      .join('&');

    return _isReplaced
      ? `${_url}?${_mapParsedParams}`
      : `${_url}?${_mapParsedParams}&${key}=${value}`;
  }

  return `${_url}?${key}=${value}`;
}
