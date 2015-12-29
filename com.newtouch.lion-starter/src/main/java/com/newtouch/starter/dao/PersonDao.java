/**
 * 
 */
package com.newtouch.starter.dao;

import com.newtouch.lion.dao.BaseDao;
import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.starter.api.model.Person;

/**
 * @author wanglijun
 *
 */
public interface PersonDao extends BaseDao<Person,Long> {
	
	public PageResult<Person> doFindByCriteria(QueryCriteria criteria);
	

}
