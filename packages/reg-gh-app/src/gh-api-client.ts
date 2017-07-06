import * as rp from "request-promise";
import { convertError } from "./error";

const BASIC_HEADERS = {
  "user-agent": "simple-gh-pr-app-example",
};

const URL = "https://api.github.com/graphql";

export function gqlRequest(query: string, token: string, variables?: any) {
  return rp({
    url: URL,
    method: "POST",
    headers: {
      ...BASIC_HEADERS,
      "Authorization": `Bearer ${token}`,
    },
    body: {
      query,
      variables: variables ? JSON.stringify(variables) : "",
    },
    json: true,
  });
}

export function requestWithV3api(path: string, token: string, body?: any) {
  return rp({
    url: "https://api.github.com" + path,
    method: "POST",
    headers: {
      ...BASIC_HEADERS,
      "Authorization": `Bearer ${token}`,
    },
    body,
    json: true,
  }).catch(convertError);
}

export class GhApiClient {
  constructor(private _token: string) {
  }

  requestWithGraphQL(query: string, variables?: any) {
    return gqlRequest(query, this._token, variables);
  }

  get(path: string) {
  }

  post(path: string, body?: any) {
    return requestWithV3api(path, this._token, body);
  }
}