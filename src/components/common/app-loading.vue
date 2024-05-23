<template>
  <div class="fixed-center flex-col">
    <system-logo class="text-128px text-primary" />
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in loadingClasses"
          :key="index"
          class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse"
          :class="item"
        ></div>
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">{{ $t(system.title) }}</h2>
  </div>
</template>

<script setup lang="ts">
import { sessionStg, getRgb0Color } from "@/utils";
import { $t } from "@/locales";
import themeSettings from "@/settings/theme.json";

const loadingClasses = [
  "left-0 top-0",
  "left-0 bottom-0 animate-delay-500",
  "right-0 top-0 animate-delay-1000",
  "right-0 bottom-0 animate-delay-1500",
];

/**
 * 向文档根元素添加主题颜色的CSS变量。
 * 该函数首先从sessionStg中获取“themeColor”，如果未设置，则使用themeSettings中的“themeColor”作为默认值。
 * 然后，将主题颜色转换为RGB格式，并将其设置为CSS变量--primary-color。
 */
function addThemeColorCssVars() {
  // 获取默认主题颜色或已设置的主题颜色
  const defaultColor = themeSettings.themeColor;
  const themeColor = sessionStg.get("themeColor") || defaultColor;

  // 将主题颜色转换为RGB格式
  const { r, g, b } = getRgb0Color(themeColor);

  // 创建并添加CSS变量
  const cssVars = `--primary-color: ${r}, ${g}, ${b};`;
  document.documentElement.style.cssText += cssVars;
}
addThemeColorCssVars();
</script>
