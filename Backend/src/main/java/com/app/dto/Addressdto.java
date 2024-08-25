package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Addressdto {
	
	 private String adrLine1;
	    private String city;
	    private String state;
	    private String country;
	    private String zipCode;

}
