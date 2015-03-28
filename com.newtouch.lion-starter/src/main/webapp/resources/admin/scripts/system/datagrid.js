$(function() {
	//加载bootstrap
	Metronic.init(); // init metronic core componets
	Layout.init(); // init layout
	Tasks.initDashboardWidget(); // init tash dashboard widget
  lion.util.menu();//加载导航栏
	
	var datagridId='#datagrid_dt';
	var addForm=$('#sysDataGridForm');
	var addDialog=$('#basic');
	var queryForm=$('#queryform');
	
	handleVForm(addForm,submitForm);
	//选择DataGrid单行
	function getSelectedRow(){return $(datagridId).datagrids('getSelected');}
	 
	/**
	 * [查询]
	 */
	 $('#btnQuery').click(function(){
		 var params=queryForm.serializeObject();	      
	      $(datagridId).datagrid({queryParams:params});
	      //重新加载数据
	      dataGridReload(datagridId);
	 });
	 
	//重新加载DataGrid
	  function dataGridReload(dataGridId){
	     $(datagridId).datagrid('reload');
	  }
	 //刷新
	 $('#btnRefresh').on('click',function(){
		   dataGridReload(datagridId);
	 });
	 //新增
	 $('#btnAdd').on('click',function(){
		 addForm.reset();
		  addDialog.find('.modal-header h4 span').text('添加DataGrid');
		  $('.lion-combo').combo('reloadLi');
	 });

	 addForm.on('show.bs.modal',function(){
	 	 addForm[0].reset(); 
	 }); 

	 $('#btnSave').click(function(){
	 		addForm.submit();
	 });

	 //编辑
	 $('#btnEdit').on('click',function(){
		 var row=getSelectedRow();
		 if(!row){
			 lion.util.info('提示','请选择要编辑记录');
			 return;
		 }
		 addForm[0].reset();
		 addForm.find('.form-group').removeClass('has-error');
		 addForm.find('.help-block').remove();
		 addDialog.find('.modal-header h4').text('编辑DataGrid');
		 $('#basic').modal('toggle');
		 addForm.fill(row);
	 });
	 //删除
	 $('#btnDelete').on('click',function(){
		 var row=getSelectedRow();
		 if(!row){
			 lion.util.info('提示','请选择要删除记录');
			 return;
		 }
		 bootbox.confirm('确认要删除此记录？', function(result) {
              if(result){            	 
            	  var param={'id':row.id};
                lion.util.post('delete.json',param,successForDelete,errorRequest);
            	  //lion.util.success('提示!', '已删除成功');
              }
          }); 
	 });
	//导出Excel
	 $('#btnExport').on('click',function(){
		var params=queryForm.serialize(),url='export.json?tableId1='+$(datagridId).attr('id');
       if(lion.util.isNotEmpty(params)){
          url+='&'+params;
       }
       window.open(url,"_blank");
	 });
});

function successForDelete(data,arg){
   if(data!==null&&!(data.hasError)){
      lion.util.success('提示',data.message);
      $('#datagrid_dt').datagrid('reload');
   }else if(data!==null&&data.hasError){
      var gmsg='';
      for(var msg in data.errorMessage){
        gmsg+=data.errorMessage[msg];
      }
      if(lion.util.isEmpty(gmsg)){
        gmsg='未删除成功';
      }
      lion.util.error('提示',gmsg);
  }
}
/**新增或编辑的提交代码*/
function submitForm(frm){
	var param=frm.serialize(),id=($('#id').val());
  //ID为空时，为添加动作
  if(lion.util.isEmpty(id)){
	  lion.util.post('add.json',param,successAddFrm,errorRequest);
  }else{
      lion.util.post('edit.json',param,successAddFrm,errorRequest,param.id);
  }
}

//添加后&编辑后提交
function successAddFrm(data,arg,id){
  //TODO
  if(data!==null&&!(data.hasError)){
  	lion.util.success('提示',data.message);
  	$('#basic').modal('toggle');
  	$('#datagrid_dt').datagrid('reload');
  }else if(data!==null&&data.hasError){
  	var gmsg='';
  	for(var msg in data.errorMessage){
  		gmsg+=data.errorMessage[msg];
  	}
  	if(lion.util.isEmpty(gmsg)){
  		gmsg='添加DataGrid出错';
  	}
  	lion.util.error('提示',gmsg);
  }else{
  	lion.util.error('提示','添加DataGrid失败');
  }
}
//请求失败后信息
function errorRequest(data,arg){
	lion.util.error('提示','网络连接异常');
}

