<template>
  <div>
    <a-layout-content class="layoutcontent">
      <!-- 右侧页面主体 -->
      <router-view></router-view>
    </a-layout-content>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scope>
.layoutcontent {
  height: calc(~"100vh - 112px") !important;
  //   height: 100vh !important;
}
</style>
