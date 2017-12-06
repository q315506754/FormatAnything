var template_menu =[
    // stick any markup in a menu
    // '<b class="menu-title">请选择一项</b>',
    {
        text:'JSON',
        handler:function(){
            setDataValue(JSON.stringify({"name":"FormatAnyhing","url":"https://q315506754.github.io/FormatAnyhing/","page":88,"isNonProfit":true,"address":{"street":"漕河泾开发区.","city":"上海","country":"中国"},"links":[{"name":"Google","url":"http://www.google.com"},{"name":"Baidu","url":"http://www.baidu.com"},{"name":"SoSo","url":"http://www.SoSo.com"}]}));
            jsonviewer.format();
        }
    },
    {    text:'html',
        handler:function(){
            setDataValue(
                "<html><head><title>Apache Tomcat/7.0.62 - Error report</title><style><!--H1 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:22px;} H2 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:16px;} H3 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:14px;} BODY {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} B {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;} P {font-family:Tahoma,Arial,sans-serif;background:white;color:black;font-size:12px;}A {color : black;}A.name {color : black;}HR {color : #525D76;}--></style> </head><body><h1>HTTP Status 404 - /teachercolumn/aa.jsp</h1><HR size=\"1\" noshade=\"noshade\"><p><b>type</b> Status report</p><p><b>message</b> <u>/teachercolumn/aa.jsp</u></p><p><b>description</b> <u>The requested resource is not available.</u></p><HR size=\"1\" noshade=\"noshade\"><h3>Apache Tomcat/7.0.62</h3></body></html>");
        }
    },
    {text:'markdown',
        iconCls:'newdep_images',  //样式
        handler:function(){
            setDataValue("# Dillinger\n" +
                "\n" +
                "[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n" +
                "\n" +
                "Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\n" +
                "\n" +
                "  - Type some Markdown on the left\n" +
                "  - See HTML in the right\n" +
                "  - Magic\n" +
                "\n" +
                "# New Features!\n" +
                "\n" +
                "  - Import a HTML file and watch it magically convert to Markdown\n" +
                "  - Drag and drop images (requires your Dropbox account be linked)\n" +
                "\n" +
                "\n" +
                "You can also:\n" +
                "  - Import and save files from GitHub, Dropbox, Google Drive and One Drive\n" +
                "  - Drag and drop markdown and HTML files into Dillinger\n" +
                "  - Export documents as Markdown, HTML and PDF\n" +
                "\n" +
                "Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]\n" +
                "\n" +
                "> The overriding design goal for Markdown's\n" +
                "> formatting syntax is to make it as readable\n" +
                "> as possible. The idea is that a\n" +
                "> Markdown-formatted document should be\n" +
                "> publishable as-is, as plain text, without\n" +
                "> looking like it's been marked up with tags\n" +
                "> or formatting instructions.\n" +
                "\n" +
                "This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.\n" +
                "\n" +
                "### Tech\n" +
                "\n" +
                "Dillinger uses a number of open source projects to work properly:\n" +
                "\n" +
                "* [AngularJS] - HTML enhanced for web apps!\n" +
                "* [Ace Editor] - awesome web-based text editor\n" +
                "* [markdown-it] - Markdown parser done right. Fast and easy to extend.\n" +
                "* [Twitter Bootstrap] - great UI boilerplate for modern web apps\n" +
                "* [node.js] - evented I/O for the backend\n" +
                "* [Express] - fast node.js network app framework [@tjholowaychuk]\n" +
                "* [Gulp] - the streaming build system\n" +
                "* [Breakdance](http://breakdance.io) - HTML to Markdown converter\n" +
                "* [jQuery] - duh\n" +
                "\n" +
                "And of course Dillinger itself is open source with a [public repository][dill]\n" +
                " on GitHub.\n" +
                "\n" +
                "### Installation\n" +
                "\n" +
                "Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n" +
                "\n" +
                "Install the dependencies and devDependencies and start the server.\n" +
                "\n" +
                "```sh\n" +
                "$ cd dillinger\n" +
                "$ npm install -d\n" +
                "$ node app\n" +
                "```\n" +
                "\n" +
                "For production environments...\n" +
                "\n" +
                "```sh\n" +
                "$ npm install --production\n" +
                "$ NODE_ENV=production node app\n" +
                "```\n" +
                "\n" +
                "### Plugins\n" +
                "\n" +
                "Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.\n" +
                "\n" +
                "| Plugin | README |\n" +
                "| ------ | ------ |\n" +
                "| Dropbox | [plugins/dropbox/README.md] [PlDb] |\n" +
                "| Github | [plugins/github/README.md] [PlGh] |\n" +
                "| Google Drive | [plugins/googledrive/README.md] [PlGd] |\n" +
                "| OneDrive | [plugins/onedrive/README.md] [PlOd] |\n" +
                "| Medium | [plugins/medium/README.md] [PlMe] |\n" +
                "| Google Analytics | [plugins/googleanalytics/README.md] [PlGa] |\n")
        }
    },
    {text:'教师团队周报',
        iconCls:'newdep_images',  //样式
        handler:function(){
            setDataValue(
                "PROJECTNAME-PROJECTCONTENT(#????,??.??完成,??.??提测,??.??上线)——负责人"
                +"\n"+ "PROJECTNAME-PROJECTCONTENT(#????,??.??完成,??.??提测,??.??上线)——负责人,负责人"
                +"\n"+ "CodeReview-PROJECTNAME-REVIEWCONTENT(??.??完成)——负责人,负责人"
            );
            formatWeeklyReportForDataArea();
        }
    }
];