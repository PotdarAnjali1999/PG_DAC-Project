package com.app.dto;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Userdto {
	
	private Long Id;
	
    @NotNull
    @Positive
    @Size(max=10)
    private String contactNo;

    @NotNull
    @Past
    private LocalDate dob;

    @NotNull
    @Email
    @Size(max = 100)
    @Column(unique=true, nullable=false)
    private String emailId;

    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotNull
    private String gender;
    
    @NotNull
    private String role = "ROLE_USER";
    
    

    @Size(min = 2, max = 50)
    private String lastName;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;
    
    private Addressdto address; // Use Addressdto instead of Address
}