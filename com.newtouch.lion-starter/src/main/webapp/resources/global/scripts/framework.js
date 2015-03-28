/**模块－命名空间定义*/
(function($){
	$.sys={
			user:"user",
			group:"group",
			role:"role",
			codetype:"codetype",
			codelist:"codelist",
			resource:"resource",
			department:"deparmtnet",
			auth:"auth",
			dataGrid:"dataGrid",
			dataColumn:"dataColumn",
			parameter:"parameter"
	};
	$.framework={msg:{success:"success",error:"error",none:"none"}};
	
	$.framework={validatebox:{
		defaults:{
			rules:{
				minlength:{message:"您输入内容的最小长度应为{0}字符。"},
				maxlength:{message:"您输入内容的最大长度应为{0}字符。"}
			}
		}
	}};
	$.commonfn={
			showFieldMessage:function(target,fieldErrors){
			if((undefined==fieldErrors)||$.isEmptyObject(fieldErrors)){
				return;
			}
		 
			$('input,select,textarea',target).each(function(){				
				var inputName=this.name;
			    if(($.StringUtils.isNotEmpty(this.name))&&($.StringUtils.isNotEmpty(fieldErrors[inputName]))){
			    	$(this).addClass("validatebox-invalid");
			    	$(this).validatebox.showTip(this,fieldErrors[inputName].errorMessages);
			    }
			});
		}
	};
})(jQuery);


/**
 * @author wanglijun
 * @date 2013-02-15
 * jQuery plugin dev String.js
 * */
(function($){
	$.isEmpty=function(str){
		return str===null ||str=== undefined ? true : /^[\s\xa0]*$/.test(str);
	};
	$.between=function(s,left, right) {
	      var startPos = s.indexOf(left);
	      var endPos = s.indexOf(right);
	      var start = startPos + left.length;
	      return endPos > startPos ?  s.slice(start, endPos) : "";
	 };
	 $.StringUtils={
		isEmpty:function(str){
			return str===null ||str=== undefined ? true : /^[\s\xa0]*$/.test(str);
		},
	 	isNotEmpty:function(str){
	 		return $.StringUtils.isEmpty(str)?false:true;
		}
	 };
	 $.context=function(){
		 //获取应用的上下文根路径
		 var pathname=window.location.pathname;
		 var indexNext= pathname.indexOf("/",1);
		 return pathname.substr(0,indexNext);		 
	 };
	 $.contexts=$.context();
})(jQuery);


//判断是否编辑
function formatterEidtable(val, row) {
	var name =$.loin.lang.editable.n;
	if (val) {
		name = $.loin.lang.editable.y;
	}
	return name;
}
// 加载部门
function formatterShowDepartment(val, row) {
	var name = "";
	if (val) {
		name = val.nameZh;
	}
	return name;
}

// 加载性别
function formatterGender(val, row) {
	var gender = "";
	if (val) {
		if (val.gender == 1) {
			gender=$.loin.lang.gender.m;
		} else {
			gender=$.loin.lang.gender.f;
		}
	}
	return gender;
}
// 加载表格名称
function formatterShowTableId(val, row) {
	var name = "";
	if (val) {
		name = val.tableId;
	}
	return name;
}
// 将JSON复杂对象显示到DataGird中
function formatterName(val, row) {
	var name = "";
	if (val != null) {
		name = val.nameZh;
	}
	return name;
}
/**sys_code_type 加载列表*/
function formatterCodeList(val, row) {
	var data = $("#sys_parameter_type").combobox("getData");
	var nameZh = "";
	for ( var obj in data) {
		if (data[obj].nameEn == val) {
			nameZh = data[obj].nameZh;
			break;
		}
	}
	return nameZh;
}
/**sys_code_type 加载列表*/
function formatterCodeResource(val, row) {
	var data = $("#sys_resource_type").combobox("getData");
	var nameZh = "";
	for ( var obj in data) {
		if (data[obj].nameEn == val) {
			nameZh = data[obj].nameZh;
			break;
		}
	}
	return nameZh;
}
function formatterCheckBox(value, row, index) {
	var checkBoxId = "";
	if (value) {
		checkBoxId = "<input type='checkbox' checked='true'  disabled='true'/>";
	}
	return checkBoxId;
}



