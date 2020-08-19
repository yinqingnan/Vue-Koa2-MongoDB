<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <!-- 图标 -->
      <a-icon :type="props.menuInfo.meta.icon" />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <router-link
          :to="{
            path: item.path,
            params: { sTitle: item.meta.title, title: item.meta.title }
          }"
        >
          <!-- 图标 -->
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item"></sub-menu>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
