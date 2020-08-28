<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <a-button type="primary"> <a-icon type="upload" /> 选择图片 </a-button>
    </a-upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      URL: process.env.VUE_APP_URL
    };
  },
  methods: {
    handleRemove(file) {
      // 点击删除文件后
      console.log(file);
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      //选择文件后
      console.log(file);
      if (file != "" && file != null) {
        this.fileList = [];
        this.fileList.push(file);
        return false;
      }
    },
    handleUpload() {
      var { fileList } = this;
      console.log(fileList);
      if (fileList.length != 0) {
        var formData = new FormData();
        fileList.forEach(file => {
          formData.append("file", file);
        });
        axios({
          url: "http://127.0.0.1:3000/uploadimg",
          method: "post",
          processData: false,
          enctype: "multipart/form-data",
          data: formData
        }).then(res => {
          console.log(res.data.path);
          var path = res.data.path;
          this.$emit("datachang", path, "url");
          this.fileList = [];
        });
      } else {
        var path = "";
        this.$emit("datachang", path, "url");
      }
    },
    preview(file) {
      console.log(file);
    }
  },
  mounted() {}
};
</script>
