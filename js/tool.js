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
function getAndSetDataValue(cmd) {
    setDataValue(cmd(getDataValue()));
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
            appendDataValue("-------------"+promt+" for last line--------------");
        }
        appendDataValue(cmd(lastL));
    }
}
function toggleCaseExecute(cmd1,cmd2) {
    if(toggleCaseMark)
        cmd1();
    else
        cmd2();
    toggleCaseMark = !toggleCaseMark;
}

if (typeof  window != "undefined"){
    // tab -> "    "
    window.onload=function(){
        var oTxt = document.getElementById("edit");
        oTxt.onkeydown = function (ev) {
            var oEvent = ev || event;
            //tab
            if (oEvent.keyCode == 9) {
                if (oEvent.preventDefault) {
                    oEvent.preventDefault();
                }
                else {
                    window.event.returnValue = false;
                }
                oTxt.value += "    "; //这里放入了4个空格
            }

        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isEmpty
    };
}