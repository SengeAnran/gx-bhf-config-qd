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
        <el-form-item label="网关IP：">
          <span>{{formData.gatewayIp}}</span>
        </el-form-item>
        <el-form-item label="端口：">
          <span>{{formData.gatewayPort}}</span>
        </el-form-item>
        <el-form-item label="订阅主题：">
          <span>{{formData.subscribeTopic}}</span>
        </el-form-item>

        <el-form-item label="备注：">
          <span>{{formData.remark}}</span>
        </el-form-item>
        <el-form-item label="消息示例：">
          <span>{{formData.messageExample}}</span>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" icon="el-icon-circle-close" @click="visible=false">关闭</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { detailsApi } from "@/api/system/mqtt";
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

