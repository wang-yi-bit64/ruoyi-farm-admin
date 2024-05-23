<template>
	<a-popover placement="bottomRight" trigger="click">
		<template #trigger>
			<a-input v-model:value="modelValue" read-only placeholder="请选择图标">
				<template #suffix>
					<svg-icon :icon="selectedIcon" class="text-30px p-5px"/>
				</template>
			</a-input>
		</template>
		<template #header>
			<a-input v-model:value="searchValue" placeholder="搜索图标"></a-input>
		</template>
		<div v-if="iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
			<span v-for="iconItem in iconsList" :key="iconItem" @click="handleChange(iconItem)" class="flex justify-center items-center w-60px h-60px cursor-pointer">
					<svg-icon :icon="iconItem" class="border-1px border-#d9d9d9 text-30px m-2px p-5x cursor-pointer" :class="{
						'border-primary': modelValue === iconItem
					}"/>
			</span>
		</div>
		<a-empty v-else class="w-306px" description="你什么也找不到" />
	</a-popover>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

defineOptions({name: "IconSelect"});

interface Props {
	/** 选中的图标 */
	value: string;
	/** 图标列表 */
	icons: string[];
	/** 为选中的图标 */
	emptyIcon?: string;
};
const props = withDefaults(defineProps<Props>(), {
  emptyIcon: 'mdi:apps'
});

interface Emits {
	(e: 'update:value', val:string): void;
}

const emit = defineEmits<Emits>();

const modelValue = computed({
	get() {
		return props.value
	},
	set(val: string) {
		emit('update:value', val)
	}
})

const selectedIcon = computed(() => modelValue.value || props.emptyIcon);

const searchValue = ref("");

const iconsList = computed(() => props.icons.filter(v => v.includes(searchValue.value)));

function handleChange(iconItem:string) {
	modelValue.value = iconItem
}
</script>

