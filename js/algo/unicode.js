if(!"trim" in String.prototype)
    String.prototype.trim=function()
    {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }

var GB2312UnicodeConverter={
    ToUnicode:function(str){
        var txt= escape(str).toLocaleLowerCase().replace(/%u/gi,'\\u');
        //var txt= escape(str).replace(/([%3F]+)/gi,'\\u');
        return txt.replace(/%7b/gi,'{').replace(/%7d/gi,'}').replace(/%3a/gi,':').replace(/%2c/gi,',').replace(/%27/gi,'\'').replace(/%22/gi,'"').replace(/%5b/gi,'[').replace(/%5d/gi,']').replace(/%3D/gi,'=').replace(/%20/gi,' ').replace(/%3E/gi,'>').replace(/%3C/gi,'<').replace(/%3F/gi,'?').replace(/%5c/gi,'\\');//
    }
    ,ToGB2312:function(str){
        return unescape(str.replace(/\\u/gi,'%u'));
    }
};

//Unicode转中文
function u2h(text){
    text = text.trim();
    // text = text.replace(/\u/g,"");
    return  GB2312UnicodeConverter.ToGB2312(text);
}

//中文转Unicode
function h2u(text){
    // text = text.replace(/\u/g,"");
    return  GB2312UnicodeConverter.ToUnicode(text);
}

//中文符号转英文符号
function cnChar2EnChar(str){
    str = str.replace(/\’|\‘/g,"'").replace(/\“|\”/g,"\"");
    str = str.replace(/\【/g,"[").replace(/\】/g,"]").replace(/\｛/g,"{").replace(/\｝/g,"}");
    str = str.replace(/，/g,",").replace(/：/g,":").replace(/；/g,";");
    return str;
}
//英文符号转中文符号
function enChar2CnChar(str){
    // str = str.replace(/\’|\‘/g,"'").replace(/\“|\”/g,"\"");
    str = str.replace(/\[/g,"【").replace(/\]/g,"】").replace(/\{/g,"｛").replace(/\}/g,"｝");
    str = str.replace(/,/g,"，").replace(/:/g,"：").replace(/;/g,"；");
    return str;
}
