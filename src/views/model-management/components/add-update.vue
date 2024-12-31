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
        <el-form-item label="模型名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="预警级别：" prop="warnLevel">
          <el-select v-model="formData.warnLevel" placeholder="请选择" style="width:100%">
            <el-option label="高" value="高"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="低" value="低"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阈值配置：" prop="valveConf">
          <el-button type="primary" size="mini" @click="setValue" plain>设置</el-button>
          <ValueAddUpdate v-bind:value.sync="formData.valveConf" ref="valueAddUpdate"/>
        </el-form-item>
        <el-form-item label="文件名：" prop="fileName">
          <el-input v-model="formData.fileName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="说明：" prop="remark">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入" clearable></el-input>
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
  import ValueAddUpdate from './value-add-update';
import { addModelApi, detailsApi, updateModelApi } from "@/api/system/model";
export default {
  components: {
    ValueAddUpdate
  },
  data() {
    return {
      visible: false,
      title: "新增模型信息",
      formData: {
        valveConf: '',
      },
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" }
        ],
        warnLevel: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        valveConf: [
          { min: 2, max: 200, message: "长度在 2 到 200 个字符", trigger: "blur" }
        ],
        fileName: [
          // { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" }
        ],
        remark: [
          // { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    setValue() {
      console.log(this.$refs);
      this.$refs.valueAddUpdate.init();
    },
    init(row) {
      this.visible = true;
      if (row) {
        this.formData = { ...row };
        this.title = "修改模型信息";
      } else {
        this.formData = {};
      }
      if (this.$refs.formRule) {
        this.$refs.formRule.resetFields();
      }
    },
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          if (this.formData.id) {
            updateModelApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
              }
            });
          } else {
            addModelApi(this.formData).then(res => {
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

