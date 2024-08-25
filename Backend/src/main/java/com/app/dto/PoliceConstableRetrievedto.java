package com.app.dto;


import javax.validation.constraints.NotBlank;

import javax.validation.constraints.Size;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PoliceConstableRetrievedto {

	@NotBlank
    @Size( max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

  
}
