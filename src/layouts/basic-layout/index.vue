<template>
	<admin-layout
		:mode="mode"
		:is-mobile="isMobile"
		:scroll-mode="theme.scrollMode"
		:scroll-el-id="app.scrollElId"
		:full-content="app.contentFull"
		:fixed-top="theme.fixedHeaderAndTab"
		:header-height="theme.header.height"
		:tab-visible="theme.tab.visible"
		:tab-height="theme.tab.height"
		:content-class="app.disableMainXScroll ? 'overflow-x-hidden': ''"
		:side-visible="sideVisable"
		:side-width="siderWidth"
		:sider-collapsed-width="siderCollapsedWidth"
		:footer-visible="theme.footer.visible"
		:fixed-footer="theme.footer.fixed"
		:right-footer="theme.footer.right"
		@click-mobile-sider-mask="app.setSiderCollapse(true)"
	>
		<template #header>
			<global-header v-bind="headerProps" />
		</template>
	</admin-layout>
</template>
