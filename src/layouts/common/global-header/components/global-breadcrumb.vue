<template>
	<a-breadcrumb class="px-12px">
		<template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <a-breadcrumb-item>
        <a-dropdown v-if="breadcrumb.hasChildren" :options="breadcrumb.options" @select="dropdownSelect">
					<span>
						<component :is="breadcrumb.icon" v-if="theme.header.crumb.showIcon" class="inline-block align-text-bottom text-16px"></component>
            {{ breadcrumb.label }}
          </span>
				</a-dropdown>
				<template v-else>
					<component
						:is="breadcrumb.icon"
						v-if="theme.header.crumb.showIcon" class="inline-block align-text-bottom mr-4px text-16px"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
					/>
					<span :class="{ 'text-#BBBBBB': theme.header.inverted }">
            {{ breadcrumb.label }}
					</span>
				</template>
			</a-breadcrumb-item>
		</template>
	</a-breadcrumb>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import {routePath} from "@/route";
import {useRouteStore, useThemeStore} from "@/store";
import {useRouterPush} from "@/composables";
import {getBreadcrumbByRouteKey} from "@/utils"
import {$t} from "@/locales"

const route = useRoute();
const routeStore = useRouteStore();
const themeStore = useThemeStore();
const {routerPush} = useRouterPush();

const breadcrumbs = computed(() => getBreadcrumbByRouteKey(route.name as string, routeStore.menus as APP.GlobalMenuOption[], routePath('root')).map(
	item => ({
		...item,
		label: item.i18nTitle ? $t(item.i18nTitle) : item.label,
		options: item.options?.map(oItem => ({
      ...oItem,
      label: oItem.i18nTitle ? $t(oItem.i18nTitle) : oItem.label,
    }))
	})
))

function dropdownSelect(key:string) {
	routerPush({name: key});
}

</script>

<style scoped>

</style>
