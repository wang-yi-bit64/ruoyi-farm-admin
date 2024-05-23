<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <icon-local-no-permission v-if="type === '403'" />
      <icon-local-not-found v-if="type === '404'" />
      <icon-local-server-error v-if="type === '500'" />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <a-button type="primary">回到首页</a-button>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { routeName } from "@/router";
defineOptions({ name: "ExceptionBase" });

type ExceptionType = "403" | "404" | "500";

interface Props {
  type: ExceptionType; // 异常类型
}
defineProps<Props>();

const routeHomePath = routeName("home");
</script>
