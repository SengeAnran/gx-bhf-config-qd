<template>
  <div class="container">
    <BaseBlock title="数据源分组管理" :verticalLine="true"/>
    <top-search
      @add="add"
      @search="search"
      @reset="reset"
      @del="del"
      :show="isManager"
      placeholder="请输入数据源分组名称"
      :delShow="!selectList.length>0"
    ></top-search>
    <BaseTable
      style="height:calc(100% - 140px)"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @changeSelection="changeSelection"
      @getData="getData"
    >
      <!--<el-table-column slot="status" label="状态" align="center">
        <template #default="{row}">
          <template v-if="row.deviceState=='在线'">
            <span class="circle online"></span>
            <span>在线</span>
          </template>
          <template v-if="row.deviceState=='离线'">
            <span class="circle leave"></span>
            <span>离线</span>
          </template>
        </template>
      </el-table-column>-->
      <el-table-column slot="action" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-tooltip v-if="isManager" content="修改" placement="top">
            <img
              src="@/assets/button/edit.png"
              @click="update(scope.row,scope.$index)"
              class="myButton"
            >
          </el-tooltip>
          <el-tooltip v-if="isManager" content="删除" placement="top">
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
    <!-- 修改 -->
    <add-update ref="addupdate" @getData="getData"></add-update>
    <!-- 详情 -->
    <card-details ref="details"></card-details>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import AddUpdate from "./components/add-update";
import CardDetails from "./components/card-details";
import { dataSourceListApi, delListApi } from "@/api/system/data_source";   // TODO import
export default {
  name: "DataSourceManagement",
  components: {
    AddUpdate,
    CardDetails
  },
  data() {
    return {
      loading: false,
      selectList: [],
      queryParams: "",
      tableData: [],
      dictList: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        { prop: "name", label: "分组名称", width: "", align: "center" },
        // { prop: "boardCardIp", label: "板卡IP", width: "", align: "center" },
        // { prop: "boardCardPort", label: "板卡端口", width: "", align: "center" },
        // { prop: "sshUser", label: "用户", width: "", align: "center" },
        // { prop: "deviceType", label: "类型", width: "", align: "center" },
        { prop: "remark", label: "分组说明", width: "", align: "center" },
        // { slot: "status" }, //状态
        { slot: "action" } //操作
      ],
      timer: null,
    };
  },
  computed: {
    ...mapGetters(['isManager']),
  },
  mounted() {
    this.getData();
    this.timer = window.setInterval(() => {
      this.getData();
    }, 5000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    //表格数据
    getData() {
      this.loading = true;
      let temp = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        name: this.queryParams
      };
      dataSourceListApi(temp)
        .then(res => {
          if (res.code == 200) {
            // console.log(res.rows)
            this.tableData = res.data;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //搜索
    search(data) {
      this.pagination.current = 1;
      this.queryParams = data;
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
      this.queryParams = "";
      this.getData();
    },
    //详情
    details(row) {
      this.$refs.details.init(row);
    },
    //修改
    update(row) {
      this.$refs.addupdate.init(row);
    },
    add() {
      this.$refs.addupdate.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  width: 7px;
  height: 7px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  margin-right: 5px;
}
.online {
  background: #67c23a;
}
.leave {
  background: #909399;
}
</style>

