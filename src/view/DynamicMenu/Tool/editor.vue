<template>
  <div class="">
    <!-- <Editor v-model="article.content" /> -->
    <Form
      ref="CNnewTable"
      @tChange="CNUChange"
      :wrapperCol="wrapperCol"
      :labelCol="labelCol"
      :dList="dList"
      :wrapCol="wrapCol"
    />
  </div>
</template>
<script>
import moment from "moment";
import Form from "@/components/form/index";
export default {
  components: {
    Form
    // Editor
  },
  data() {
    return {
      wrapCol: {
        xs: 24,
        xl: 24
      },
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      },
      dList: [
        {
          type: "input",
          title: "标题",
          code: "title",
          placeholder: "请输入标题",
          rule: [{ required: true, message: "必填项不能为空！" }],
          iVal: "",
          display: true,
          disabled: false
        },
        {
          type: "imgupload",
          title: "图片上传",
          code: "IMG",
          placeholder: "",
          rule: [{}],
          iVal: "",
          display: true,
          disabled: false
        },
        {
          type: "riqi",
          title: "创建时间",
          code: "date",
          placeholder: "请选择时间",
          rule: [{}],
          iVal: moment("2015/01/01", "YYYY/MM/DD"),
          format: "YYYY-MM-DD HH:mm:ss",
          showTime: { defaultValue: moment("00:00:00", "HH:mm:ss") },
          display: true,
          disabled: false
        },
        {
          type: "input",
          title: "关键词tag",
          code: "tag",
          placeholder: "请输入关键词tag",
          rule: [{ required: true, message: "必填项不能为空！" }],
          iVal: "",
          display: true,
          disabled: false
        },

        {
          type: "text",
          long: "long",
          title: "内容简介",
          code: "Descr",
          placeholder: "请输入描述",
          rule: [{ required: true, message: "必填项不能为空！" }],
          iVal: "",
          disabled: false
        },
        {
          type: "editor",
          title: "内容",
          code: "content",
          placeholder: "",
          rule: [{}],
          iVal: "",
          display: true,
          disabled: false
        },

        {
          type: "btn",
          long: "long",
          display: true,
          disabled: false
        }
      ]
    };
  },
  mounted() {
    // console.log(this.content);
  },
  methods: {
    CNUChange(val, type) {
      console.log(val.type);
    }
  }
};
</script>
<style lang="less"></style>
