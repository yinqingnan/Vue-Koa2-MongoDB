<template>
  <div class="page404">
    <img src="../../assets/gif/js.gif" />
    <div class="txtBox">
      <h2>抱歉，你访问的页面不存在。</h2>
      <p>
        可能是因为您的链接地址有误，您可以尝试
        <span @click="goHome">返回</span> 首页。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "page404",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.page404 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.txtBox {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
}
.txtBox span {
  color: #0681d0;
  cursor: pointer;
}
</style>
