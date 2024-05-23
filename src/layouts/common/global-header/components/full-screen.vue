<template>
	<hover-container class="w-40px h-full" tooltip-content="全屏" :inverted="theme.header.inverted" @click="toggleFullScreen">
		<icon-gridicons-fullscreen-exit v-if="isFullscreen" class="text-18px" />
		<icon-gridicons-fullscreen v-else class="text-18px" />
	</hover-container>
</template>

<script setup lang="ts">
import {useFullscreen} from '@vueuse/core'
import {useThemeStore} from '~/src/store/modules/theme'

const {isFullscreen, toggle: toggleFullScreen} = useFullscreen()
const theme = useThemeStore()
</script>
