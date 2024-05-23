<template>
	<div>

	</div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from "vue-router";
import {ItemType} from "ant-design-vue/es/menu/interface";
import {useThemeStore, useRouteStore} from "@/store";
import {translateMenuLabel} from "@/utils";

defineOptions({name: "HeaderMenu"});

const route = useRoute();
const routerStore = useRouteStore();
const theme = useThemeStore();
const {routerPush} = useRouterPush(routerStore);

const menus = computed(() => translateMenuLabel(routerStore.menus as App.GlobalMenuOption[]));
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);

function handleUpdateMenu(_key:string, item: MenuOption) {
	const menuItem = item as App.GlobalMenuOption;
	routerPush(menuItem.routePath);
}


</script>

<style scoped>
:deep(.ant-menu-item-content-header) {
	overflow: inherit !important;
}
</style>
