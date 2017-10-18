## MuxiUI Website

本仓库是MUI的文档站点。为了快速开发，暂时不包含构建流程，代码都在`index.html`中。

在目录下运行`http-server`即可开发。

***

这个仓库也用于MuxiUI的开发。

开发MUI时，请注意讲script下面两行注释，使用上方的本地构建版。在提交时请注释上面两行，使用下面两行。

```
    <!-- use this during local development -->
    <script src="http://localhost:9000/dist/main.js"></script>
    <script src="http://localhost:9000/dist/style.js"></script>
   
    <!-- do not use this during local development, this is used for gh-pages-->
	 <!-- <script src="./dist/main.js"></script>
	 <script src="./dist/style.js"></script> -->
```
