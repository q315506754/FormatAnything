import HistoryBox from '../js/historyBox'
var expect = require("chai").expect;//npm install --save-dev chai

// console.log(window);
// console.log(getGlobal);
// console.log(formatWeeklyReport("1aaa22"));

describe("HistoryBox",function () {
    before(function() {
        HistoryBox.debug();
    });
    beforeEach(function() {
        HistoryBox.reset()
    });
    after(function() {
    });
    afterEach(function() {
    });

    it("undo",function () {
        HistoryBox.record("aaa")
        HistoryBox.record("bbb")
        // console.log(HistoryBox.records);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
    });

    it("undo & redo",function () {
        HistoryBox.record("aaa")
        // console.log(HistoryBox.records);
        HistoryBox.record("bbb")
        // console.log(HistoryBox.records);
        // HistoryBox.record("ccc")
        // console.log(HistoryBox.records);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.redo()).to.be.equal(`bbb`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
    });

    it("undo & redo 2",function () {
        HistoryBox.record("a")
        HistoryBox.record("b")
        HistoryBox.record("c")
        // console.log(HistoryBox.records);
        // HistoryBox.record("ccc")
        // console.log(HistoryBox.undo());
        expect(HistoryBox.position).to.be.equal(2);
        expect(HistoryBox.records.length).to.be.equal(3);

        console.log(HistoryBox.records);
        expect(HistoryBox.undo()).to.be.equal("b");
        HistoryBox.record("d");
        expect(HistoryBox.redo()).to.be.equal(`d`);
        expect(HistoryBox.undo()).to.be.equal(`b`);
    });

    it("record max items",function () {
        var i = 1000;
        while (i-->0) {
            HistoryBox.record(i);
        }
        // console.log(HistoryBox.records);
        expect(HistoryBox.records.length).to.be.equal(100);
        expect(HistoryBox.records[99]).to.be.equal(0);
        expect(HistoryBox.records[0]).to.be.equal(99);
    });


});