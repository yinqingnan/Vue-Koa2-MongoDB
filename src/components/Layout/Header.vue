<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0;overflow: hidden; ">
      <!-- <div class="header"> -->
      <div :class="('header', { bg: theme == 'dark' })">
        <h2 v-if="leftnav">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="btn"
          />
        </h2>
        <a-menu
          v-model="current"
          mode="horizontal"
          @click="select"
          v-if="topnav"
          :theme="theme"
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

        <div>
          <!-- <h2>头部操作部分</h2> -->
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
import subMenu from "@/components/Layout/SiderMenu/index";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("systemconfig");
export default {
  components: { subMenu },
  data() {
    return {
      current: ["1"],
      collapsed: true,
      selectedKeys: null
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
  props: ["list"]
};
</script>
<style lang="less" scope>
.header {
  padding: 0 20px;
  display: flex;
  // padding-top: 18px;
  justify-content: space-between;
  > div {
    width: 30%;
  }
  ul {
    margin-top: 18px;
  }
}
</style>
