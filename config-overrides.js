const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  //按需打包 用react-app-rewired替换react-script并加装config-overrides
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);
