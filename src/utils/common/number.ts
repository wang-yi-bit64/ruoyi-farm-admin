/**
 * 根据数字获取对应的汉子
 * @param number - 数字(0-10)
 */
export function getHanByNnumber(num:number) {
	const HAN_STR = "零一二三四五六七八九";
	return HAN_STR.charAt(num);
}

/**
 * 将总秒数转化成 分秒
 * @param seconds - 秒
 */

export function transformToTimeCountDown(seconds: number) {
	const SECONDS_A_MINUTE = 60;

	function fillZero(num: number) {
		return num.toString().padStart(2, "0");
	}

	const minuteNum = Math.floor(seconds / SECONDS_A_MINUTE);

	const minute = fillZero(minuteNum);
	const second = fillZero(seconds % SECONDS_A_MINUTE);

	return `${minute}:${second}`;
}

/**
 * 获取指定证书范围内的随机整数
 * @param start - 开始值
 * @param end - 结束值
 */
export function getRandomInteger(start: number, end: number) {
	const range = end - start;

	const random = Math.floor(Math.random() * range + start);

	return random;
}
