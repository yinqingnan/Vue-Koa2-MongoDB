<template>
  <div>
    <!-- 用于全局设置的抽屉 -->
    <a-drawer
      title="主题样式设置"
      placement="right"
      :closable="false"
      :visible="visible"
      width="300"
      keyboard
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <div class="drawer">
        <div>
          <h1>导航菜单风格设置</h1>
          <ul>
            <li
              v-for="(item, index) in stylelist"
              :key="index"
              @click="stylesetting(index)"
            >
              <img :src="item.path" alt="" />
              <a v-if="num == index">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="check"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="navlist">
          <h1>导航模式</h1>
          <ul>
            <li
              v-for="(item, index) in navlist"
              :key="index"
              @click="navbtn(index)"
            >
              <img :src="item.path" alt="" />
              <span v-if="navshow == index">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="check"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                  ></path>
                </svg>
              </span>
            </li>
          </ul>
        </div>
        <div class="colorlist">
          <h1>主题色配置</h1>
          <ul>
            <li
              v-for="(item, index) in colorarr"
              :key="index"
              :style="{ background: item.color }"
              @click="cloorlist(index, item.color)"
            >
              <span v-if="colorshow == index">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="check"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                  ></path>
                </svg>
              </span>
            </li>
          </ul>
        </div>

        <div class="header">
          <h1>固定Header</h1>
          <a-switch default-checked @change="onChangeheader" />
        </div>
        <div class="header">
          <h1>顶部菜单显示</h1>
          <a-switch default-checked @change="onChangeheadershow" />
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// createNamespacedHelpers
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("systemconfig");
export default {
  data() {
    return {
      visible: false,
      num: 0,
      colorshow: 0,
      navshow: 0,
      stylelist: [
        {
          path: require("../../assets/svgimg/Coolblack.png")
        },
        {
          path: require("../../assets/svgimg/heightlink.png")
        }
      ],
      navlist: [
        { path: require("../../assets/svgimg/left.png") },
        { path: require("../../assets/svgimg/top.png") }
      ],
      colorarr: [
        {
          color: "#188efb",
          name: "佛晓蓝(默认)"
        },
        {
          color: "#f5222d",
          name: "薄暮"
        },
        {
          color: "#fa541c",
          name: "火山"
        },
        {
          color: "#f6aa14",
          name: "日暮"
        },
        {
          color: "#13bfbf",
          name: "明青"
        },
        {
          color: "#51c11a",
          name: "极光绿"
        },
        {
          color: "#2e53e8",
          name: "极客蓝"
        },
        {
          color: "#6e2dca",
          name: "酱紫"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      changenav: "changenav",
      changenavcloor: "changenavcloor"
    }),
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.$emit("close", 111);
      this.visible = false;
    },
    onChangeheader(checked) {
      console.log(`a-switch to ${checked}`);
    },
    onChangeheadershow(checked) {
      this.$emit("close", "header", checked);
    },
    stylesetting(index) {
      this.$message.success("正在修改菜单主题风格", 2);
      setTimeout(() => {
        this.visible = false;
        this.$emit("close", 111);
        this.changenavcloor(index);
      }, 2000);

      this.num = index;
    },
    navbtn(index) {
      this.$message.success("正在切换导航位置", 2);
      setTimeout(() => {
        this.visible = false;
        this.$emit("close", 111);
        this.changenav(index);
      }, 2000);

      this.navshow = index;
    },
    cloorlist(index, color) {
      this.colorshow = index;
      const hide = this.$message.loading("正在设置主题色", 2);
      setTimeout(() => {
        hide;
        window.less.modifyVars({
          "@primary-color": color
        });
        this.visible = false;
        this.$emit("close", 111);
      }, 2000);
    }
  }
};
</script>
<style lang="less" socpe>
.drawer {
  div:nth-of-type(1) {
    margin-top: 0 !important;
    > h1 {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 22px;
    }
    > ul {
      display: flex;
      //   justify-content: space-between;
      > li {
        width: 35%;
        position: relative;
        a {
          position: absolute;
          top: 24px;
          left: 30px;
        }
      }
    }
  }
  div {
    margin-top: 60px;
    > h1 {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 22px;
    }
  }
}
.colorlist {
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 20px;
      height: 20px;
      //   background: red;
      position: relative;
      span {
        position: absolute;
        top: 1px;
        left: 2px;
      }
    }
  }
}
.navlist {
  ul {
    display: flex;
    > li {
      width: 35%;
      position: relative;
      span {
        position: absolute;
        top: 24px;
        left: 30px;
      }
    }
  }
}
li {
  list-style: none;
}
.header {
  display: flex;
}
</style>
