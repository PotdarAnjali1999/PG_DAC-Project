package com.app.dto;

import java.time.LocalDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.app.enums.Category;
import com.app.enums.Status;

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
public class Complaintdto {
	
	private Long complaintId;

	@NotNull
    @Size(min = 5, max = 100)
    private String complaintTitle;

    @NotNull
    @Size(min = 10, max = 1000)
    private String complaintDescription;

    @NotNull
    @PastOrPresent
    private LocalDate complaintDate;

    @NotNull
    private Status status;  // Use Status enum

    @NotNull
    private Category category;  // Use Category enum

    @Size(max = 255)
    private String location;

    @NotNull
    private Long userId;  // ID of the user making the complaint
    
    public Complaintdto(String complaintTitle, String complaintDescription, LocalDate complaintDate, Status status,
    		Category category, String location, Long userId, Long complaintId) {
        this.complaintTitle = complaintTitle;
        this.complaintDescription = complaintDescription;
        this.complaintDate = complaintDate;
        this.status = status;
        this.category = category;
        this.location = location;
        this.userId = userId;
        this.complaintId = complaintId;
    }
	
  public Complaintdto(String complaintTitle2, Status status2, Category category2) {
		
		this.complaintTitle=complaintTitle2;
		this.status=status2;
		this.category=category2;
	}
}