package com.app.entites;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.app.enums.Gender;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="missing_persons")
@Getter
@Setter
@ToString
public class Missing_Person extends BaseEntity{
	
	@NotBlank(message = "First name is mandatory")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;

    @NotNull(message = "Gender is mandatory")
    private Gender gender;

    @NotNull(message = "Missing since date is mandatory")
    private LocalDate missingSince;

    @NotBlank(message = "Last known location is mandatory")
    @Size(max = 100, message = "Last known location must not exceed 100 characters")
    private String lastKnownLocation;

    @NotBlank(message = "Image URL is mandatory")
    private String imageUrl;

    private String contactNo;

   	private int age;
   	
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "complaint_id")
   	private Complaint complaint;

    // Getters and Setters
}

//@ManyToOne
//@NotNull
//private Complaint complaint; // Added relationship to Complaint
//
//





