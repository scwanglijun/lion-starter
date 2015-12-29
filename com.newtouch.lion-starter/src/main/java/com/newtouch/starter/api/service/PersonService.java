/**
 * 
 */
package com.newtouch.starter.api.service;

import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.starter.api.model.Person;

/**
 * @author wanglijun
 *
 */
public interface PersonService {
	
	/**
	 * 
	 * @param person
	 */
	public void  doSave(Person person);
	/***
	 * 
	 * @param queryCriteria
	 * @return
	 */
	public PageResult<Person> doFindByCriteria(QueryCriteria queryCriteria);
	
	/***
	 * <tx:method name="doFind*" read-only="true"   propagation="SUPPORTS" />
			<tx:method name="find*"   read-only="true"   propagation="SUPPORTS" />
			<tx:method name="get*"    read-only="true"   propagation="SUPPORTS" />
			<tx:method name="check*"  read-only="true"   propagation="SUPPORTS" />
			<tx:method name="doGet*"  read-only="true"  propagation="SUPPORTS" />
			<tx:method name="do*"     propagation="REQUIRED" />
			<tx:method name="ido*"    propagation="REQUIRES_NEW" />
			<tx:method name="*"       propagation="SUPPORTS" />
	 */
}
