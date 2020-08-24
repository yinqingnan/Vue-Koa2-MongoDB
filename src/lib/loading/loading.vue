<template>
  <div class="load" v-show="isShow">
    <div class="wrap">
      <img src="@/assets/gif/gz.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      isShow: true
    };
  },
  methods: {}
};
</script>

<style scoped>
.load {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1999;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.isLoad {
  width: 50px;
  height: 50px;
}
.txt {
  width: 260px;
  text-align: center;
  margin-top: 80px;
  color: #000;
}
</style>