//验证表单
handleVForm=function(vForm,submitCallBackfn){
	var addError = $('.alert-danger', vForm);
    var addSuccess = $('.alert-success',vForm);
	vForm.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error', 
        focusInvalid: false, 
        onkeyup:false,
        ignore: '', 
        messages: {
        	  type: {
                required: '请选择type'
            },
            tableId:{
              required: '请输入tableId',
              rangelength:jQuery.validator.format('tableId长度为{0}和{1}字符之间'),
              remote: '该tableId已存在，请输入其他tableId'
            },
            title:{
              required: '请输入title',
              rangelength: jQuery.validator.format('title长度为{0}和{1}字符之间')
            },
            url:{
              required: '请输入url',
              rangelength: jQuery.validator.format('url长度为{0}和{1}字符之间')
            },
            data:{
              rangelength: jQuery.validator.format('data长度为{0}和{1}字符之间')
            },
            loadMsg:{
              rangelength: jQuery.validator.format('loadMsg长度为{0}和{1}字符之间')
            },
            pagePosition:{
              required: '请选择pagePosition'
            },
            pageNumber:{
              required: '请输入pageNumber',
              number: '请输入正确的数字'
            },
            pageSize:{
              required: '请输入pageSize',
              number: '请输入正确的数字'
            },
            pageList:{
              required: '请选择pageList'
            },
            queryParams:{
              rangelength: jQuery.validator.format('queryParams长度为{0}和{1}字符之间')
            },
            sortName:{
              rangelength: jQuery.validator.format('sortName长度为{0}和{1}字符之间')
            },
            sortOrder:{
              required: '请输入sortOrder',
              rangelength: jQuery.validator.format('sortOrder长度为{0}和{1}字符之间')
            },
            scrollbarSize:{
              required: '请输入scrollbarSize',
              number: '请输入正确的数字'
            },
            rowStyler:{
              rangelength: jQuery.validator.format('rowStyler长度为{0}和{1}字符之间')
            },
            loader:{
              rangelength: jQuery.validator.format('loader长度为{0}和{1}字符之间')
            },
            loadFilter:{
              rangelength: jQuery.validator.format('loadFilter长度为{0}和{1}字符之间')
            },
            editors:{
              rangelength: jQuery.validator.format('editors长度为{0}和{1}字符之间')
            },
            view:{
              rangelength: jQuery.validator.format('view长度为{0}和{1}字符之间')
            }
        },
        rules: {
        	  type: {
                required:true
            },
            tableId:{
            	required: true,
              rangelength:[1,60],
            	remote:{
                url:'checkisexitnameen.htm', //后台处理程序
                type: 'post',               //数据发送方式
                dataType: 'json',           //接受数据格式   
                data: {                     //要传递的数据
                     nameEn: function() {
                      return $('#name').val();
                     },
                         id:function(){
                           var id=($('#id').val());
                           if(lion.util.isNotEmpty(id)){
                             return id;
                           }
                           return '';
                         }
                  }
                }
            },
            title:{
            	required: true,
            	rangelength: [4,128]
            },
            url:{
            	required: true,
            	rangelength: [0,256]
            },
            data:{
            	rangelength: [0,512]
            },
            loadMsg:{
            	rangelength: [0,100]
            },
            pagePosition:{
            	required: true,
            	rangelength: [1,10]
            },
            pageNumber:{
            	required: true,
            	number: true
            },
            pageSize:{
            	required: true,
            	number: true
            },
            pageList:{
              required: true,
              rangelength: [1,50]
            },
            queryParams:{
              rangelength: [1,50]
            },
            sortName:{
              rangelength: [1,50]
            },
            sortOrder:{
              required: true,
              rangelength: [0,5]
            },
            scrollbarSize:{
              required: true,
              number: true
            },
            rowStyler:{
              rangelength: [0,100]
            },
            loader:{
              rangelength: [0,100]
            },
            loadFilter:{
              rangelength: [0,100]
            },
            editors:{
              rangelength: [0,100]
            },
            view:{
              rangelength: [0,100]
            }
        },
        invalidHandler: function (event, validator) {             
            addSuccess.hide();
            addError.show();
            Metronic.scrollTo(addError, -200);
        },

        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error'); 
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error'); 
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error'); 
        },
        errorPlacement:function(error,element){
        	//当遇到combo的对话框架的时，修改它的显示位置
        	if (element.hasClass('lion-combo')){        	 
        		error.insertAfter(element.parent().find('div.btn-group'));
        	}else{
        		error.insertAfter(element);
        	}
        },
        submitHandler: function (form) {
            addSuccess.show();
            addError.hide();
            submitCallBackfn(vForm);
        }
    });
};
//判断是否编辑
function formatterEidtable(val,row) {
	var name =$.lion.lang.editable.n;
	if (val) {
		name = $.lion.lang.editable.y;
	}
	return name;
}