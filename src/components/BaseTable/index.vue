<template>
  <div>
    <el-table
      border
      ref="elTale"
      :data="tableDate"
      :stripe="stripe"
      :height="tableHeight"
      :max-height="maxheight"
      :size="size"
      header-cell-name="table-list-header"
      row-class-name="table-list-row"
      @selection-change="handelSeletionChange"
      @current-change="handelTalCurrentChange"
      @row-click="handelRowClick"
      @select="handSelect"
      v-bind="otherConfig"
      :row-key="rowKeyId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <template v-for="(prop, index) in columns">
        <!-- 判斷是否有選擇框 -->
        <el-table-column
          v-if="prop.selection"
          type="selection"
          width="50"
          :fixed="prop.fixed"
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
          :key="'selecton_' + index"
          :selectable="selectable"
        />
        <!-- 序號 -->
        <el-table-column
          v-else-if="prop.index"
          type="index"
          width="50"
          label="序号"
          :fixed="prop.fixed"
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
          :key="'index_' + index"
        />
        <!-- 插槽 -->
        <slot
          v-else-if="prop.slot"
          show-overflow-tooltip
          :name="prop.slot"
          :fixed="prop.fixed"
          :height="prop.height"
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
        />
        <!-- 多级表头 -->
        <el-table-column
          v-else-if="prop.children"
          show-overflow-tooltip
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
          :label="prop.label"
          :key="'multi_' + index"
        >
          <el-table-column
            show-overflow-tooltip
            v-for="(child, childIndex) in prop.children"
            :key="'child' + index + '_' + childIndex"
            v-bind="child"
          ></el-table-column>
        </el-table-column>
        <!-- 字典数据处理 -->
        <el-table-column
          v-else-if="prop.dictName"
          v-bind="prop"
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
          :key="'index_' + index"
        >
          <template slot-scope="{row}">{{row[prop.prop] | filterDict(prop.dictName)}}</template>
        </el-table-column>
        <el-table-column
          v-else
          show-overflow-tooltip
          v-bind="prop"
          :align="prop.align"
          :header-align="prop.headerAlign ? prop.headerAlign : prop.align"
          :min-width="prop.minWidth"
          :key="'normal_' + index"
        />
      </template>
      <template #empty>
        <img src="@/assets/base/void.png" alt>
      </template>
    </el-table>

    <div class="flex-end mt-10" v-if="isPagintionShow && pagination.total">
      <!--  layout="total, sizes, prev, pager, next, jumper" -->
      <el-pagination
        class="opagination mt12"
        background
        :layout="layout"
        :page-sizes="[10, 15, 20, 50, 100]"
        :current-page.sync="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        @size-change="handelSizeChange"
        @current-change="handelCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import baseTableMixins from "./base-table-mixins";

const dictList = JSON.parse(localStorage.getItem("dict"));
export default {
  mixins: [baseTableMixins],
  props: ["temp"],
  data() {
    return {};
  },

  watch: {
    tableData() {
      this.$refs.elTale.$refs.bodyWarpper.sctollTop = 0;
    }
  },
  methods: {
    //切换选择
    handelSeletionChange(value) {
      this.$emit("changeSelection", value);
    },
    //单选
    handelTalCurrentChange(row) {
      this.$emit("changeCurrent", row);
    },
    //点击行
    handelRowClick(row) {
      this.$emit("rowClick", row);
    },

    //手动选择checkbox
    handSelect(select, row) {
      this.$emit("handSelect", row);
    },

    //切换页码
    handelCurrentChange(value) {
      this.pagination.current = value;
      this.$emit("getData");
    },
    //切换每页条数
    handelSizeChange(value) {
      this.pagination.size = value;
      this.$emit("getData");
    },
    //
    selectable(row, index) {
      // this.$emit("selectable",row)
      const ids = Array.isArray(this.temp)
        ? this.temp.map(item => item.id)
        : [];
      return !ids.includes(row.id);
    }
  },

  filters: {
    filterDict(val, dictName) {
      let list = dictList[dictName] || [];
      let info = list.find(item => item.code == val) || {};
      return info.name || "--";
    }
  }
};
</script>



