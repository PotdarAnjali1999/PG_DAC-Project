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
public class PoliceStationRetrievedto {

	
	private Long policeStionId;
	
	@NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size( max = 255)
    private String area;
}
