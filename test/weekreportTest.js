import {formatWeeklyReport} from '../js/format/weekreport'
var expect = require("chai").expect;//npm install --save-dev chai

// console.log(window);
// console.log(getGlobal);
// console.log(formatWeeklyReport("1aaa22"));

describe("周报测试",function () {
    before(function() {
    });
    beforeEach(function() {
    });
    after(function() {
    });
    afterEach(function() {
    });

    it("空串",function () {
        expect(formatWeeklyReport("")).to.be.equal(``);
    });

    it("单组",function () {
        expect(formatWeeklyReport("1aaa22")).to.be.equal(`1. aaa22`);

        expect(formatWeeklyReport(
`aaa
bbb
ccc`)).to.be.equal(
`1. aaa
2. bbb
3. ccc`
);

        expect(formatWeeklyReport(
`"新增：
1 教师专栏H5预购需求   王继骏
2 教师专栏APP预购需求  王继骏
3 教学主页新增学校主页入口   王继骏
4 开机启动页新增分享功能     王继骏
"`)).to.be.equal(
`新增：
1. 教师专栏H5预购需求   王继骏
2. 教师专栏APP预购需求  王继骏
3. 教学主页新增学校主页入口   王继骏
4. 开机启动页新增分享功能     王继骏

`
);

        expect(formatWeeklyReport(
`1.教师专栏后台立试听模块添加推荐词，完成后台的相应设计及评审   11.22  王继骏
2.教学模块的需求文档和DEMO制作，上周完成30%         11.22  王继骏 
3.对接运营部门有关教师专栏的相应内容，黄天中的已提供，还少两位   11.22  王继骏
4.教师圈发现页面的优化，完成评审  11.17  王继骏
5.建课模块中推广的优化  11.17 王继骏
6.见面课请假功能需求文档  11.15 朴雪花
7.弹题功能增加答案解析    11.22 朴雪花
8. 问答3期验收，整理遗留问题并评审  11.16  任明泉
9. 新建的课程，关联课程ID（课程历史版本管理）需求设计完成并终审  11.17  任明泉
10. 智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  11.21  任明泉
11. 课程资料UI确认，完成终审  11.17  任明泉
12. 完成自定义考试的需求分析  11.21  任明泉`)).to.be.equal(
` 1. 教师专栏后台立试听模块添加推荐词，完成后台的相应设计及评审   11.22  王继骏
 2. 教学模块的需求文档和DEMO制作，上周完成30%         11.22  王继骏
 3. 对接运营部门有关教师专栏的相应内容，黄天中的已提供，还少两位   11.22  王继骏
 4. 教师圈发现页面的优化，完成评审  11.17  王继骏
 5. 建课模块中推广的优化  11.17 王继骏
 6. 见面课请假功能需求文档  11.15 朴雪花
 7. 弹题功能增加答案解析    11.22 朴雪花
 8. 问答3期验收，整理遗留问题并评审  11.16  任明泉
 9. 新建的课程，关联课程ID（课程历史版本管理）需求设计完成并终审  11.17  任明泉
10. 智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  11.21  任明泉
11. 课程资料UI确认，完成终审  11.17  任明泉
12. 完成自定义考试的需求分析  11.21  任明泉`
);

    });



    it("多组",function () {
        expect(formatWeeklyReport(
`aaa
bbb
ccc

ddd
eee
fff`)).to.be.equal(
`1. aaa
2. bbb
3. ccc

1. ddd
2. eee
3. fff`
);

        expect(formatWeeklyReport(
`1 问答二.二期-提供给后台的接口逻辑调整(10个)及新增(5个)(补课程id字段sql)(#3357，12.8提测，12.14上线)——金星，周咤
2 问答二.二期-elastic search使用调研，掌握问答后台需求中各种条件查询的写法(12.6完成)——周咤
3 问答二.二期-接口联调(12.7完成)——金星，周咤
4 教师主页-查学习人数调用online接口(#,12.6完成，12.14上线)——金星
5 海外-弹题表维护courseId，创建、更新时间字段(#3489，12.14上线)——金星
6 海外-第一步视频教程学时、见面课教程学时支持3位数(#3574，12.14上线)——周咤

7 code review-问答三期接口——金星，周咤
8 code review-问答三期后台配置——金星
9 code review-教师专栏预购部分——周咤`)).to.be.equal(
`1. 问答二.二期-提供给后台的接口逻辑调整(10个)及新增(5个)(补课程id字段sql)(#3357，12.8提测，12.14上线)——金星，周咤
2. 问答二.二期-elastic search使用调研，掌握问答后台需求中各种条件查询的写法(12.6完成)——周咤
3. 问答二.二期-接口联调(12.7完成)——金星，周咤
4. 教师主页-查学习人数调用online接口(#,12.6完成，12.14上线)——金星
5. 海外-弹题表维护courseId，创建、更新时间字段(#3489，12.14上线)——金星
6. 海外-第一步视频教程学时、见面课教程学时支持3位数(#3574，12.14上线)——周咤

1. code review-问答三期接口——金星，周咤
2. code review-问答三期后台配置——金星
3. code review-教师专栏预购部分——周咤`
);

        expect(formatWeeklyReport(
`1、问答三期遗留问题设计确认，完成评审和文档输出  11.30  任明泉
2、新建的课程，关联课程ID（课程历史版本管理）确认UI设计，完成终审  12.1  任明泉
3、智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  12.4  任明泉
4、完成自定义考试（期中考试）的需求分析  12.5  任明泉
5.专栏预售新增分享卡片的运营功能，完成评审及需求文档 11.29    王继骏
6.教师圈发现模块新增专栏预售内容的入口，完成评审和需求文档  11.29  王继骏
7.考试自定义成绩比例优化，完成需求文档和终审   12.3   王继骏
8.教学首页完成需求文档和评审   12.3  王继骏
9.教师专栏用例评审及验收   12.3     王继骏  朴雪花
10.试题去重优化评审  11.30  朴雪花
11.学时改三位数需求输出  11.29  朴雪花`)).to.be.equal(
` 1. 问答三期遗留问题设计确认，完成评审和文档输出  11.30  任明泉
 2. 新建的课程，关联课程ID（课程历史版本管理）确认UI设计，完成终审  12.1  任明泉
 3. 智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  12.4  任明泉
 4. 完成自定义考试（期中考试）的需求分析  12.5  任明泉
 5. 专栏预售新增分享卡片的运营功能，完成评审及需求文档 11.29    王继骏
 6. 教师圈发现模块新增专栏预售内容的入口，完成评审和需求文档  11.29  王继骏
 7. 考试自定义成绩比例优化，完成需求文档和终审   12.3   王继骏
 8. 教学首页完成需求文档和评审   12.3  王继骏
 9. 教师专栏用例评审及验收   12.3     王继骏  朴雪花
10. 试题去重优化评审  11.30  朴雪花
11. 学时改三位数需求输出  11.29  朴雪花`
);

        expect(formatWeeklyReport(
`"未完成：
1.新建的课程，关联课程ID（课程历史版本管理）完成设计和终审  11.27  任明泉
2.智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  11.25  任明泉
3.完成自定义考试（期中考试）的需求分析  11.28  任明泉
4.教学主页评审 延期原因：主要时间投入在了预售的验收中"

"1、问答三期遗留问题设计确认，完成评审和文档输出  11.30  任明泉
2、新建的课程，关联课程ID（课程历史版本管理）确认UI设计，完成终审  12.1  任明泉
3、智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  12.4  任明泉
4、完成自定义考试（期中考试）的需求分析  12.5  任明泉
5.专栏预售新增分享卡片的运营功能，完成评审及需求文档 11.29    王继骏
6.教师圈发现模块新增专栏预售内容的入口，完成评审和需求文档  11.29  王继骏
7.考试自定义成绩比例优化，完成需求文档和终审   12.3   王继骏
8.教学首页完成需求文档和评审   12.3  王继骏
9.教师专栏用例评审及验收   12.3     王继骏  朴雪花
10.试题去重优化评审  11.30  朴雪花
11.学时改三位数需求输出  11.29  朴雪花"`)).to.be.equal(
`未完成：
1. 新建的课程，关联课程ID（课程历史版本管理）完成设计和终审  11.27  任明泉
2. 智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  11.25  任明泉
3. 完成自定义考试（期中考试）的需求分析  11.28  任明泉
4. 教学主页评审 延期原因：主要时间投入在了预售的验收中

 1. 问答三期遗留问题设计确认，完成评审和文档输出  11.30  任明泉
 2. 新建的课程，关联课程ID（课程历史版本管理）确认UI设计，完成终审  12.1  任明泉
 3. 智慧盒子扫码上课完成功能列表和流程的修改，内部确认UI设计，和需求方再确认一次设计  12.4  任明泉
 4. 完成自定义考试（期中考试）的需求分析  12.5  任明泉
 5. 专栏预售新增分享卡片的运营功能，完成评审及需求文档 11.29    王继骏
 6. 教师圈发现模块新增专栏预售内容的入口，完成评审和需求文档  11.29  王继骏
 7. 考试自定义成绩比例优化，完成需求文档和终审   12.3   王继骏
 8. 教学首页完成需求文档和评审   12.3  王继骏
 9. 教师专栏用例评审及验收   12.3     王继骏  朴雪花
10. 试题去重优化评审  11.30  朴雪花
11. 学时改三位数需求输出  11.29  朴雪花`
);

    });




});