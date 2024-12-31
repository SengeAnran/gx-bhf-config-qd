<template>
  <BaseDialog
    append-to-body
    :title="title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <template #default>
      <div class="bottom">告警信息</div>
      <el-form label-width="100px" :model="formData" ref="formRule">
        <el-row>
          <el-col :span="12">
            <el-form-item label="告警时间：">
              <span>{{formData.alertTime}}</span>
            </el-form-item>
            <el-form-item label="内容：">
              <span>{{formData.content}}</span>
            </el-form-item>
            <el-form-item label="场景：">
              <span>{{formData.sceneName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级：">
              <span>{{formData.level}}</span>
            </el-form-item>
            <el-form-item label="关联模型：">
              <span>{{formData.linkModelName}}</span>
            </el-form-item>
            <el-form-item label="关联设备：">
              <span>{{formData.linkDeviceName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="bottom">实时画面</div>
      <div class="photo">
        <img :src="`data:image/jpg;base64,${formData.actualPicBase64}`" alt>
      </div>
    </template>
    <template #footer>
      <el-button v-if="formData.readFlag === null" type="primary" icon="el-icon-circle-close" @click="handleMarkRead(formData.id)">已悉知</el-button>
      <el-button type="primary" icon="el-icon-circle-close" @click="visible=false">关闭</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { detailsApi,markRead } from "@/api/system/alarm";
export default {
  inject: ["getFData"],
  data() {
    return {
      visible: false,
      title: "告警详情",
      formData: {},
      currentTabId: null,
    };
  },
  methods: {
    handleMarkRead(id) {
      if (id) {
        markRead(id).then(res => {
          if (res.code === 200) {
            this.formData.readFlag = true;
            if (this.getFData && this.currentTabId) {
              console.log("flush table")
              this.getFData(this.currentTabId);
            }
          }
        })
      }
    },
    init(row,currentTabId) {
      this.visible = true;
      detailsApi(row.id).then(res => {
        this.formData = res.data;
        this.currentTabId = currentTabId;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom {
  color: rgb(0, 143, 224);
  font-weight: bold;
  margin-bottom: 15px;
}
.photo {
  width: 700px;
  height: 400px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>


