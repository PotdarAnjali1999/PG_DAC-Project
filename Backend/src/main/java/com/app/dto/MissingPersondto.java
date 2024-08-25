package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MissingPersondto {

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

    @Pattern(regexp = "^\\+?[0-9]*$", message = "Contact number must be numeric and can start with '+'")
    private String contactNo;

   	private int age;
   	
   	@NotNull
   	private Long complaintId;

    // Getters and Setters
}
