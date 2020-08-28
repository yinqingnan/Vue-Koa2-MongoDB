<template>
  <div>
    <quill-editor class="ql-editor" :options="newOption" v-model="record.iVal">
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import * as Quill from "quill";
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
// 字体设置
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);
import { addQuillTitle } from "./quill-title.js"; // 引入title
export default {
  name: "CourseRichText",
  props: ["text", "editorId", "record"],
  components: { quillEditor },
  data() {
    return {
      uniqueId: "",
      imgPercent: 0,
      imageLoading: false,
      newOption: {
        placeholder: this.$props.record.placeholder,
        history: {
          delay: 100,
          maxStack: 100,
          userOnly: false
        },
        modules: {
          toolbar: [
            [
              {
                size: ["12px", "14px", false, "18px", "22px", "26px"]
              }
            ],
            [{ font: fonts }], //字体
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], //文本方向
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["link", "image", "video"] // 超链接，图片，视频
          ]
        }
      }
    };
  },
  mounted() {
    addQuillTitle();
  },
  watch: {
    //监控富文本内的变化
    text: function(val) {
      this.editorContent = val;
    },
    handler(newV) {
      this.$emit("changeVal", newV.options.fValue);
    },
    deep: true
  }
};
</script>

<style lang="less">
@import "./style/font.css";
.ql-container {
  min-height: 300px;
  max-height: 300px;
  overflow-y: auto;
}
/* PC端手机端滚动条优化 */
.ql-container::-webkit-scrollbar {
  width: 4px !important;
  height: 1px !important;
}
.ql-container::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: #c5c5c5 !important;
  transition: 0.5s all;
}
.ql-container::-webkit-scrollbar-thumb:vertical:hover {
  background-color: #c5c5c5 !important;
  transition: 0.5s all;
}
.ql-container::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8 !important;
  // -webkit-border-radius: 0px;
}
.ql-container::-webkit-scrollbar-thumb:vertical {
  height: 1px;
  background-color: f8f8f8 !important;
  // -webkit-border-radius: 0px !important;
}
.ql-container::-webkit-scrollbar-thumb:horizontal {
  width: 4px;
  background-color: f8f8f8 !important;
  // -webkit-border-radius: 0px !important;
}
.ql-editor .ql-blank {
  min-height: 300px;
}
.ql-editor {
  min-height: 300px;
}
.ql-snow .ql-tooltip {
  left: 0 !important;
}
.ql-editor {
  padding: 0 !important;
  // max-height: 300px;
}
</style>
