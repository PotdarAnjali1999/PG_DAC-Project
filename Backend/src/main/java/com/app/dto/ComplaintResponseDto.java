package com.app.dto;

import com.app.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintResponseDto {
	
	private Long complaintId;
    private Status status;
    private String complaintTitle;

}
