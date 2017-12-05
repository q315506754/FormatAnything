import {formatWeeklyReport,formatWeeklyReportForDeletingNumber} from '../js/format/weekreport'
var expect = require("chai").expect;//npm install --save-dev chai

// console.log(window);
// console.log(getGlobal);
// console.log(formatWeeklyReport("1aaa22"));

describe("周报去序号测试",function () {
    before(function() {
    });
    beforeEach(function() {
    });
    after(function() {
    });
    afterEach(function() {
    });

    it("空串",function () {
        expect(formatWeeklyReportForDeletingNumber("")).to.be.equal(``);
    });

    it("单组",function () {
        expect(formatWeeklyReportForDeletingNumber("1. aaa22")).to.be.equal(`aaa22`);

        expect(formatWeeklyReportForDeletingNumber(
`1. aaa
2. bbb
3. ccc`)).to.be.equal(
`aaa
bbb
ccc`
);
        expect(formatWeeklyReportForDeletingNumber(
`1.非运营学校主页——（高优先级、500行、#3454、12.5提测、12.14上线）——崔国（android）王宇（iOS）
2.APP建课知识点增加排序功能——（高优先级、1000行、#3462、12.7提测、12.14上线）——王文琪（android）黄超群（iOS）
3.iOS APP建课模块播放器内存泄露修改——（高优先级、500行、#3575、12.5提测、12.14上线）——路敏（iOS）
4.iOS名师专栏iOS11&iPhoneX适配—— （高优先级、800行、#3576、12.5提测、12.14上线）——路敏（iOS）
5.Android web版支付宝专栏无法预购问题修改—— （高优先级、300行、bug23312、12.5提测、12.14上线）——张智轶（Android）
6.Android 建课概要设计页面优化——（高优先级、200行、bug23163、12.5提测、12.14上线）——崔国（Android）
7.Android播放器公共组件开发——张智轶（Android）
8.名师专栏提测&专栏功能优化——全组`)).to.be.equal(
`非运营学校主页——（高优先级、500行、#3454、12.5提测、12.14上线）——崔国（android）王宇（iOS）
APP建课知识点增加排序功能——（高优先级、1000行、#3462、12.7提测、12.14上线）——王文琪（android）黄超群（iOS）
iOS APP建课模块播放器内存泄露修改——（高优先级、500行、#3575、12.5提测、12.14上线）——路敏（iOS）
iOS名师专栏iOS11&iPhoneX适配—— （高优先级、800行、#3576、12.5提测、12.14上线）——路敏（iOS）
Android web版支付宝专栏无法预购问题修改—— （高优先级、300行、bug23312、12.5提测、12.14上线）——张智轶（Android）
Android 建课概要设计页面优化——（高优先级、200行、bug23163、12.5提测、12.14上线）——崔国（Android）
Android播放器公共组件开发——张智轶（Android）
名师专栏提测&专栏功能优化——全组`
);

    });



    it("多组",function () {
        expect(formatWeeklyReportForDeletingNumber(
`1. aaa
2. bbb
3. ccc

1. ddd
2. eee
3. fff`)).to.be.equal(
`aaa
bbb
ccc

ddd
eee
fff`
);

        expect(formatWeeklyReportForDeletingNumber(
`1. 问答二.二期-提供给后台的接口逻辑调整(10个)及新增(5个)(补课程id字段sql)(#3357，12.8提测，12.14上线)——金星，周咤
2. 问答二.二期-elastic search使用调研，掌握问答后台需求中各种条件查询的写法(12.6完成)——周咤
3. 问答二.二期-接口联调(12.7完成)——金星，周咤
4. 教师主页-查学习人数调用online接口(#,12.6完成，12.14上线)——金星
5. 海外-弹题表维护courseId，创建、更新时间字段(#3489，12.14上线)——金星
6. 海外-第一步视频教程学时、见面课教程学时支持3位数(#3574，12.14上线)——周咤

1. code review-问答三期接口——金星，周咤
2. code review-问答三期后台配置——金星
3. code review-教师专栏预购部分——周咤`)).to.be.equal(
`问答二.二期-提供给后台的接口逻辑调整(10个)及新增(5个)(补课程id字段sql)(#3357，12.8提测，12.14上线)——金星，周咤
问答二.二期-elastic search使用调研，掌握问答后台需求中各种条件查询的写法(12.6完成)——周咤
问答二.二期-接口联调(12.7完成)——金星，周咤
教师主页-查学习人数调用online接口(#,12.6完成，12.14上线)——金星
海外-弹题表维护courseId，创建、更新时间字段(#3489，12.14上线)——金星
海外-第一步视频教程学时、见面课教程学时支持3位数(#3574，12.14上线)——周咤

code review-问答三期接口——金星，周咤
code review-问答三期后台配置——金星
code review-教师专栏预购部分——周咤`
);


    });




});