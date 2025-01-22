/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  experimental: {
    serverActions: true,
    instrumentationHook: true
  },
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
    localeDetection: false
  },
  images: {
    minimumCacheTTL: 0
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'clipboard-write=(self)'
          }
        ]
      }
    ];
  }
};
