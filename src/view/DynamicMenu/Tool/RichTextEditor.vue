<template>
  <div class="">
    <Form
      ref="CNnewTable"
      @FormChang="FormChang"
      :wrapperCol="wrapperCol"
      :labelCol="labelCol"
      :dList="dList"
      :wrapCol="wrapCol"
    />
  </div>
</template>
<script>
import moment from 'moment';
import Form from '@/components/form/index';
export default {
  components: {
    Form,
  },
  data() {
    return {
      wrapCol: {
        xs: 24,
        xl: 24,
      },
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 16,
      },
      dList: [
        {
          type: 'input',
          title: '标题',
          code: 'title',
          placeholder: '请输入标题',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: '',
          display: true,
          disabled: false,
        },
        {
          type: 'imgupload',
          title: '标题背景图片',
          code: 'IMG',
          placeholder: '',
          rule: [{}],
          iVal: '',
          display: true,
          disabled: false,
        },
        {
          type: 'riqi',
          title: '创建时间',
          code: 'date',
          placeholder: '请选择时间',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: moment(),
          display: true,
          disabled: false,
        },
        {
          type: 'select',
          title: '关键词tag',
          code: 'tag',
          placeholder: '请输入关键词tag',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: '',
          data: [
            {
              name: 'vue',
            },
            {
              name: 'react',
            },
            {
              name: 'serve服务器相关',
            },
            {
              name: '小程序',
            },
            {
              name: '其他',
            },
          ],
          display: true,
          disabled: false,
        },
        {
          type: 'Textfield',
          long: 'long',
          title: '内容简介',
          code: 'Descr',
          placeholder: '请输入描述',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: '',
          display: true,
          disabled: false,
        },
        {
          type: 'editor',
          title: '内容',
          code: 'content',
          placeholder: '请输入文章内容',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: '',
          display: true,
          disabled: false,
        },
        {
          type: 'buttonbtn',
          long: 'long',
          display: true,
          disabled: false,
        },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem('ArticleContent') != '') {
      console.log(JSON.parse(localStorage.getItem('ArticleContent')));
    } else {
      return false;
    }
  },
  methods: {
    FormChang(val, type) {
      // console.log(val, type);
      this.dList.forEach((element) => {
        //重置富文本编辑器默认内容
        if (element.type == 'editor') {
          element.iVal = '';
        }
      });
      if (type == 'save') {
        // 保存到服务器数据
        val.date.format('YYYY-MM-DD'); //整理日期格式;
        this.$api.ArticleSave(val).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg, 2);
          }
        });
      }
    },
  },
};
</script>
<style lang="less"></style>
