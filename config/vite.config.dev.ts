import { mergeConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

const envs = loadEnv(process.env.NODE_ENV || 'development', '');

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {
        '^/api': {
          target: envs.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/api/v1'),
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
