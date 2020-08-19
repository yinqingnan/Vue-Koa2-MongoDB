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
  -moz-user-select: none;

  -webkit-user-select: none; /*webkit浏览器*/

  -ms-user-select: none; /*IE10*/

  -khtml-user-select: none; /*早期浏览器*/

  user-select: none;
}
h1,h2,h3,h4,h5,h6,ul,li{
  margin: 0 !important; 
  padding: 0 !important;
}
</style>
