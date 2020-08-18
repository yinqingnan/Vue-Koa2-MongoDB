<template>
  <div class="Menu">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
<style lang="less" scope>
.Menu {
  .ant-layout-sider-children {
    height: 100vh;
  }
  > div {
    width: 230px !important;
    max-width: 230px !important;
  }
}
</style>
