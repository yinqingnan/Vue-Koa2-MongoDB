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
      this.fileList = [];
      this.fileList.push(file);
      return false;
    },
    handleUpload() {
      var { fileList } = this;
      console.log(fileList);
      var formData = new FormData();
      console.log(formData);
      //   fileList.forEach(file => {
      //     formData.append("file", file);
      //   });
      for (let i = 0; i < fileList.length; i++) {
        // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
        formData.append("avatar", fileList[i].raw);
      }
      //   console.log(formData);
      //   this.uploading = true;
      axios({
        url: "http://127.0.0.1:3000/uploadimg",
        method: "post",
        processData: false,
        data: formData
      }).then(res => {
        console.log(res);
        if (res.data.data != null) {
          var path = res.data;
        }
        this.$emit("datachang", path, "url");
        // this.uploading = false;
      });
    },
    preview(file) {
      console.log(file);
    }
  },
  mounted() {}
};
</script>
