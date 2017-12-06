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
    });
    after(function() {
    });
    afterEach(function() {
    });

    it("undo",function () {
        HistoryBox.record("aaa")
        HistoryBox.record("bbb")
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
    });

    it("undo & redo",function () {
        HistoryBox.record("aaa")
        HistoryBox.record("bbb")
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
        expect(HistoryBox.redo()).to.be.equal(`bbb`);
        expect(HistoryBox.undo()).to.be.equal(`aaa`);
    });

    it("record max items",function () {
        var i = 1000;
        while (i-->0) {
            HistoryBox.record(i);
        }

        expect(HistoryBox.records.length).to.be.equal(100);
        expect(HistoryBox.records[99]).to.be.equal(0);
        expect(HistoryBox.records[0]).to.be.equal(99);
    });


});