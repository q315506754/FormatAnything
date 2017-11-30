Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = 'css/img/s.gif';
    Ext.QuickTips.init();

    var ctrlF = new Ext.KeyMap(document, [{
        key: Ext.EventObject.F,
        ctrl: true,
        stopEvent: true,
        fn: function () {
            jsonviewer.ctrlF();
        }
    }, {
        key: Ext.EventObject.H,
        ctrl: true,
        stopEvent: true,
        fn: function () {
            jsonviewer.hideToolbar();
        }
    }]);
    ctrlF.disable();

    var grid = {
        xtype: 'propertygrid',
        id: 'grid',
        region: 'east',
        width: 300,
        split: true,
        listeners: {
            beforeedit: function () {
                return false;
            }
        },
        selModel: new Ext.grid.RowSelectionModel(),
        onRender: Ext.grid.PropertyGrid.superclass.onRender
    };
    var tree = {
        id: 'tree',
        xtype: 'treepanel',
        region: 'center',
        loader: new Ext.tree.TreeLoader(),
        lines: true,
        root: new Ext.tree.TreeNode({text: 'JSON'}),
        autoScroll: true,
        trackMouseOver: false,
        listeners: {
            render: function (tree) {
                tree.getSelectionModel().on('selectionchange', function (tree, node) {
                    jsonviewer.gridbuild(node);
                });

                tree.on('contextmenu',function(node,e){
                    //var selectNode = tree.getSelectionModel().getLastSelected();
                    //	alert(selectNode.data);

                    var menu=new Ext.menu.Menu({
                        minWidth:120,
                        items:[
                            {text:'复制Key',
                                iconCls:'newdep_images',  //样式
                                id:"copyItem",
                                handler:function(){

                                    window.prompt("请复制",node.text.split(":")[0]);
                                }
                            },
                            {text:'复制Value',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    window.prompt("请复制",node.text.split(":")[1]);
                                }
                            } ,
                            {text:'复制Key+Value',
                                iconCls:'newdep_images',  //样式
                                handler:function(){
                                    window.prompt("请复制",node.text);
                                }
                            },{text:'展开所有子节点',
                                iconCls:'newdep_images',  //样式
                                id:"exp_Item",
                                handler:function(){
                                    node.expand(true);
                                    /*node.eachChild(function(child) {
                                    child.expand();
                                    });*/
                                }},
                            {text:'展开所有节点',
                                iconCls:'newdep_images',  //样式
                                id:"exp_All",
                                handler:function(){
                                    tree.getRootNode().expand(true);
                                }},
                            {text:'收起所有子节点',
                                iconCls:'newdep_images',  //样式
                                id:"hide_Item",
                                handler:function(){
                                    node.collapse(true);
                                    /*node.eachChild(function(child) {
                                    child.expand();
                                    });*/
                                }},
                            {text:'收起所有节点',
                                iconCls:'newdep_images',  //样式
                                id:"hide_All",
                                handler:function(){
                                    tree.getRootNode().collapse(true);
                                }}
                        ]
                    })
                    menu.showAt(e.getPoint());
                    var x= '';
                });
            }
        },
        bbar: [
            'Search:',
            new Ext.form.TextField({
                xtype: 'textfield',
                id: 'searchTextField'
            }),
            new Ext.Button({
                text: 'GO!',
                handler:  function () {
                    jsonviewer.searchStart();
                }
            }),
            new Ext.form.Label({
                id: 'searchResultLabel',
                style: 'padding-left:10px;font-weight:bold'
            }), {
                iconCls: Ext.ux.iconCls.get('css/img/arrow_down.png'),
                text: 'Next',
                handler: function () {
                    jsonviewer.searchNext();
                }
            }, {
                iconCls: Ext.ux.iconCls.get('css/img/arrow_up.png'),
                text: 'Previous',
                handler: function () {
                    jsonviewer.searchPrevious();
                }
            }
        ]
    };
    var edit = {
        id: 'edit',
        xtype: 'textarea',
        style: 'font-family:monospace',
        emptyText: '请将数据粘贴到这里!',
        selectOnFocus: true
    };
    var viewerPanel = {
        id: 'viewerPanel',
        layout: 'border',
        title: 'JSON视图',
        items: [tree, grid]
    };
    var textPanel = {
        id: 'textPanel',
        layout: 'fit',
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
            '-',
            {text: '压缩', handler: function () {
                jsonviewer.removeWhiteSpace();
            }},
            {text: '大小写互转', handler: function () {
                var txt = getDataValue();
                if(!toggleCaseMark)
                    txt = txt.toLowerCase();
                else
                    txt = txt.toUpperCase();
                toggleCaseMark = !toggleCaseMark;
                setDataValue(txt);
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
            '->',
            {text: '清空', handler: function(){
                setDataValue("");
            }},
            {text: 'github', handler: function(){
                window.location.href="https://github.com/q315506754/FormatAnything";
            }},
            // {text: '关于', handler: aboutWindow}
        ],
        items: edit
    };
    var vp = new Ext.Viewport({
        layout: 'fit',
        items: {
            xtype: 'tabpanel',
            items: [viewerPanel, textPanel],
            activeTab: 'textPanel',
            listeners: {
                beforetabchange: function (tabpanel, tab) {
                    if (tab.id === 'viewerPanel') {
                        return jsonviewer.check();
                    }
                },
                tabchange: function (tabpanel, tab) {
                    if (tab.id === 'viewerPanel') {
                        ctrlF.enable();
                    } else {
                        ctrlF.disable();
                    }
                }
            }
        }
    });

    var jsonviewer = jsonviewerGenerator();
});

