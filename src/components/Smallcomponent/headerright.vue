<template>
  <div>
    <div class="box">
      <div>
        <a-tooltip>
          <template slot="title">
            github
          </template>
          <a
            href="https://github.com/yinqingnan/Vue-Koa2-MongoDB"
            target="_blank"
            ><a-icon type="github"
          /></a>
        </a-tooltip>
      </div>
      <div @click="switchscreen">
        <a-tooltip>
          <template slot="title">
            {{ size ? "缩小" : "全屏" }}
          </template>
          <a-icon :type="size ? 'fullscreen-exit' : 'fullscreen'" />
        </a-tooltip>
      </div>
      <div @click="Lockscreen">
        <a-tooltip>
          <template slot="title">
            锁屏
          </template>
          <a-icon type="lock" />
        </a-tooltip>
      </div>
      <div>
        <a-tooltip>
          <template slot="title">
            信息
          </template>
          <a-badge :count="5" :overflow-count="10">
            <a-icon type="notification" />
          </a-badge>
        </a-tooltip>
      </div>
      <div class="user">
        <a-tooltip>
          <template slot="title">
            个人中心
          </template>
          <a-dropdown :trigger="['click']">
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-icon slot="icon" type="user" />
              <a-menu-item key="1">
                <a-icon type="redo" />忘记密码
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user" />个人中心
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <a-icon type="logout" />注销用户
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-tooltip>
      </div>
      <div class="language">
        <a-tooltip>
          <template slot="title">
            国际化
          </template>
          <a-dropdown :trigger="['click']">
            <i>
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                  class="css-c4d79v"
                ></path>
              </svg>
            </i>

            <a-menu slot="overlay" @click="languageClick">
              <!-- <a-icon slot="icon" type="user" /> -->
              <a-menu-item key="1">
                US English
              </a-menu-item>
              <a-menu-item key="2">
                CN 简体中文
              </a-menu-item>
              <a-menu-item key="3">
                TW 繁体中文
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-tooltip>
      </div>
    </div>
    <div class="lock">
      <a-modal v-model="visible" title="输入锁屏密码" on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click.enter="handleOk">
            锁屏
          </a-button>
        </template>
        <a-input
          type="password"
          placeholder="输入锁屏密码"
          v-model="value"
          focus
        />
      </a-modal>
    </div>
    <resetpassword ref="resetpsd" @modifypsd = 'modifypsd'/>
  </div>
</template>
<script>
import resetpassword from '../resetpassword/index'
export default {
  components:{resetpassword},
  data() {
    return {
      size: false,
      visible: false,
      value: "",
    };
  },
  methods: {
    handleMenuClick(e) {
      console.log();
      switch (e.key) {
        case '1':
           this.$refs.resetpsd.showModal();
          break;
        case '2':
          console.log(2);
          break;
        case '3':
          console.log(3);
          //返回到登陆界面   清空掉所有的本地储存
          localStorage.setItem("lockpsd", "");
          localStorage.setItem("navlist", "");
          localStorage.setItem("nav", "");
          localStorage.setItem("currentrouter", "");
          localStorage.setItem("navcode", "");
          localStorage.setItem("token", "");
          localStorage.setItem("openKeys", "");
          this.$router.push({ path: "/login" });
          break;
        default:
          break;
      }
    },
    languageClick(e) {
      console.log(e);
    },
    switchscreen() {
      this.size = !this.size;
      if (this.size) {
        var docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    modifypsd(val,type){
      //返回到登陆界面   清空掉所有的本地储存
          localStorage.setItem("lockpsd", "");
          localStorage.setItem("navlist", "");
          localStorage.setItem("nav", "");
          localStorage.setItem("currentrouter", "");
          localStorage.setItem("navcode", "");
          localStorage.setItem("token", "");
          localStorage.setItem("openKeys", "");
          this.$router.push({ path: "/login" });
    },
    Lockscreen() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      console.log(this.value);
      if (this.value != "") {
        if (this.value.length < 2) {
          this.$message.warning("锁屏密码最少3位", 2);
        } else {
          setTimeout(() => {
            localStorage.setItem("currentrouter", this.$route.fullPath); // 将当前路由保存到localStorage
            localStorage.setItem("lockpsd", this.value); //保存锁屏密码
            this.$router.push({ path: "/lockscreen" });
            this.visible = false;
            this.value = "";
          }, 1000);
        }
      } else {
        this.$message.warning("锁屏密码不能为空", 2);
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scope>
.box {
  display: flex;
  //   justify-content: space-between;
  > div {
    width: 58px;
    text-align: center;
    i {
      font-size: 20px;
    }
    .ant-badge-count {
      margin-top: -8px;
    }
  }
  .user {
    width: 50px;
    line-height: 56px;
  }
  .language {
    i {
      font-size: 26px;
      line-height: 68px;
    }
  }
}
</style>
