// Type declarations for packages without TypeScript support

declare module 'next-pwa' {
  import { NextConfig } from 'next'
  
  interface PWAConfig {
    dest?: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    runtimeCaching?: Array<{
      urlPattern: RegExp | string
      handler: string
      options?: {
        cacheName?: string
        expiration?: {
          maxEntries?: number
          maxAgeSeconds?: number
        }
      }
    }>
  }
  
  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export default withPWA
}

// Add minimatch types
declare module 'minimatch' {
  interface IOptions {
    debug?: boolean
    nobrace?: boolean
    noglobstar?: boolean
    dot?: boolean
    noext?: boolean
    nocase?: boolean
    nonull?: boolean
    matchBase?: boolean
    nocomment?: boolean
    nonegate?: boolean
    flipNegate?: boolean
  }

  function minimatch(target: string, pattern: string, options?: IOptions): boolean
  
  namespace minimatch {
    function filter(pattern: string, options?: IOptions): (target: string) => boolean
    function match(list: string[], pattern: string, options?: IOptions): string[]
    function makeRe(pattern: string, options?: IOptions): RegExp | false
    const Minimatch: {
      new (pattern: string, options?: IOptions): unknown
    }
  }
  
  export = minimatch
}

// Global types
declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  }

  interface Window {
    workbox?: unknown
  }
}
