// 导入组件，组件必须声明 name
import EgButton from "./src";
// 为组件提供 install 安装方法，供按需引入
EgButton.install = function (Vue) {
  Vue.component(EgButton.name, EgButton);
};
// 导出组件
export default EgButton;
