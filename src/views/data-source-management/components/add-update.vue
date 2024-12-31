<template>
  <div>
    <BaseDialog
      append-to-body
      :title="title"
      custom-class="export-dialog"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="1000px"
    >
      <template #default>
        <el-form label-width="120px" :model="formData" ref="formRule" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="分组名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <!--<el-form-item label="设备类型：" prop="deviceType">
                <el-input v-model="formData.deviceType" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="板卡用户：" prop="sshUser">
                <el-input v-model="formData.sshUser" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="板卡密码：" prop="sshPass">
                <el-input v-model="formData.sshPass" placeholder="请输入" clearable></el-input>
              </el-form-item>-->
              <el-form-item label="分组说明：">
                <el-input v-model="formData.remark" type="textarea" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="12">
              &lt;!&ndash;<el-form-item label="板卡ip：" prop="boardCardIp">
                <el-input v-model="formData.boardCardIp" placeholder="请输入" clearable></el-input>
              </el-form-item>
              <el-form-item label="板卡端口：" prop="boardCardPort">
                <el-input-number v-model="formData.boardCardPort" placeholder="请输入" clearable></el-input-number>
              </el-form-item>&ndash;&gt;

            </el-col>-->
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="数据源配置：" >
                <div>
                  <el-button
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    type="primary"
                    @click="addGroup"
                  ></el-button>
                  <span>（最多只能配置5个）</span>
                </div>
                <div style="max-height:330px;overflow:auto">
                  <div class="flex" v-for="(item,index) in formData.boardCardConfs">
                    <div style="margin:36px 10px 0 0">
                      <el-button
                        icon="el-icon-minus"
                        circle
                        size="mini"
                        type="danger"
                        @click="minusCard(index)"
                      ></el-button>
                    </div>
                    <div>
                      <div>配置{{index+1}}</div>
                      <div class="gap group">
                        <div class="flex">
                          <div style="margin-right:10px;margin-left:14px">输入源</div>
                          <div>
                            <div style="margin-bottom:10px;display:flex">
                              <el-form-item :prop="'boardCardConfs.' + index + '.sourceUri'" :rules="[{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: ['blur']}]">
                              <el-input
                                v-model="item.sourceUri"
                                placeholder="请输入rtsp地址"
                                clearable
                                style="width:300px"
                              ></el-input>
                              </el-form-item>
                              <el-form-item :prop="'boardCardConfs.' + index + '.tag'" :rules="[{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: ['blur']}]">
                              <el-input
                                v-model="item.tag"
                                placeholder="标签（20字符内）"
                                clearable
                                style="width:200px;margin:0 10px;"
                              ></el-input>
                              </el-form-item>
                              <el-button
                                plain
                                type="primary"
                                size="small"
                                icon="el-icon-view"
                                @click="handelView(item.sourceUri)"
                              >预览</el-button>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="flex" style="margin-top:5px;">
                          <div style="margin-right:10px">输出地址</div>
                          <el-form-item :prop="'boardCardConfs.' + index + '.targetUri'" :rules="[{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: ['blur']}]">
                          <el-input
                            v-model="item.targetUri"
                            placeholder="请输入输出地址"
                            clearable
                            style="width:300px"
                          ></el-input>
                          </el-form-item>
                        </div> -->
                        <!-- <div class="flex" style="margin-top:10px;">
                          <div style="margin-right:10px">模型路径</div>
                          <el-input
                            v-model="item.modelPath"
                            placeholder="请输入模型路径"
                            clearable
                            style="width:300px"
                          ></el-input>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="关联模型：">
            <div class="line">
              <div v-for="(item,index) in formData.models" style="margin-bottom:10px;" :rules="rules">
                <el-select
                  v-model="item.id"
                  placeholder="请选择模型"
                  style="margin-left:10px;width:250px;"
                  @change="ev=>change(ev,index)"
                >
                  <el-option
                    v-for="modelItem in modelData"
                    :key="modelItem.id"
                    :label="modelItem.name"
                    :value="modelItem.id"
                  ></el-option>
                </el-select>
                <el-button
                  icon="el-icon-minus"
                  circle
                  size="mini"
                  type="danger"
                  class="btn"
                  @click="minusModel(index)"
                ></el-button>
                <template v-if="formData.models.length==index+1">
                  <el-button
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    type="primary"
                    class="btn"
                    @click="addModel"
                  ></el-button>
                </template>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
        <el-button type="primary" icon="el-icon-circle-check" :disabled="isLinking" @click="onSure">{{btnTips}}</el-button>
      </template>
    </BaseDialog>
    <video-view ref="VideoView"></video-view>
  </div>
</template>

