import useBoolean from "./use-boolean";

/**
 * 使用自定义的useBoolean钩子来创建和管理加载和空状态的布尔值。
 * @param initLoading 初始加载状态，默认为false。
 * @param initEmpty 初始空状态，默认为false。
 * @returns 返回一个对象，包含加载和空状态的布尔值，以及开始加载、结束加载、设置空状态的方法。
 */
export default function useLoadingEmpty(initLoading = false, initEmpty = false) {
  // 使用useBoolean钩子初始化和管理加载状态
  const {bool: loading, setTrue: startLoading, setFalse: endLoading} = useBoolean(initLoading);

  // 使用useBoolean钩子初始化和管理空状态
  const {bool: empty, setBool: setEmpty} = useBoolean(initEmpty);

  // 返回加载和空状态及其相关操作的方法
  return {
    loading,
    startLoading,
    endLoading,
    empty,
    setEmpty
  }
}
