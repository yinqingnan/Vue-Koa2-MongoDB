<template>
  <div>
    <!-- 使用markdown编辑器编辑 -->
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
import Form from '@/components/form/index'
import moment from 'moment'

export default {
  components: { Form },
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
          type: 'author',
          title: '作者',
          code: 'author',
          placeholder: '请输入作者',
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
          title: '内容简介',
          code: 'Descr',
          placeholder: '请输入描述',
          rule: [{ required: true, message: '必填项不能为空！' }],
          iVal: '',
          display: true,
          disabled: false,
        },
        {
          type: 'Markdown',
          title: '',
          code: 'Markdown',
          placeholder: '请输入文章内容',
          rule: [],
          iVal: '',
          display: true,
          disabled: false,
        },

        // {
        //   type: 'btn',
        //   long: 'long',
        //   display: true,
        //   disabled: false,
        // },
      ],
    }
  },
  methods: {
    FormChang(val, type) {
      console.log(val, type)
      this.dList.forEach((item) => {
        //   //重置富文本编辑器默认内容
        if (item.type == 'Markdown') {
          item.iVal = ''
        }
      })
      if (type == 'save') {
        // 保存到服务器数据
        val.date.format('YYYY-MM-DD') //整理日期格式;
        this.$api.ArticleMarkdownsave(val).then((res) => {
          console.log(res)
        })
      }
    },
  },
}
</script>
