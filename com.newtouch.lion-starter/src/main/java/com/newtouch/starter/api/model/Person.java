/**
 * 
 */
package com.newtouch.starter.api.model;

import com.newtouch.lion.model.VersionEntity;

/**
 * @author wanglijun
 *
 */
public class Person extends VersionEntity<Long> {

	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 8702924459713248261L;
	
	private Long id;
	
	private String name;
	
	

	@Override
	public Long getId() {
	 
		return this.id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public void setId(Long id) {
		this.id = id;
	}



	@Override
	public String toString() {
		return "Person [id=" + id + ", name=" + name + "]";
	}
	
	
	
}