$.extend($.fn.validatebox.defaults.rules, {
	minLength :{
		validator : function(value, param) {
			return value.length >= param[0];
		},
		message:$.framework.validatebox.defaults.rules.minlength.message
	},
   maxLength:{
	  validator : function(value, param) {
			return value.length <= param[0];
	  },
	  message:$.framework.validatebox.defaults.rules.maxlength.message
   },
   checkname : {
		validator:function(value, param) {
			var data = {};
			data[param[1]] = url;
			var fieldText = $.ajax( {
				url : param[0],
				dataType : "json",
				data : data,
				async : false,
				cache : false,
				type : "post"
			}).responseText;
			return fieldText == "true";
		},
		message : "Please fix this field."
	}
});


$.extend($.fn.validatebox,{
	showTip:function(jq,errormsg){
		var box = $(jq);
		if($.StringUtils.isEmpty(errormsg)){
			return;
		}
		$.data(jq, "validatebox").message=errormsg;
		msg=errormsg;
		var tip = $.data(jq, "validatebox").tip;
		if (!tip) {
			tip = $("<div class=\"validatebox-tip\">"
						+ "<span class=\"validatebox-tip-content\">"
						+ "</span>"
						+ "<span class=\"validatebox-tip-pointer\">"
						+ "</span>" + "</div>").appendTo("body");
			$.data(jq, "validatebox").tip = tip;
		}
		tip.find(".validatebox-tip-content").html(msg);
		tip.css( {
			display : "block",
			left : box.offset().left + box.outerWidth(),
			top : box.offset().top
		});	
	}
});

$.extend($.fn.validatebox.defaults.rules, {
	selectValueRequired : {
		validator : function(value, param) {
			if (value == "请选择" || value == "select")
				value = "";
			return value.length > param[0];
		},
		message : 'Please select value required.'
	},
	lengthRamote:{
		validator : function(value, param){
			var rules = $.fn.validatebox.defaults.rules;
			if(!rules.length.validator(value,param)){
				rules.lengthRamote.message= rules.length.message;
				return false;
			}
			if(param[4]&&$.StringUtils.isNotEmpty($(param[4]).val())&&$(param[4]).val()===value){
				return true;
			}
			if(param[2]&&param[3]){
				var remoteparam=[param[2],param[3]];
				if(!rules.remote.validator(value,remoteparam)){
					rules.lengthRamote.message="您输入 \""+value+"\" 已经存在！";
					return false;
				}
			}
			return true;
		},
		message:$.fn.validatebox.defaults.rules.length.message
	}
});

/**提示信息（成功，提示、警告、错误）*/
(function($) {       
	$.lionui={};
	$.lionui.notice={
		 success:function(title,content){
			 toastr.options = {
				  "closeButton": true,
				  "debug": false,
				  "positionClass": "toast-top-center",
				  "onclick": null,
				  "showDuration": "1000",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "1000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
			 };
			 toastr.success(content, title);
		 },
		 error:function(title,content){
			 toastr.options = {
					  "closeButton": true,
					  "debug": false,
					  "positionClass": "toast-top-center",
					  "onclick": null,
					  "showDuration": "1000",
					  "hideDuration": "0",
					  "timeOut": "0",
					  "extendedTimeOut": "0",
					  "showEasing": "swing",
					  "hideEasing": "linear",
					  "showMethod": "fadeIn",
					  "hideMethod": "fadeOut"
				};
			 toastr.error(content, title);
		 },
		 warning:function(title,content){
			 toastr.options = {
					  "closeButton": true,
					  "debug": false,
					  "positionClass": "toast-top-center",
					  "onclick": null,
					  "showDuration": "1000",
					  "hideDuration": "0",
					  "timeOut": "0",
					  "extendedTimeOut": "0",
					  "showEasing": "swing",
					  "hideEasing": "linear",
					  "showMethod": "fadeIn",
					  "hideMethod": "fadeOut"
				};
			 toastr.warning(content, title); 
		 },
		 info:function(title,content){
			 toastr.options = {
					  "closeButton": true,
					  "debug": false,
					  "positionClass": "toast-top-center",
					  "onclick": null,
					  "showDuration": "1000",
					  "hideDuration": "1000",
					  "timeOut": "5000",
					  "extendedTimeOut": "1000",
					  "showEasing": "swing",
					  "hideEasing": "linear",
					  "showMethod": "fadeIn",
					  "hideMethod": "fadeOut"
				};
			 toastr.info(content, title);
		 }
	};
})(jQuery);
(function($) {
	$.topCenterMsgBox = function(msg) {
		parent.$.messager.show({
			title : '提示',
			msg : msg,
			showType : 'slide',
			timeout:2000,
			style : {
				right : '',
				top : document.body.scrollTop
						+ document.documentElement.scrollTop,
				bottom : ''
			}
		});
	};
})(jQuery);