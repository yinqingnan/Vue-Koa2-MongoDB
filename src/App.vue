<template>
  <div id="app">
    <router-view></router-view>

    <!-- <button @click="changeTheme('#37a3ff')">aaaaaaaaaaaaaaaaaaaaaaa</button> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    // HelloWorld
  },
  methods: {
    // 全局设置背景颜色
    // changeTheme(primaryColor) {
    //   window.less.modifyVars({
    //     "@primary-color": primaryColor
    //   });
    // },
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
