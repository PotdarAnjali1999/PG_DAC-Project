package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Logindto {
	
	@NotBlank
	@NotNull
	private String emailId;
	
	private String firstName;
	
	@NotBlank
	@NotNull
	private String password;

}
