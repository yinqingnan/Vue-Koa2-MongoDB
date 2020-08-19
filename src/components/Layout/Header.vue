<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0">
      <div class="header">
        <h2>
          <a-icon class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="btn" />
        </h2>

        <div>
          <h2>头部操作部分</h2>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("systemconfig");
export default {
  data() {
    return {
      collapsed: true,
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
      menusize: "menusize",
    }),
  },
};
</script>
<style lang="less" scope>
.header {
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  > div {
    width: 30%;
  }
}
</style>
