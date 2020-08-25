<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0;overflow: hidden; ">
      <div
        :class="('header', { bg: theme == 'dark' })"
        style=" display: flex;  justify-content: space-between;padding: 0 20px;"
      >
        <h2 v-if="leftnav">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="btn"
          />
        </h2>
        <a-menu
          v-model="defaultSelectedKeys"
          mode="horizontal"
          @click="select"
          v-if="topnav"
          :theme="theme"
          style="width:70%;padding-top: 19px;"
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
        <div style="width:15%" :class="{ bg: theme == 'dark' }">
          <headerright></headerright>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
import subMenu from "@/components/Layout/SiderMenu/index";
import headerright from "../../components/Smallcomponent/headerright";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("systemconfig");
export default {
  components: { subMenu, headerright },
  data() {
    return {
      current: ["1"],
      collapsed: true,
      selectedKeys: null,
      defaultSelectedKeys: ["1"],
      defaultOpenKeys: ["3"]
    };
  },
  methods: {
    btn() {
      this.collapsed = !this.collapsed;
      setTimeout(() => {
        this.menusize();
      }, 200);
    },
    ...mapMutations({
      menusize: "menusize"
    }),
    // eslint-disable-next-line no-unused-vars
    select({ item, key, selectedKeys }) {
      // 选中项
      this.selectedKeys = [key];
    }
  },
  computed: {
    ...mapState({
      topnav: state => state.topnav,
      leftnav: state => state.leftnav,
      theme: state => state.theme
    })
  },
  mounted() {
    if (localStorage.getItem("navcode")) {
      this.defaultSelectedKeys = [localStorage.getItem("navcode")];
    } else {
      this.this.defaultSelectedKeys = ["1"];
    }
  },
  props: ["list"]
};
</script>
<style lang="less" scope>
.header {
  padding: 0 20px;
  display: flex;

  > div {
    width: 30%;
    h2 {
      color: #fff;
    }
  }
  ul {
    margin-top: 18px;
  }
}
.bg {
  // background: #001529 !important;
  div {
    h2 {
      color: #999;
    }
  }
}
</style>
