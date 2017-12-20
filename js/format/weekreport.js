function formatWeeklyReportForDataArea() {
    getAndSetDataValue(function (str) {
        return formatWeeklyReport(str);
    })
}
function deleteNumberWeeklyReportForDataArea() {
    getAndSetDataValue(function (str) {
        return formatWeeklyReportForDeletingNumber(str);
    })
}

function formatWeeklyReportForDeletingNumber(str) {
    var realArr = arrayTrimOfWeeklyReport(str);
    var lastStr = "";

    if (realArr) {
        for(var i=0;i<realArr.length;i++){
            var groupArr = realArr[i];

            if(groupArr.length == 0){
                lastStr+='\n';
            } else {
                for(var j=0;j<groupArr.length;j++){
                    var groupLine = groupArr[j];

                    lastStr=lastStr+groupLine;
                    //最后一行不加换行
                    if (i==realArr.length-1 && j==groupArr.length-1) {
                    }else {
                        lastStr=lastStr+'\n';
                    }
                }
            }

        }
    }
    return lastStr;
}

function fillSpacePrefix(str, totalLength) {
    while (str.length <totalLength) {
        str = " "+str;
    }
    return str;
}


function isEmptyArray(arr) {
    if(!arr){
        return true;
    }
    if(arr.length == 0) {
        return true;
    }
    return false;
}

var WEEK_PREFIX_STRING=". ";
//去除每行前面的字符 只留下汉字
//首位不包含空数组的数组
function trimArray(arr) {
    // console.log(arr);

    //移除首尾位之前的
    var headIdx=-1;
    var tailIdx=-1;

    //
    for(var i=0;i<arr.length;i++) {
        var eachGroup = arr[i];
        if(!isEmptyArray(eachGroup)){
            headIdx = i;
            break;
        }
    }
    for(var i=arr.length-1;i>=0;i--) {
        var eachGroup = arr[i];
        if(!isEmptyArray(eachGroup)){
            tailIdx = i;
            break;
        }
    }

    // console.log(`${headIdx} ${tailIdx}`);
    if( headIdx >=0 &&  tailIdx>= headIdx){
        var retArr = new Array();
        for(var i=headIdx;i<=tailIdx;i++){
            retArr.push(arr[i]);
        }
        return retArr;
    }

    return null;
}

function arrayTrimOfWeeklyReport(str) {
    if (!isEmpty(str)) {
        var arr = str.split("\n");

        var pureArr = new Array();
        var eachGroupArr = new Array();
        pureArr.push(eachGroupArr);

        //
        for(var i=0;i<arr.length;i++){
            var eachLine = arr[i];
            // console.log(eachLine);

            if (!isEmpty(eachLine)) {
                //去除数字和数字后符号
                eachLine = eachLine.replace(/^\s*[0-9.。、,，:："“”'‘’\s]+/,"")

                //去除最后的符号
                eachLine = eachLine.replace(/["“”'‘’]+\s*/,"")

                eachLine = eachLine.trim();
            }

            //去除后再判断
            if (!isEmpty(eachLine)) {
                eachGroupArr.push(eachLine);
            }else {
                pureArr.push([]);

                if(i<arr.length-1){
                    eachGroupArr = new Array();
                    pureArr.push(eachGroupArr);
                }
            }
        }


        return trimArray(pureArr);
    }

    //其余情况都为空
    return null;
}

function formatWeeklyReport(str) {
    var realArr = arrayTrimOfWeeklyReport(str);
    // console.log(realArr);
    if (realArr) {
        var lastStr = "";
        var prefix = WEEK_PREFIX_STRING;

        var invalidLine = function (strx) {
            return /[:：]\s*$/.test(strx);
        }

        var totalCount = 0;
        for(var i=0;i<realArr.length;i++) {
            var groupArr = realArr[i];
            for(var j=0;j<groupArr.length;j++) {
                var groupLine = groupArr[j];
                if(!invalidLine(groupLine)){
                    totalCount++;
                }
            }
        }
        // console.log(totalCount);

        var globalCount = 1;
        for(var i=0;i<realArr.length;i++){
            var groupArr = realArr[i];

            if(groupArr.length == 0){
                lastStr+='\n';
            } else {
                var groupCount=1;
                for(var j=0;j<groupArr.length;j++){
                    var groupLine = groupArr[j];

                    //:结尾的不编号
                    if(invalidLine(groupLine)){
                        lastStr=lastStr+groupLine;
                    } else {
                        var realCount;
                        var realTotal;
                        if(_config.codeMode == '1'){
                            realCount=  globalCount++;
                            realTotal = (totalCount+"").length;
                        }else if(_config.codeMode == '2'){
                            realCount=  groupCount++;
                            realTotal = (groupArr.length+"").length;
                        }

                        lastStr=lastStr+fillSpacePrefix(""+realCount,realTotal)+prefix+groupLine;
                    }

                    //最后一行不加换行
                    if (i==realArr.length-1 && j==groupArr.length-1) {
                    }else {
                        lastStr=lastStr+'\n';
                    }
                }
            }

        }
        return lastStr;
    }

    return "";
}

if (typeof module !== 'undefined' && module.exports) {
    var isEmpty = require("../tool").isEmpty;
    var _config = require("../config")._config;

    module.exports = {
        formatWeeklyReport,
        formatWeeklyReportForDeletingNumber,
        WEEK_PREFIX_STRING
    };
}