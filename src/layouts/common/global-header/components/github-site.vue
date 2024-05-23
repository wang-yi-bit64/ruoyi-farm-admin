<template>
	<div>

	</div>
</template>

<script setup lang="ts">
import {useThemeStore} from "@/store";

defineOptions({
	name: "GithubSite"
});

const theme = useThemeStore();

function handleClickLink() {
	window.open('https://github.com/wang-yi-bit64/ruoyi-farm-admin', '_blank')
}

</script>
