var jsonviewer ;//全局helper
Ext.onReady(function () {
    Ext.BLANK_IMAGE_URL = 'css/img/s.gif';
    Ext.QuickTips.init();

    //key shot
    var ctrlF = generateKeyshot(jsonviewer);

   //主视图
    new Ext.Viewport({
        layout: 'fit',
        items: {
            xtype: 'tabpanel',
            items: [generateJsonViewPanel(), generateDataPanel()],
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

    //helper  必须放后面
     jsonviewer = jsonviewerGenerator();
});

function generateKeyshot() {
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
    return ctrlF;
}