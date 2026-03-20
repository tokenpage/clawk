import { Requester, ServiceClient } from '@kibalabs/core';

export class ClawkClient extends ServiceClient {
  public constructor(requester: Requester, baseUrl: string) {
    super(requester, baseUrl);
  }

  // eslint-disable-next-line class-methods-use-this
  private getHeaders = (authToken: string | null = null): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
  };
}
