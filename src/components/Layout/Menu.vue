<template>
  <div class="Menu">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      :style="{ width: collapsed ? '' : 'auto' }"
      :class="{ bg: theme == 'light' }"
    >
      <!-- :style="{ width: collapsed ? '256px' : '' }" -->
      <div class="logo">
        <img src="../../assets/img/hz.png" alt />
        <a v-if="!collapsed">XXXXX平台</a>
      </div>
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['2']"
        mode="inline"
        :theme="theme"
        @click="select"
        :inline-collapsed="collapsed"
        :style="{ width: collapsed ? '' : '256px' }"
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
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("systemconfig");
import subMenu from "@/components/Layout/SiderMenu/index";

export default {
  components: {
    subMenu
  },
  data() {
    return {
      // collapsed: false,
      selectedKeys: null
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    select({ item, key, selectedKeys }) {
      // 选中项
      this.selectedKeys = [key];
    }
  },
  props: ["list"],
  computed: {
    ...mapState({
      collapsed: state => state.collapsed,
      theme: state => state.theme
    })
  },
  mounted() {}
};
</script>
<style lang="less" scope>
// @import "~ant-design-vue/lib/style/themes/default.less";
@import "../../styles/theme/variables.less";
.Menu {
  .ant-layout-sider-children {
    height: 100vh;
  }
  > div {
    max-width: 300px !important;
    // background: @theme;
  }
}
.logo {
  color: #fff;
  text-align: center;
  display: flex;
  > img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
    transition: height 0.2s;
  }
  > a {
    font-size: 20px;
    margin-left: 8px;
    white-space: nowrap;
  }
}
.bg {
  background: #fff !important;
}
</style>
