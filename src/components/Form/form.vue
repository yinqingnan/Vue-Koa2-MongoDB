<template>
  <div class="formBar">
    <div class="formList">
      <a-form :form="form" @submit="handleSubmit">
        <a-row :gutter="48">
          <a-col
            :md="wrapCol.md"
            :sm="wrapCol.sm"
            v-for="(item, index) in topList"
            v-if="item.long == undefined"
            :key="index"
            v-show="item.display"
          >
            <!-- 文本 -->
            <a-form-item
              :label="item.title"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
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
              :labelCol="labelCol"
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
            <!-- 时间 -->
            <a-form-item
              class="timeP0"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :label="item.title"
              v-if="item.type == 'time'"
            >
              <a-range-picker
                v-decorator="[
                  item.code,
                  {
                    initialValue: item.val
                  }
                ]"
                class="timeP0"
                showTime
                :format="item.format"
              />
            </a-form-item>
            <a-form-item
              class="timeP0"
              :label="item.title"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="item.type == 'year'"
            >
              <a-range-picker
                v-decorator="[item.code]"
                class="timeP0"
                :format="item.format"
              />
            </a-form-item>
            <!-- 下拉 -->
            <a-form-item
              :label="item.title"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="item.type == 'select'"
            >
              <a-select
                v-decorator="[
                  item.code,
                  {
                    initialValue: item.iVal,
                    rules: item.rule
                  }
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="it in item.data" :value="it.id">
                  {{ it.txt }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <!-- 多选 -->
            <a-form-item
              :label="item.title"
              :labelCol="labelCol"
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
              >
                <a-select-option v-for="it in item.data" :key="it.id">
                  {{ it.txt }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              :label="item.title"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="item.type == 'Tselect'"
            >
              <a-tree-select
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="item.data"
                placeholder="请选择"
                treeDefaultExpandAll
                :replaceFields="{
                  title: 'name',
                  key: 'key',
                  value: 'code'
                }"
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
              :labelCol="labelCol"
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
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="item.type == 'switch'"
            >
              <a-switch
                @change="swChangw(item)"
                v-decorator="[
                  item.code,
                  {
                    valuePropName: 'checked',
                    initialValue: item.iVal,
                    rules: item.rule
                  }
                ]"
              />
            </a-form-item>
            <!-- 单选框 -->
            <a-form-item
              :label="item.title"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="item.type == 'radio'"
            >
              <a-radio-group
                v-decorator="[
                  item.code,
                  {
                    initialValue: item.defaultValue ? item.defaultValue : ''
                  }
                ]"
              >
                <template v-for="(item, index) in item.options">
                  <a-radio-button :key="index" :value="item.value"
                    >{{ item.label }}
                  </a-radio-button>
                </template>
              </a-radio-group>
            </a-form-item>

            <!-- 按钮 -->
            <a-form-item class="btnBox" v-if="item.type == 'btn'">
              <a-config-provider :autoInsertSpaceInButton="false">
                <a-button type="primary" html-type="submit">搜索</a-button>
              </a-config-provider>
              <a-config-provider :autoInsertSpaceInButton="false">
                <a-button @click="handleReset">重置</a-button>
              </a-config-provider>
            </a-form-item>
          </a-col>
          <a-col v-else :xs="24" :xl="24">
            <!-- 文本域 -->
            <a-form-item
              :class="item.cName"
              :label="item.title"
              v-if="item.type == 'text'"
            >
              <a-textarea
                v-decorator="[
                  item.code,
                  {
                    initialValue: item.iVal,
                    rules: item.rule
                  }
                ]"
                :placeholder="item.placeholder"
                :autoSize="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>

            <!-- 按钮 -->
            <a-form-item class="longBox" v-if="item.type == 'btn'">
              <a-config-provider :autoInsertSpaceInButton="false">
                <a-button @click="handleReset">取消</a-button>
              </a-config-provider>
              <a-config-provider :autoInsertSpaceInButton="false">
                <a-button type="primary" html-type="submit">确定</a-button>
              </a-config-provider>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "formBar",
  props: ["topList", "labelCol", "wrapperCol", "long"],
  data() {
    return {
      form: this.$form.createForm(this),
      buttonCol: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12, offset: 5 }
        }
      },
      wrapCol: {
        md: 7,
        sm: 24
      },
      list: []
    };
  },
  methods: {
    //表头条件提交
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$emit("dataChange", values, "edit");
        }
      });
    },
    handleReset() {
      this.form.resetFields();
      this.$emit("dataChange", "back", "back");
    },
    swChangw(val) {
      this.$emit("dataChange", val, "swChange");
    },
    reset() {
      this.form.resetFields();
    }
  },
  watch: {
    long: {
      handler(nVal) {
        if (nVal != undefined) {
          this.wrapCol.md = 12;
          this.wrapCol.sm = 12;
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
