

<template>
  <div class="show-content">
    <el-form label-position="left" label-width="130px" :model="formData" ref="formRule" :rules="rule" >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="摄像机品牌：" prop="brand" :rules="rule.select">
            <el-select v-model="formData.brand">
            <el-option value="海康" label="海康"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <el-checkbox v-model="formData.onvif" :true-label="1" :false-label="0">onvif</el-checkbox>
            <el-checkbox v-model="formData.onlineCheck" :true-label="1" :false-label="0">在线检测</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="起始IP：" prop="fromIpAddr" :rules="rule.input">
            <el-input v-model="formData.fromIpAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束IP：" prop="toIpAddr" :rules="rule.input">
            <el-input v-model="formData.toIpAddr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名：" prop="user" :rules="rule.input">
            <el-input v-model="formData.user"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码：" prop="passwd" :rules="rule.input">
            <el-input v-model="formData.passwd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="取流端口：" prop="port" :rules="rule.inputNumber">
            <el-input-number v-model="formData.port"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="主码流：" prop="mainRtspType" :rules="rule.select">
            <el-select v-model="formData.mainRtspType" placeholder="请选择">
              <el-option
                v-for="dict in dict.type.code_ratio"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="次码流：" prop="subRtspType" :rules="rule.select">
            <el-select v-model="formData.subRtspType" placeholder="请选择">
              <el-option
                v-for="dict in dict.type.code_ratio"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value*1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="图像旋转：" prop="imageAngle" :rules="rule.select">
            <el-select v-model="formData.imageAngle">
              <el-option :value="0" label="不旋转"></el-option>
              <el-option :value="1" label="90°"></el-option>
              <el-option :value="2" label="180°"></el-option>
              <el-option :value="3" label="270°"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
<!--    <el-button type="info" icon="el-icon-circle-close" @click="visible=false">退出</el-button>-->
    <el-button type="primary" icon="el-icon-circle-check" @click="onSure">开始添加</el-button>
  </div>

</template>
<script>
import rule from "@/mixins/rule";
import { addCamera } from '@/api/system/importPoint'
export default  {
  mixins: [rule],
  dicts: ['code_ratio'],
  data() {
    return {
      formData: {
        onvif: 0,
        onlineCheck: 0,
      },
    }
  },
  methods: {
    //确认
    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          addCamera(this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success("操作成功!");
              this.$emit('addSuccess');
            }
          });
        } else {
          return false;
        }
      });
    }
  }
}

</script>
<style scoped lang="scss">

</style>
