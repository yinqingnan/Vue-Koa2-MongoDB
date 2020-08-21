<template>
  <div>
    <BGT ref="child" />
    <div class="box">
      <div class="Popup">
        <h1><a @click.prevent="aClick('登陆')">登陆系统</a></h1>
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
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符' }
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
              <h6 @click="aClick('注册')">
                <a href="" @click.prevent="aClick('注册')">注册!</a>
              </h6>
              <h6 class="login-form-forgot" @click="aClick('忘记密码')">
                <a href="" @click.prevent="aClick('忘记密码')">忘记密码</a>
              </h6>
            </div>
          </a-form-item>
        </a-form>

        <!-- 重置密码框 -->
        <resetpassword ref="resetpsd"></resetpassword>
      </div>
    </div>
  </div>
</template>
<script>
import BGT from "@/components/3DBG/index";
import resetpassword from "../../components/resetpassword/index";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("nav");
export default {
  components: {
    BGT,
    resetpassword
  },
  data() {
    return {
      form: null,
      show: true
    };
  },
  methods: {
    aClick(type) {
      if (type == "登陆") {
        // console.log(1);
      } else if (type == "注册") {
        this.$router.push({ path: "/register" });
      } else if (type == "忘记密码") {
        this.$refs.resetpsd.showModal();
      }
      return false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let psd = values.password;
          let user = values.userName;
          this.$api.login({ password: psd, userName: user }).then(res => {
            // console.log(res);
            if (res.code === 200) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("nav", res.jurisdiction);
              this.addnav(res.jurisdiction);
              this.$router.push({ path: "/home/index" });
              this.$message.info("登陆成功", 2);
              this.show = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    ...mapMutations({
      addnav: "addnav"
    })
  },
  mounted() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  created() {
    this.show = true;
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
  height: 100vh;
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
  h6 {
    width: 30%;
    text-align: center;
    cursor: pointer;
  }
}
</style>
