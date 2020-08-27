<template>
  <div class="main">
    <div class="stars">
      <div
        class="star"
        v-for="(item, index) in starsCount"
        :key="index"
        ref="star"
      ></div>
    </div>
    <div class="box">
      <div class="Popup">
        <h1><a @click.prevent="aClick">登陆系统</a></h1>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="账户"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请输入账户!' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符' }
                  ]
                }
              ]"
              placeholder="用户名"
              allow-clear
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            label="密码"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码!' }]
                }
              ]"
              type="password"
              placeholder="密码"
              allow-clear
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              style="width:200px;margin-left:58%"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登陆
            </a-button>
          </a-form-item>
          <a-form-item class="bottom1">
            <div class="bottom">
              <h6>
                即可注册!
              </h6>
              <h6 class="login-form-forgot">
                忘记密码
              </h6>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      form: null,
      starsCount: 800, //数量
      distance: 600 //间距
    };
  },
  props: {},
  methods: {
    aClick() {
      return false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let psd = values.password;
          let user = values.userName;
          // console.log(psd, user);
          this.$api.login({ password: psd, userName: user }).then(res => {
            console.log(res);
            if (res.code === 200) {
              localStorage.setItem("token", res.token);
              this.$router.push({ path: "/home" });
              this.$message.info("登陆成功", 2);
            }
          });
        }
      });
    }
  },

  mounted() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
    let starArr = this.$refs.star;
    starArr.forEach(item => {
      var speed = 0.2 + Math.random() * 1;
      var distance = this.distance + Math.random() * 300;
      item.style.transformOrigin = `0 0 ${distance}px`;
      item.style.transform = `translate3d(0,0,-${distance}px) rotateY(${Math.random() *
        360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`;
    });
  }
};
</script>
<style lang="less" scope>
@skyblue :skybule;
* {
  user-select: none;
}
.box {
  width: 100%;
  // height: 100vh;
  background: @skyblue;
  overflow: hidden;
  position: relative;

  .Popup {
    h1 {
      font-size: 18px;
      text-align: center;
      a {
        cursor: default;
      }
      // color: @primary-color;
    }
    position: absolute;
    display: block;
    width: 410px;
    top: calc(~"50% - 200px");
    left: calc(~"50% - 200px");
    height: 400px;
    .ant-form-item {
      display: flex !important;
    }

    .ant-form-item-children {
      display: block;
      width: 100%;
    }
    label {
      color: #fff !important;
    }
  }
}
.bottom1 {
  .ant-form-item-control-wrapper {
    width: 100%;
  }
}
.bottom {
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  padding: 0 74px;
}

.main {
  width: 100%;
  // min-width: 1200px;
  background-color: #fff;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
  position: relative;
  .main-title {
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -28px;
      width: 28px;
      height: 4px;
      background: rgba(244, 54, 63, 1);
      border-radius: 2px;
    }
  }
  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
    bottom: -256px;
    .star {
      width: 2px;
      height: 2px;
      background: #f7f7b8;
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
    }
    @keyframes rotate {
      0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
      }
      100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
          rotateY(-360deg);
      }
    }
  }
  .ad-info {
    font-size: 15px;
    line-height: 24px;
    margin-top: 180px;
    // color: rgba($color: #fff, $alpha: 0.8);
    text-align: center;
  }

  .dot-num {
    // position: relative;
    // height: 200px;
    // width: 100%;
    .dot {
      position: absolute;
      top: 0;
      display: inline-block;
      .dot-title {
        font-size: 40px;
        line-height: 37px;
        font-weight: bold;
        color: #f23340;
      }
      .dot-describe {
        margin-top: 10px;
        line-height: 20px;
        // color: rgba($color: #fff, $alpha: 0.8);
        font-size: 14px;
      }
    }
  }
}
</style>
