/**
 * 执行策略动作
 * @param actions 一个包含策略动作的数组，每个动作是一个元组，第一个元素是布尔值，表示是否执行动作，第二个元素是实际的动作函数。
 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
	// 遍历策略动作数组，寻找第一个需要执行的动作
	actions.some(item => {
    const [flag, action] = item;
    // 如果标志位为真，则执行动作
    if (flag) {
      action();
    }
    // 如果动作被执行（标志位为真），则终止遍历
    return flag;
  });
}
