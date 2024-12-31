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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in navList" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
        <component :is="showComponent" @addSuccess="addSuccess"/>
      </el-tabs>

    </template>
    <template #footer>

    </template>
  </BaseDialog>
</template>

<script>
import VideoCamera from '@/views/import-point/components/videoCamera.vue'
import manualUrl from '@/views/import-point/components/manualUrl.vue'
import localCollectionCard from '@/views/import-point/components/localCollectionCard.vue'
import NVR from '@/views/import-point/components/NVR.vue'
export default {
  components: {
    VideoCamera,
    localCollectionCard,
    manualUrl,
    NVR,
  },
  data() {
    return {
      visible: false,
      title: "添加其他设备",
      activeName: 'first',
      showComponent: VideoCamera,
      navList: [
        {
          label: '批量添加摄像机',
          value: 'first',
        },
        {
          label: '添加NVR',
          value: 'second',
        },
        {
          label: '本地采集卡',
          value: 'third',
        },
        {
          label: '手动录入URL',
          value: 'fourth',
        },
      ]
    };
  },

  methods: {
    init(row) {
      this.visible = true;
    },
    handleClick(tab) {
      console.log(tab.name)
      switch (tab.name) {
        case 'first': this.showComponent = VideoCamera; break;
        case 'second': this.showComponent = NVR; break;
        case 'third': this.showComponent = localCollectionCard; break;
        case 'fourth': this.showComponent = manualUrl; break;
      }
    },
    addSuccess() {
      this.$emit('getData');
      this.visible = false;
    }
  }
};
</script>

