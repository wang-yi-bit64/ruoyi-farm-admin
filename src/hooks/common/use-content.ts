import {inject, provide} from "vue";
import type { InjectionKey } from "vue";


/**
 * 创建并管理一个上下文提供和注入的钩子。
 * @param contextName - 上下文的名称，默认为"context"。用于生成唯一的Symbol作为注入键。
 * @returns 返回一个对象，包含两个方法：useProvide和useInject。
 *          useProvide用于提供上下文数据，而useInject用于在需要的地方注入上下文数据。
 */
export default function useContext<T>(contextName = "context") {
	const injectKey: InjectionKey<T> = Symbol(contextName); // 生成一个唯一的Symbol作为注入键。

	/**
	 * 提供上下文数据的方法。
	 * @param context - 要提供的上下文数据。
	 * @returns 返回提供的上下文数据。
	 */
	function useProvide(context:T) {
		provide(injectKey, context); // 提供上下文数据，使其可以在组件树中其他地方被注入。

		return context;
	}

	/**
	 * 注入上下文数据的方法。
	 * @returns 返回注入的上下文数据。
	 */
	function useInject() {
		return inject(injectKey) as T; // 注入之前提供的上下文数据。
	}

	return {
		useProvide,
		useInject
	}
}
