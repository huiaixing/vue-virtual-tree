<script setup lang="ts">
import VueVirtualLazyTree from "./vueVirtualLazyTree/tree.vue";
import { getSubScope } from "./api/index";
import { ref } from "vue";

const cascadeModelKeys = ref(["深圳市"]);
const defaultExpandKeys = ref(["中国", "广东省"]);

const props = {
  nodeKey: "value",
  value: "value",
  label: "label",
  children: "children",
  isLeaf: "leaf",
  multiple: true,
  emitPath: false,
  lazy: true,
  lazyLoad: (node: any, resolve: any) => lazyLoadFun(node, resolve),
};

const getData = async (value) => {
  const { data } = await getSubScope(value);
  if (data.success) {
    const newRes = data.obj.map((item) => {
      const newData = {
        ...item,
        children: [],
      };
      return newData;
    });
    return newRes;
  }
};

const lazyLoadFun = async (node: any, resolve: any) => {
  const data = await getData(node.key);
  resolve(data);
};
</script>

<!-- 使用 传入height属性开启虚拟模式 -->
<template>
  <div class="tree-wrapper">
    <div style="margin-bottom: 12px">虚拟树-支持懒加载</div>
    <VueVirtualLazyTree
      :props="props"
      :nodeKey="props.nodeKey"
      :load="props.lazyLoad"
      :lazy="props.lazy"
      :default-expanded-keys="defaultExpandKeys"
      :default-checked-keys="cascadeModelKeys"
      height="100%"
      :indent="8"
      :item-size="32"
      show-checkbox
    ></VueVirtualLazyTree>
  </div>
</template>

<style scoped lang="less">
.tree-wrapper {
  width: 50%;
}
.el-tree {
  border: 1px solid rgba(0, 14, 51, 0.15);
  max-height: 500px;
  overflow-y: auto;
}
</style>
