<template>
  <div>
    <!-- // 使用vuex模块化示例 -->
    <h2>{{ num }}</h2>
    <button @click="aaa(100)">传参方法使用types</button>

    <h2>{{ number }} 实时监听的state的值</h2>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("car");
export default {
  data() {
    return {
      number: null
    };
  },
  computed: {
    ...mapState({
      num: state => state.number,
      ssss: state => state.number
    }),
    getnumber() {
      //实时监听的state的值
      return this.$store._modules.root.state.car.number;
    }
  },
  watch: {
    getnumber(val) {
      //实时监听的state的值
      this.number = val;
    }
  },
  methods: {
    ...mapMutations({
      aaa: "add"
    })
  },
  mounted() {}
};
</script>
