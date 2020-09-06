<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {}
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
  /* PC端手机端滚动条优化 */
  .layoutcontent::-webkit-scrollbar {
    width: 4px !important;
    height: 1px !important;
     cursor: pointer;
  }
  .layoutcontent::-webkit-scrollbar-thumb:horizontal:hover {
    background-color: #000 !important;
    transition: 0.5s all;
  }
  .layoutcontent::-webkit-scrollbar-thumb:vertical:hover {
    // 鼠标经过滚动条背景颜色
    background-color: #f0f0f0 !important;
    transition: 0.5s all;
  }
  .layoutcontent::-webkit-scrollbar-track-piece {
    // 滚动条默认背景颜色
    background-color: #999 !important;
    border-radius: 10px;
  }
  .layoutcontent::-webkit-scrollbar-thumb:vertical {
    // 滚动条可拖动颜色
    height: 1px;

    background-color: #c4c4c7 !important;
  }
  .layoutcontent::-webkit-scrollbar-thumb:horizontal {
    width: 4px;
    background-color: #333 !important;
    // -webkit-border-radius: 0px !important;
  }
</style>
