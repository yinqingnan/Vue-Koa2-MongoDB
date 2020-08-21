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
        :defaultSelectedKeys="defaultSelectedKeys"
        :defaultOpenKeys="defaultOpenKeys"
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
      // defaultSelectedKeys: [localStorage.getItem("navcode")],
      defaultSelectedKeys: ["1"],
      selectedKeys: null,
      // defaultOpenKeys: [localStorage.getItem("childnavcode")]
      defaultOpenKeys: ["3"]
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    select({ item, key, selectedKeys }) {
      // 选中项
      let childnavcode = item.subMenuKey.split("-")[0]; // 默认打开的子菜单列表
      localStorage.setItem("childnavcode", childnavcode);
      localStorage.setItem("navcode", key);
      this.selectedKeys = [key];
      // console.log(localStorage.getItem("navcode"));
    }
  },
  props: ["list"],
  computed: {
    ...mapState({
      collapsed: state => state.collapsed,
      theme: state => state.theme
    })
  },
  mounted() {
    console.log(localStorage.getItem("navcode"));
    if (localStorage.getItem("navcode") != "") {
      this.defaultSelectedKeys = [localStorage.getItem("navcode")];
      // this.defaultOpenKeys = [localStorage.getItem("childnavcode")];
    } else {
      this.defaultSelectedKeys = ["1"];
      // this.defaultOpenKeys = [];
    }
  }
};
</script>
<style lang="less" scope>
@import "../../styles/theme/variables.less";
.Menu {
  .ant-layout-sider-children {
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 50px;
  }
  /* PC端手机端滚动条优化 */
  .ant-layout-sider-children::-webkit-scrollbar {
    width: 4px !important;
    height: 1px !important;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:horizontal:hover {
    background-color: #c5c5c5 !important;
    transition: 0.5s all;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:vertical:hover {
    background-color: #c5c5c5 !important;
    transition: 0.5s all;
  }
  .ant-layout-sider-children::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8 !important;
    -webkit-border-radius: 0px;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:vertical {
    height: 1px;
    background-color: f8f8f8 !important;
    -webkit-border-radius: 0px !important;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:horizontal {
    width: 4px;
    background-color: f8f8f8 !important;
    -webkit-border-radius: 0px !important;
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
