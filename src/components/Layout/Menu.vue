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
        <!-- <img src="../../assets/img/hz.png" alt /> -->
        <a-tooltip placement="topLeft" title="XXXXX平台" arrow-point-at-center>
          <a-icon type="gitlab" class="iconfont1" />
        </a-tooltip>
        <a v-if="!collapsed">XXXXX平台</a>
      </div>
      <a-menu
        :defaultSelectedKeys="defaultSelectedKeys"
        :openKeys="openKeys"
        mode="inline"
        :theme="theme"
        @click="select"
        @openChange="onOpenChange"
        :inline-collapsed="collapsed"
        :style="{ width: collapsed ? '' : '256px' }"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link
              :to="{
                path: '/home' + item.path,
                params: { title: item.title },
              }"
            >
              <!-- 图标 -->
              <a-icon :type="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
          <subMenu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('systemconfig');
import subMenu from '@/components/Layout/SiderMenu/index';

export default {
  components: {
    subMenu,
  },
  data() {
    return {
      selectedKeys: null,
      defaultSelectedKeys: [localStorage.getItem('navcode')], //默认选中的标签
      openKeys: [localStorage.getItem('openKeys')], //默认展开的菜单组
      show: false,
    };
  },
  methods: {
    onOpenChange(openKeys) {
      if (openKeys.length !== 0) {
        this.openKeys = [openKeys[1]];
        // console.log(this.openKeys);
        localStorage.setItem('openKeys', this.openKeys);
      } else {
        this.openKeys = [''];
      }
    },
    // eslint-disable-next-line no-unused-vars
    select({ item, key, selectedKeys }) {
      // 选中项
      console.log(key);
      if (key == 1 || key == 7) {
        this.openKeys = [''];
      }
      if (key == 98 || key == 80) {
        localStorage.setItem('ArticleContent', '');
      }
      // eslint-disable-next-line no-unused-vars
      let obj = JSON.parse(localStorage.getItem('navlist')); //菜单列表数据
      localStorage.setItem('navcode', key);
      this.selectedKeys = [key];
    },
  },
  props: ['list'],
  computed: {
    ...mapState({
      collapsed: (state) => state.collapsed,
      theme: (state) => state.theme,
    }),
  },
  mounted() {},
};
</script>
<style lang="less">
// @import "../../styles/theme/variables.less";
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
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:vertical {
    height: 1px;
    background-color: f8f8f8 !important;
    // -webkit-border-radius: 0px !important;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb:horizontal {
    width: 4px;
    background-color: f8f8f8 !important;
    // -webkit-border-radius: 0px !important;
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
.iconfont1 {
  font-size: 30px;
  line-height: 30px;
  color: #ffffff;
  margin: 0 8px;
}
</style>
