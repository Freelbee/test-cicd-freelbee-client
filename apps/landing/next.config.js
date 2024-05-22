//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// const { NxWebpackPlugin } = require('@nrwl/webpack');



/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-stg.transak.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets-dev.transak.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.transak.com',
        port: '',
      },
    ],
  },
  nx: {
    svgr: true,

  },

  compiler: {
    styledComponents: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {

    // TODO: find solution for svgr better than this because this looks like a fucking sheet
    config.module.rules.forEach((/** @type {{ test: { test: (arg0: string) => any; }; oneOf: { use: string | any[]; }[]; }} */ rule) => {
      if (rule?.test?.test && rule.test.test(".svg")) {
        // Обработка правил с oneOf
        if (rule.oneOf) {
          rule.oneOf.forEach((/** @type {{ use: string | any[]; }} */ oneOfRule) => {
            if (oneOfRule.use && oneOfRule.use.length > 1) {
              const newUse = { ...oneOfRule.use[1] };
              newUse.options = {
                ...newUse.options,
                limit: undefined, // Remove limit to enable svgr
                name: "[name].[hash:7].[ext]"
              };
              oneOfRule.use = [oneOfRule.use[0], newUse];
            }
          });
        }
      }
    });
    return config;

  },

};


const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

// if (process.env.ANALYZE === 'true') {
//   plugins.push(withBundleAnalyzer);
// }
module.exports = composePlugins(...plugins)(nextConfig);

// module.exports = async (/** @type {string} */ phase, /** @type {any} */ context) => {
//   let updatedConfig = plugins.reduce((acc, fn) => fn(acc), nextConfig);
//
//   // Apply the async function that `withNx` returns.
//   updatedConfig = await withNx(updatedConfig)(phase, context);
//
//   // If you have plugins that has to be added after Nx you can do that here.
//   // For example, Sentry needs to be added last.
//   // const { withSentryConfig } = require('@sentry/nextjs');
//   // updatedConfig = withSentryConfig(updatedConfig);
//
//   return updatedConfig;
// };
