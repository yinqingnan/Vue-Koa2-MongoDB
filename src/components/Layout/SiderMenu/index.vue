
<template functional>
  <a-sub-menu
    :key="props.menuInfo.id"
  >
    <span slot="title">
           <!-- 图标 -->
      <!-- <a-icon type="mail" /> -->
    <a-icon :type="props.menuInfo.iconType" />
      <span>{{ props.menuInfo.menuName }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.id"
      >
      <!-- 图标 -->
        <!-- <a-icon type="pie-chart" /> -->
        <a-icon :type="item.iconType" />
        <span>{{ item.menuName }}</span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.id"
        :menu-info="item"
      ></sub-menu>

    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo'],
};
</script>