package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.PoliceConstableRetrievedto;
import com.app.dto.PoliceConstabledto;
import com.app.dto.PoliceStationRetrievedto;
import com.app.dto.PoliceStationdto;
import com.app.entites.Complaint;
import com.app.entites.Criminal;
import com.app.entites.PoliceConstable;
import com.app.entites.PoliceStation;
import com.app.enums.Status;
import com.app.services.AdminServices;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminServices adminService;
	
	public AdminController() {
		System.out.println("in ctor of "+getClass());
	}
	
	
	@GetMapping("/getComplaints")
    public List<Complaintdto> getAllComplaints() {
        List<Complaintdto> complaints = adminService.getAllComplaints();
        return complaints;
    }
	
	@GetMapping("/getfeedbacks")
    public List<Feedbackdto> getAllFeedbacks() {
        List<Feedbackdto> feedbacks = adminService.getAllFeedbacks();
        return feedbacks;
    }
	
	@PostMapping("/addPoliceStation")
	public PoliceStationdto addPoliceStation(@RequestBody PoliceStationdto policeSation)
	{
		System.out.println("in add police station method");
		adminService.addPoliceStation(policeSation);
		return policeSation;
		
	}
	
	@PostMapping("/addPoliceConstable")
	public PoliceConstabledto addPoliceConstable(@RequestBody PoliceConstabledto policeConstabledto)
	{
		System.out.println("in add police constable method");
		adminService.addPoliceConstable(policeConstabledto);
		return policeConstabledto;
		
	}
	
	@PostMapping("/updateComplaintStatusByUserId")
    public ResponseEntity<String> updateComplaintStatusByUserId(@RequestParam Long userId, @RequestParam Long complaintId, 
    		@RequestParam Status newStatus) {
        try {
            adminService.updateComplaintStatus(userId, complaintId, newStatus);
            return ResponseEntity.ok("Complaint status updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

	
	  // Endpoint to get all police stations
    @GetMapping("/getPoliceStations")
    public List<PoliceStationRetrievedto> getAllPoliceStations() {
        List<PoliceStationRetrievedto> policeStations = adminService.getAllPoliceStations();
        return policeStations;
    }

	
	  // Endpoint to get police constables by police station ID
	  
	  @GetMapping("/getpoliceConstables") 
	  public List<PoliceConstableRetrievedto> getAllPoliceConstables(@RequestParam Long stationId) {
	        List<PoliceConstableRetrievedto> policeConstables = adminService.getPoliceConstablesByStationId(stationId);
	        return policeConstables;
	    }

		
	 
	  // Endpoint to assign police constable to complaint
	  
	  @PostMapping("/assignPoliceConstableToComplaint") 
	  public ResponseEntity<String> assignPoliceConstableToComplaint(@RequestParam Long complaintId, @RequestParam Long policeConstableId)
	  { 
	  try 
	  {
	  adminService.assignPoliceConstableToComplaint(complaintId,policeConstableId); 
	  return ResponseEntity.ok("Police Constable assigned to Complaint successfully."); 
	  }
	  catch (RuntimeException e) 
	  {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		
	  } 
	  }
	  
	  @GetMapping("/getComplaintById")
	    public ResponseEntity<Complaintdto> getComplaintById(@RequestParam Long complaintId) {
	        try {
	            Complaintdto complaint = adminService.getComplaintById(complaintId);
	            return ResponseEntity.ok(complaint);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }
	  
	  @GetMapping("/getAllCriminals")
	  public List<Criminal> getAllCriminals() {
		  List<Criminal> criminals=adminService.getAllCriminals();
	        return criminals;
	    }
	 
}
