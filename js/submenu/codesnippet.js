var codesnippet_menu =[
    {
        text:'npm',
        handler:function(){
            setDataValue(`
1.使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
npm install -g cnpm --registry=https://registry.npm.taobao.org

这样就可以使用 cnpm 命令来安装模块了：
cnpm install [name]

2.直接修改npm插件镜像
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

3.package.json 常见依赖
//babel
"babel-core": "~6.2.1",
"babel-preset-es2015": "~6.1.18",
"babel-preset-react": "^6.24.1",
"babel-polyfill": "^6.23.0",

//utils
"jquery": "^3.2.1",
"jsdom": "^11.5.1",
"lodash": "^4.17.4",

//test
"chai": "^4.1.2",
"mocha": "^4.0.1",
"mochawesome": "^3.0.0",

//react
"react-dom": "^15.6.2",
"react-transform-hmr": "^1.0.4",

//webpack
"webpack": "^2.7.0",
"webpack-dev-server": "^2.9.5"

//webpack-loader
"babel-loader": "^7.1.2",
"css-loader": "^0.28.7",
"json-loader": "^0.5.7",
"postcss-loader": "^2.0.9",
"style-loader": "^0.18.2",

//webpack-plugin
"babel-plugin-react-transform": "^2.0.2",
"clean-webpack-plugin": "^0.1.17",
"extract-text-webpack-plugin": "^2.1.2",
"html-webpack-plugin": "^2.30.1",

//other
"autoprefixer": "^7.2.1",


4.运行
babel:


mocha:
"cmocha": "mocha --recursive --compilers js:babel-core/register"
call npm run ctest

webpack:
"wp-build-dev": "webpack  --progress",
"wp-build-pro": "webpack --config ./webpack.production.config.js --progress",
"wp-server": "webpack-dev-server --progress"
call npm run wp-build-dev
call npm run wp-build-pro
call npm run wp-server

            `);
        },

    },
    {
        text:'mocha',
        handler:function(){
            setDataValue(`
var hello = require('../src/part')['default'];
var expect = require("chai").expect;//cnpm install --save-dev chai

describe("测试模块",function () {
    it("测试逻辑",function () {
        expect(hello('aaaa')).to.be.equal('hi~ aaaa');

        var Foo = function () {
        };
        var foo = new Foo();
        foo.bar = 'baz';

        // 相等或不相等
        expect(4 + 5).to.be.equal(9);
        expect(4 + 5).to.be.not.equal(10);
        expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
        expect('everthing').to.be.ok;
        expect(false).to.not.be.ok;

// typeof
        expect('test').to.be.a('string');
        expect({ foo: 'bar' }).to.be.an('object');
        expect(foo).to.be.an.instanceof(Foo);

// include
        expect([1,2,3]).to.include(2);
        expect('foobar').to.contain('foo');
        expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
        expect([]).to.be.empty;
        expect('').to.be.empty;
        expect({}).to.be.empty;

// match
        expect('foobar').to.match(/^foo/);
    });

});
            `);
        },
    },
    {
        text:'暂无',
        handler:function(){
            setDataValue(`

            `);
        },
    },
];