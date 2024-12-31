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
      <el-form label-width="100px" :model="formData" ref="formRule" :rules="rules">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="连接地址：" prop="gateway">
          <el-input v-model="formData.gateway" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="订阅组：" prop="groupId">
          <el-input v-model="formData.groupId" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="订阅主题：" prop="topic">
          <el-input v-model="formData.topic" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型：">
        //   <el-select v-model="formData.type">
        //     <el-option
        //       label="消费者"
        //       value="consumer"
        //     />
        //     <el-option
        //       label="生产者"
        //       value="producer"
        //     />
        //   </el-select>
        // </el-form-item> -->
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="消息示例：">
          <el-input type="textarea" v-model="formData.messageExample" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { addApi, updateApi } from "@/api/system/kafka";
export default {
  data() {
    return {
      visible: false,
      title: "新增推送配置信息",
      formData: {},
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        gateway: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 20, max: 500, message: '长度在 20 到 500 个字符', trigger: 'blur' }
        ],
        topic: [{ min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
        groupId: [{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }],
        remark: [{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }],
        messageExample: [{ min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }]
      }
    };
  },
  methods: {
    init(row) {
      this.visible = true;
      if (row instanceof Object) {
        this.formData = row;
        this.title = "修改推送配置信息";
      } else {
        this.formData = {};
        this.title = "新增推送配置信息";
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },

    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          if (this.formData.id) {
            updateApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          } else {
            addApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

