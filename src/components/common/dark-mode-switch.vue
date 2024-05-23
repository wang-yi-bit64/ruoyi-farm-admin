<template>
  <div class="flex-center text-18px cursor-pointer" @click="handlerSwitch">
    <icon mdi-moon-waning-crescent v-if="darkMode" />
    <icon mdi-white-balance-sunny v-else />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

defineOptions({ name: "DarkModeSwitch" });

interface Props {
  dark?: boolean; //暗黑模式
  customizeTransition?: boolean; //自定义暗黑模式过渡动画
}

const props = withDefaults(defineProps<Props>(), { dark: false });

interface Emits {
  (e: "update:dark", darkMode: boolean): void;
}

const emit = defineEmits<Emits>();

const darkMode = computed({
  get() {
    return props.dark;
  },
  set(newValue: boolean) {
    emit("update:dark", newValue);
  },
});

async function handlerSwitch(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;

  if (!props.customizeTransition || !document.startViewTransition) {
    darkMode.value = !darkMode.value;
    return;
  }
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => {
    darkMode.value = !darkMode.value;
  });

  await transition.ready;

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`,
  ];

  document.documentElement.animate(
    {
      clipPath: darkMode.value ? [...clipPath].reverse() : clipPath,
    },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: darkMode.value
        ? "::view-transition-old(root)"
        : "::view-transition-new(root)",
    }
  );

  document.startViewTransition(() => {
    darkMode.value = !darkMode.value;
  });
}
</script>
<style>
::view-transition-old(root),
::view_transition-new(root) {
  animate: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root) {
  z-index: 1;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
</style>
