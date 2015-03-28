var $sessiontb=$('#sys_session_tb');
$(function () {
		//加载bootstrap
	Metronic.init(); // init metronic core componets
	Layout.init(); // init layout
	Tasks.initDashboardWidget(); // init tash dashboard widget
  	lion.util.menu();//加载导航栏 
	 //刷新
	 $('#btnRefresh').on('click',function(){
		 $sessiontb.datagrids('reload'); 
	 });
	//选择DataGrid单行
	function getSelectedRow(){return $sessiontb.datagrids('getSelected');}
	//强制用户退出
	 $('#btnUserExit').on('click',function(){
		 var row=getSelectedRow();
		 if(!row){
			 lion.util.info('提示','请选择要强制退出记录');
			 return;
		 }
		 bootbox.confirm('确认要强制退出此用户？', function(result) {
              if(result){          	 
            	  var param={'id':row.id};
                  lion.util.post('forcelogout.json',param,successUserExit,errorRequest);
              }
      	}); 
	 });
});
//用户强制退出
function successUserExit(data){
   if(data!==null&&!(data.hasError)){
      lion.util.success('提示',data.message);
      $sessiontb.datagrids('reload');
   }else if(data!==null&&data.hasError){
      var gmsg='';
      for(var msg in data.errorMessage){
        gmsg+=data.errorMessage[msg];
      }
      if(lion.util.isEmpty(gmsg)){
        gmsg='未强制退出成功';
      }
      lion.util.error('提示',gmsg);
  }
}
//请求失败后信息
function errorRequest(data,arg){
	lion.util.error('提示','网络连接异常');
}

//判断是否编辑
function formatterEidtable(val,row) {
	var name =lion.lang.editable.n;
	if (val) {
		name = lion.lang.editable.y;
	}
	return name;
}
//超时时间算法
function formatterTimeout(val,row){
	if(val){
		return (val/1000/60);
	}
	return '';
}