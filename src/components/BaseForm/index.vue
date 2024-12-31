<template>
  <el-form
    ref="form"
    :class="{
    info: code === 'info'
  }"
    :disabled="code === 'info'"
    :model="formModel"
    :rules="code !== 'info' ? rules : {}"
    :label-position="labelPosition"
  >
    <el-row>
      <!--带block-->
      <el-col
        v-for="(childItem, childIndex) in config"
        :key="`col-${childIndex}`"
        :span="showFormItem(childItem) ? childItem.span : 0"
        :offset="childItem.offset"
        :push="childItem.push"
        :pull="childItem.pull"
        :class="{'info-block-col':code === 'info'&&childItem.type === 'block'}"
      >
        <template v-if="childItem.itemSlot">
          <!-- 插槽 -->
          <slot :name="childItem.itemSlot || childItem.prop" :formModel="formModel" :code="code"/>
        </template>
        <template v-else>
          <el-form-item
            v-if="showFormItem(childItem)"
            :label="childItem.label"
            :prop="childItem.prop"
            :label-width="childItem.labelWidth"
            :rules="childItem.rules"
          >
            <template v-if="childItem.type === 'block'">
              <BaseBlock
                :subtext="childItem.subtext"
                :title="childItem.title"
                :class="{'info-block':code === 'info'}"
              />
            </template>
            <template v-else-if="code === 'info' && !['file', 'slot'].includes(childItem.type) ">
              <BaseTooltipItem :content="detailInfo(childItem)"/>
            </template>
            <template v-else>
              <!--数字输入框-->
              <el-tooltip
                :disabled="!childItem.tooltipConfig"
                effect="light"
                v-bind="childItem.tooltipConfig"
                :placement="(childItem.tooltipConfig && childItem.tooltipConfig.placement) || 'right-end'"
              >
                <el-input-number
                  v-if="childItem.type === 'number'"
                  v-model="formModel[childItem.prop]"
                  :controls="false"
                  :step="childItem.step || 1"
                  step-strictly
                  :min="childItem.min || 0"
                  :max="childItem.max"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :disabled="code === 'info' || childItem.readonly"
                />

                <!--带单位数字-->
                <div v-else-if="childItem.type === 'unitNumber'" class="unit-input">
                  <div v-if="childItem.preUnit" class="unit prev">{{ childItem.preUnit }}</div>
                  <el-input-number
                    v-model="formModel[childItem.prop]"
                    :controls="false"
                    :step="childItem.step"
                    step-strictly
                    :min="childItem.min || 0"
                    :max="childItem.max"
                    :placeholder="code === 'info' ? '' : childItem.placeholder"
                    :disabled="code === 'info' || childItem.readonly"
                  />
                  <div v-if="childItem.unit" class="unit">{{ childItem.unit }}</div>
                </div>

                <!--开关-->
                <el-switch
                  v-else-if="childItem.type === 'switch'"
                  v-model="formModel[childItem.prop]"
                  :active-text="childItem.activeText||'是'"
                  :inactive-text="childItem.inactiveText||'否'"
                />

                <!--树形下拉框-->
                <BaseSelectTree
                  v-else-if="childItem.type === 'selectTree'"
                  :cn-value.sync="formModel[childItem.cnValue]"
                  :code-value.sync="formModel[childItem.codeValue]"
                  :canInput="childItem.canInput"
                  :tree-props="childItem.treeProps || 
                  {
                    nodeKey: 'id',
                    label: 'label',
                    children: 'children'
                  }"
                  :options="((childItem.optionDict && dictHash[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsHash[childItem.optionApiCode]) || childItem.options || [])"
                  :clearable="childItem.clearable || true"
                  :accordion="childItem.accordion || true"
                  :disabled="code === 'info' || childItem.readonly"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :filterProps="childItem.filterProps || []"
                  :api="childItem.optionApi"
                  :showCheckbox="childItem.showCheckbox"
                  :checkStrictly="childItem.checkStrictly"
                  :disabledMethods="childItem.disabledMethods"
                  :lazy="childItem.lazy"
                  @chooseItem="chooseItem($event,childItem)"
                  @changeInput="changeInput($event,childItem)"
                />

                <!--下拉框-数组-->
                <el-select
                  v-else-if="childItem.type === 'select'"
                  v-model="formModel[childItem.prop]"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :disabled="code === 'info' || childItem.readonly"
                  :multiple="childItem.multiple"
                  :collapse-tags="childItem.collapseTags"
                  :filterable="childItem.filterable || true"
                  :clearable="childItem.clearable || true"
                >
                  <el-option
                    v-for="option in ((childItem.optionDict && dictHash[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsHash[childItem.optionApiCode]) || childItem.options || [])"
                    :key="`${childItem.prop}-${option[childItem.optionValueProp || 'value']}`"
                    :label="option[childItem.optionLabelProp || 'label']"
                    :value="option[childItem.optionValueProp || 'value']"
                  />
                </el-select>

                <!--下拉框-对象-->
                <el-select
                  v-else-if="childItem.type === 'selectFromObj'"
                  v-model="formModel[childItem.prop]"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :disabled="code === 'info' || childItem.readonly"
                  :multiple="childItem.multiple"
                  :collapse-tags="childItem.collapseTags"
                  :filterable="childItem.filterable || true"
                  :clearable="childItem.clearable || true"
                >
                  <el-option
                    v-for="(option, key) in ((childItem.optionDict && dictMap[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsMap[childItem.optionApiCode]) || childItem.options || {})"
                    :key="`${childItem.prop}-${key}`"
                    :label="option"
                    :value="key"
                  />
                </el-select>

                <!--单选框-数组-->
                <el-radio-group
                  v-else-if="childItem.type === 'radio'"
                  v-model="formModel[childItem.prop]"
                >
                  <el-radio
                    v-for="option in ((childItem.optionDict && dictHash[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsHash[childItem.optionApiCode]) || childItem.options || [])"
                    :key="`${childItem.prop}-${option[childItem.optionValueProp || 'value']}`"
                    :label="option[childItem.optionValueProp || 'value']"
                  >
                    {{ option[childItem.optionLabelProp || 'label']
                    }}
                  </el-radio>
                </el-radio-group>

                <!--单选框-对象-->
                <el-radio-group
                  v-else-if="childItem.type === 'radioFromObj'"
                  v-model="formModel[childItem.prop]"
                >
                  <el-radio
                    v-for="(option, key) in ((childItem.optionDict && dictMap[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsMap[childItem.optionApiCode]) || childItem.options || {})"
                    :key="`${childItem.prop}-${key}`"
                    :label="key"
                  >{{ option }}</el-radio>
                </el-radio-group>

                <!--多选框-数组-->
                <el-checkbox-group
                  v-else-if="childItem.type === 'checkbox'"
                  v-model="formModel[childItem.prop]"
                >
                  <el-checkbox
                    v-for="option in ((childItem.optionDict && dictHash[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsHash[childItem.optionApiCode]) || childItem.options || [])"
                    :key="`${childItem.prop}-${option[childItem.optionLabelProp || 'label']}`"
                    :label="option[childItem.optionValueProp || 'value']"
                  >
                    {{ option[childItem.optionLabelProp || 'label']
                    }}
                  </el-checkbox>
                </el-checkbox-group>

                <!--多选框-对象-->
                <el-checkbox-group
                  v-else-if="childItem.type === 'checkboxFromObj'"
                  v-model="formModel[childItem.prop]"
                >
                  <el-checkbox
                    v-for="(option, key) in ((childItem.optionDict && dictMap[childItem.optionDict]) || (childItem.optionApiCode && ApiOptionsMap[childItem.optionApiCode]) || childItem.options || {})"
                    :key="`${childItem.prop}-${key}`"
                    :label="key"
                  >{{ option }}</el-checkbox>
                </el-checkbox-group>

                <!--日期选择器-->
                <el-date-picker
                  v-else-if="childItem.type === 'datePicker'"
                  v-model="formModel[childItem.prop]"
                  :type="childItem.dateType || 'date'"
                  :format="childItem.format || 'yyyy-MM-dd'"
                  :value-format="childItem.valueFormat || 'yyyy-MM-dd'"
                  :picker-options="childItem.pickerOptions||{}"
                  :disabled="code === 'info' || childItem.readonly"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                />

                <!--日期范围选择器-->
                <b-date-range-picker
                  v-else-if="childItem.type === 'dateRangePicker'"
                  :start-value.sync="formModel[childItem.startProp]"
                  :end-value.sync="formModel[childItem.endProp]"
                  :disabled="code === 'info' || childItem.readonly"
                  v-bind="childItem"
                />

                <!--文本域-->
                <el-input
                  v-else-if="childItem.type === 'textarea'"
                  v-model.trim="formModel[childItem.prop]"
                  type="textarea"
                  :rows="childItem.rows || 2"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :maxlength="childItem.maxlength"
                  :show-word-limit="childItem.showLimit"
                  :disabled="code === 'info' || childItem.readonly"
                />
                <!--密码输入框-->
                <el-input
                  v-else-if="childItem.type === 'password'"
                  v-model.trim="formModel[childItem.prop]"
                  type="password"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :disabled="code === 'info' || childItem.readonly"
                  :maxlength="childItem.maxlength"
                  :clearable="!!childItem.clearable"
                  @keyup.native="childItem.componentEvents && childItem.componentEvents.blur ? childItem.componentEvents.blur(formModel, childItem.prop) :null "
                >
                  <template slot="prepend" v-if="childItem.prepend">{{childItem.prepend}}</template>
                </el-input>

                <!-- 文件上传 -->
                <FileUpload
                  v-else-if="childItem.type === 'file'"
                  :isShowTip="childItem.isShowTip||false"
                  v-model="formModel[childItem.prop]"
                  :params="childItem.params"
                  :code="code"
                />

                <!-- 插槽 -->
                <slot
                  :name="childItem.slotName || childItem.prop"
                  v-else-if="childItem.type === 'slot'"
                  :formModel="formModel"
                  :code="code"
                />

                <!--文本输入框-->
                <el-input
                  v-else
                  v-model.trim="formModel[childItem.prop]"
                  :placeholder="code === 'info' ? '' : childItem.placeholder"
                  :disabled="code === 'info' || childItem.readonly"
                  :maxlength="childItem.maxlength"
                  :clearable="!!childItem.clearable"
                  @click.native="inputClick(childItem.prop)"
                  @keyup.native="childItem.componentEvents && childItem.componentEvents.blur ? childItem.componentEvents.blur(formModel, childItem.prop) :null "
                >
                  <template slot="prepend" v-if="childItem.prepend">{{childItem.prepend}}</template>
                </el-input>
              </el-tooltip>
            </template>
          </el-form-item>
        </template>
      </el-col>
      <el-col>
        <slot name="custom-dialog-form" :formModel="formModel" :code="code"></slot>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
