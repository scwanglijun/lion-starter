/**
 * 
 */
package com.newtouch.starter.web.vo;

import java.io.Serializable;

/**
 * @author wanglijun
 *
 */
public class PersonVo  implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5819132580870511450L;
	

	private Long id;
	
	private String name;
	
	
	
	public PersonVo() {
		 super();
	}
	

	public PersonVo(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	
	

}
