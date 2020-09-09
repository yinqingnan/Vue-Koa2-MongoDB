<template>
  <div>
    <div class="lockbox">
      <div class="title">
        <div class="tx"></div>
        <h2><a>锁屏</a></h2>
        <p>
          <a-input placeholder="请输入锁屏密码" type="password" v-model="value">
            <a-icon slot="prefix" type="user" />
            <a-tooltip slot="suffix" title="忘记锁屏密码，返回到登录界面">
              <a-popconfirm
                title="忘记锁屏密码，返回到登录界面"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirm"
                @cancel="cancel"
              >
                <a-icon type="question-circle" style="color: rgba(0,0,0,.45)" />
              </a-popconfirm>
            </a-tooltip>
          </a-input>
        </p>
        <h3>
          <a-button type="primary" @click="login">解锁</a-button>
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      currentrouter: localStorage.getItem('currentrouter'),
      lockpsd: localStorage.getItem('lockpsd'),
      errorcount: 0,
    };
  },
  mounted() {},
  methods: {
    login() {
      if (this.value === this.lockpsd) {
        localStorage.setItem('lockpsd', '');
        this.$router.push({ path: this.currentrouter });
      } else if (this.value.length == 0) {
        this.$message.error('密码不能为空', 2);
      } else {
        this.errorcount++;
        this.$message.error(`密码错误${this.errorcount}次`, 2);
      }
    },

    confirm() {
      this.$message.success('返回到登陆界面');
      //返回到登陆界面   清空掉所有的本地储存
      localStorage.setItem('lockpsd', '');
      localStorage.setItem('navlist', '');
      localStorage.setItem('nav', '');
      localStorage.setItem('currentrouter', '');
      localStorage.setItem('navcode', '');
      localStorage.setItem('token', '');
      localStorage.setItem('openKeys', '');
      this.$router.push({ path: '/login' });
    },
    cancel() {
      this.$message.error('取消');
    },
  },
  watch: {
    errorcount(val) {
      if (val == 6) {
        this.$message.error('错误次数上限，返回登陆界面');
        localStorage.setItem('lockpsd', '');
        localStorage.setItem('navlist', '');
        localStorage.setItem('nav', '');
        localStorage.setItem('currentrouter', '');
        localStorage.setItem('navcode', '');
        localStorage.setItem('token', '');
        localStorage.setItem('openKeys', '');
        this.$router.push({ path: '/login' });
      }
    },
  },
};
</script>
<style lang="less" scope>
.lockbox {
  height: 100vh;
  width: 100%;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#ffd7de), to(#fff));
  position: relative;
  .title {
    width: 400px;
    height: 260px;
    background: #fff;
    border-radius: 20px;
    -webkit-box-shadow: 18px 24px 5px 0px rgba(201, 201, 201, 0.27);
    -moz-box-shadow: 18px 24px 5px 0px rgba(201, 201, 201, 0.27);
    box-shadow: 18px 24px 5px 0px rgba(201, 201, 201, 0.27);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -145px;
    margin-left: -200px;
    .tx {
      width: 100px;
      height: 100px;
      background-image: url('../../assets/img/qisi.jpg');
      background-size: 100% 100%;
      border-radius: 50%;
      position: absolute;
      top: -50px;
      left: 50%;
      margin-left: -50px;
    }
    h2 {
      font-size: 26px;
      text-align: center;
      margin-top: 76px;
    }
    p {
      //   width: 70%;
      margin-top: 18px;
      text-align: center;
      position: relative;
      span {
        span:nth-of-type(1) {
          font-size: 16px;
          position: absolute;
          left: 70px;
        }
        span:nth-of-type(2) {
          position: absolute;
          right: 70px;
        }
      }
      input {
        width: 70%;
        border-radius: 20px;
      }
    }
    h3 {
      text-align: center;
      margin-top: 26px;
      button {
        width: 200px;
        border-radius: 20px;
      }
    }
  }
}
</style>
