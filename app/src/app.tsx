import React from 'react';

import { LocalStorageClient, Requester } from '@kibalabs/core';
import { IRoute, MockStorage, Router, SubRouter } from '@kibalabs/core-react';
import { KibaApp } from '@kibalabs/ui-react';
import { ToastContainer } from '@kibalabs/ui-react-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './theme.scss';
import { ClawkClient } from './client/client';
import { GlobalsProvider, IGlobals } from './GlobalsContext';
import { HomePage } from './pages/HomePage';

declare global {
  export interface Window {
    KRT_API_URL?: string;
  }
}

const requester = new Requester();
const baseUrl = typeof window !== 'undefined' && window.KRT_API_URL ? window.KRT_API_URL : 'http://localhost:5000';
const clawkClient = new ClawkClient(requester, baseUrl);
const localStorageClient = new LocalStorageClient(typeof window !== 'undefined' ? window.localStorage : new MockStorage());
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const globals: IGlobals = { requester, localStorageClient, clawkClient };

const routes: IRoute<IGlobals>[] = [
  { path: '/', page: HomePage },
];

interface IAppProps {
  staticPath?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  pageData?: unknown | undefined | null;
}

export function App({ staticPath }: IAppProps): React.ReactElement {
  return (
    <KibaApp isFullPageApp={true}>
      <GlobalsProvider globals={globals}>
        <QueryClientProvider client={queryClient}>
          <Router staticPath={staticPath}>
            <SubRouter routes={routes} />
          </Router>
          <ToastContainer />
        </QueryClientProvider>
      </GlobalsProvider>
    </KibaApp>
  );
}
