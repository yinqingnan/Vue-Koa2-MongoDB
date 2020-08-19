<template>
  <div class="Menu">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      style="width:250px;max-width:250px"
    >
      <div class="logo"><a-icon type="loading" />XX系统</div>
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['2']"
        mode="inline"
        theme="dark"
        @click="select"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link
              :to="{
                path: '/home' + item.path,
                params: { title: item.title }
              }"
            >
              <!-- 图标 -->
              <a-icon :type="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <subMenu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import subMenu from "@/components/Layout/SiderMenu/index";
export default {
  components: {
    subMenu
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: null
      // list: []
    };
  },
  methods: {
    select({ item, key, selectedKeys }) {
      // 选中项
      this.selectedKeys = [key];
    }
  },
  props: ["list"],
  component: {},
  mounted() {}
};
</script>
<style lang="less" scope>
.Menu {
  .ant-layout-sider-children {
    height: 100vh;
    // width: 250px !important;
    // max-width: 250px !important;
  }
}
.logo {
  color: #fff;
  text-align: center;
}
</style>
