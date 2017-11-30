/*global Ext, document, jsonviewer */

/*
 * TODO:
 * keresés eltüntetéséhez gomb
 * keresésnél írjuk ki, hogy hány találat van (akár dinamikusan, hogy pörögjön felfelé)
 * about JSON Viewer ablak
 * "Format..." finomítása
 * Editable Grid
 * Griden dupla katt egy object-en, akkor válassza ki azt.
 * be lehessen állítani, hogy a kis és nagybetű számít-e?
 * tree.contextmenu (kinyít, becsuk, ?)
 * 
 */

Ext.override(Ext.tree.TreeNode, {
	removeAllChildren: function () {
		while (this.hasChildNodes()) {
			this.removeChild(this.firstChild);
		}
		return this;
	},
	setIcon: function (icon) {
		this.getUI().setIcon(icon);
	},
	setIconCls: function (icon) {
		this.getUI().setIconCls(icon);
	}
});

Ext.override(Ext.tree.TreeNodeUI, {
	setIconCls: function (iconCls) {
		if (this.iconNode) {
			Ext.fly(this.iconNode).replaceClass(this.node.attributes.iconCls, iconCls);
		}
		this.node.attributes.iconCls = iconCls;
	},
	setIcon: function (icon) {
		if (this.iconNode) {
			this.iconNode.src = icon || this.emptyIcon;
			Ext.fly(this.iconNode)[icon ? 'addClass' : 'removeClass']('x-tree-node-inline-icon');
		}
		this.node.attributes.icon = icon;
	}
});

Ext.override(Ext.Panel, {
	hideBbar: function () {
		if (!this.bbar) {
			return;
		}
		this.bbar.setVisibilityMode(Ext.Element.DISPLAY);
		this.bbar.hide();
		this.getBottomToolbar().hide();
		this.syncSize();
		if (this.ownerCt) {
			this.ownerCt.doLayout();
		}
	},
	showBbar: function () {
		if (!this.bbar) {
			return;
		}
		this.bbar.setVisibilityMode(Ext.Element.DISPLAY);
		this.bbar.show();
		this.getBottomToolbar().show();
		this.syncSize();
		if (this.ownerCt) {
			this.ownerCt.doLayout();
		}
	}
});

Ext.ux.iconCls = function () {
	var styleSheetId = 'styleSheetIconCls';
	var cssClasses = {};
	Ext.util.CSS.createStyleSheet('/* Ext.ux.iconCls */', styleSheetId);
	return {
		get: function (icon) {
			if (!icon) {
				return null;
			}
			if (typeof cssClasses[icon] === 'undefined') {
				cssClasses[icon] = 'icon_' + Ext.id();
				var styleBody = '\n.' + cssClasses[icon] + ' { background-image: url(' + icon + ') !important; }';
				if (Ext.isIE) {
					document.styleSheets[styleSheetId].cssText += styleBody;
				} else {
					Ext.get(styleSheetId).dom.sheet.insertRule(styleBody, 0);
				}
			}
			return cssClasses[icon];
		}
	};
}();

String.space = function (len) {
	var t = [], i;
	for (i = 0; i < len; i++) {
		t.push(' ');
	}
	return t.join('');
};

function aboutWindow() {
	var tabs = [];
	// Ext.getBody().select('div.tab').each(function(div) {
	// 	tabs.push({
	// 		title: div.select('h2').first().dom.innerHTML,
	// 		html: div.select('div').first().dom.innerHTML.replace('{gabor}', '如果觉得好用,请按Ctrl+D收藏！谢谢！')
	// 	});
	// });
    tabs.push({
        title: "aaaa",
        html: "xxxxx"
    });
	var win = new Ext.Window({
		title: document.title,
		width: 640,
		height: 400,
		modal: true,
		layout: 'fit',
		items: new Ext.TabPanel({
			defaults: {
				autoScroll: true,
				bodyStyle: 'padding: 5px;'
			},
			activeTab: 0,
			items: tabs
		})
	});
	win.show();
}

function getSelectedItems(node){
	 //var childnodes = node.childNodes||node.attributes.children;
	 var childnodes = node.attributes.children;
	 for(var i=0;i<childnodes.length;i++){  //从节点中取出子节点依次遍历
		 var rootnode = childnodes[i];
		 alert(rootnode.text);
		 if(rootnode.attributes.children.length>0){  //判断子节点下是否存在子节点，个人觉得判断是否leaf不太合理，因为有时候不是leaf的节点也可能没有子节点
			 findchildnode(rootnode);    //如果存在子节点  递归
		 }   
	 }
}

