(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17810ba5"],{2246:function(e,t,a){},"266e":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"content-wrap"},[a("el-card",{staticClass:"left"},[a("div",{attrs:{slot:"header"},slot:"header"},[e._v(" 权限组 "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",size:"mini"},on:{click:function(t){return e.addGroup("添加")}}},[e._v("添加新组")])],1),a("el-scrollbar",{staticStyle:{height:"100%"}},[a("div",{staticClass:"el-list"},e._l(e.list,(function(t){return a("div",{key:t.id,staticClass:"el-item",on:{click:function(a){return e.getRole(t)}}},[a("span",{attrs:{user:"role"}},[e._v(e._s(t.title))]),a("span",[a("el-tooltip",{staticClass:"icon",attrs:{effect:"dark",content:"修改",placement:"left"}},[a("i",{staticClass:"el-icon-edit",on:{click:function(a){return a.stopPropagation(),e.changeGroup("修改",t)}}})]),a("el-tooltip",{staticClass:"icon",attrs:{effect:"dark",content:"复制",placement:"top"}},[a("i",{staticClass:"el-icon-copy-document",on:{click:function(a){return a.stopPropagation(),e.cloneGroup(t)}}})]),a("el-tooltip",{staticClass:"icon",attrs:{effect:"dark",content:"删除",placement:"right"}},[a("i",{staticClass:"el-icon-delete",on:{click:function(a){return a.stopPropagation(),e.delGroup(t)}}})])],1)])})),0)])],1),a("el-card",{staticClass:"center"},[a("div",{attrs:{slot:"header"},slot:"header"},[e._v(" 权限组修改 "),a("el-button",{staticStyle:{float:"right",padding:"6px"},attrs:{type:"primary",size:"mini"},on:{click:e.saveRole}},[e._v("保存权限")])],1),e.role.id?a("el-scrollbar",{staticStyle:{height:"100%"}},[a("el-tree",{ref:"tree",attrs:{data:e.treeData,props:{label:"title"},"expand-on-click-node":!0,"check-strictly":!1,"highlight-current":"","show-checkbox":"","node-key":"id"},on:{"check-change":e.checkChange},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.data;return[a("div",{staticStyle:{flex:"1",display:"flex","justify-content":"space-between"}},[a("span",[e._v(e._s(i.title))]),a("span",[a("el-button",{staticStyle:{padding:"3px","font-size":"12px"},attrs:{type:"primary"},on:{click:function(t){return t.stopPropagation(),e.nodeClick(i)}}},[e._v("查看")])],1)])]}}],null,!1,1825063630)})],1):e._e()],1),a("el-card",{staticClass:"right"},[a("div",{attrs:{slot:"header"},slot:"header"},[e._v(" 权限子列表 "),a("el-button",{staticStyle:{float:"right",padding:"6px"},attrs:{type:"primary",size:"mini"},on:{click:e.saveList}},[e._v("保存权限")])],1),a("mixTable",{ref:"table",attrs:{fields:e.rolesFields},on:{select:e.listCheck},model:{value:e.rolesList,callback:function(t){e.rolesList=t},expression:"rolesList"}})],1)],1),a("el-dialog",{attrs:{title:e.title,visible:e.dialogFormVisible,width:"400px",modal:!0,top:"15vh"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("mixForm",{attrs:{fields:e.roleFields},model:{value:e.roleData,callback:function(t){e.roleData=t},expression:"roleData"}})],1)],1)},r=[],n=(a("99af"),a("4160"),a("caad"),a("c975"),a("d81d"),a("a434"),a("b64b"),a("2532"),a("159b"),a("5530")),l=(a("96cf"),a("1da1")),s={name:"Rolegroup",data:function(){return{list:[],key:"",treeData:[],roleData:{},title:"",dialogFormVisible:!1,role:{},roleFields:[{label:"组名称",prop:"title",labelWidth:60,type:"text"},{label:"组排序",prop:"sort",labelWidth:60,type:"number"},{label:"组权限",labelWidth:60,type:"select",prop:"range",options:[{label:"全部",value:"1"},{label:"仅自己",value:"2"},{label:"所属部门",value:"3"},{label:"所属部门及下属部门",value:"4"}]},{type:"textarea",labelWidth:60,prop:"reamk",label:"描述"},{type:"button",label:"修改",labelWidth:60,click:this.change}],rolesList:[],rolesFields:[],selectTableField:{laytables_editable:[],laytables:[]}}},created:function(){this.getData(),this.getMenuData()},methods:{changeGroup:function(e,t){this.url="/adminapi/Authgroup/edit",this.roleData=t,this.title=e+"权限组",this.dialogFormVisible=!0},cloneGroup:function(e){this.url="/adminapi/Authgroup/clone",this.roleData={id:e.id},this.change()},delGroup:function(e){this.url="/adminapi/Authgroup/del",this.roleData={id:e.id},this.change()},addGroup:function(e){this.title=e+"权限组",this.dialogFormVisible=!this.dialogFormVisible,this.url="/adminapi/Authgroup/add"},checkChange:function(){var e=this.$refs.tree.getCheckedKeys(),t=this.$refs.tree.getHalfCheckedKeys();this.role.rules=t.concat(e).sort((function(e,t){return e-t}))},listCheck:function(e){console.log(e),this.selectTableField.laytables=e.map((function(e){return e.id}))},nodeClick:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,r,l,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.selectTableField.id=e.id,a.next=3,t.axios("/adminapi/Authgroup/table_list",{data:{id:e.id,table_id:t.role.id}});case 3:i=a.sent,r=i.data,r.code?(l=Object.keys(r.data.column[0]).map((function(e){return{label:e,prop:e,type:"edit"==e?"switch":"",change:t.listChange}})),s=r.data.lay.laytables[e.id],o=r.data.lay.laytables_editable[e.id],t.rolesList=r.data.column.map((function(e){return Object(n["a"])(Object(n["a"])({},e),{},{checked:s.includes(e.id),edit:o.includes(e.id)?1:0})})),t.rolesFields=[{type:"selection"}].concat(l),t.selectTableField.laytables=s,t.selectTableField.laytables_editable=o):t.rolesList=[];case 6:case"end":return a.stop()}}),a)})))()},listChange:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:i=t.selectTableField.laytables_editable,r=i&&i.indexOf(e.id),r>=0?(console.log(r),t.selectTableField.laytables_editable.splice(r,1)):(console.log(r),t.selectTableField.laytables_editable.push(e.id));case 3:case"end":return a.stop()}}),a)})))()},saveList:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.selectTableField.table_id=e.role.id,a=JSON.parse(JSON.stringify(e.selectTableField)),t.next=4,e.axios("/adminapi/Authgroup/table_add",{data:a});case 4:i=t.sent,r=i.data,r.code&&(e.selectTableField={laytables_editable:[],laytables:[]},e.nodeClick({id:a.id}));case 7:case"end":return t.stop()}}),t)})))()},getMenuData:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios("/adminapi/Authgroup/lis");case 2:a=t.sent,i=a.data,i.code&&(e.treeData=i.data);case 5:case"end":return t.stop()}}),t)})))()},change:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios(e.url,{data:e.roleData});case 2:a=t.sent,i=a.data,i.code&&(e.dialogFormVisible=!1,e.roleData={},e.$message.success(i.msg),e.getData());case 5:case"end":return t.stop()}}),t)})))()},getData:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios("/adminapi/Authgroup/list");case 2:a=t.sent,i=a.data,i.code&&(e.list=i.data);case 5:case"end":return t.stop()}}),t)})))()},saveRole:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios("/adminapi/Authgroup/preservation",{data:e.role});case 2:a=t.sent,i=a.data,i.code&&e.$message.success(i.msg);case 5:case"end":return t.stop()}}),t)})))()},getRole:function(e){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function a(){var i,r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.role={id:e.id},a.next=3,t.axios("/adminapi/Authgroup/info",{data:t.role});case 3:i=a.sent,r=i.data,r.code&&(t.key=Math.random(),t.$refs.tree.setCheckedKeys([]),n=[],r.data.rules.forEach((function(e){return t.checked(e,t.treeData,n)})),t.$refs.tree.setCheckedKeys(n),t.role=r.data);case 6:case"end":return a.stop()}}),a)})))()},checked:function(e,t,a){var i=this;t.forEach((function(t){t.id==e?t.children&&t.children.length||a.push(t.id):t.children&&t.children.length&&i.checked(e,t.children,a)}))}}},o=s,c=(a("36f6"),a("2877")),d=Object(c["a"])(o,i,r,!1,null,"36a4aa98",null);t["default"]=d.exports},"36f6":function(e,t,a){"use strict";var i=a("2246"),r=a.n(i);r.a}}]);