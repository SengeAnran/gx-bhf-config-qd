<template>
  <BaseDialog
    append-to-body
    :title="title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px"
  >
    <template #default>
      <el-form label-width="100px" :model="formData" ref="formRule">
        <el-form-item label="http地址：">
          <span>{{formData.url}}</span>
        </el-form-item>
        <el-form-item label="方法：">
          <span>{{formData.method}}</span>
        </el-form-item>
        <el-form-item label="参数名：">
          <span>{{formData.param}}</span>
        </el-form-item>

        <el-form-item label="备注：">
          <span>{{formData.remark}}</span>
        </el-form-item>
<!--        <el-form-item label="消息示例：">-->
<!--          <span>{{formData.messageExample}}</span>-->
<!--        </el-form-item>-->
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" icon="el-icon-circle-close" @click="visible=false">关闭</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { detailsApi } from "@/api/system/http";
export default {
  data() {
    return {
      visible: false,
      title: "查看推送配置信息",
      formData: {}
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      this.formData = row;
    }
  }
};
</script>

