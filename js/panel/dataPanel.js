function generateDataPanel() {
    var edit = {
        id: 'edit',
        xtype: 'textarea',
        style: 'font-family:monospace',
        emptyText: '请将数据粘贴到这里!',
        selectOnFocus: true,
        listeners: {
            render: function (tree) {
                console.log(arguments);
                tree.on('contextmenu',function(node,e){
                    console.log('aaa');
                });
            },
            // contextmenu:function(node,e){
            //     console.log('aaaxxx');
            // }
        }
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
    return textPanel;
}