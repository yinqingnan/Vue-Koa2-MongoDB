<template>
  <div class="Menu">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">
        <a-icon type="loading" />XX系统
      </div>
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['2']"
        mode="inline"
        theme="dark"
        @click="select"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon :type="item.iconType" />
            <span>{{ item.menuName }}</span>
          </a-menu-item>
          <subMenu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import subMenu from "@/components/Layout/SiderMenu/index";
export default {
  components: {
    subMenu,
  },
  data() {
    return {
      collapsed: false,
      list: [
        {
          id: "1",
          menuName: "项目管理",
          iconType: "pie-chart",
          children: [
            {
              menuName: "项目进度",
              iconType: "pie-chart",
              id: "1-1",
              children: [
                {
                  menuName: "项目一",
                  id: "1-1-1",
                  iconType: "pie-chart",
                  children: [
                    {
                      menuName: "详细信息",
                      iconType: "pie-chart",
                      id: "1-1-1-1",
                    },
                  ],
                },
              ],
            },
            { id: "1-2", iconType: "pie-chart", menuName: "任务安排" },
          ],
        },
        {
          id: "2",
          iconType: "pie-chart",
          menuName: "数据统计",
          children: [
            {
              menuName: "项目进度",
              iconType: "pie-chart",
              id: "2-1",
              children: [
                {
                  menuName: "项目一",
                  id: "2-1-1",
                  iconType: "pie-chart",
                  children: [
                    {
                      menuName: "详细信息",
                      iconType: "pie-chart",
                      id: "2-1-1-1",
                    },
                  ],
                },
              ],
            },
            { id: "2-2", iconType: "pie-chart", menuName: "任务安排" },
          ],
        },
        {
          id: "3",
          iconType: "pie-chart",
          menuName: "人员管理",
          path:'/sdasdasd'
        },
      ],
    };
  },
  methods: {
    select({ item, key, selectedKeys }) {
      // 选中项
      console.log(item);
      console.log(key);
      console.log(selectedKeys);
      this.selectedKeys = [key];
    },
   
  },
  component: {},
};
</script>
<style lang="less" scope>
.Menu {
  .ant-layout-sider-children {
    height: 100vh;
  }
  > div {
    width: 230px !important;
    max-width: 230px !important;
  }
}
.logo {
  color: #fff;
  text-align: center;
}
</style>
