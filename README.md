# VueVirtualLazyTree
## 介绍

vue3版本 基于 element-plus 和 vue-virtual-scroller 实现的支持懒加载的虚拟树组件
element-plus已经支持虚拟树了 但是无法支持懒加载 在特别大数据量情况下后台无法一次性拼接所有树结构数据 所以还是需要懒加载功能 普通的el-tree即使使用了懒加载 但是在大数据量情况下 DOM节点暴增 勾选顶级节点后会大量重绘 导致浏览器卡顿 所以需要实现虚拟树+懒加载 解决大数据量情况下卡顿的问题

## 使用

Install:

```bash
# 安装
npm install vue-virtual-lazy-tree --save
```

Then:

```javascript
// main.js
import VueVirtualLazyTree from 'vue-virtual-lazy-tree';
import 'vue-virtual-lazy-tree.css';

app.use(VueVirtualLazyTree.install(app));

// 具体demo可见app.vue
const lazyLoadFun = async (node: any, resolve: any) => {
  // 后台获取数据方法
  const data = await getData(node.key);
  resolve(data);
};

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
```


## 说明

```
其余属性可参考element-plus官网
```


