/**
 * 
 */
package com.newtouch.starter.web.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.lion.data.DataTable;
import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.lion.web.model.QueryDt;
import com.newtouch.starter.api.model.Person;
import com.newtouch.starter.api.service.PersonService;
import com.newtouch.starter.web.vo.PersonVo;

/**
 * @author wanglijun
 *
 */
@Controller
@RequestMapping("/person")
public class PersonController {
	
	/** 默认排序字段名称 */
	private static final String DEFAULT_ORDER_FILED_NAME = "id";
	/**主页 */
	public static final String INDEX_RETURN="/person/index";
	
	@Autowired
	private PersonService  personService;
	
	@RequestMapping("/index")
	public String index(){
		return INDEX_RETURN;
	}
	
	
	@RequestMapping(value = "list")
	@ResponseBody
	public DataTable<Person> list(QueryDt query,@ModelAttribute("person") PersonVo personVo) {
		QueryCriteria queryCriteria = new QueryCriteria();

		// 设置分页 启始页
		queryCriteria.setStartIndex(query.getPage());
		// 每页大小
		queryCriteria.setPageSize(query.getRows());
		// 设置排序字段及排序方向
		if (StringUtils.isNotEmpty(query.getSort()) && StringUtils.isNotEmpty(query.getOrder())) {
			queryCriteria.setOrderField(query.getSort());
			queryCriteria.setOrderDirection(query.getOrder());
		} else {
			queryCriteria.setOrderField(DEFAULT_ORDER_FILED_NAME);
			queryCriteria.setOrderDirection(QueryCriteria.ASC);
		}
		//查询条件 中文参数名称按模糊查询
		if(StringUtils.isNotEmpty(personVo.getName())){
			queryCriteria.addQueryCondition("nameZh","%"+personVo.getName()+"%");
		}
		PageResult<Person> pageResult = personService.doFindByCriteria(queryCriteria);
		return pageResult.getDataTable(query.getRequestId());
	}
}
