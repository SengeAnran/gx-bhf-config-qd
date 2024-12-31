<template>
  <div class="container">
    <BaseBlock title="解码卡管理" :verticalLine="true"/>
    <top-search
      @add="add"
      @search="search"
      @reset="reset"
      @del="del"
      addText="搜索在线从机"
      placeholder="请输入"
      :delShow="!selectList.length>0"
    >
      <template v-slot:action>
        <el-button @click="showViewStr">屏幕字符</el-button>
      </template>
    </top-search>
    <BaseTable
      style="height:calc(100% - 140px)"
      v-loading="loading"
      :tableDate="tableData"
      rowKeyId="id"
      :pagination="pagination"
      :columns="columns"
      :boder="false"
      @getData="getData"
      @changeSelection="changeSelection"
    >
      <el-table-column slot="fresh" label="分辨率" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.resolution"  @change="val => changeSelect(val, scope.row.dev_id)" placeholder="请选择">
            <el-option
              v-for="dict in dict.type.resolution_ratio"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
<!--      <el-table-column slot="action" label="操作" align="center" width="200px">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tooltip content="修改分辨率" placement="top">-->
<!--            <img-->
<!--              src="@/assets/button/edit.png"-->
<!--              @click="update(scope.row,scope.$index)"-->
<!--              class="myButton"-->
<!--            >-->
<!--          </el-tooltip>-->
<!--&lt;!&ndash;          <el-tooltip content="删除" placement="top">&ndash;&gt;-->
<!--&lt;!&ndash;            <img&ndash;&gt;-->
<!--&lt;!&ndash;              src="@/assets/button/del.png"&ndash;&gt;-->
<!--&lt;!&ndash;              @click="handelDelete(scope.row,scope.$index)"&ndash;&gt;-->
<!--&lt;!&ndash;              class="myButton"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;          </el-tooltip>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
    </BaseTable>
    <add-update ref="addupdate" @getData="getData"></add-update>
    <viewStr ref="viewStr"></viewStr>
  </div>
</template>
<script>
import AddUpdate from "./components/add-update";
import viewStr from "./components/viewStr";
import { listApi, delListApi,updateApi } from "@/api/system/decodeCard";
export default {
  name: "UserManagement",
  dicts: ["resolution_ratio"],
  components: {
    AddUpdate,
    viewStr
  },
  data() {
    return {
      loading: false,
      tableData: [],
      dictList: {},
      queryParams: "",
      selectList: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },
      columns: [
        { selection: true, align: "center" },
        { prop: "eqpt", label: "机器码", width: "", align: "center" },
        { prop: "dev_id", label: "设备ID", width: "", align: "center" },
        {
          prop: "fresh",
          label: "分变率",
          width: "",
          align: "center",
          slot: "fresh"
        },
        { prop: "softwareversion", label: "版本", width: "", align: "center" },
        // { slot: "action" } //操作
      ],
      options: [
        {
          value: '1',
          label: '1920x1920p 60Hz'
        },
      ]
    };
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
        userName: this.queryParams
      };
      listApi(temp)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.rows;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 修改分辨率
    changeSelect(val, id) {
      const data = [{
            dev_id: id,
            resolution: val,
          }]
      updateApi(data).then(() => {
        this.$message({
          type: 'success',
          message: '修改分辨率成功!'
        });
        this.getData();
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改分辨率失败!'
        });
        this.getData();
      })
      // this.$confirm('确定要修改该设备的分辨率吗？','提示',{
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   const data = [{
      //     dev_id: id,
      //     resolution: val,
      //   }]
      //
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   });
      // });
    },
    //搜索
    search(data) {
      console.log("data", data);
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
            if (res.code === 200) {
              this.$message.success("删除成功！");
              this.getData();
            }
          });
        }
      });
    },
    //删除
    handelDelete(row) {
      this.publicDel([row.userId]);
    },

    //checkbox选择
    changeSelection(data) {
      this.selectList = data;
    },

    del() {
      let ids = this.selectList.map(item => item.userId);
      this.publicDel(ids);
    },
    //重置
    reset() {
      this.queryParams = "";
      this.getData();
    },

    //修改
    update(row) {
      this.$refs.addupdate.init(row);
    },

    add() {
      this.$refs.addupdate.init();
    },
    showViewStr() {
      this.$refs.viewStr.init();
    }
  }
};
</script>
