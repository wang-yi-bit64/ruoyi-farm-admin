import {computed, ref, onScopeDispose} from "vue";
import { useBoolean } from "../common";

/**
 * 提供一个倒计时功能的自定义hook。
 * @param seconds 倒计时的初始秒数，必须为正整数。
 * @returns 返回一个对象，包含倒计时的剩余时间、是否正在倒计时、开始、停止和是否完成倒计时的方法。
 * @throws 如果初始秒数非正整数，将抛出错误。
 */
export function useCountDown(seconds: number) {
  // 验证输入的秒数是否合法
  if(seconds <= 0 && seconds %1 ==0) {
		throw new Error("倒计时的时间必须是个正整数");
	}

  // 使用useBoolean创建一个初始为false的布尔状态，以及设置其为true和false的方法
	const {bool: isComplete, setTrue, setFalse} = useBoolean(false);

	// 使用ref创建一个可响应的计数器，初始值为0
	const counts = ref(0);
	// 计算属性，判断是否正在倒计时
	const isCounting = computed(() => Boolean(counts.value));

	let intervalid:any; // 用于存储定时器的id

	/**
	 * 开始倒计时。
	 * @param updateSecond 可选参数，用于设置倒计时的初始秒数，默认为传入hook的初始秒数。
	 */
	function start(updateSecond:number = seconds) {
		// 如果当前未在倒计时中，则开始倒计时
		if(!counts.value) {
			setFalse();
			counts.value = updateSecond;
			intervalid = setInterval(() => {
			  counts.value -= 1;
				// 当倒计时结束时，清除定时器，并设置倒计时完成状态为true
				if(counts.value <= 0) {
					clearInterval(intervalid);
					setTrue();
				}
			}, 1000);
		}
	}

	/**
	 * 停止当前的倒计时。
	 */
	function stop() {
		intervalid = clearInterval(intervalid); // 清除定时器
		counts.value = 0; // 重置计数器
	}
	// 在组件销毁时自动调用stop方法，释放资源
	onScopeDispose(stop);

	// 返回倒计时相关的属性和方法
	return {
		counts,
		isCounting,
		start,
		stop,
		isComplete
	}
}
