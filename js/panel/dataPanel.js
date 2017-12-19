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
        // emptyText: '请将数据粘贴到这里!',
        emptyText: '',
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
                            {text:'清空    (ctrl+E)',
                                iconCls:'newdep_images',  //样式
                                id:"copyItem",
                                handler:_clear
                            },
                            {text:'只保留第一行 (ctrl+R)',
                                iconCls:'newdep_images',  //样式
                                handler:_remainFirstLine
                            },
                            {text:'撤销 (ctrl+Z)',
                                handler:_undo
                            },
                            {text:'重做 (ctrl+Y)',
                                handler:_redo
                            },
                            '-',
                            {
                                text: '插入模板',
                                menu: {        // <-- submenu by nested config object
                                    items: template_menu
                                }
                            } ,
                            {
                                text: '插入代码片段',
                                menu: {        // <-- submenu by nested config object
                                    items: codesnippet_menu
                                }
                            } ,
                            '-',
                            {text:'周报格式化',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    formatWeeklyReportForDataArea();
                                }
                            },
                            {text:'周报去序号',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    deleteNumberWeeklyReportForDataArea();
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
            // 'blur': {
            //     fn: function(t){
            //         recordCurrentData();
            //     }
            // },
            'keyup': {
                fn: function(t){
                    // console.log(arguments);
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

                    //记录
                    // let dataValue = getDataValue();
                    // if(dataValue.endsWith("\n") || dataValue.endsWith(" ")){
                    recordCurrentData();
                    // }
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
            {text: '去空行', handler: function () {
                getAndSetDataValue(function (txt) {
                    return txt.replace(/\s*\n{2,}/g,"\n");
                    // return txt.replace(/^\s*$/mg,"").replace(/\n{2,}/g,"\n");
                });
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
            // {text: 'github', handler: function(){
            //     window.location.href="https://github.com/q315506754/FormatAnything";
            // }},
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