<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="btn"
      />
    </a-layout-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: true
    };
  },
  methods: {
    btn() {
      this.collapsed = !this.collapsed;
      console.log(111);
    }
  }
};
</script>
<style lang="less" scope></style>
