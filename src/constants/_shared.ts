/**
 * 将对象转换为具有value和label属性的选项数组。
 * @param obj 要转换的对象。该对象的每个属性都会被转换为一个选项。
 * @returns 返回一个数组，其中每个元素都代表一个选项，具有value和label属性。
 *          value和label的值分别来自输入对象的每个属性的键和值。
 */
export function transformObjectToOption<T extends object>(obj: T) {
  // 将输入对象转换为选项数组
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  })) as Common.OptionWithKey<keyof T>[];
}
