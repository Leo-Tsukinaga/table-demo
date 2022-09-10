<template>
  <div class="app-container">
    <h1>App根组件</h1>
    <hr />
    <MyTable :data="goodslist">
      <template #header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template #body="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.goods_name }}</td>
        <td>￥{{ row.goods_price }}</td>
        <td>
          <input
            type="text"
            class="form-control from-control-sm from-ipt"
            v-if="row.inputVisible"
            v-focus
            v-model.trim="row.inputValue"
            @blur="onInputConfirm(row)"
            @keyup.enter="onInputConfirm(row)"
            @keyup.esc="row.inputValue = ''"
          />
          <button
            type="button"
            class="btn btn-primary btn-sm"
            v-else
            @click="row.inputVisible = true"
          >
            +Tag
          </button>
          <!-- 循环渲染标签信息 -->
          <span
            class="badge badge-pill badge-warning ml-2"
            v-for="item in row.tags"
            :key="item"
          >
            {{ item }}</span
          >
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="onRemove(row.id)"
          >
            删除
          </button>
        </td>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from "./components/my-table/MyTable.vue";
export default {
  name: "MyApp",
  data() {
    return {
      // 商品列表的数据
      goodslist: [],
    };
  },
  components: {
    MyTable,
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get("/api/goods");
      // console.log(res);
      if (res.status !== 0) return console.log("获取商品列表数据失败");
      this.goodslist = res.data;
    },
    // 根据id删除商品
    onRemove(id) {
      this.goodslist = this.goodslist.filter((x) => x.id !== id);
    },
    // 获取用户输入的标签值
    onInputConfirm(row) {
      const val = row.inputValue;
      row.inputValue = "";
      row.inputVisible = false;
      if (!val || row.tags.indexOf(val) !== -1) return;
      row.tags.push(val);
    },
  },
  created() {
    // 发起列表数据请求
    this.getGoodsList();
  },
  directives: {
    focus(el) {
      el.focus();
    },
  },
};
</script>

<style lang="less" scoped>
.from-ipt {
  width: 80px;
  display: inline;
}
</style>
