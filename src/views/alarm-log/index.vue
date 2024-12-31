<template>
  <div class="container">
    <BaseBlock title="告警日志" :verticalLine="true"/>
    <div class="head">
      <my-search :formData="formData" :formConfig="formConfig" @search="search" @reset="reset"></my-search>
    </div>

    <div class="mb-10">
      <el-button
        v-if="isManager"
        type="danger"
        icon="el-icon-delete"
        @click="del"
        :disabled="!selectList.length>0"
      >删除</el-button>
    </div>
    <BaseTable
      style="height: calc(100% - 186px);"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @getData="getData"
      @changeSelection="changeSelection"
    >
      <el-table-column slot="action" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-tooltip  v-if="isManager" content="删除" placement="top">
            <img
              src="@/assets/button/del.png"
              @click="handelDelete(scope.row,scope.$index)"
              class="myButton"
            >
          </el-tooltip>
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
    <add-update ref="addupdate"></add-update>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
import { FORM_CONFIG, formData } from "./config";
import { alarmListApi, delListApi, detailsApi } from "@/api/system/alarm";
import { sceneListApi } from "@/api/system/scene";
import { cardListApi } from "@/api/system/aicard";
import {mapGetters} from "vuex";
export default {
  name: "AlarmLog",
  components: {
    AddUpdate
  },
  data() {
    return {
      formData,
      formConfig: FORM_CONFIG,
      loading: false,
      selectList: [],
      tableData: [],
      dictList: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        { prop: "alertTime", label: "告警时间", width: "", align: "center" },
        { prop: "content", label: "内容", width: "", align: "center" },
        { prop: "level", label: "等级", width: "", align: "center" },
        { prop: "sceneName", label: "场景", width: "", align: "center" },
        {
          prop: "linkDeviceName",
          label: "关联设备",
          width: "",
          align: "center"
        },
        { slot: "action" } //操作
      ]
    };
  },

  async mounted() {
    await this.getData();
    let res1 = await sceneListApi(); //场景
    let res2 = await cardListApi(); //板卡
    FORM_CONFIG[1].selectOptions = res1.rows.map(item => {
      return {
        label: item.name,
        value: item.id
      };
    });
    FORM_CONFIG[2].selectOptions = res2.rows.map(item => {
      return {
        label: item.name,
        value: item.id
      };
    });
  },
  computed: {
    ...mapGetters(['isManager']),
  },
  methods: {
    //表格数据
    getData() {
      this.loading = true;
      let temp = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        ...this.formData
      };
      alarmListApi(temp)
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
    //搜索
    search() {
      this.pagination.current = 1;
      this.formData = Object.assign(this.formData, {
        level: this.formData.level,
        sceneName: this.formData.sceneName,
        linkDeviceId: this.formData.linkDeviceId,
        startAlertTime: this.formData.time && this.formData.time[0],
        endAlertTime: this.formData.time && this.formData.time[1]
      });
      this.getData();
    },
    //公共删除
    publicDel(ids) {
      this.$BConfirm({
        message: `是否确认删除？`
      }).then(bool => {
        if (bool) {
          delListApi(ids).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功！");
              this.getData();
            }
          });
        }
      });
    },

    //删除
    handelDelete(row) {
      this.publicDel([row.id]);
    },

    //选择
    changeSelection(data) {
      this.selectList = data;
    },

    del() {
      let ids = this.selectList.map(item => item.id);
      this.publicDel(ids);
    },
    //重置
    reset() {
      this.formData = {};
      this.getData();
    },

    //详情
    details(row) {
      this.$refs.addupdate.init(row);
    }
  }
};
</script>


<style lang="scss" scoped>
.col {
  display: flex;
  justify-content: space-between;
}
.head {
  margin: 25px 0 3px 0;
}
</style>
