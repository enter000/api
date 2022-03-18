import { serialize } from 'object-to-formdata';
import queryString from 'query-string';

let TOKEN_NAME;

export function generateAuthHeader() {
  if (TOKEN_NAME) {
    return {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
    };
  }
  return {};
}

export function setTokenName(name) {
  TOKEN_NAME = name;
}

export function toString(object) {
  return queryString.stringify(object, {
    arrayFormat: 'bracket',
    skipNull: true,
    skipEmptyString: true,
  });
}

export function serializeParams(object) {
  return serialize(object, {
    indices: true,
    booleansAsIntegers: true,
  });
}

export function removeToken() {
  localStorage.removeItem(TOKEN_NAME);
}

export function isJSON(type) {
  return type.includes('application/json');
}
