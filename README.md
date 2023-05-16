## i18n-xlsx
> 国际化词条处理工具, 实现 js 与 xlsx 互相转换。

> A tool for i18n js/xlsx bidirectional convert, project code Rosetta.

#### Feature
* 将 js 与 xlsx 转化为标准国际化配置对象；
* 可根据 js 词条文件层级目录生成 excel sheet；
* 可根据 xlsx 还原 js 目录结构。

Excel 表格形如:

label | zh-CN | en | es
---|---|---|---
userCenter.title|用户中心|User Center|Centro de usuario
userCenter.subTitle|个人信息|Personal Information|Informacion personal
userCenter.changePassTitle|修改密码|Modify Password|Cambiar contraseña
...|||

JS 目录结构为：

```
input(or output)/
├─ zh-CN.js
├─ en.js
├─ foo/
│  ├─ zh-CN.js
│  ├─ en.js
```

#### Usage
1. 安装依赖；

  `yarn install`

1. 将词条文件（js 或 xlsx）拷贝至 input 目录，执行命令：

  `node .\tasks\toJs.js // Xlsx 转换为 Js` 
  
  `node .\tasks\toXlsx.js // Js 转换为 Xlsx`

1. 在 output 目录中查看输出结果；

2. (可选)vscode 安装Format Files插件；右键 output 菜单，批量格式化词条文件，去除JSON转化产生的""。

#### WIP
* 更直观的参数配置
* 词条变更比对
