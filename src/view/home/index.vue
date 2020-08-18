<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <LeftMenu></LeftMenu>
      <a-layout>
        <Header></Header>
        <Content></Content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import LeftMenu from "@/components/Layout/Menu";
import Header from "@/components/Layout/Header";
import Content from "@/components/Layout/Content";
export default {
  components: { LeftMenu, Header, Content },
  data() {
    return {};
  }
};
</script>
<style lang="less" scope>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.layoutcontent {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
}
</style>
