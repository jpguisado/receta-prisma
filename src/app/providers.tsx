// app/providers.jsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
}

export default function Providers({ children } :  Props): React.ReactNode {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}