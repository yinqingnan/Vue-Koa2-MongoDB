<template>
  <div>
    <!-- VUE页面展示 -->
    <div class="box">
      <h1>Vue相关</h1>
    </div>
    <ul class="contnet">
      <li v-for="(item, index) in list" :key="index" class="list" @contextmenu.prevent="show(item, $event)">
        <div :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }">
          111111
        </div>
      </li>
    </ul>
    <rclick />
  </div>
</template>

<script>
import rclick from '@/components/RClickMenu/index'
export default {
  components: {rclick},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$api.exportarticle({ type: this.$route.name }).then((res) => {
        this.list = [...res.data.Markdown, ...res.data.Richtext];
      });
    },
    show(item,e) {
      console.log(item,e)
    }
  },
};
</script>
<style lang="less" scoped>
.box {
  h1 {
    font-size: 18px;
  }
}
.contnet {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
}
.list {
  width: 23%;
  min-width: 220px;
  height: 220px;
  margin-bottom: 20px;
  margin-right: 23px;
  transition:all 0.6;
  border: 1px solid #b6b6ba;
  border-radius: 10px;
  overflow: hidden;

  > div {
    height: 100%;
    background-size: 100% 100%;
    opacity: 0.8;
  }
}
.list:hover {
  position: relative;
  bottom: 6px;
    -webkit-box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
  -moz-box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
  box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
}
</style>
