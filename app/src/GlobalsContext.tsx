import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';

import { ClawkClient } from './client/client';

export interface IGlobals {
  requester: Requester;
  localStorageClient: LocalStorageClient;
  clawkClient: ClawkClient;
}

const GlobalsContext = React.createContext<IGlobals | null>(null);

export function GlobalsProvider({ globals, children }: { globals: IGlobals; children: React.ReactNode }): React.ReactElement {
  return <GlobalsContext.Provider value={globals}>{children}</GlobalsContext.Provider>;
}

export function useGlobals(): IGlobals {
  const globals = React.useContext(GlobalsContext);
  if (!globals) throw new Error('useGlobals must be used within GlobalsProvider');
  return globals;
}
