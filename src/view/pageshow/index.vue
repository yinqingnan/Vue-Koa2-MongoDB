<template>
  <div class="content">
    <div class="box">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.3"
        :particlesNumber="100"
        shapeType="polygon"
        :particleSize="4"
        linesColor="#FFFFFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="cash"
      >
      </vue-particles>
      <div class="textregion">
        <h2>{{ articledata.title }}</h2>
        <div v-html="text">{{ { text } }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articledata: [],
      text: '',
    };
  },
  methods: {
    getdata(id) {
      this.$api.pageshow({ id: id }).then((res) => {
        console.log(res.data[0]);
        this.articledata = res.data[0];
        if (res.data[0].Markdown != '') {
          this.text = res.data[0].Markdown;
        } else {
          this.text = res.data[0].content;
        }
        console.log(this.text);
      });
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    let id = this.$route.params.id; //拿到当前保存的文章id，通过id去获取到数据
    this.getdata(id);
  },

  // todo 背景参数设置
  // color: String类型。默认'#dedede'。粒子颜色。
  // particleOpacity: Number类型。默认0.7。粒子透明度。
  // particlesNumber: Number类型。默认80。粒子数量。
  // shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
  // particleSize: Number类型。默认80。单个粒子大小。
  // linesColor: String类型。默认'#dedede'。线条颜色。
  // linesWidth: Number类型。默认1。线条宽度。
  // lineLinked: 布尔类型。默认true。连接线是否可用。
  // lineOpacity: Number类型。默认0.4。线条透明度。
  // linesDistance: Number类型。默认150。线条距离。
  // moveSpeed: Number类型。默认3。粒子运动速度。
  // hoverEffect: 布尔类型。默认true。是否有hover特效。
  // hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
  // clickEffect: 布尔类型。默认true。是否有click特效。
  // clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
};
</script>
<style lang="less" scoped>
body,
html {
  height: 100%;
}
.content {
  height: 100vh;
}
.box {
  height: 100%;
  width: 100%;
  background-image: url('../../assets/img/timg.jpg');
  background-size: 100% 100%;
  position: relative;
}
#particles-js {
  height: 100%;
}
// .cash {
//   position: absolute;
//   z-index: 1;
//   width: 100%;
// }
.textregion {
  width: 80%;
  left: 11%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  // padding: 0 200px;
  position: absolute;
  z-index: 10;
  color: #fff;
  top: 0;
  overflow-y: auto;
}
.textregion::-webkit-scrollbar {
  display: none;
}
</style>
