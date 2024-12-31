
<template>
  <!-- 弹窗表单 -->
  <BaseDialog
    append-to-body
    :title="dialogConfig.title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="dialogConfig.visible"
    :width="dialogConfig.width"
  >
    <el-form ref="ruleForm" :model="formData" :rules="code !== 'info' ? rules : {}">
      <el-row>
        <el-col
          v-for="(config,index)  in formConfig"
          :key="`col-${index}`"
          :span="config.span"
          :offset="config.offset || 0 "
        >
          <el-form-item
            :label="config.label"
            :label-width="config.labelWidth"
            :prop="config.params"
          >
            <template v-if="code!=='info'">
              <!-- 输入框 -->
              <el-input
                v-if="config.type=='input'"
                :type="config.type"
                v-model="formData[config.params]"
                clearable
                style="width:100%"
              ></el-input>
              <!-- 文本输入框 -->
              <el-input
                v-else-if="config.type=='textarea'"
                :type="config.type"
                v-model="formData[config.params]"
                clearable
              ></el-input>
              <!-- 下拉框 -->
              <el-select
                v-else-if="config.type=='select'"
                v-model="formData[config.params]"
                :multiple="config.multiple"
                placeholder="请选择"
                clearable
                style="width:100%"
              >
                <el-option
                  v-for="(item,ind) in config.selectOptions"
                  :key="`${item.value}-${ind}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- 时间范围-->
              <el-date-picker
                style="width:100%"
                v-model="formData[config.params]"
                v-else-if="config.type=='daterange'"
                :type="config.type"
                range-separator="至"
                :format="config.format || 'yyyy-MM-dd HH:mm:ss'"
                :start-placeholder="config.startPlaceholder || '开始日期'"
                :end-placeholder="config.endPlaceholder || '结束日期'"
                :value-format="config.valueFormat || 'yyyy-MM-dd'"
              ></el-date-picker>
              <!-- 插槽 -->
              <template v-else-if="config.type=='slot'">
                <slot :name="config.slotName" :formData="formData"></slot>
              </template>
            </template>
            <template v-else>{{formData[config.params]}}</template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="dialogConfig.visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import formMixins from "./props-mixins";
export default {
  mixins: [formMixins],

  methods: {
    onSure() {
      this.$emit("onSure");
    }
  }
};
</script>



