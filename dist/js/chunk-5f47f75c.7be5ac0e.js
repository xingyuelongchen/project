(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f47f75c"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"841c":function(e,t,a){"use strict";var r=a("d784"),n=a("825a"),i=a("1d80"),s=a("129f"),c=a("14c3");r("search",1,(function(e,t,a){return[function(t){var a=i(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,a):new RegExp(t)[e](String(a))},function(e){var r=a(t,e,this);if(r.done)return r.value;var i=n(e),o=String(this),l=i.lastIndex;s(l,0)||(i.lastIndex=0);var u=c(i,o);return s(i.lastIndex,l)||(i.lastIndex=l),null===u?-1:u.index}]}))},f8f0:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content-box"},[a("mixSearch",{attrs:{fields:e.searchFields},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("div",[a("mixTable",{attrs:{fields:e.tableFields},model:{value:e.tableData,callback:function(t){e.tableData=t},expression:"tableData"}})],1),a("div",[a("mixPage",{model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}),a("el-dialog",{attrs:{visible:e.dialogShow,title:"编辑"},on:{"update:visible":function(t){e.dialogShow=t}}},[a("mixForm",{attrs:{fields:e.editFormField},model:{value:e.editForm,callback:function(t){e.editForm=t},expression:"editForm"}}),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存")])],1)],1)],1)],1)},n=[],i=(a("99af"),a("4160"),a("d81d"),a("ac1f"),a("841c"),a("159b"),a("5530")),s=(a("96cf"),a("1da1")),c={name:"Adminmenber",data:function(){return{tableData:[],tableFields:[],search:{},searchFields:[{type:"select",label:"搜索",prop:"status",span:3,options:[{label:"在职",value:1},{label:"离职",value:2},{label:"未审核",value:"0"}]},{type:"text",label:"搜索",prop:"search",span:3},{type:"button",prop:"value",span:3,label:"搜索",style:"primary",click:this.getData}],page:{page:1,limit:10,total:0,event:this.getData},dialogShow:!1,editForm:{"nickname[a]":0},editFormField:[{label:"姓名",prop:"nickname[a]",type:"text"}]}},activated:function(){this.getData(),this.getTableData()},methods:{getTableData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios("/adminapi/Publics/table_th",{data:{table_id:2}});case 2:a=t.sent,r=a.data,r.code&&(e.tableFields=r.data.concat([{label:"操作",type:"manage",fixed:"right",width:250,options:[{label:"编辑",style:"primary",click:e.tableEdit},{label:"重置密码",style:"danger",isShow:{type:"==",val:"正常",prop:"status"},click:e.reset},{label:"审核",style:"warning",isShow:{type:"==",val:"未审核",prop:"status"},click:e.adopt},{label:"离职",style:"info",isShow:{type:"==",val:"正常",prop:"status"},click:e.quit},{label:"恢复",style:"success",isShow:{type:"==",val:"离职",prop:"status"},click:e.recovery}]}]));case 5:case"end":return t.stop()}}),t)})))()},tableEdit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.axios("/adminapi/Publics/TableFormEdit",{data:{table_id:2,type:"edit"}});case 2:r=a.sent,n=r.data,n.code&&(t.editFormField=n.data.map((function(e){return Object(i["a"])({span:12,labelWidth:80},e)})),s={},n.data.forEach((function(t){s[t.prop]=e[t.prop]})),t.editForm=s,t.dialogShow=!0);case 5:case"end":return a.stop()}}),a)})))()},getData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=JSON.parse(JSON.stringify(e.page)),delete a.event,t.next=4,e.axios("/adminapi/User/list",{params:Object.assign(a,e.search)});case 4:r=t.sent,n=r.data,n.code&&(e.tableData=n.data,e.page.total=n.count);case 7:case"end":return t.stop()}}),t)})))()},adopt:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.axios("/adminapi/User/adopt",{data:{id:e.id}});case 2:t.getData();case 3:case"end":return a.stop()}}),a)})))()},quit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.axios("/adminapi/User/quit",{data:{id:e.id}});case 2:t.getData();case 3:case"end":return a.stop()}}),a)})))()},recovery:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.axios("/adminapi/User/recovery",{data:{id:e.id}});case 2:t.getData();case 3:case"end":return a.stop()}}),a)})))()},save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios("/adminapi/User/edit",{data:e.editForm});case 2:a=t.sent,r=a.data,r.code&&(e.dialogShow=!1,e.getData());case 5:case"end":return t.stop()}}),t)})))()},reset:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.axios("/adminapi/user/reset",{data:{id:e.id}});case 2:r=a.sent,n=r.data,n.code&&t.$alert("密码重置成功，新密码是："+n.data,{type:"success",title:n.msg});case 5:case"end":return a.stop()}}),a)})))()}}},o=c,l=a("2877"),u=Object(l["a"])(o,r,n,!1,null,"6b6629f2",null);t["default"]=u.exports}}]);