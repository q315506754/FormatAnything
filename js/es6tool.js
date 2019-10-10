function es6StringToJoinStr(str,endpoint) {
    var arr = str.split("\n");

    var ret = "";
    for(var i=0;i<arr.length;i++){
        var line = arr[i];


        line = line.replace(endpoint,"\\"+endpoint);
        line = line.replace("`","");
        // line = line.replace("\\"+endpoint,endpoint);

        // var findx = line.search(/\${.+}/);

        var c;

        do {
            c = 0;
            var findx = line.matchAll(/\${.+?}/);

            for (let x of findx) {
                console.log(x);

                var real = x[0].substring(2,x[0].length-1);
                line = line.replace(x[0],endpoint+"+"+real+"+"+endpoint);

                c++;
            }
        } while (c > 0) ;

        if (i>0){
            line = "+" + endpoint +line;
        } else {
            line = endpoint +line;
        }

        line+=endpoint;

        ret += line;

        if (i < arr.length - 1) {
            ret += "\n";
        }
    }

    return ret;
}