function formatWeeklyReportForDataArea() {
    getAndSetDataValue(function (str) {
        return formatWeeklyReport(str);
    })
}

function formatWeeklyReport(str) {
    if (!isEmpty(str)) {
        var arr = str.split("\n");

        for(var i=0;i<arr.length;i++){
            var eachLine = arr[i];
            if (!isEmpty(eachLine)) {
                //去除数字和数字后符号
                eachLine = eachLine.replace(/^\s*[0-9.。、,，:："“”'‘’]+/,"")

                eachLine = eachLine.trim();

                arr[i]=eachLine;
                // strArr.push(eachLine);
            }
        }

        var lastStr = "";
        var prefix = ".";
        var n=1;
        for(var i=0;i<arr.length;i++){
            var eachLine = arr[i];
            if (!isEmpty(eachLine)) {
                lastStr=lastStr+(n++)+prefix+eachLine+'\n';
            }else {
                // lastStr+='\n';
            }
        }
        return lastStr;
    }

    return "";
}