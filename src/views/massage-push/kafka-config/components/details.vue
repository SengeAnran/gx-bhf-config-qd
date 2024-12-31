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
        <el-form-item label="名称：">
          <span>{{formData.name}}</span>
        </el-form-item>
        <el-form-item label="链接地址：">
          <span>{{formData.gateway}}</span>
        </el-form-item>
        <el-form-item label="订阅组：">
          <span>{{formData.groupId}}</span>
        </el-form-item>
        <el-form-item label="订阅主题：">
          <span>{{formData.topic}}</span>
        </el-form-item>
       <!-- <el-form-item label="类型：">
        //   <span>{{formData.type === 'consumer'? '消费者':'生产者'}}</span>
        // </el-form-item>
        -->
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

