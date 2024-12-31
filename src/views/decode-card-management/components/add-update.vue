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
      <BaseTable
        style="height:500px"
        v-loading="loading"
        :tableDate="tableData"
        rowKeyId="id"
        :pagination="pagination"
        :columns="columns"
        :boder="false"
        @getData="getData"
        @changeSelection="changeSelection"
      >
      </BaseTable>
    </template>
    <template #footer>
      <el-button type="info" icon="el-icon-circle-close" @click="visible=false">取消</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="onSure">确定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { addApi, searchListApi } from "@/api/system/decodeCard";
export default {
  data() {
    return {
      visible: false,
      title: "搜索在线从机",
      formData: {},
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
        { prop: "softwareversion", label: "版本", width: "", align: "center" },
        // {
        //   prop: "password",
        //   label: "密码",
        //   width: "",
        //   align: "center",
        //   slot: "password"
        // },
        // { prop: "remark", label: "角色", width: "", align: "center" },
        // { slot: "action" } //操作
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
      searchListApi(temp)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data;
            this.pagination.total = res.total;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //checkbox选择
    changeSelection(data) {
      this.selectList = data;
    },

    init() {
      this.visible = true;
      this.getData();
    },
    //确认
    onSure() {
      // const data = {
      //   dev_id: this.selectList.map(i => i.dev_id),
      // }
      if (this.selectList.length === 0) {
        return  this.$message.warning("请选择添加项!");
      }
      addApi(this.selectList).then(res => {
        if (res.code === 200) {
          this.$message.success("操作成功!");
          this.visible = false;
          this.$emit("getData");
        }
      });
    }
  }
};
</script>

