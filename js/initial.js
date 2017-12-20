var jsonviewer ;//全局helper
Ext.onReady(function () {
    Ext.BLANK_IMAGE_URL = 'css/img/s.gif';
    Ext.QuickTips.init();

    //key shots
    var keyshots = [generateJSONViewKeyshot(jsonviewer),generateDataViewKeyshot()];

   //主视图
    new Ext.Viewport({
        layout: 'fit',
        items: {
            xtype: 'tabpanel',
            items: [generateJsonViewPanel(), generateDataPanel()],
            activeTab: 'textPanel',
            listeners: {
                beforetabchange: function (tabpanel, tab) {
                    for(var i =0;i<keyshots.length;i++){
                        var one = keyshots[i];
                        if (tab.id === one.pannel && one.beforetabchange) {
                            return one.beforetabchange(tabpanel, tab)
                        }
                    }
                },
                tabchange: function (tabpanel, tab) {
                    for(var i =0;i<keyshots.length;i++){
                        var one = keyshots[i];
                        if (tab.id === one.pannel ) {
                            if(one.tabchange){
                                one.tabchange(tabpanel, tab);
                            }
                            one.hnd.enable();
                        }else{
                            one.hnd.disable();
                        }
                    }
                }
            }
        }
    });

    //helper  必须放后面
     jsonviewer = jsonviewerGenerator();

     HistoryBox.record(_config.lastContent);
});

function generateJSONViewKeyshot() {
    var ctrlF= new Ext.KeyMap(document, [{
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

    return {
        pannel:'viewerPanel',
        hnd:ctrlF,
        beforetabchange:function (tabpanel, tab) {
            return jsonviewer.check();
        },
        tabchange: function (tabpanel, tab) {
            //展开全部
            Ext.getCmp('tree').getRootNode().expand(true);
        }
    };
}
function generateDataViewKeyshot() {
    var ctrlF= new Ext.KeyMap(document, [{
        key: Ext.EventObject.Z,
        ctrl: true,
        stopEvent: true,
        fn: _undo
    }, {
        key: Ext.EventObject.Y,
        ctrl: true,
        stopEvent: true,
        fn: _redo
    }, {
        key: Ext.EventObject.E,
        ctrl: true,
        stopEvent: true,
        fn: _clear
    }, {
        key: Ext.EventObject.R,
        ctrl: true,
        stopEvent: true,
        fn: _remainFirstLine
    }, {
        key: Ext.EventObject.G,
        ctrl: true,
        stopEvent: true,
        fn: openConfigWindow
    }

    ]);

    return {
        pannel:'textPanel',
        hnd:ctrlF,
        beforetabchange:function (tabpanel, tab) {

        },
        tabchange: function (tabpanel, tab) {

        }
    };
}