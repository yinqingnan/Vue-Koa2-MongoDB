<template>
  <div class="model" :style="{ height: FrameHeght }">
    <!-- :style="{ height: FrameHeght }" -->
    <!-- {{ dList }} -->
    <a-form :form="form" @submit="handleSubmit">
      <a-row :gutter="48">
        <a-col
          :xs="wrapCol.xs"
          :xl="wrapCol.xl"
          v-for="(item, index) in dList"
          v-if="item.long == undefined"
          :key="index"
          v-show="item.display"
        >
          <!-- 文本 -->
          <a-form-item
            autocomplete="off"
            :disabled="item.disabled"
            :label="item.title"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            v-if="item.type == 'input'"
          >
            <a-input
              :disabled="item.disabled"
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule
                }
              ]"
              :placeholder="item.placeholder"
            />
          </a-form-item>
          <!-- 数字 -->
          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'number'"
          >
            <a-input
              v-decorator="[
                item.code,
                {
                  initialValue: 0,
                  rules: item.rule
                }
              ]"
              :placeholder="item.placeholder"
            />
          </a-form-item>
          <!-- 时间选择 -->
          <a-form-item
            class="timeP0"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            :label="item.title"
            v-if="item.type == 'time'"
          >
            <a-range-picker
              v-decorator="[item.code]"
              class="timeP0"
              showTime
              :format="item.format"
            />
          </a-form-item>
          <!-- 年月选择 -->
          <a-form-item
            class="timeP0"
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'year'"
          >
            <a-range-picker
              v-decorator="[item.code]"
              class="timeP0"
              :format="item.format"
            />
          </a-form-item>
          <!-- 日期选择 -->
          <a-form-item
            :label="item.title"
            v-if="item.type == 'riqi'"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal
                }
              ]"
              class="timeP0"
              :format="item.format"
              :show-time="item.showTime"
              :placeholder="item.placeholder"
            >
            </a-date-picker>
          </a-form-item>
          <!-- 下拉 -->
          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'select'"
          >
            <a-select
              :disabled="item.disabled"
              v-decorator="[
                item.code,
                {
                  rules: item.rule,
                  initialValue: item.iVal
                }
              ]"
              :placeholder="item.placeholder"
            >
              <a-select-option
                v-for="(it, index) in item.data"
                :value="it.name"
                :key="index"
              >
                {{ it.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'sCkList'"
          >
            <a-select
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule
                }
              ]"
              mode="multiple"
              placeholder="请选择"
              style="width:165px;"
            >
              <a-select-option v-for="it in item.data" :key="it.id">
                {{ it.txt }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'Tselect'"
          >
            <a-tree-select
              style="width:165px;"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="item.data"
              placeholder="请选择"
              treeDefaultExpandAll
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule
                }
              ]"
            >
              <span
                style="color: #08c"
                slot="title"
                slot-scope="{ key, value }"
              >
                {{ value }}
              </span>
            </a-tree-select>
          </a-form-item>

          <!-- 级联 -->
          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'cascader'"
          >
            <a-cascader
              v-decorator="[
                item.code,
                {
                  rules: item.rule
                }
              ]"
              placeholder="请选择"
              :options="item.data"
            />
          </a-form-item>

          <!-- 开关 -->
          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'switch'"
          >
            <a-switch
              @change="swChangw(item)"
              defaultChecked
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule
                }
              ]"
            />
          </a-form-item>
          <!-- 图形上传 -->
          <a-form-item
            :label="item.title"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'imgupload'"
          >
            <imgupload ref="isUpImg" @datachang="datachang"></imgupload>
          </a-form-item>
          <!-- 树形下拉 -->
          <a-form-item
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'Tselect'"
          >
            <a-tree-select
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="item.data"
              placeholder="Please select"
              treeDefaultExpandAll
              v-decorator="[
                item.code,
                {
                  defaultValue: item.iVal,
                  rules: item.rule
                }
              ]"
            >
              <span
                style="color: #08c"
                slot="title"
                slot-scope="{ key, value }"
              >
                {{ value }}
              </span>
            </a-tree-select>
          </a-form-item>

          <!-- //富文本 -->
          <a-form-item
            v-if="item.type == 'editor'"
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
          >
            <editor
              ref="editor"
              :record="item"
              :placeholder="item.placeholder"
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal
                }
              ]"
            ></editor>
          </a-form-item>
          <!-- 按钮 -->
          <a-form-item class="btnBox" v-if="item.type == 'btn'">
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-form-item>
        </a-col>
        <!-- 文本域 -->
        <a-col v-else>
          <a-form-item
            class="tex_textarea"
            :class="item.cName"
            :label="item.title"
            :label-col="labelCol"
            :wrapperCol="wrapperCol"
            v-if="item.type == 'text'"
            style="margin-left:-10px;margin-right:0"
          >
            <a-textarea
              style="display: flex;"
              v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule
                }
              ]"
              :placeholder="item.placeholder"
              :autoSize="{ minRows: 3, maxRows: 3 }"
            />
          </a-form-item>
          <!-- 按钮 -->
          <a-form-item
            class="longBox"
            v-if="item.type == 'btn'"
            style="margin-top: 460px;"
          >
            <a-button @click="handleReset" style="margin-right:10px"
              >取消</a-button
            >
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import imgupload from "../imgUpload/imgUpload";
import editor from "../RichText/index";
export default {
  name: "dataSource",
  components: {
    imgupload,
    editor
  },
  created() {},
  props: [
    "dList",
    "wrapperCol",
    "wrapCol",
    "modelName",
    "labelCol",
    "wrapCol1",
    "AList"
  ],
  data() {
    return {
      form: this.$form.createForm(this),
      isList: false,
      mWidth: "600px",
      imgurl: "",
      FrameHeght: "762px",
      height: null
    };
  },
  methods: {
    handleReset() {
      this.isList = false;
      this.reset();
    },
    isshow() {
      this.isList = true;
    },
    isBack() {
      this.isList = false;
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // console.log(this.imgurl);
          this.$refs.isUpImg[0].handleUpload();
          //   setTimeout(() => {
          //     values.imgUrl = this.imgurl;
          //     this.$emit("tChange", values, "save");
          //   }, 500);
        }
      });
    },

    getCurrentStyle(current, today) {
      const style = {};
      if (current.date() === 1) {
        style.border = "1px solid #1890ff";
        style.borderRadius = "50%";
      }
      return style;
    },
    reset() {
      this.form.resetFields();
    },
    changeVal(val, type) {
      console.log(val, type);
    },
    datachang(val, type) {
      this.imgurl = val;
    }
  },
  mounted() {
    const that = this;
    that.height = document.body.clientHeight;
    that.FrameHeght = that.height - 175 + "px";
    window.onresize = () => {
      return (() => {
        that.height = document.body.clientHeight;
        that.FrameHeght = that.height - 175 + "px";
      })();
    };
  },
  watch: {
    height(val) {
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          that.FrameHeght = that.height - 175 + "px";
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
<style>
.ant-row .ant-form-item {
  display: flex;
}
.ant-form-item-control {
  width: 100%;
}
.longBox .ant-form-item-control {
  margin-bottom: 20px;
}
.bottom_button {
  margin-bottom: 20px;
}
.tex_textarea .ant-form-item-control-wrapper {
  /* width: 80% !important; */
  margin-left: 8px;
}

.longBox > div {
  margin: 0 auto;
}
.longBox .ant-col .ant-form-item-control-wrapper {
  margin-left: 210px !important;
}
.model {
  padding-left: 50px;
  overflow-y: auto;
}

.model .ant-col .ant-form-item-label {
  width: 80px;
}
.model .ant-form {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
