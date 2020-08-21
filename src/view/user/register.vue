<template>
  <div>
    <BGT v-if="show" ref="child" />
    <div class="box">
      <div class="Popup">
        <h1><a @click.prevent="aClick('登陆')">注册用户</a></h1>
        <a-form
          autoComplete="off"
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 24 }">
            <a-input
              class="inpuheight"
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请输入用户名称!' },
                    {
                      min: 2,
                      max: 10,
                      message: '请输入至少2位!'
                    }
                  ]
                }
              ]"
              placeholder="用户名称"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 24 }">
            <a-input
              class="inpuheight"
              v-decorator="[
                'passwordOne',
                {
                  rules: [
                    { required: true, message: '请输入密码!' },
                    { min: 6, message: '请输入至少6位密码,区分大小写!' },
                    { validator: validatePass }
                  ]
                }
              ]"
              type="password"
              placeholder="至少6位密码，区分大小写"
              name="passwordOne"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 24 }">
            <a-input
              class="inpuheight"
              v-decorator="[
                'passwordTwo',
                {
                  rules: [
                    { required: true, message: '请再次确认密码!' },
                    {
                      min: 6,
                      max: 20,
                      message: '请输入至少6位-最多20位,区分大小写!'
                    },
                    { validator: validatePass2 }
                  ]
                }
              ]"
              name="passwordTwo"
              type="password"
              placeholder="确认密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 24 }"
            class="layout"
          >
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      message: '11位手机号码'
                    },
                    { validator: phoneCheck }
                  ]
                }
              ]"
              placeholder="11位手机号码"
              style="width: 100%"
            >
              <a-select
                slot="addonBefore"
                v-decorator="['prefix', { initialValue: '86' }]"
                style="width: 70px"
                @change="handleChange"
              >
                <a-select-option value="86">
                  +86
                </a-select-option>
                <a-select-option value="87">
                  +87
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item class="vcode">
            <a-input
              v-decorator="[
                'Vcode',
                {
                  rules: [
                    {
                      required: true,
                      message: '必填项不能为空'
                    }
                  ]
                }
              ]"
              placeholder="输入验证码"
            ></a-input>
            <a-button @click="getV" :disabled="Disabled">{{
              btntext
            }}</a-button>
          </a-form-item>

          <a-form-item class="bottom1">
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              注册
            </a-button>
            <h6>
              <a href="" @click.prevent="aClick('使用已有账户登录')"
                >使用已有账户登录</a
              >
            </h6>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import BGT from "../../components/3DBG/index";
export default {
  components: { BGT },
  data() {
    return {
      form: null,
      show: true,
      text: "获取验证码",
      num: 0,
      Disabled: true,
      interval: null
    };
  },
  computed: {
    btntext() {
      return this.num !== 0 ? `${this.num}秒后再次获取` : "获取验证码";
    }
  },
  methods: {
    aClick(type) {
      if (type == "使用已有账户登录") {
        this.$router.push({ path: "/login" });
      }
      return false;
    },
    // 表单提交
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.getregister(values).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.msg + "5秒后返回登陆页面");
              this.form.resetFields();
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 5000);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    resetFields() {
      this.form.resetFields();
    },
    handleChange() {
      //   console.log(val);
    },
    validatePass(rule, value, callback) {
      //保存第一次输入的密码
      this.password = value;
      callback();
    },
    validatePass2(rule, value, callback) {
      //效验两次密码是否相同
      if (this.password && this.password !== value) {
        callback("两次输入的密码不一致");
      } else {
        callback();
      }
    },
    phoneCheck(rule, value, callback) {
      //验证手机号码
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(value)) {
        callback("请输入正确的11位手机号码");
      } else {
        this.Disabled = false;
        callback();
      }
    },

    getV() {
      // 获取完成的手机号码
      let iphone =
        "+" +
        this.form.getFieldValue("prefix") +
        this.form.getFieldValue("phone");
      this.Disabled = true;
      this.num = 5;
      this.getCode(iphone); //60秒过倒计时过后才能调用的事件
      this.interval = setInterval(() => {
        this.num--;
        if (this.num === 0) {
          clearInterval(this.interval);
          this.Disabled = false;
        }
      }, 1000);
    },
    getCode(iphone) {
      this.$message.success("短信发送成功");
      //请求服务器的随机数据
      this.$api.getverification({ iphone: iphone }).then(res => {
        console.log(res);
        this.$notification.open({
          message: "短信服务",
          //   desciption: `[你的爸爸]您正在获取验证，验证码${res},请在10分钟内按页面提示提交验证码，切勿将验证码泄漏于他人`
          description: `[你的爸爸]您正在获取验证，验证码   ${res}   ,请在10分钟内按页面提示提交验证码，切勿将验证码泄漏于他人`,
          icon: <a-icon type="smile" style="color: #108ee9" />,
          duration: 10
        });
      });
    }
  },
  mounted() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
    this.$refs.child.inif();
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
}
.inpuheight {
  height: 40px;
}
.layout {
  //   background: red;
  .ant-form-item-children {
    display: flex !important;
    > span:nth-of-type(1) {
      width: 20%;
      border-radius: 0;
    }
    input {
      height: 40px;
      line-height: 40px;
    }
    div div {
      height: 40px;
      line-height: 40px;
    }
  }
}
.vcode {
  .ant-form-item-control-wrapper {
    width: 100%;
  }
  .ant-form-item-children {
    display: flex !important;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    input {
      width: 68%;
      height: 40px;
      line-height: 40px;
    }
    button {
      height: 40px;
      line-height: 40px;
    }
  }
}
.bottom1 {
  .ant-form-item-control-wrapper {
    width: 100%;
  }
  .ant-form-item-children {
    display: flex !important;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    button {
      width: 50%;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
