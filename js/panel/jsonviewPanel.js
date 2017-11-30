function generateJsonViewPanel(){
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

   return {
        id: 'viewerPanel',
        layout: 'border',
        title: 'JSON树视图',
        items: [tree, grid]
    };
}