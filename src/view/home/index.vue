<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <LeftMenu :list="list" v-if="leftnav"></LeftMenu>

      <a-layout>
        <Header :list="list"></Header>
        <Content></Content>
      </a-layout>
    </a-layout>
    <div class="setting" v-drag ref="setting" @click="setting">
      <a>否</a>
      <a-icon :type="judge ? 'close' : 'setting'" />
    </div>
    <setDrawer ref="setdrawer" @close="close"></setDrawer>
  </div>
</template>
<script>
import LeftMenu from "@/components/Layout/Menu";
import Header from "@/components/Layout/Header";
import Content from "@/components/Layout/Content";
import setDrawer from "@/components/Drawer/setDrawer";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("systemconfig");
export default {
  components: { LeftMenu, Header, Content, setDrawer },
  data() {
    return {
      list: [],
      judge: false
    };
  },
  methods: {
    getnavlist(obj) {
      this.$api.getnavlist(obj).then(res => {
        this.list = res.data;
      });
    },
    setting() {
      this.judge = true;
      if (this.judge) {
        this.$refs.setting.style.right = "305px";
        this.$refs.setdrawer.showDrawer();
      }
    },
    close() {
      // setTimeout(() => {
      this.$refs.setting.style.right = "0px";
      this.judge = false;
      // }, 200);
    }
  },
  mounted() {
    //权限信息
    let obj = {
      state: localStorage.getItem("nav")
    };
    this.getnavlist(obj);
  },
  computed: {
    ...mapState({
      leftnav: state => state.leftnav
    })
  },
  directives: {
    drag(el) {
      el.onmousedown = function(e) {
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function(e) {
          el.style.top = e.pageY - disy + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  }
};
</script>
<style lang="less" scope>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.layoutcontent {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
}
.setting {
  position: fixed;
  text-align: center;
  top: 50%;
  right: 0px;
  width: 40px;
  height: 40px;
  transition: all 0.45s;
  overflow: hidden;
  z-index: 999;
  border-radius: 5px;
  > i {
    font-size: 20px;
    color: #fff;
    line-height: 46px;
  }
  a {
    display: inline-block;
    font-size: 696px;
    position: absolute;
    top: -507px;
    left: -50px;
    z-index: -1;
  }
}
</style>
