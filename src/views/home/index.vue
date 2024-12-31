<template>
  <div class="container">
    <BaseBlock title="首页" :verticalLine="true"/>
    <div class="box">
      <div class="box-left">
        <div class="box-vid">实时视频</div>
        <div class="box-line">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane
              v-for="(item,index) in cardData"
              :label="item.name"
              :name="String(item.id)"
              :key="item.id"
            ></el-tab-pane>
          </el-tabs>
          <div class="live" v-loading="videoLoad">
            <div v-for="(item,index) in cardConf" :key="item.id" style="margin-bottom:15px;">
              <div class="live-pos">
                <video
                  class="player"
                  ref="LivePlayer"
                  :id="'LivePlayer'+index"
                  muted
                  autoplay
                  preload="auto"
                  loop
                  @dblclick="dblclick(item)"
                  aria-disabled="disabled"
                ></video>
                <div class="overlay" v-show="showOverlay" style="opacity:0.5"></div>
                <div class="live-full">
                  <span class="el-icon-full-screen" title="放大" @click="handleFull(item)"></span>
                </div>

                <!--<div class="live-btm">
                  <el-tag size="mini" effect="dark">{{item.tag}}</el-tag>
                  <template v-if="deviceState=='在线'?true:false">
                    <span>状态：{{deviceState}}</span>
                    <span class="el-icon-circle-check" style="color:#67C23A"></span>
                  </template>
                  <template v-else>
                    <span>状态：{{deviceState}}</span>
                    <span class="el-icon-warning-outline" style="color:#F56C6C"></span>
                  </template>
                </div>-->
              </div>
              <!--<div class="wrap">{{item.sourceUri}}</div>-->
              <div class="wrap">{{item.targetUri}}</div>

            </div>
          </div>
        </div>
      </div>
      <div class="box-right">
        <div class="all">
          <div class="box-warm">报警记录</div>
          <div class="box-all">
            <el-button type="primary" size="mini" @click="handleAll">
              查看全部
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </div>
        <BaseTable
          style="height: calc(100% - 94px);"
          v-loading="loading"
          :tableDate="tableData"
          rowKeyId="id"
          :pagination="pagination"
          :columns="columns"
          :boder="false"
          layout="total"
          @getData="getData"
        >
          <el-table-column slot="action" label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip content="详情" placement="top">
                <img
                  src="@/assets/button/threshold.png"
                  @click="details(scope.row,scope.$index)"
                  class="myButton"
                >
              </el-tooltip>
            </template>
          </el-table-column>
        </BaseTable>
      </div>
    </div>

    <!-- 详情 -->
    <add-update ref="AddUpdate"></add-update>
    <!-- 全部 -->
    <all-list ref="AllList"></all-list>
    <!-- 放大 -->
    <video-full ref="VideoFull"></video-full>
  </div>
</template>

