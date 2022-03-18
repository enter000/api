import {
  generateAuthHeader,
  toString,
  serializeParams,
  setTokenName,
  removeToken,
  isJSON,
} from './utils';

class API_ERROR extends Error {
  constructor(object) {
    super(object.message);
    const { message, ...rest } = object;
    const context = this;
    Object.keys(rest).forEach((key) => {
      context[key] = rest[key];
    });
  }
}

async function get(url, params = {}, options = { credentials: 'omit' }) {
  const defaultOptions = {
    headers: {
      ...generateAuthHeader(),
    },
  };

  let response;
  try {
    response = await fetch(`${url}${toString({ ...params })}`, {
      ...defaultOptions,
      ...options,
    });
  } catch (fetchError) {
    if (fetchError.name === 'AbortError') {
      throw new API_ERROR({ message: 'AbortError', abortError: true });
    }
  }

  const contentType = response.headers.get('content-type');

  if (response.ok) {
    if (isJSON(contentType)) {
      const data = await response.json();
      return data;
    }
    return true;
  }

  const { status } = response;
  if (isJSON(contentType)) {
    const data = await response.json();
    throw new API_ERROR({ message: data.error, status, data });
  }
  const data = await response.text();
  if (status === 401 || status === 403) {
    removeToken();
  }

  throw new API_ERROR({ message: data, status, data });
}

async function post(
  url,
  body,
  options = { credentials: 'omit' },
  method = 'post'
) {
  const defaultOptions = {
    headers: {
      ...generateAuthHeader(),
    },
  };
  const response = await fetch(url, {
    method,
    body: serializeParams(body),
    ...defaultOptions,
    ...options,
  });
  const { status } = response;
  const contentType = response.headers.get('content-type');
  if (response.ok) {
    if (isJSON(contentType)) {
      const data = await response.json();
      if (data.error) {
        throw new API_ERROR({
          message: data.error,
          logicsError: true,
          ...data,
          status,
        });
      }
      return data;
    }
    return true;
  }
  if (isJSON(contentType)) {
    const data = await response.json();
    throw new API_ERROR({ message: data.error, status, data });
  }
  const data = await response.text();
  if (status === 401 || status === 403) {
    removeToken();
  }
  throw new API_ERROR({ message: data, status, data });
}

async function put(url, body, options = {}, serializeOptions = {}) {
  const data = await post(url, body, options, 'put', serializeOptions);
  return data;
}

function generateAbortController() {
  return new AbortController();
}

function setLocalStorageName(name) {
  setTokenName(name);
}

export default {
  get,
  post,
  put,
  generateAbortController,
  setLocalStorageName,
};
