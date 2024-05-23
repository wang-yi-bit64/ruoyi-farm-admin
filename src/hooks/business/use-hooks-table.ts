import {ref, reactive} from "vue";
import type { Ref } from "vue";
import type {PaginationProps} from "ant-design-vue/es/pagination"
import type {ColumnType, TableRowSelection, ColumnGroupType} from "ant-design-vue/es/table/interface"
import { useLoadingEmpty } from "../common";

/**
 * 接口请求函数
 */
type ApiFn<T =any, R=any> = (args: T) => Promise<Service.RequestResult<R>>;

/**
 * 接口请求函数的参数
 */
type GetApiFnParameters<T extends ApiFn, R = any> = T extends (args:infer P) => Promise<Service.RequestResult<R>> ? P : never;

/**
 * 接口请求函数的返回值
 */
type GetApiFnReturnType<T extends ApiFn, P = any> = T extends (args: P) => Promise<Service.RequestResult<infer R>> ? R : never;

/**
 * 表格接口请求后转换后的数据
 */
type Transformer<TableData, Response> = (response: Response) => {
	data: TableData[];
	pageNum: number;
	pageSize: number;
	total: number;
};


/**
 * 列表接口参数更新
 */
type ApiParamsUpdater<P, R> = (params: P) => R;

/**
 * 分页参数
 */
type PagePropsOfPagination = Pick<PaginationProps, 'current' | 'pageSize'>;

/**
 * 自定义列 key
 */
type CustomColumnKey<K = never> = K | 'action';

/**
 * 表格的列
 */
type HookTableColumn<T = Record<string, unknown>> = | (Omit<ColumnGroupType<T>, 'key'> & { key: CustomColumnKey<keyof T> })
| (Omit<ColumnType<T>, 'key'> & { key: CustomColumnKey<keyof T> })
| TableRowSelection<T>;

/**
 * 表格配置
 */
type HookTableConfig<TableData, Fn extends ApiFn> = {
	/**
   * 列表接口参数
   */
  apiParams: GetApiFnParameters<Fn>;
  /**
   * 列表接口返回数据转换
   */
  transformer: Transformer<TableData, GetApiFnReturnType<Fn>>;
  /**
   * 列表列
   */
  columns: () => HookTableColumn<TableData>[];
  /**
   * 列表接口参数更新
   * @description 用于更新分页参数, 如果列表接口的参数不包含同名分页参数属性 `page` 和 `pageSize`, 需要通过此函数更新
   * @default p => p
   */
  apiParamsUpdater?: ApiParamsUpdater<GetApiFnParameters<Fn> & Partial<PagePropsOfPagination>, GetApiFnParameters<Fn>>;
  /**
   * 列表分页参数
   */
  pagination?: PaginationProps;
  /**
   * 是否立即请求
   * @default true
   */
  immediate?: boolean;
}

/**
 * 通用表格 hook
 * @param apiFn 接口请求函数
 * @param config 表格配置
 */

interface HookTable<TableData, Fn extends ApiFn> {
	data: Ref<TableData[]>; // 表格数据
	columns: Ref<HookTableColumn<TableData>[]>;
	pagination: PaginationProps; // 分页参数
	loading: Ref<boolean>; // 加载状态
	empty: Ref<boolean>; // 是否为空
	updateData: (update: TableData[]) => void; // 更新表格数据
	updatePagination: (p: PagePropsOfPagination) => void; // 更新分页参数
	reloadColumns: () => void; // 重新加载列
	getData: () => void; // 获取数据
}




export default function useHookTable<TableData, Fn extends ApiFn>(apiFn: Fn, config: HookTableConfig<TableData, Fn>):HookTable<TableData, Fn> {
	const {loading ,startLoading, endLoading, empty, setEmpty} = useLoadingEmpty();

	const {apiParams, transformer, apiParamsUpdater = P => P, immediate = true} = config;

	const data:Ref<TableData[]> = ref([]);

	function updateData(update: TableData[]) {
		data.value = update;
	}

	const columns = ref(config.columns() as HookTableColumn<TableData>[]);

	const requestParams = ref(apiParams) as Ref<HookTableConfig<TableData, Fn>['apiParams']>;

	function updateRequestParamsByPagination(p: PagePropsOfPagination) {
    requestParams.value = apiParamsUpdater({ ...requestParams.value, ...p });
  };

	const pagination = reactive<PaginationProps>({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
		pageSizeOptions: [10, 20, 50, 100],
		onChange: (page: number, pageSize: number) => {
			pagination.current = page;
			pagination.pageSize = pageSize;
			updateRequestParamsByPagination({
				current: page,
				pageSize
			});
			getData();
		},
		...config.pagination
	}) as PaginationProps;

	function updatePagination(update: Partial<PaginationProps>) {
		Object.assign(pagination, update);

		updateRequestParamsByPagination({
			current: pagination.current,
			pageSize: pagination.pageSize
		});
	}

	async function getData() {
		startLoading();

		const {data: apiData, error} = await apiFn(requestParams.value);

		if(!error && data) {
			const {data: tableData, pageNum, pageSize, total} = transformer(apiData);

			updateData(tableData);

			setEmpty(tableData.length === 0);

			updatePagination({
				current:pageNum,
				pageSize,
				total
			})
		}

		endLoading();
	}

	function reloadColumns() {
    columns.value = config.columns();
  }

  if (immediate) {
    getData();
  }

	return {
		data,
		columns,
		loading,
		empty,
		pagination,
		getData,
		updatePagination,
		reloadColumns,
		updateData // Add this line to include the missing updateData property
	}
}
