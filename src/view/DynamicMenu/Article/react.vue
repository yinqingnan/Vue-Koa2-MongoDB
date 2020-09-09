<template>
  <div>
    <!-- React相关知识点 -->
    <div class="boxx">
      <a>React相关知识点</a>
      <ul class="contnet" v-if="list.length">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="list"
          @contextmenu.prevent="show(item, $event)"
          @click="Primary(item)"
        >
          <div
            :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
            class="contnet"
          >
            <!-- 列表内容展示 -->
            <h2 class="tag">
              {{ item.tag }}
            </h2>
            <!-- 蒙版层-->
            <div class="mengban"></div>
          </div>
          <div class="textregion">
            <h3 :title="item.title">{{ item.title }}</h3>
            <p :title="item.Descr">{{ item.Descr }}</p>
          </div>
        </li>
      </ul>
      <div v-else style="text-align: center;">
        <img src="../../../assets/gif/timg.gif" alt="" />
        <a style="font-size:30px">数据暂无收录</a>
      </div>
    </div>

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
      img: require('../../../assets/img/vue.jpg'),
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$api.exportarticle({ type: this.$route.name }).then((res) => {
        console.log([...res.data.Markdown, ...res.data.Richtext]);
        let arr = [...res.data.Markdown, ...res.data.Richtext];
        arr.map((item) => {
          if (item.imgUrl == '') {
            item.imgUrl = this.img;
          }
        });
        this.list = arr.reverse();
      });
    },

    show(item, element) {
      this.clickdata = item;
      this.menuVisible = true;
      var menu = document.querySelector('#menu');
      document.addEventListener('click', this.foo);
      menu.style.display = 'block';
      menu.style.left = element.clientX - 0 + 'px';
      menu.style.top = element.clientY - 10 + 'px';
    },
    foo() {
      this.menuVisible = false;
      document.removeEventListener('click', this.foo);
    },
    see() {
      this.menuVisible = false;
      console.log(this.clickdata.id);
      let id = this.clickdata.id;
      this.$router.push({ path: `/pageshow/${id}` });
      console.log('查看');
    },
    edit() {
      this.menuVisible = false;
      console.log(this.clickdata);
      if (this.clickdata.hasOwnProperty('content')) {
        console.log('这是markdown的编辑器编辑的数据');
        this.$router.push({
          name: 'Markdowneditor',
        });
      } else {
        console.log('这是富文本编辑器的数据');
        this.$router.push({
          name: 'RichTextEditor',
        });
      }
      localStorage.setItem('ArticleContent', JSON.stringify(this.clickdata));
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
      let id = item.id;
      this.$router.push({ path: `/pageshow/${id}` });
    },
  },
};
</script>
<style lang="less" scoped>
.boxx {
  a {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
    margin-bottom: 16px;
  }
}
.contnet {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  // padding: 0 20px;
}
.list {
  width: 23%;
  cursor: pointer;
  min-width: 310px;
  height: 260px;
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
    height: 190px;
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
  overflow: hidden;
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
.contnet {
  position: relative;
  .tag {
    position: absolute;
    top: 0px;
    width: 60px;
    right: 0;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    // background: linear-gradient(to right, #333, rgba(255, 255, 255, 0.8));
    background: #666;
    z-index: 10;
    border-radius: 5px;
  }
}
.mengban {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0.9;
}
.textregion {
  > h3 {
    font-size: 16px;
    text-indent: 16px;
    line-height: 26px;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > p {
    width: 100%;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    font-size: 12px;
    text-indent: 16px;
    line-height: 30px;
  }
}
</style>
