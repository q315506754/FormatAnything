var _preview_helper = {
    mode: "",
    htmlLastTime: -1,
    htmlRefreshInterval: 500,
    html:function () {
        this.mode= "html"
    },
    markdown:function () {
        this.mode= "md"
    },
    isMarkdownMode:function () {
        return this.mode==="md"
    },
    isHtmlMode:function () {
        return this.mode==="html"
    },
};

function generateDataPanel() {
    // Create these explicitly so we can manipulate them later
    var lineCount = new Ext.Toolbar.TextItem('Lines: 0');
    var wordCount = new Ext.Toolbar.TextItem('Words: 0');
    var charCount = new Ext.Toolbar.TextItem('Chars: 0');

    // Panel for the west
    var lineNumber = new Ext.Panel({
        // title       : 'Navigation',
        region      : 'west',
        // split       : true,
        width       : 0, //TODO
        // width       : 20,
        // collapsible : true,
        // margins     : '3 0 3 3',
        // cmargins    : '3 3 3 3'

    });

    // Panel for the west
    var previewPanel = new Ext.Panel({
        id:"previewContainer",
        title       : '预览',
        region      : 'east',
        split       : true,
        // width       : 0, //TODO
        width       : '50%',
        collapsible : true,
        collapsed:true,
        // autoWidth:true,
        closable : true,
        html     : "",
        autoScroll:true,
        // margins     : '3 0 3 3',
        // cmargins    : '3 3 3 3'
        listeners: {
            'beforeexpand':function () {
                refreshPreview();
            }
        }
    });

    function refreshPreview() {
        if(_preview_helper.isMarkdownMode()){
            previewPanel.body.update(markdown.toHTML( getDataValue() ));
        }
        //间隔
        if(_preview_helper.isHtmlMode() && (new Date().getTime() - _preview_helper.htmlLastTime > _preview_helper.htmlRefreshInterval)){
            previewPanel.body.update(getDataValue());
            _preview_helper.htmlLastTime = new Date().getTime();
        }
    }

    var edit = {
        id: 'edit',
        xtype: 'textarea',
        region      : 'center',
        style: 'font-family:monospace',
        emptyText: '请将数据粘贴到这里!',
        selectOnFocus: true,
        enableKeyEvents: true,//必须 不然keypress keyup不会调用
        // initComponent:function () {
        //     // console.log(this);
        //     // this.addEvents("contextmenu");
        //
        //     //当然我们也可以让他租用在el的鼠标右键事件中
        //     this.on("contextmenu",function(e){
        //         //menu.showAt(e.getXY());
        //         e.stopEvent();
        //         //e.getXY();
        //     });
        // },
        listeners: {
            render: function (tree) {
                tree.el.dom.oncontextmenu = function (e) {
                    e.preventDefault();

                    var menu=new Ext.menu.Menu({
                        minWidth:120,
                        items:[
                            {text:'清空',
                                iconCls:'newdep_images',  //样式
                                id:"copyItem",
                                handler:function(){
                                    setDataValue("");
                                    getDataEle().focus();
                                }
                            },
                            {text:'只保留第一行',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    getAndSetDataValue(function (str) {
                                        if (!isEmpty(str)){
                                            return str.split("\n")[0];
                                        }
                                        return "";
                                    });
                                }
                            },
                            '-',
                            {text:'插入json',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    setDataValue(JSON.stringify({"name":"FormatAnyhing","url":"https://q315506754.github.io/FormatAnyhing/","page":88,"isNonProfit":true,"address":{"street":"漕河泾开发区.","city":"上海","country":"中国"},"links":[{"name":"Google","url":"http://www.google.com"},{"name":"Baidu","url":"http://www.baidu.com"},{"name":"SoSo","url":"http://www.SoSo.com"}]}));
                                    jsonviewer.format();
                                }
                            } ,
                            {text:'插入html',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    setDataValue("\n" +
                                        "<html><head><title>Apache Tomcat/7.0.62 - Error report</title><style><!--H1 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:22px;} H2 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:16px;} H3 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:14px;} BODY {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} B {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;} P {font-family:Tahoma,Arial,sans-serif;background:white;color:black;font-size:12px;}A {color : black;}A.name {color : black;}HR {color : #525D76;}--></style> </head><body><h1>HTTP Status 404 - /teachercolumn/aa.jsp</h1><HR size=\"1\" noshade=\"noshade\"><p><b>type</b> Status report</p><p><b>message</b> <u>/teachercolumn/aa.jsp</u></p><p><b>description</b> <u>The requested resource is not available.</u></p><HR size=\"1\" noshade=\"noshade\"><h3>Apache Tomcat/7.0.62</h3></body></html>");
                                }
                            },
                            {text:'插入markdown',
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
                            {text:'插入周报',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    setDataValue(
                                        "PROJECTNAME-PROJECTCONTENT(#????,??.??完成,??.??提测,??.??上线)——负责人"
                                        +"\n"+ "PROJECTNAME-PROJECTCONTENT(#????,??.??完成,??.??提测,??.??上线)——负责人,负责人"
                                        +"\n"+ "CodeReview-PROJECTNAME-REVIEWCONTENT(??.??完成)——负责人,负责人"
                                        );
                                    formatWeeklyReportForDataArea();
                                }
                            },
                            '-',
                            {text:'周报格式化',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    // setDataValue("");
                                    // getDataEle().focus();
                                    // getAndSetDataValue(function (str) {
                                    //     if (!isEmpty(str)){
                                    //         return str.split("\n")[0];
                                    //     }
                                    //     return "";
                                    // });
                                    // var str = getDataValue();
                                    // var strArr=new Array();
                                    formatWeeklyReportForDataArea();
                                    // setDataValue(lastStr);
                                }
                            }
                        ]
                    });
                    // menu.showAt({x:111,y:221});
                    menu.showAt(new Ext.lib.Point(e.pageX, e.pageY));
                    // console.log(e);
                    // menu.showAt(e.getPoint());
                };
            },
            'keyup': {
                fn: function(t){
                    var v = t.getValue(),
                        wc = 0, cc = v.length ? v.length : 0;

                    if(cc > 0){
                        wc = v.match(/\b/g);
                        wc = wc ? wc.length / 2 : 0;
                    }

                    Ext.fly(lineCount.getEl()).update('Lines: '+v.split('\n').length);
                    Ext.fly(wordCount.getEl()).update('Words: '+wc);
                    Ext.fly(charCount.getEl()).update('Chars: '+cc);

                    //实时预览
                    // if (_preview_helper.isMarkdownMode() && !previewPanel.collapsed){
                    //     previewPanel.body.update(markdown.toHTML( getDataValue() ));
                    // }
                    refreshPreview();
                },
                buffer: 1 // buffer to allow the value to update first
            }
        }
    };


    var textPanel = {
        id: 'textPanel',
        // layout: 'fit',
        layout: 'border',
        title: '数据',
        tbar: [
            // {text: '粘贴', handler: function () {
            // 	jsonviewer.pasteText();
            // }},
            // {text: '复制', handler: function () {
            // 	jsonviewer.copyText();
            // }},
            // '-',
            {text: 'JSON格式化', handler: function () {
                jsonviewer.format();
            }},
            // '-',
            {text: 'JSON格式化(\\n\\t)', handler: function () {
                jsonviewer.formatExt();
            }},
            // '-',
            {text: 'html格式化', handler: function () {
                jsonviewer.formatHtml();
            }},
            {text: '压缩', handler: function () {
                jsonviewer.removeWhiteSpace();
            }},
            '-',
            '-',
            {text: '大小写互转', handler: function () {
                toggleCaseExecute(function () {
                    getAndSetDataValue(function (txt) {
                        return txt.toUpperCase();
                    });
                },function () {
                    getAndSetDataValue(function (txt) {
                        return txt.toLowerCase();
                    });
                });
            }},
            {text: 'Unicode互转', handler: function () {
                var txt = getDataValue();
                // if(txt.indexOf("u")>0)
                if(/\\u\d{4}/.test(txt)>0)
                    txt = u2h(txt);
                else
                    txt = h2u(txt);
                setDataValue(txt);
            }},
            {text: '中英符号互转', handler: function () {
                toggleCaseExecute(function () {
                    getAndSetDataValue(function (txt) {
                        return cnChar2EnChar(txt);
                    });
                },function () {
                    getAndSetDataValue(function (txt) {
                        return enChar2CnChar(txt);
                    });
                });
            }},
            {text: 'Url En&Decode', handler: function () {
                var txt = getDataValue();
                if(txt.indexOf("%")<0)
                    txt = encodeURIComponent(txt);
                // txt = encodeURI(txt);
                else
                    txt = decodeURIComponent(txt);
                // txt = decodeURI(txt);
                setDataValue(txt);
            }},
            // {text: '压缩&转义', handler: function () {
            // 	jsonviewer.removeWhiteSpace2();
            // }},
            // {text: '去除转义', handler: function () {
            // 	jsonviewer.removeZhuanyi();
            // }},
            '-',
            '-',
            {text: 'MD5', handler: function () {
                executeCmdForLastLine(function (lastL) {
                    return CryptoJS.MD5(lastL);
                },"MD5");
            }},
            {text: 'SHA', handler: function () {
                executeCmdForLastLine(function (lastL) {
                    return "sha1  :"+CryptoJS.SHA1(lastL)
                        + '\n' + "sha256:"+CryptoJS.SHA256(lastL)
                        + '\n' + "sha512:"+CryptoJS.SHA512(lastL)
                        ;
                },"SHA");
            }},
            {text: 'BASE64+',  handler: function () {
                executeCmdForLastLine(function (lastL) {
                    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(lastL));
                },"BASE64(UTF8)加密");
            }},
            '-',
            '-',
            {text: 'html预览',  handler: function () {
                // console.log(previewPanel);
                // previewPanel.close();
                // previewPanel.width = 0;
                // previewPanel.width.update(0) ;
                // previewPanel.setWidth(600) ;
                // previewPanel.setCollapsed(false) ;
                _preview_helper.html();

                // previewPanel.body.update(getDataValue());
                // console.log(previewPanel.collapsed);
                previewPanel.collapsed?previewPanel.expand():previewPanel.collapse();

            }},
            {text: 'markdown预览',  handler: function () {
                // console.log(previewPanel);
                // previewPanel.close();
                // previewPanel.width = 0;
                // previewPanel.width.update(0) ;
                // previewPanel.setWidth(600) ;
                // previewPanel.setCollapsed(false) ;
                _preview_helper.markdown();

                // previewPanel.body.update(markdown.toHTML( getDataValue() ));
                // console.log(previewPanel.collapsed);
                previewPanel.collapsed?previewPanel.expand():previewPanel.collapse();
            }},
            '->',
            {text: '清空', handler: function(){
                setDataValue("");
            }},
            {text: 'github', handler: function(){
                window.location.href="https://github.com/q315506754/FormatAnything";
            }},
            // {text: '关于', handler: aboutWindow}
        ],
        items: [edit,lineNumber,previewPanel],
        bbar: new Ext.StatusBar({
            id: 'word-status',
            statusAlign: 'right', // the magic config
            // These are just the standard toolbar TextItems we created above.  They get
            // custom classes below in the render handler which is what gives them their
            // customized inset appearance.
            items: [lineCount,' ', wordCount, ' ', charCount, ' ']
        })

    };
    return textPanel;
    // return {
    //     id: 'dataAreaPanel',
    //     layout: 'border',
    //     title: '数据视图',
    //     items: [textPanel]
    // };
}