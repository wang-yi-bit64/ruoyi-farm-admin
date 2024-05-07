import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import progress from 'vite-plugin-progress';
// import VueDevtools from 'vite-plugin-vue-devtools';
import unplugin from "./unplugin";
import visualizer from './visualizer';
import compress from './compress';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupFarmVitePlugins(viteEnv: ImportMetaEnv):(PluginOption | PluginOption[]) {

	const plugins = [
		vue({
			script: {
				defineModel: true
			}
		}),
		vueJsx(),
		// VueDevtools(),
		...unplugin(viteEnv),
	];

	if(viteEnv.VITE_VISUALIZER === "Y") {
		plugins.push((visualizer as unknown) as PluginOption);
	}
	if(viteEnv.VITE_COMPRESS === "Y") {
		plugins.push(compress(viteEnv));
	}
	return plugins;
}
