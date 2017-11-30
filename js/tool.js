var toggleCaseMark = true;


function getDataEle() {
    var edit = Ext.getCmp('edit');
    return edit;
}
function getDataValue() {
    return getDataEle().getValue();
}
function setDataValue(txt) {
    return getDataEle().setValue(txt);
}
function appendDataValue(txt) {
    return getDataEle().setValue(getDataValue()+'\n'+txt);
}
function getDataLastLineValue() {
    var total = getDataEle().getValue();
    var arr  = total.split("\n");
    for(var i = arr.length-1;i>=0;i--) {
        if(!isEmpty(arr[i])){
            return arr[i].trim();
        }
    }
}
function isEmpty(str) {
    return str == undefined || str == null || /^\s*$/.test(str)
}
function executeCmdForLastLine(cmd,promt) {
    var lastL = getDataLastLineValue();
    if(lastL) {
        if(promt){
            appendDataValue("-------------after "+promt+"--------------");
        }
        appendDataValue(cmd(lastL));
    }
}