import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver"
import Components  from "unplugin-vue-components/vite";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import { getSrcPath } from '../utils';

import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default function unplugin(viteEnv: ImportMetaEnv, isFarm = false) {
	const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

	const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/svg-icon`;

	 /** 本地svg图标集合名称 */
	 const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

	return [
		Icons({
			compiler: 'vue3',
			customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
			scale: 1,
      defaultClass: 'inline-block'
		}),
		Components({
      dts: 'src/typings/components.d.ts',
      types: [
				{ from: 'vue-router', names: ['RouterLink', 'RouterView'] },
			],
      resolvers: [
        AntDesignVueResolver({
					importStyle: false, // css in js
				}),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ]
    }),
		isFarm ? null : createSvgIconsPlugin({
			iconDirs: [localIconPath],
			symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
			inject: 'body-last',
			customDomId: '__SVG_ICON_LOCAL__'
		})
	]
}
