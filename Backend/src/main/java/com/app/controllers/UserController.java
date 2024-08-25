//package com.app.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.dto.Userdto;
//import com.app.services.IUserServices;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//	
//	@Autowired
//	private IUserServices userServices;
//	
//	public UserController () {
//		System.out.println("In Controller"+getClass());
//	}
//	
//	@PostMapping("/register")
//	public Userdto addUser(@RequestBody Userdto user) 
//	{
//		System.out.println("In controller add user");
//		userServices.addUser(user);
//		return user;
//		
//	}
//
//}

package com.app.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ComplaintRequest;
import com.app.dto.ComplaintResponseDto;
import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.MissingPersondto;
import com.app.dto.Userdto;
import com.app.entites.Complaint;
import com.app.enums.Status;
import com.app.services.IUserServices;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3001",allowCredentials = "true")
public class UserController {

    @Autowired
    private IUserServices userServices;
    
    public UserController() {
    	System.out.println("In constructor"+getClass());
    }

    @PostMapping("/register")
    public Userdto addUser(@RequestBody Userdto user) {
        System.out.println("In controller add user");
        
        
        userServices.addUser(user);
        return user;
    }
    @PostMapping("/feedback")
    public Feedbackdto addFeedback(@RequestBody Feedbackdto feedbackdto)
    {
    	System.out.println("In controller add feedback");
    	
    	userServices.addFeedback(feedbackdto);
		return feedbackdto;
    	
    }
    
    @PutMapping("/updateUser/{id}")
    public Userdto editUser(@PathVariable Long id, @RequestBody Userdto userdto)
    {
    	System.out.println("In controller update user");
    	userServices.editUser(id, userdto);
		return userdto;
    	
    }
    
    @PutMapping("/updateComplaint/{id}")
    public Complaintdto editComplaint(@PathVariable Long id, @RequestBody Complaintdto cdto)
    {
    	System.out.println("In controller update complaint");
    	userServices.editComplaint(id, cdto);
    	return cdto;
    }
    
    @PutMapping("/updateMissing/{id}")
    public MissingPersondto editMissingPerson(@PathVariable Long id, @RequestBody MissingPersondto cdto)
    {
    	System.out.println("In Controller update missing person");
    	userServices.editMissingPerson(id, cdto);
    	
    	return cdto;
    }
    
    @GetMapping("/get/{id}")
    public Userdto gellAllDetails(@PathVariable Long id) {
    	System.out.println("In Controller get details");
    	return userServices.getAllDetails(id);
    	
    }
    
    
    @PostMapping("/add")
    public ResponseEntity<Complaintdto> addComplaint(@RequestBody ComplaintRequest request, HttpSession session) {
        // Retrieve user from session
        Userdto userdto = (Userdto) session.getAttribute("user");
        if (userdto == null) {
            // Return 401 Unauthorized if user is not in session
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Long userId = userdto.getId(); // Retrieve userId from the session
        Complaintdto complaintDTO = request.getComplaint();
        List<MissingPersondto> missingPersonDTOs = request.getMissingPersons();

        // Set userId in complaintDTO
        complaintDTO.setUserId(userId);

        // Call service to add complaint
        Complaint savedComplaint = userServices.addComplaint(complaintDTO, missingPersonDTOs);
        
        // Create a response DTO
        ComplaintResponseDto responseDto = new ComplaintResponseDto();
        responseDto.setComplaintId(savedComplaint.getId());
        responseDto.setStatus(savedComplaint.getStatus());
        responseDto.setComplaintTitle(savedComplaint.getComplaintTitle()); // Include other fields as needed



        return ResponseEntity.ok(complaintDTO);
    }
    
    
    @GetMapping("/getAllComplaintsByuserId/{userId}")
    public ResponseEntity<List<Complaintdto>> getComplaintsByUserId(@PathVariable Long userId) {
        List<Complaintdto> complaints = userServices.getComplaintsByUserId(userId);
        if (complaints.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(complaints, HttpStatus.OK);
    }
}

