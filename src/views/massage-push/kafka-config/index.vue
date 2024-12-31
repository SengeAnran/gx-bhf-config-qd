<template>
  <div class="container">
    <BaseBlock title="KAFKA配置" :verticalLine="true"/>
    <top-search
      @add="add"
      @search="search"
      @reset="reset"
      @del="del"
      placeholder="请输入网关"
      :show="isManager"
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
    <add-update ref="addupdate" @getData="getData"></add-update>
    <Details ref="detailsRef"></Details>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
import Details from "./components/details";
import { listApi, delListApi } from "@/api/system/kafka";
import {mapGetters} from "vuex";
export default {
  name: "MqttConfig",
  components: {
    AddUpdate,
    Details
  },
  data() {
    return {
      loading: false,
      tableData: [],
      queryParams: "",
      selectList: [],
      dictList: {},
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        {
          prop: "name",
          label: "名称",
          width: "",
          align: "center"
        },
        { prop: "gateway", label: "连接地址", width: "", align: "center" },
        { prop: "groupId", label: "订阅组", width: "", align: "center" },
        {
          prop: "topic",
          label: "订阅主题",
          width: "",
          align: "center"
        },
        {
          prop: "messageExample",
          label: "消息示例",
          width: "",
          align: "center"
        },
        {
          slot: "type",
          prop: "type",
          label: "类型",
          align: "center"
        },
        {
          prop: "remark",
          label: "备注",
          width: "",
          align: "center"
        },

        { slot: "action" } //操作
      ]
    };
  },
  computed: {
    ...mapGetters(['isManager']),
  },
  mounted() {
    this.getData();
  },
  methods: {
    //表格数据
    getData() {
      this.loading = true;
      let temp = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.size,
        gateway: this.queryParams
      };
      listApi(temp)
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

    //checkbox选择
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
      this.$refs.detailsRef.init(row);
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
