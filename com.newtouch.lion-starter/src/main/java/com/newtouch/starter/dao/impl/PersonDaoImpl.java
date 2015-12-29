/**
 * 
 */
package com.newtouch.starter.dao.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.newtouch.lion.common.sql.HqlUtils;
import com.newtouch.lion.dao.impl.BaseDaoImpl;
import com.newtouch.lion.model.system.Group;
import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.starter.api.model.Person;
import com.newtouch.starter.dao.PersonDao;

/**
 * @author wanglijun
 *
 */
@Repository
public class PersonDaoImpl extends BaseDaoImpl<Person,Long> implements PersonDao {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2072684476764699865L;
	
	public PageResult<Person> doFindByCriteria(QueryCriteria criteria) {
		String queryEntry = " from Person ";

		String[] whereBodies = {"name like :name",};

		String fromJoinSubClause = "";

		Map<String, Object> params = criteria.getQueryCondition();

		String orderField = criteria.getOrderField();

		String orderDirection = criteria.getOrderDirection();

		String hql = HqlUtils.generateHql(queryEntry, fromJoinSubClause,
				whereBodies, orderField, orderDirection, params);

		int pageSize = criteria.getPageSize();

		int startIndex = criteria.getStartIndex();

		PageResult<Person> pageResult = this.query(hql,
				HqlUtils.generateCountHql(hql, null), params, startIndex,
				pageSize);

		return pageResult;
	}
	
	 
}