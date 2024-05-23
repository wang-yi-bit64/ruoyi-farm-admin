<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<a-button type="primary" @click="count++">count is {{ count }}</a-button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>
	<div>
		<div class="grid grid-container">
			<div class="card border-amber border p-3">1</div>
			<div class="card border-amber border p-3">2</div>
			<div class="card border-amber border p-3">3</div>
			<div class="card border-amber border p-3">4</div>
			<div class="card border-amber border p-3">5</div>
			<div class="card border-amber border p-3">6</div>
			<div class="card border-amber border p-3">7</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
			<div class="card border-amber border p-3">8</div>
		</div>
	</div>



</template>

<style scoped>
.read-the-docs {
	color: #888;
}

.grid-container {
	display: grid;
	/* grid-template-columns: repeat(5, 1fr); */
	grid-template-columns: repeat(5, 1fr);
}
</style>
