<template>
  <BaseDialog
    append-to-body
    :title="title"
    custom-class="export-dialog"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="1000px"
  >
    <template #default>
      <el-form label-width="120px" :model="formData" ref="formRule">
        <el-row>
          <el-col :span="12">
            <el-form-item label="场景名称：">
              <span>{{formData.name}}</span>
            </el-form-item>
            <el-form-item label="说明：">
              <span>{{formData.remark}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场景状态：">
              <span>{{formData.state}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="关联配置：">
              <div style="max-height:330px;overflow:auto">
                <div class="box" v-for="(item,index) in formData.sceneCardConfs" :key="`card-${index}`">
                  <div style="margin:36px 10px 0 0">
                  </div>
                  <div>
                    <div>配置{{index+1}}</div>
                    <div class="group">
                      <div>
                        <span>板卡配置</span>
                        <el-select v-model="item.boardCardId" placeholder="请选择板卡" style="margin:0 10px;width:250px"
                                   disabled>
                          <el-option v-for="itemConfig in cardData" :label="itemConfig.name" :value="itemConfig.id"
                                     :key="itemConfig.id"></el-option>
                        </el-select>
                        <el-select v-model="item.boardCardConfId" placeholder="请选择输入源" style="width:200px;" disabled>
                          <el-option v-for="itemConfig in cardConfig" :label="itemConfig.sourceUri"
                                     :value="itemConfig.id" :key="itemConfig.id"></el-option>
                        </el-select>
                        <!-- <el-input v-model="item.boardCardConfTargetUri" placeholder="输出rtsp地址（自动带出）"
                                  style="width:210px;margin-left:10px;" disabled>
                        </el-input> -->
                      </div>
                      <div class="gap">
                        <div class="flex">
                          <div>模型配置</div>
                          <div>
                            <div v-for="(modelItem,ind) in item.sceneCardConfModels" style="margin-bottom:10px">
                              <el-select v-model="modelItem.modelId" placeholder="请选择模型"
                                         style="margin-left:10px;width:250px" disabled>
                                <el-option v-for="itemConfig in modelData" :label="itemConfig.name"
                                           :value="itemConfig.id" :key="itemConfig.id"></el-option>
                              </el-select>
                              <span style="margin-left: 10px">
                                   状态： {{modelItem.modelStatus}}
                              </span>

                            </div>
                          </div>
                          <div class="btn">
                            <el-button
                              v-if="formData.state === '启动'"
                              type="primary"
                              size="small"
                              icon="el-icon-view"
                              @click="handleFull(item)"
                            >预览</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="配置示意图：">
              <div class="outside">
                <div class="process" v-for="(item,index) in formData.sceneCardConfs">
                  <div>配置图示{{index+1}}</div>
                  <div class="process-mark">
                    <div v-for="(modelItem,ind) in item.sceneCardConfModels" :key="ind" class="flex"
                         style="margin:5px 0;">
                      <div class="center" v-if="ind!=0">
                        <div class="arrow"></div>
                      </div>
                      <template v-if="!!modelItem.modelName">
                        <div class="process-box">{{modelItem.modelName}}</div>
                      </template>
                      <template v-else>
                        <div class="process-box">模型XXXX</div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 预览 -->
      <video-full ref="VideoFull"></video-full>
    </template>
    <template #footer>
      <el-button type="primary" icon="el-icon-circle-close" @click="visible=false">关闭</el-button>
    </template>
  </BaseDialog>
</template>

<script>
  import VideoFull from "./video-full";
  import {cardListApi, cardConfListApi} from "@/api/system/aicard";
  import {detailsApi, sceneModelListApi, addSceneApi, updateSceneApi} from "@/api/system/scene";

  export default {
    components: {
      VideoFull,
    },
    data() {
      return {
        visible: false,
        title: "查看场景信息",
        cardData: [],  //板卡
        cardConfig: [], //板卡配置
        modelData: [],  //模型列表
        formData: {
          sceneCardConfs: [{
            sceneCardConfModels: [{}]   //场景板卡配置模型
          }],   //场景板卡配置
        },
      };
    },
    methods: {
      init(row) {
        this.visible = true
        if (row) {
          detailsApi(row.id).then((res) => {
            this.formData = res.data;
            res.data.sceneCardConfs.forEach((item, index) => {
              cardConfListApi({boardCardId: item.boardCardId}).then((res) => {
                this.cardConfig = res.rows;
                this.cardData.forEach((row) => {
                  if (row.id == item.boardCardId) {
                    this.formData.sceneCardConfs[index].boardCardName = row.name;
                    this.getModel(item.boardCardId)
                  }
                })
              })
            })
          })
        }
        this.getCard()
      },

      //获取板卡数据
      getCard() {
        cardListApi({}).then((res) => {
          this.cardData = res.rows;
        })
      },
      async getModel(id) {
        let res = await sceneModelListApi({boardCardId: id})
        this.modelData = res.rows;
      },
      //预览
      handleFull(item) {
        const data = {
          targetUri: item.boardCardConfSourceUri
        }
        this.$refs.VideoFull.init(data);
      },
    }
  };
</script>

<style lang="scss" scoped>
  .gap {
    margin: 15px 0;
  }

  .group {
    padding: 10px;
    margin-bottom: 10px;
    border: 2px dashed rgb(223, 227, 238);
  }

  .btn {
    margin-left: 10px;
  }

  .box {
    display: flex;
  }

  .outside {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start;
    max-height: 230px;
    overflow: auto;
  }

  .process {
    margin-bottom: 10px;
    margin-right: 10px;
    border: 2px solid rgb(223, 227, 238);
    border-radius: 8px;
    padding: 0 10px;
    height: 220px;
    box-sizing: border-box;

    &-mark {
      width: 360px;
      height: 168px;
      overflow: auto;
      border: 2px dashed rgb(223, 227, 238);
      padding: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    &-box {
      padding: 0 5px;
      height: 40px;
      color: #fff;
      background: rgb(54, 124, 208);
      line-height: 40px;
    }
  }

  .center {
    width: 60px;
    height: 40px;
    display: flex;
    margin-left: 10px;
    align-items: center;
  }

  //箭头
  .arrow {
    line-height: 50px;
    display: inline-block;
    height: 10px;
    width: 30px;
    background: rgb(54, 124, 208);
    position: relative;

  }

  .arrow::before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left: 20px solid rgb(54, 124, 208);;
    left: 30px;
    top: -15px;
  }

  ::v-deep .el-dialog__body {
    padding: 30px 20px 0 20px;
  }
</style>
