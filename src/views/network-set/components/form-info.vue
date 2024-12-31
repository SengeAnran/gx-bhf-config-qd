<template>
  <div class="form-info">
    <el-form label-width="140px" :model="formData" ref="formRule" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="IPv4地址：" prop="ipv4">
            <el-input v-model="formData.ipv4" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="IP...掩码：" prop="ipMask">
            <el-input v-model="formData.ipMask" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="IPv4网关：" prop="gateway">
            <el-input v-model="formData.gateway" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="MAC地址：" prop="mac">
            <el-input v-model="formData.mac" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="DNS：" prop="dns">
            <el-input v-model="formData.dns" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" icon="" @click="onTest">测试修改</el-button>
    <el-button type="primary" @click="onSure">保存修改</el-button>
  </div>
</template>

<script>
import { getNetwork,updateApi, networkTest } from "@/api/system/network";
export default {
  components: {
  },
  data() {
    return {
      visible: false,
      title: "告警详情",
      formData: {
        ipv4: '',
        ipMask: '',
        gateway: '',
        mac: '',
        dns: '',
      },
      rules: {
        ipv4: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        ipMask: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        gateway: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        mac: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        dns: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
      }
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      getNetwork().then(res => {
        this.formData = res.data;
      })
    },
    // 修改保存
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          const data = {
           ...this.formData,
          };
          updateApi(data).then(() => {
            this.$message.success('修改成功！');
            this.init();
          });
        } else {
          return false;
        }
      })
    },
    // 测试
    onTest() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          const data = {
           ...this.formData,
          };
          networkTest(data).then(() => {
            this.$message.success('测试成功！');
          }).catch(() => {
            this.$message.warning('测试失败！');
          });
        } else {
          return false;
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
</style>


