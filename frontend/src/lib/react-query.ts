import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 60, // 5 min
      cacheTime: 500 * 3600, // 30 min
      refetchInterval: 250 * 3600, // 15 min
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'always'
    }
  }
})
