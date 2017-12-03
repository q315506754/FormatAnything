function formatWeeklyReportForDataArea() {
    getAndSetDataValue(function (str) {
        return formatWeeklyReport(str);
    })
}

function fillSpacePrefix(str, totalLength) {
    while (str.length <totalLength) {
        str = " "+str;
    }
    return str;
}

function formatWeeklyReport(str) {
    if (!isEmpty(str)) {
        var arr = str.split("\n");

        var realArr = new Array();
        var eachGroupArr = new Array();
        realArr.push(eachGroupArr);
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
                realArr.push([]);

                eachGroupArr = new Array();
                realArr.push(eachGroupArr);
            }
        }

        // console.log(realArr);

        var lastStr = "";
        var prefix = ". ";
        for(var i=0;i<realArr.length;i++){
            var groupArr = realArr[i];

            if(groupArr.length == 0){
                lastStr+='\n';
            } else {
                var k=1;
                for(var j=0;j<groupArr.length;j++){
                    var groupLine = groupArr[j];

                    //:结尾的不编号
                    if(/[:：]\s*$/.test(groupLine)){
                        lastStr=lastStr+groupLine+'\n';
                    } else {
                        lastStr=lastStr+fillSpacePrefix(""+(k++),(groupArr.length+"").length)+prefix+groupLine+'\n';
                    }
                }
            }

        }
        return lastStr;
    }

    return "";
}