<script>
import VideoView from "./video-view";
import { addDataSourcedApi, detailsApi, updateDataSourcedApi } from "@/api/system/data_source";
import { modelListApi } from "@/api/system/model";
export default {
  components: {
    VideoView
  },
  data() {
    return {
      modelData: [], //模型数据
      temp: {}, //模型选中项
      visible: false,
      title: "新增数据源分组信息",
      btnTips: "确定",
      isLinking: false,
      formData: {
        boardCardConfs: [{
          targetUri: "",
          tag: "",
          sourceUri: ""
        }], //板卡配置
        models: [{}] //模型配置
      },
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        deviceType: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        boardCardIp: [
          { required: true, message: "请输入", trigger: "blur" },
          { pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/, message: "请输入正确的IP地址", trigger: "blur" },
          { min: 7, max: 15, message: "长度在 7 到 15 个字符", trigger: "blur" }
        ],
        boardCardPort: [
          { required: true, message: "请输入", trigger: "blur" },
           { pattern: /\b(?:[1-9]\d{1,4}|99999)\b/, message: "请输入正确的端口", trigger: "blur" }
          // { min: 10, max: 99999, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        sshUser: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        sshPass: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: "blur" }
        ],
        // 'boardCardConfs.*.tag': [
        //   { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        // ],
        // 'boardCardConfs.*.sourceUri': [
        //   { required: true, message: "长度在符", trigger: "blur" },
        //   { pattern: /^\S{1,3}$/, message: "请输入正确的长度", trigger: "blur" },
        //   { min: 1, max: 2, message: "长度在 1 到 20 个字符", trigger: "blur" }
        // ],
        // 'boardCardConfs.*.targetUri': [
        //   { min: 1, max: 3, message: "长度在 1 到 20 个字符", trigger: "blur" }
        // ]
        // deviceState: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },

  methods: {
    init(row) {
      this.visible = true;
      if (row) {
        detailsApi(row.id).then(res => {
          if (res.data.models && res.data.models.length === 0){
            res.data.models.push({});
          }
          if (res.data.boardCardConfs.length === 0){
            res.data.boardCardConfs.push({});
          }
          this.formData = res.data;
          console.log(res)
          this.title = "修改数据源分组信息";
        });
      } else {
        this.formData = {
          boardCardConfs: [{}], //板卡配置
          models: [{}] //模型配置
        };
        this.title = "新增数据源分组信息";
      }
      this.modelList();
    },
    getRowRules(index){
      return this.boardConfigRules.sourceUri.map(rule => {
        return {...rule,trigger:`blur,change`,validator:this.validateRow.bind(this,index)};
      })
    },
    validateRow(index,rule,value,callback){
      debugger;
      const row = this.formData.boardCardConfs[index];
      const field = `boardCardConfs.${index}.value`;
      console.log("field:",field);
      console.log("row.value:",row.value);
      if(row.value.length < 1 || row.value.length > 3){
        return callback(new Error("字段问题"));
      }
      callback();
    },
    //查询模型列表
    modelList() {
      modelListApi({}).then(res => {
        this.modelData = res.rows;
      });
    },
    // 筛选
    change(id, ind) {
      this.modelData.forEach((item, index) => {
        if (item.id == id) {
          this.formData.models[ind].name = item.name;
          // this.modelData[index].disabled = true;
          this.temp = this.modelData[index];
        }
      });
    },

    onSure() {
      this.$refs.formRule.validate(valid => {
        if (valid) {
          this.btnTips = "正在连接...";
          this.isLinking = true;
          if (this.formData.id) {
            updateDataSourcedApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
                this.recover();
              }
            }).catch(e =>{
              this.recover();
            });
          } else {
            addDataSourcedApi(this.formData).then(res => {
              if (res.code == 200) {
                this.$message.success("操作成功!");
                this.visible = false;
                this.$emit("getData");
                this.recover();
              }
          }).catch(e =>{
              this.recover();
            });
          }
        } else {
          return false;
        }
      });
    },
    recover () {
      this.btnTips = "确定";
      this.isLinking = false;
    },
    //预览
    handelView(url) {
      this.$refs.VideoView.init(url);
    },
    addModel() {
      this.formData.models.push({});
    },

    addGroup() {
      if (
        !this.formData.boardCardConfs[this.formData.boardCardConfs.length - 1]
          .sourceUri
        //   ||
        // !this.formData.boardCardConfs[this.formData.boardCardConfs.length - 1]
        //   .targetUri
      ) {
        return this.$message.warning(`请先补全数据源分组的相关配置，再添加！`);
      } else if (this.formData.boardCardConfs.length > 4) {
        return this.$message.warning(`最多设置5个数据源信息！`);
      }
      this.formData.boardCardConfs.push({
        // sourceUri: "",
        // tag: "",
        // targetUri: ""
      });
    },

    //板卡
    minusCard(index) {
      if (this.formData.boardCardConfs.length == 1) {
        return this.$message.warning("至少保留一项数据源分组配置！");
      }
      this.formData.boardCardConfs.splice(index, 1);
    },

    minusModel(index) {
      if (this.formData.models.length == 1) {
        return this.$message.warning("至少选择一项关联模型！");
      }
      this.formData.models.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.gap {
  //   margin: 15px 0;
}
.group {
  padding: 12px;
  margin-bottom: 10px;
  border: 2px dashed rgb(223, 227, 238);
}
.btn {
  margin-left: 10px;
}
.line {
  margin-bottom: 10px;
  height: 135px;
  overflow: auto;
}
::v-deep .el-dialog__body {
  padding: 30px 20px 0 20px;
}
</style>
