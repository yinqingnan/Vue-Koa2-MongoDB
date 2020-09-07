<template>
  <div>
    <!-- VUE页面展示 -->
    <div class="box">
      <h1>Vue相关</h1>
    </div>
    <ul class="contnet">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="list"
        @contextmenu.prevent="show(item, $event)"
        @click="Primary(item)"
      >
        <div :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }">
          111111
        </div>
      </li>
    </ul>
    <div v-show="menuVisible">
      <ul id="menu" class="menu" ref="menu">
        <li class="menu_item" @click="see">
          查看
        </li>
        <li class="menu_item" @click="edit">
          编辑
        </li>
        <li class="menu_item" @click="dlt">
          删除
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      menuVisible: false,
      clickdata: null,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$api.exportarticle({ type: this.$route.name }).then((res) => {
        this.list = [...res.data.Markdown, ...res.data.Richtext];
      });
    },

    show(item, element) {
      this.clickdata = item;
      this.menuVisible = true;
      var menu = document.querySelector('#menu');
      document.addEventListener('click', this.foo);
      menu.style.display = 'block';
      menu.style.left = element.clientX - 0 + 'px';
      menu.style.top = element.clientY - 80 + 'px';
    },
    foo() {
      this.menuVisible = false;
      document.removeEventListener('click', this.foo);
    },
    see() {
      this.menuVisible = false;
      this.$router.push({ path: '/pageshow' });
      console.log('查看');
    },
    edit() {
      this.menuVisible = false;
      console.log('编辑');
    },
    dlt() {
      this.menuVisible = false;
      console.log('删除');
      console.log(this.clickdata.id);
      this.$api.listoperation({ id: this.clickdata.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success('删除成功', 2);
          this.getdata();
        } else {
          this.$message.erroe('操作失败', 2);
        }
      });
    },
    Primary(item) {
      this.$router.push({ path: '/pageshow' });
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  h1 {
    font-size: 18px;
  }
}
.contnet {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
}
.list {
  width: 23%;
  min-width: 220px;
  height: 190px;
  margin-bottom: 20px;
  margin-right: 23px;
  transition: all 0.6;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding: 3px;
  -webkit-box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
  -moz-box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
  box-shadow: 7px -6px 11px 2px rgba(175, 175, 179, 1);
  > i {
    position: absolute;
    background-color: #f60;
    transition: all 0.1s;
  }
  > div {
    height: 100%;
    background-size: 100% 100%;
    opacity: 0.8;
  }
}
// 使用伪类元素添加边框
.list:before,
.list:after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 2px solid transparent;
  box-sizing: border-box;
  position: absolute;
}

.list:before {
  top: 0;
  left: 0;
  transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s,
    height 0.2s ease-in 0.4s;
}
.list:after {
  right: 0;
  bottom: 0;
  transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s,
    height 0.2s ease-in;
}

.list:hover:before {
  width: 100%;
  height: 100%;
  transition: width 0.2s ease-in, height 0.2s ease-in 0.2s;
  border-top-color: skyblue;
  border-right-color: skyblue;
}
.list:hover:after {
  width: 100%;
  height: 100%;
  transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.4s,
    height 0.3s ease-in 0.6s;
  border-bottom-color: skyblue;
  border-left-color: skyblue;
}
// 结束

.menu {
  position: fixed;
  height: 90px;
  width: 80px;
  border-radius: 10px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
}
.menu_item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
}
.menu_item:hover {
  background: #1890ff;
  color: #fff;
}
</style>
