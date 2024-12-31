
<template>
  <el-form ref="ruleForm" :model="formData">
    <el-row>
      <el-col
        :span="config.span"
        :offset="config.offset"
        v-for="(config,index)  in formConfig"
        :key="`col-${index}`"
      >
        <el-form-item :label="config.label" :label-width="config.labelWidth">
          <!-- 输入框 -->
          <el-input
            v-if="config.type=='input'"
            :type="config.type"
            v-model.trim="formData[config.params]"
            clearable
            style="width:100%"
          ></el-input>
          <el-select
            v-else-if="config.type=='select'"
            v-model="formData[config.params]"
            :multiple="config.multiple ||false"
            placeholder="请选择"
            clearable
            style="width:100%"
          >
            <el-option
              v-for="(item,ind) in config.selectOptions"
              :key="ind"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 时间 -->
          <el-date-picker
            style="width:100%"
            v-model="formData[config.params]"
            v-else-if="config.type=='datetimerange'"
            :type="config.type"
            range-separator="至"
            :format="config.format || 'yyyy-MM-dd HH:mm:ss'"
            :start-placeholder="config.startPlaceholder"
            :end-placeholder="config.endPlaceholder"
            :value-format="config.valueFormat || 'yyyy-MM-dd'"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-button style="margin-left:10px" type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="reset">重置</el-button>
    </el-row>
  </el-form>
</template>

<script>
import searchMixins from "./props-mixins";
export default {
  mixins: [searchMixins],

  methods: {
    onSearch() {
      this.$emit("search", this.formData);
    },
    reset() {
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
