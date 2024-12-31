

<template>
  <div class="show-content">
    <el-form label-position="left" label-width="130px" :model="formData" ref="formRule" :rules="rule" >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="IP：" prop="ipaddr" :rules="rule.input">
            <el-input v-model="formData.ipaddr"></el-input>
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
          <el-form-item label="名称：" prop="name" :rules="rule.input">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="主码流：" prop="mainRtspType" :rules="rule.select">
            <el-input  style="width: 400px; margin-right: 12px" v-model="formData.mainRtspUrl" placeholder="rtsp://"></el-input>
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

      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="次码流：" prop="subRtspType" :rules="rule.select">
            <el-input style="width: 400px; margin-right: 12px" v-model="formData.subRtspUrl" placeholder="rtsp://"></el-input>
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
          <el-form-item label="云台地址：" prop="ptzAddr" :rules="rule.input">
            <el-input style="width: 400px; margin-right: 12px" v-model="formData.ptzAddr" placeholder="http://"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="云台密钥：" prop="ptzSecret" :rules="rule.input">
            <el-input style="width: 400px; margin-right: 12px" v-model="formData.ptzSecret"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="服务地址：" prop="ptzServiceAddr" :rules="rule.input">
            <el-input style="width: 400px; margin-right: 12px" v-model="formData.ptzServiceAddr" placeholder="http://"></el-input>
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
import { addManual } from '@/api/system/importPoint'
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
          addManual(this.formData).then(res => {
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
