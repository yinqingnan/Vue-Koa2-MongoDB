<template>
  <div>
    <a-modal v-model="visible" title="密码重置" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          退下
        </a-button>
        <a-button
          key="submit"
          type="primary"
          htmlType="submit"
          :loading="loading"
          @click="handleOk"
        >
          确认
        </a-button>
      </template>
      <a-form layout="inline" class="from" :form="form">
        <a-form-item label="用户名">
          <a-input
            placeholder="输入用户名"
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: '请输入用户名称!' },
                  {
                    min: 2,
                    max: 10,
                    message: '请输入完整用户名!'
                  }
                ]
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="注册手机号码"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="请输入注册的手机号码"
            v-decorator="[
              'iphone',
              {
                rules: [
                  { required: true, message: ' ' },
                  { validator: phoneCheck }
                ]
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item
          class="vcode1"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          label="获取验证码"
        >
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
          <a-button @click="getV" :disabled="Disabled">{{ btntext }}</a-button>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          label="设置新密码"
        >
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
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          label="确认密码"
        >
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
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- <a-form-item>
          <a-button type="primary" htmlType="submit"> </a-button>
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      num: 0,
      Disabled: true,
      interval: null,
      form: null
    };
  },
  computed: {
    btntext() {
      return this.num !== 0 ? `${this.num}秒后再次获取` : "获取验证码";
    }
  },
  methods: {
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
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      //   this.loading = true;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          setTimeout(() => {
            this.visible = false;
            this.loading = false;
            this.$api.resetpsd(values).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.form.resetFields();
              } else {
                this.$message.error(res.msg);
              }
            });
          }, 3000);
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.resetFields();
    },
    resetFields() {
      this.form.resetFields();
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
        // console.log(res);
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
  }
};
</script>
<style lang="less" scope>
.vcode1 {
  .ant-form-item-children {
    display: flex !important;
    input {
      width: 160px;
      //   margin-left: 166px;
      margin-right: 40px;
    }
  }
}
.from {
  > div {
    margin-bottom: 8px !important;
    width: 100% !important;
    > .ant-form-item-label {
      width: 166px;
    }
    > .ant-form-item-control-wrapper {
      width: 200px;
    }
  }
}
</style>