<script>
import AddUpdate from "@/views/alarm-log/components/add-update";
import AllList from "./components/all-list";
import VideoFull from "./components/video-full";
// import { cardListApi, cardConfListApi } from "@/api/system/aicard";
import { dataSourceListApi, dataSourceConfListApi } from "@/api/system/data_source";
import { alarmListApi } from "@/api/system/alarm";
import flvjs from "flv.js";
export default {
  components: {
    AddUpdate,
    AllList,
    VideoFull
  },
  provide() {
    return {
      getFData:this.getData,
      fShowOverlay:this.showVideo
    }
  },
  data() {
    return {
      rtsp: "rtsp://admin:gx123456@192.168.1.154:554/h264/ch1/main/av_stream", //视频配置
      player: [],
      activeName: "",
      loading: false,
      videoLoad: false,
      showOverlay: false,
      deviceState: "", //设备状态
      cardData: [], //板卡列表
      cardConf: [], //板卡配置
      tableData: [],
      dictList: {},
      currentTabId: null,
      timer: null,
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        {
          prop: "alertTime",
          label: "报警时间",
          width: "180px",
          align: "center"
        },
        { prop: "readFlag", label: "处理情况", width: "", align: "center"},
        { prop: "sceneName", label: "场景", width: "", align: "center" },
        { prop: "content", label: "内容", width: "", align: "center" },
        { prop: "level", label: "报警等级", width: "", align: "center" },
        { slot: "action" } //操作
      ]
    };
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  destroyed() {
    if (this.player) {
      this.player.forEach((item, index) => {
        this.player[index].pause(); //暂停播放
        this.player[index].unload(); //取消数据流加载
        this.player[index].detachMediaElement(); //将播放实例从节点抽出
        this.player[index].destroy(); //销毁播放实例
        this.player[index] = null;
      });
    }
  },

  async mounted() {
    let res1 = await dataSourceListApi();
    this.cardData = res1.data;
    this.deviceState = this.cardData[0].deviceState;
    let id = this.cardData[0].id; //默认第一项
    this.currentTabId = id;
    this.activeName = String(id); //转成字符
    this.getCard(id);
    this.getData(id);
    if (this.timer) {
      this.timer = null;
    }
    // 定时3S拉取依次告警信息
    this.timer = setInterval(() => {
      //
      console.log("Loading current alert infos,board id is ",this.currentTabId);
      this.getData(this.currentTabId);
    },3000)
  },

  methods: {
    showVideo(){
      console.log("showVideo")
      this.showOverlay = false;
    },
    //右侧表格数据
    getData(id) {
      this.loading = true;
      alarmListApi({ linkDeviceId: id })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.rows;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //详情
    details(item) {
      this.$refs.AddUpdate.init(item,this.currentTabId);
    },
    //放大
    handleFull(item) {
      this.$refs.VideoFull.init(item);
      this.showOverlay = true;
    },

    handleAll() {
      // this.$refs.AllList.init();
      this.$router.push("/layout/alarm-log");
    },

    //板卡配置信息
    getCard(id) {
      this.videoLoad = true;
      dataSourceConfListApi({ id: id })
        .then(res => {
          if (res.code == 200) {
            // console.log(res)
            this.cardConf = res.data.boardCardConfs;
            // this.videoLoad = false;
            this.handlePlay();
          }
        })
        .catch(() => {
          this.videoLoad = false;
        });
    },

    //播放
    handlePlay() {
      this.videoLoad = true;
      // 记录视频加载状态
      if (flvjs.isSupported()) {
        // let arr = [1, 2, 3, 4, 5];
        this.cardConf.forEach((item, index) => {
          //获取播放最新视频的video标签
          this.$nextTick(() => {
            let video = document.getElementById("LivePlayer" + index);

            if (!video) return;
            //给最新视频的video标签设置资源链接
            // video.src = item.sourceUri;
            video.src = item.targetUri
            //实况画面是http视频地址，无需转换
            // if(videoPlayerRef === 'LivePlayer') return

            //销毁上一个与ffmpeg的socket连接
            let player = null;

            player && player.destroy();

            // 通过socket连接ffmpeg接收ffmpeg转换的flv视频流
            player = flvjs.createPlayer({
              type: "flv", //媒体类型flv或mp4
              isLive: true, //是否为直播流
              // url: `ws://localhost:8888/rtsp/${this.id}/?url=${rtsp}`
              url: `ws://localhost:8888/rtsp/LivePlayer${index}/?url=${
              //  item.sourceUri
                  item.targetUri
              }` //视频流地址
            });
            player.attachMediaElement(video);

            this.player.push(player);

            //加载并播放视频
            try {
              player.load();
              setTimeout(() => {
                player.play();
                this.videoLoad = false;
              }, 2000);
            } catch (error) {
              console.log(error);
              this.videoLoad = false;
            }
          });
        });
      }
    },

    //双击
    dblclick(item) {
      this.$refs.VideoFull.init(item);
    },
    handleClick(tab) {
      let id = Number(tab.name);
      this.cardData.forEach(item => {
        if (item.id == id) {
          this.deviceState = item.deviceState;
        }
      });
      this.currentTabId = id;
      this.getCard(id);
      this.getData(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 100%;
  height: calc(100% - 54px);
  &-left {
    width: 64%;
    height: 100%;
  }

  &-vid {
    margin: 20px 0;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 2px solid rgb(0, 143, 224);
    font-weight: bold;
  }
  &-line {
    height: calc(100% - 94px);
    border-right: 2px solid rgb(223, 227, 238);
    padding: 10px 20px;
  }

  &-right {
    width: 36%;
    height: 100%;
    margin-left: 20px;
  }

  &-warm {
    margin: 20px 0;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 2px solid rgb(0, 143, 224);
    font-weight: bold;
  }

  &-all {
    margin: 20px 0;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 20px;
  }
}
.live {
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  font-size: 14px;
  &-full {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  &-pos {
    position: relative;
    margin: 10px;
  }
  &-btm {
    position: absolute;
    bottom: 20px;
    width: 305px;
    text-align: center;
    margin: 0 auto;
    font-size: 14px;
    .el-tag {
      margin: 0 10px;
    }
  }
}

.wrap {
  width: 305px;
  margin-left: 10px;
  // white-space: pre-wrap;
  word-break: break-all;
}
.player {
  width: 305px;
  height: 200px;
  // border: 1px solid rgb(0, 143, 224);
  border: 2px solid #ced3e0;
  object-fit: fill;
}

.all {
  display: flex;
  justify-content: space-between;
}

::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: #46a6ff;
  color: #fff;
}

::v-deep .el-tabs__item {
  font-size: 16px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0,0,0,1);
  pointer-events: none;
}
</style>



