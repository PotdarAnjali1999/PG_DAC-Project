package com.app.entites;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="policeStations")
@Getter
@Setter
@ToString
public class PoliceStation extends BaseEntity {
	
	    @NotBlank
	    @Size(max = 100)
	    private String name;

	    @NotBlank
	    @Size( max = 255)
	    private String area;

	    @OneToMany(mappedBy = "policeStation",cascade = CascadeType.ALL, fetch=FetchType.EAGER)
	    private Set<PoliceConstable> policeConstables;
	    
//	    @OneToMany(/*mappedBy = "policeStation",*/ cascade = CascadeType.ALL, orphanRemoval = true)
//	    private Set<Complaint> complaints; // Added relationship to Complaint

}
																																																																							