<template>
  <div v-if="showTooltip">
    <a-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div
          class="flex-center h-full cursor-pointer dark:hover:bg-#333"
          :class="contentClassName"
        >
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </a-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import type { TooltipPlacement } from "ant-design-vue/es/tooltip";

defineOptions({ name: "HoverContainer" });

interface Props {
  tooltipContent?: string; // tooltip显示文本
  placement?: TooltipPlacement; // tooltip位置
  contentClass?: string; // class类
  inverted?: boolean; // 反转模式下
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: "",
  placement: "bottom",
  contentClass: "",
  inverted: false,
});
const showTooltip = computed(() => Boolean(props.tooltipContent));

const contentClassName = computed(
  () =>
    `${props.contentClass} ${props.inverted ? "hover:bg-primary" : "hover:bg-#f6f6f6"}`
);
</script>
