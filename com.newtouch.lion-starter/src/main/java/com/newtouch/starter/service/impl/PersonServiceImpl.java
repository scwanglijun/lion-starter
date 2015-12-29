/**
 * 
 */
package com.newtouch.starter.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.lion.service.AbstractService;
import com.newtouch.starter.api.model.Person;
import com.newtouch.starter.api.service.PersonService;
import com.newtouch.starter.dao.PersonDao;

/**
 * @author wanglijun
 *
 */
@Service
public class PersonServiceImpl  extends AbstractService  implements PersonService{
	
	
	@Autowired
	private PersonDao  personDao;

	/* (non-Javadoc)
	 * @see com.newtouch.starter.api.service.PersonService#doSave(com.newtouch.starter.api.model.Person)
	 */
	@Override
	public void doSave(Person person) {
		personDao.save(person);
	}

	@Override
	public PageResult<Person> doFindByCriteria(QueryCriteria queryCriteria) {
		return  personDao.doFindByCriteria(queryCriteria);
	}
	
	
	
}
