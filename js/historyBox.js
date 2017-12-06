function HistoryBoxFactory() {
    this.records = [];
    this.position = -1;
    this.lastTs = -1;
}

HistoryBoxFactory.RECORD_INTERVAL = 50;
HistoryBoxFactory.MAX_ITEMS = 100;
HistoryBoxFactory.getTs = function () {
    return new Date().getTime();
}

HistoryBoxFactory.prototype.debug = function () {
    HistoryBoxFactory.RECORD_INTERVAL = -1;
}

HistoryBoxFactory.prototype.record = function (cmd) {
    // console.log(this.records);
    var cur = HistoryBoxFactory.getTs();

    //重复问题 防止冲掉记录不能重做
    if(this.position >=0 && this.records[this.position] === cmd){
        return;
    }

    //undo
    if(this.position != this.records.length-1){

        //移除后面的记录
        this.records.splice(this.position+1);
    } else {
        if(cur - this.lastTs > HistoryBoxFactory.RECORD_INTERVAL) {
            this.realPush(cmd);

            this.lastTs = cur;
        } else {
            this.records[this.position]=cmd;
        }

    }
}

HistoryBoxFactory.prototype.redo = function () {
    if(this.position < this.records.length - 1) {
        this.position ++ ;
    }
    return this.records[this.position];
}

HistoryBoxFactory.prototype.undo = function () {
    if(this.position > 0) {
        this.position -- ;
    }
    return this.records[this.position];
}

HistoryBoxFactory.prototype.realPush = function (cmd) {
    if(this.records.length >= HistoryBoxFactory.MAX_ITEMS){
        this.records.splice(0,1);
    }

    if(this.records[this.records.length-1] !== cmd){
        this.records.push(cmd);
    }

    this.position = this.records.length-1;

}

var HistoryBox = new HistoryBoxFactory();
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HistoryBox;
}

