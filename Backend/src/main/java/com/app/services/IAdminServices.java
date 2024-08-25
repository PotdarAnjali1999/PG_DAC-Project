package com.app.services;

import java.util.List;


import org.springframework.web.bind.annotation.RequestBody;

import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.PoliceConstableRetrievedto;
import com.app.dto.PoliceConstabledto;
import com.app.dto.PoliceStationRetrievedto;
import com.app.dto.PoliceStationdto;
import com.app.entites.Criminal;
import com.app.entites.PoliceConstable;

import com.app.enums.Status;


public interface IAdminServices {

	public List<Complaintdto> getAllComplaints();
	
	 public List<Feedbackdto> getAllFeedbacks();
	 
	 public PoliceStationdto addPoliceStation(@RequestBody PoliceStationdto policeSation);
	 
	 public PoliceConstabledto addPoliceConstable(@RequestBody PoliceConstabledto policeConstabledto);
	 
	 public void updateComplaintStatus(Long userId, Long complaintId, Status newStatus);
	 
	 public List<PoliceStationRetrievedto> getAllPoliceStations();
	 
	 public List<PoliceConstableRetrievedto> getPoliceConstablesByStationId(Long policeStationId);
	 
	 public void assignPoliceConstableToComplaint(Long complaintId, Long policeConstableId);
	 
	 public Complaintdto getComplaintById(Long complaintId);
	 
	 public List<Criminal> getAllCriminals() ;
}
