<template>
  <div>
    <context-menu
      class="right-menu"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      @update:show="(show) => (contextMenuVisible = show)"
    >
      <a href="javascript:;" @click="see">查看</a>
      <a href="javascript:;" @click="edit">编辑</a>
      <a href="javascript:;" @click="dlt">删除</a>
    </context-menu>
  </div>
</template>
<script>
// import { component as VueContextMenu } from '@xunlei/vue-context-menu';
export default {
  // components: {
  //   'vue-context-menu': VueContextMenu,
  // },
  data() {
    return {
      contextMenuTarget: document.body, //绑定的dom
      contextMenuVisible: false,
    };
  },
  methods: {
    show() {
      console.log(123);
    },
    see() {
      console.log(1);
    },
    edit() {
      console.log(2);
    },
    dlt() {
      console.log(3);
    },
  },
};
</script>
<style lang="less" scoped>
.right-menu {
  border: 1px solid #eee;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  display: block;
  font-family: Microsoft Yahei, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 999;
  display: none;
  a {
    padding: 2px 15px;

    // width: 120px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    color: #1a1a1a;
  }
  user agent stylesheet a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
  }
  a:hover {
    background: #42b983;
    // background: $color-primary;
    color: #fff;
  }
}
</style>
