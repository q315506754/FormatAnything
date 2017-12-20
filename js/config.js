var _config = {lastContent:"",codeMode:"1"}


var $ = {
    extend : function(target, options) {
        for (name in options) {
            target[name] = options[name];
        }
        return target;
    }
};

try {
    $.extend(_config,localStorage);

    window.onunload=function () {
        _config.lastContent = getDataValue()
        $.extend(localStorage,_config)
    }

} catch (e) {
}

function openConfigWindow() {

    // tabs for the center
    var tabs = new Ext.TabPanel({
        region    : 'center',
        margins   : '3 3 3 0',
        activeTab : 0,
        defaults  : {
            autoScroll : true
        },
        items     : [{
            title    : 'Bogus Tab',
            html     : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },{
            title    : 'Closable Tab',
            html     :  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            closable : false
        }]
    });


    var simple = new Ext.FormPanel({
        labelWidth: 110, // label settings here cascade unless overridden
        url:'save-form.php',
        frame:true,
        // title: 'Simple Form',
        bodyStyle:'padding:0 10px 0;',
        // width: 350,
        // defaults: {width: 230},
        // defaultType: 'checkbox',
        // layout: 'column',
        border: false,
        defaults: {
            columnWidth: '.5',
            border: false
        },
        labelWidth: 110,
        items: [{
            bodyStyle: 'padding-right:5px;',
            items:         {
                xtype:'fieldset',
                title: '周报设置',
                autoHeight: true,
                defaultType: 'radio',  // each item will be a checkbox
                items: [
                //     {
                //     xtype: 'textfield',
                //     name: 'txt-test1',
                //     fieldLabel: 'Alignment Test'
                //
                // },
                    {
                    checked: _config.codeMode == '1',
                    fieldLabel: '分组编号设置',
                    boxLabel: '继续编号',
                    name: 'codeMode',
                    inputValue:"1",
                    handler: function (obj,val) {
                        // console.log('aaaaaaaa');
                        // console.log(arguments);
                        if(val){
                            _config.codeMode = '1';
                        }
                    }
                },{
                    checked: _config.codeMode == '2',
                    fieldLabel: '',
                    labelSeparator: '',
                    inputValue:"2",
                    boxLabel: '重新编号',
                    name: 'codeMode',
                    handler: function (obj,val) {
                        // console.log('bbbbbbbbb');
                        // console.log(arguments);
                        if(val){
                            _config.codeMode = '2';
                        }
                    }
                }]
            }
        }
        ]
    });

    var win = new Ext.Window({
        title    : '配置页面',
        closable : true,
        width    : 600,
        height   : 350,
        //border : false,
        // plain    : true,
        layout   : 'fit',
        items    : [ simple]
    });

    // Ext.get('show-btn')
    win.show();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        _config
    };
}