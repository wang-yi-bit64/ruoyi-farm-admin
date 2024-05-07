import { loadEnv } from 'vite';
import type { UserConfig } from '@farmfe/core';

import { createViteProxy, getRootPath, getSrcPath, setupFarmVitePlugins, viteDefine } from './build';
import { getServiceEnvConfig } from './src/typing/.env-config';

function defineConfig(config: UserConfig) {
  return config;
}

const mode = process.env.NODE_ENV as string;
const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

const rootPath = getRootPath();
const srcPath = getSrcPath();
const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';
const envConfig = getServiceEnvConfig(viteEnv);

console.log('start', Date.now());

export default defineConfig({
	root: rootPath,
  compilation: {
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
        // 'socket.io-parser': 'socket.io-parser/build/esm',
        // 'engine.io-parser': 'engine.io-parser/build/esm'
      }
		},
		define: viteDefine,
	},
	vitePlugins: setupFarmVitePlugins(viteEnv) as object[],
	server: {
    // host: '0.0.0.0',
    port: 3200,
    open: true,
    proxy: createViteProxy(isOpenProxy, envConfig) as any
  }
});