// vuex
import { mapGetters } from "vuex";
// mixins
import PropsMixins from "./props-mixins";
import moment from "moment";
import { cloneDeep, isNaN } from "lodash";

export default {
  name: "Index",
  mixins: [PropsMixins],
  data() {
    return {
      ApiOptionsHash: {},
      ApiOptionsMap: {}
    };
  },
  mounted() {
    this.initOptions();
    // this.initFormModel();
  },
  watch: {
    formModel: {
      handler(val) {
        this.$emit("formModelChange", val);
        // console.log(val);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters(["dictHash", "dictMap"])
  },
  methods: {
    // /**
    //  * @description 初始化表单属性及值
    //  * @return {object} hash 初始化后的表单
    //  * **/
    // initFormModel() {
    //   const hash = this.formModel;
    //   this.config.forEach(
    //     item => (hash[item.prop] = this.getDefaultValue(item))
    //   );
    //
    // },
    // /**
    //  * @description 根据类型获取默认值
    //  * @return {number | string} 返回的默认值
    //  * **/
    // getDefaultValue(item) {
    //   if (item.type === "number") {
    //     return 0;
    //   }

    //   if (
    //     item.multiple ||
    //     ["checkbox", "checkboxFromObj", "file"].includes(item.type)
    //   ) {
    //     return [];
    //   }

    //   if (item.default) {
    //     return item.default;
    //   }

    //   return "";
    // },

    /**
     * @description 初始化表单选项及表单值
     * **/
    async initOptions() {
      const loading = this.isRealTimeOptions ? this.getLoading() : null;
      const apiConfig = this.config.filter(item => item.optionApi);
      const dictConfig = this.config.filter(item => item.optionDict);
      dictConfig.forEach(item => {
        const data =
          item.type.slice(-3) === "Obj" ? this.dictMap : this.dictHash;
        this.initFormOption(item, data[item.optionDict]);
      });
      Promise.all(apiConfig.map(item => this.dataOption(item))).then(
        () => {
          loading && loading.close();
        },
        () => {
          loading && loading.close();
        }
      );
      loading && loading.close();
    },

    /**
     * @description 根据api动态获取选项值
     * **/
    dataOption(item) {
      const {
        optionApi,
        optionApiParams,
        optionDataProp,
        optionApiCode
      } = item;
      return new Promise(resolve => {
        optionApi(optionApiParams)
          .then(res => {
            const options = this.initFormOption(
              item,
              res[optionDataProp || "data"]
            );
            this.$set(this.ApiOptionsHash, optionApiCode, options);
            resolve();
          })
          .catch(e => {
            throw e;
          });
      });
    },

    /**
     * @description 根据类型设置默认值，并返回选项值
     * @return {object | array} 选项值
     * **/
    initFormOption(item, data) {
      let res = null;
      if (item.type.slice(-3) === "Obj") {
        res = data || {};
        if (
          typeof item.isDefaultValue === "boolean" ? item.isDefaultValue : true
        ) {
          const hashKeys = Object.keys(res);
          this.setFormValueByObj("resetForm", hashKeys, item);
        }
      } else {
        res = data || [];
        if (
          typeof item.isDefaultValue === "boolean" ? item.isDefaultValue : true
        ) {
          this.setFormValueByArr("resetForm", res, item);
        }
      }
      return res;
    },
    /**
     * @description 根据选项对象设置表单默认值
     * **/
    setFormValueByObj(form, hashKeys, item) {
      this[form][item.prop] =
        (hashKeys.length && hashKeys[item.defaultValueIndex || 0]) || "";
      item.codeValue &&
        (this.resetForm[item.codeValue] =
          (hashKeys.length && hashKeys[item.defaultValueIndex || 0]) || "");
      item.cnValue &&
        (this.resetForm[item.cnValue] =
          res[hashKeys[item.defaultValueIndex || 0]] || "");
    },
    /**
     * @description 根据选项列表设置表单默认值
     * **/
    setFormValueByArr(form, res, item) {
      this.resetForm[item.prop] =
        (res.length &&
          res[item.defaultValueIndex || 0][item.optionValueProp || "value"]) ||
        "";
      if (!res.length) {
        item.codeValue && (this.resetForm[item.codeValue] = "");
        item.cnValue && (this.resetForm[item.cnValue] = "");
        return;
      }
      item.codeValue &&
        (this.resetForm[item.codeValue] =
          res[item.defaultValueIndex || 0][item.optionValueProp || "value"] ||
          "");
      item.cnValue &&
        (this.resetForm[item.cnValue] =
          res[item.defaultValueIndex || 0][item.optionLabelProp || "label"] ||
          "");
    },

    detailInfo(childItem) {
      let value = this.formModel[childItem.prop];
      let str = value;
      if (childItem.type === "checkboxFromObj" && childItem.optionDict) {
        const obj = this.dictMap[childItem.optionDict];
        str = value.map(i => obj[i]).join(",");
      } else if (childItem.type === "datePicker") {
        // str = moment(value).format(childItem.format || "YYYY-MM-DD");
        str = value;
      } else if (childItem.type === "radioFromObj") {
        str = childItem.options[value];
      } else if (childItem.optionDict) {
        if (this.dictMap[childItem.optionDict]) {
          str = this.dictMap[childItem.optionDict][value];
        }
      }
      if (str === null || str === undefined || str === "" || isNaN(str)) {
        str = "--";
      }
      return str;
    },

    /** 树 选择点击事件*/
    chooseItem(data, params) {
      let otherForm = params.otherForm;
      //为了入列
      this.$emit("treeClick", data.data, data.node, params);
      if (!otherForm || !data.data) return;

      Object.keys(otherForm).forEach(key => {
        this.formModel[otherForm[key]] = data.data[key];
      });
    },

    // 校验
    validate() {
      return this.$refs.form.validate();
    },

    // 移除表单项的校验结果。
    clearValidate() {
      return this.$refs.form.clearValidate();
    },

    // 重置
    reset() {
      return this.$refs.form.resetFields();
    },

    // 获取 表单数据
    getFormData() {
      return this.formModel;
    },

    /**
     * @description 是否显示当前表单项
     * **/
    showFormItem(item) {
      let flag = true;
      if (item.hidden) {
        if (typeof item.hidden === "function") {
          flag = !item.hidden({ form: this.formModel, code: this.code });
        } else {
          flag = !Boolean(item.hidden);
        }
      }
      return flag;
    },
    /**
     * input点击
     */
    inputClick(val) {
      this.$emit("inputClick", val);
    }
  }
};
</script>

<style lang="scss" scoped>
// 带单位输入框
.unit-input {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  .unit {
    background-color: #073d66;
    color: #ffffff;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #1e5c97;
    border-radius: 4px;
    width: 50px;
    text-align: center;
    white-space: nowrap;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &.prev {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

.el-date-editor {
  width: 100%;
}

.info {
  // border-top: 1px solid #1e5c97;
  // border-right: 1px solid #1e5c97;
  .el-col {
    // border-left: 1px solid #1e5c97;
    // border-bottom: 1px solid #1e5c97;
    .el-form-item {
      margin: 0;
    }
  }
}
</style>
