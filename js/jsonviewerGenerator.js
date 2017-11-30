function jsonviewerGenerator() {
    return function () {
        var edit = Ext.getCmp('edit');
        var tree = Ext.getCmp('tree');
        var root = tree.getRootNode();
        var grid = Ext.getCmp('grid');
        var searchTextField = Ext.getCmp('searchTextField');
        var searchResultLabel = Ext.getCmp('searchResultLabel');
        var json = {};
        var lastText = null;
        var task = null;
        var searchList = null;
        var searchIndex = null;
        return {
            check: function () {
                // üres sorok törlése:
                var text = edit.getValue().split("\n").join(" ");
                try {
                    json = Ext.util.JSON.decode(text);
                } catch (e) {
                    Ext.MessageBox.show({
                        title: 'JSON 错误',
                        msg: 'JSON 格式错误',
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.MessageBox.OK,
                        closable: true
                    });
                    return false;
                }
                if (lastText === text) {
                    return;
                }
                lastText = text;
                this.treebuild();
            },
            treebuild: function () {
                root.removeAllChildren();
                root.appendChild(this.json2leaf(json));
                root.setIcon(Ext.isArray(json) ? 'css/img/array.gif' : 'css/img/object.gif');
                this.gridbuild(root);
            },
            gridbuild: function (node) {
                if (node.isLeaf()) {
                    node = node.parentNode;
                }
                // elofordulhat, hogy nincsen még kifejtve:
                if (!node.childNodes.length) {
                    node.expand(false, false);
                    node.collapse(false, false);
                }
                var source = {};
                for (var i = 0; i < node.childNodes.length; i++) {
                    var t = node.childNodes[i].text.split(':');
                    if (t.length > 1) {
                        source[t[0]] = t[1];
                    } else {
                        source[t[0]] = '...';
                    }
                }
                grid.setSource(source);
            },
            json2leaf: function (json) {
                var ret = [];
                for (var i in json) {
                    if (json.hasOwnProperty(i)) {
                        if (json[i] === null) {
                            ret.push({text: i + ' : null', leaf: true, icon: 'css/img/red.gif'});
                        } else if (typeof json[i] === 'string') {
                            ret.push({text: i + ' : "' + json[i] + '"', leaf: true, icon: 'css/img/blue.gif'});
                        } else if (typeof json[i] === 'number') {
                            ret.push({text: i + ' : ' + json[i], leaf: true, icon: 'css/img/green.gif'});
                        } else if (typeof json[i] === 'boolean') {
                            ret.push({text: i + ' : ' + (json[i] ? 'true' : 'false'), leaf: true, icon: 'css/img/yellow.gif'});
                        } else if (typeof json[i] === 'object') {
                            ret.push({text: i, children: this.json2leaf(json[i]), icon: Ext.isArray(json[i]) ? 'css/img/array.gif' : 'css/img/object.gif'});
                        } else if (typeof json[i] === 'function') {
                            ret.push({text: i + ' : function', leaf: true, icon: 'css/img/red.gif'});
                        }
                    }
                }
                return ret;
            },
            copyText: function () {
                if (!edit.getValue()) {
                    return;
                }
                Ext.ux.Clipboard.set(edit.getValue());
            },
            pasteText: function () {
                edit.setValue(Ext.ux.Clipboard.get());
            },
            searchStart: function () {
                if (!task) {
                    task = new Ext.util.DelayedTask(this.searchFn, this);
                }
                task.delay(150);
            },
            searchFn: function () {
                searchList = [];
                if (!searchTextField.getValue()) {
                    return;
                }
                this.searchInNode(root, searchTextField.getValue());
                if (searchList.length) {
                    searchResultLabel.setText('');
                    searchIndex = 0;
                    this.selectNode(searchList[searchIndex]);
                    searchTextField.focus();
                } else {
                    searchResultLabel.setText('Phrase not found!');
                }
            },
            searchInNode: function (node, text) {
                if (node.text.toUpperCase().indexOf(text.toUpperCase()) !== -1) {
                    searchList.push(node);
                    //return true;
                }
                var isExpanded = node.isExpanded();
                node.expand(false, false);
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (this.searchInNode(node.childNodes[i], text)) {
                        //return true;
                    }
                }
                if (!isExpanded) {
                    node.collapse(false, false);
                }
                //return false;
            },
            selectNode: function (node) {
                node.select();
                tree.fireEvent('click', node);
                while (node !== root) {
                    node = node.parentNode;
                    node.expand(false, false);
                }
            },
            searchNext: function () {
                if (!searchList || !searchList.length) {
                    return;
                }
                searchIndex = (searchIndex + 1) % searchList.length;
                this.selectNode(searchList[searchIndex]);
            },
            searchPrevious: function () {
                if (!searchList || !searchList.length) {
                    return;
                }
                searchIndex = (searchIndex - 1 + searchList.length) % searchList.length;
                this.selectNode(searchList[searchIndex]);
            },
            ctrlF: function () {
                if (!tree.getBottomToolbar().isVisible()) {
                    tree.showBbar();
                }
                searchTextField.focus(true);
            },
            hideToolbar: function () {
                tree.hideBbar();
            },
            format: function () {
                var text = edit.getValue().split("\n").join(" ");
                var t = [];
                var tab = 0;
                var inString = false;
                for (var i = 0, len = text.length; i < len; i++) {
                    var c = text.charAt(i);
                    if (inString && c === inString) {
                        // TODO: \\"
                        if (text.charAt(i - 1) !== '\\') {
                            inString = false;
                        }
                    } else if (!inString && (c === '"' || c === "'")) {
                        inString = c;
                    } else if (!inString && (c === ' ' || c === "\t")) {
                        c = '';
                    } else if (!inString && c === ':') {
                        c += ' ';
                    } else if (!inString && c === ',') {
                        c += "\n" + String.space(tab * 2);
                    } else if (!inString && (c === '[' || c === '{')) {
                        tab++;
                        c += "\n" + String.space(tab * 2);
                    } else if (!inString && (c === ']' || c === '}')) {
                        tab--;
                        c = "\n" + String.space(tab * 2) + c;
                    }
                    t.push(c);
                }
                edit.setValue(t.join(''));
            },
            formatExt: function () {
                var text = edit.getValue().split("\n").join(" ");
                var t = [];
                var tab = 0;
                var inString = false;
                for (var i = 0, len = text.length; i < len; i++) {
                    var c = text.charAt(i);
                    if (inString && c === inString) {
                        // TODO: \\"
                        if (text.charAt(i - 1) !== '\\') {
                            inString = false;
                        }
                    } else if (!inString && (c === '"' || c === "'")) {
                        inString = c;
                    } else if (!inString && (c === ' ' || c === "\t")) {
                        c = '';
                    } else if (!inString && c === ':') {
                        c += ' ';
                    } else if (!inString && c === ',') {
                        c += "\n" + String.space(tab * 2);
                    } else if (!inString && (c === '[' || c === '{')) {
                        tab++;
                        c += "\n" + String.space(tab * 2);
                    } else if (!inString && (c === ']' || c === '}')) {
                        tab--;
                        c = "\n" + String.space(tab * 2) + c;
                        // } else if (!inString && (c === '\\' )) {
                    } else if ( (c === '\\' )) {
                        if(i + 1 < len){
                            var nextX = text.charAt(i+1);
                            if(nextX === 'n'){
                                c = "\n" + String.space((tab+1) * 2) ;
                                i++;
                            }
                            if(nextX === 't'){
                                c = String.space(2) ;
                                i++;
                            }
                        }
                    }
                    t.push(c);
                }
                edit.setValue(t.join(''));
            },
            formatHtml: function () {
                var text = edit.getValue().split("\n").join(" ");
                text = style_html(text, 4,  ' ', 80);
                edit.setValue(text);
            },
            removeWhiteSpace:function(){
                edit.setValue(jsonviewer.getRemoveWhiteSpace());
            }
            ,
            getRemoveWhiteSpace: function () {
                var text = edit.getValue().split("\n").join(" ");
                var t = [];
                var inString = false;
                for (var i = 0, len = text.length; i < len; i++) {
                    var c = text.charAt(i);
                    if (inString && c === inString) {
                        // TODO: \\"
                        if (text.charAt(i - 1) !== '\\') {
                            inString = false;
                        }
                    } else if (!inString && (c === '"' || c === "'")) {
                        inString = c;
                    } else if (!inString && (c === ' ' || c === "\t")) {
                        c = '';
                    }
                    t.push(c);
                }
                return t.join('');
            },
            removeWhiteSpace2: function (){
                var a = this.getRemoveWhiteSpace().replace(/\"/g,"\\\"");
                edit.setValue(a);
            },
            removeZhuanyi: function (){
                var a = edit.getValue().replace(/\\\\/g,"\\").replace(/\\\"/g,'\"');
                edit.setValue(a);
            }

        };
    }();
}