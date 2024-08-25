package com.app.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.PoliceConstableRetrievedto;
import com.app.dto.PoliceConstabledto;
import com.app.dto.PoliceStationRetrievedto;
import com.app.dto.PoliceStationdto;
import com.app.entites.Complaint;
import com.app.entites.Criminal;
import com.app.entites.Feedback;
import com.app.entites.PoliceConstable;
import com.app.entites.PoliceStation;
import com.app.enums.Status;
import com.app.repository.CriminalRepository;
import com.app.repository.IAdminRepository;
import com.app.repository.IComplaintRepository;
import com.app.repository.IFeedbackRepository;
import com.app.repository.IPoliceConstableRepository;
import com.app.repository.IPoliceSationRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.PoliceConstableRetrievedto;
import com.app.dto.PoliceConstabledto;
import com.app.dto.PoliceStationRetrievedto;
import com.app.dto.PoliceStationdto;
import com.app.entites.Complaint;
import com.app.entites.Criminal;
import com.app.entites.Feedback;
import com.app.entites.PoliceConstable;
import com.app.entites.PoliceStation;
import com.app.enums.Status;
import com.app.repository.CriminalRepository;
import com.app.repository.IAdminRepository;
import com.app.repository.IComplaintRepository;
import com.app.repository.IFeedbackRepository;
import com.app.repository.IPoliceConstableRepository;
import com.app.repository.IPoliceSationRepository;

@Service // spring bean containing B.L
@Transactional
public class AdminServices implements IAdminServices{
	
	@Autowired
	private IAdminRepository adminRepository;

	@Autowired
	private IComplaintRepository complaintRepository;
	
	@Autowired
	private IFeedbackRepository feedbackRepository;
	
	@Autowired 
	private IPoliceSationRepository policeSationRepository;
	
	@Autowired
	private IPoliceConstableRepository policeConstableRepository;
	
	@Autowired
	private CriminalRepository criminalRepository;
	
	@Autowired
	private ModelMapper modelmapper;
	


	@Override
    public List<Complaintdto> getAllComplaints() {
    List<Complaint> complaintEntities = complaintRepository.findAll();
    
    List<Complaintdto> complaintDtos = complaintEntities.stream()
        .map(complaint -> new Complaintdto(complaint.getComplaintTitle(),complaint.getComplaintDescription(),
        		complaint.getComplaintDate(),complaint.getStatus(),complaint.getCategory(),complaint.getLocation() ,
        		complaint.getUser().getId(),complaint.getId()))
        .collect(Collectors.toList());
        
    return complaintDtos;
   }

	@Override
    public List<Feedbackdto> getAllFeedbacks() {
    List<Feedback> feedbackEntities = feedbackRepository.findAll();
    
    List<Feedbackdto> feedbackDtos = feedbackEntities.stream()
        .map(feedback -> new Feedbackdto(feedback.getContent(), feedback.getUser().getId()))
        .collect(Collectors.toList());
        
    return feedbackDtos;
   }


	@Override
	public PoliceStationdto addPoliceStation(PoliceStationdto policeSation) {
	
		PoliceStation station=new PoliceStation();
		station.setName(policeSation.getName());
		station.setArea(policeSation.getArea());
		policeSationRepository.save(station);
		return modelmapper.map(station, PoliceStationdto.class);
	}


	@Override
	public PoliceConstabledto addPoliceConstable(PoliceConstabledto policeConstabledto) {
		PoliceConstable constable = new PoliceConstable();
        constable.setFirstName(policeConstabledto.getFirstName());
        constable.setLastName(policeConstabledto.getLastName());
        constable.setBadgeNumber(policeConstabledto.getBadgeNumber());
        
        PoliceStation station = policeSationRepository.findById(policeConstabledto.getPoliceStationId())
                .orElseThrow(() -> new RuntimeException("Police Station not found"));
        constable.setPoliceStation(station);

        policeConstableRepository.save(constable);
        return modelmapper.map(constable, PoliceConstabledto.class);
	}
	
	public void updateComplaintStatus(Long userId, Long complaintId, Status newStatus) {
		 System.out.println("Received request with userId: " + userId + ", complaintId: " + complaintId + ", newStatus: " + newStatus);
        Optional<Complaint> optionalComplaint = complaintRepository.findByUserIdAndId(userId, complaintId);
        if (optionalComplaint.isPresent()) {
            Complaint complaint = optionalComplaint.get();
            complaint.setStatus(newStatus);
            complaintRepository.save(complaint);
        } else {
            // Handle case where complaint is not found
            throw new RuntimeException("Complaint not found for user with id: " + userId + " and complaint id: " + complaintId);
        }
    }

	// Method to get all police stations
    public List<PoliceStationRetrievedto> getAllPoliceStations() {
        
        List<PoliceStation> policeStationEntities =  policeSationRepository.findAll();
        
        List<PoliceStationRetrievedto> stationdto = policeStationEntities.stream()
            .map(station -> new PoliceStationRetrievedto(station.getId(),station.getName(),station.getArea()))
            .collect(Collectors.toList());
            
        return stationdto;
       }
    

    // Method to get police constables by police station ID
    public List<PoliceConstableRetrievedto> getPoliceConstablesByStationId(Long policeStationId) {
        Optional<PoliceStation> optionalPoliceStation = policeSationRepository.findById(policeStationId);

        if (optionalPoliceStation.isPresent()) {
            PoliceStation policeStation = optionalPoliceStation.get();
            return policeStation.getPoliceConstables().stream()
                    .map(constable -> new PoliceConstableRetrievedto(constable.getFirstName(), constable.getLastName()))
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Police Station not found with ID: " + policeStationId);
        }
    } 
    
    
    // Method to assign police constable to complaint
    public void assignPoliceConstableToComplaint(Long complaintId, Long policeConstableId) {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(complaintId);
        Optional<PoliceConstable> optionalPoliceConstable = policeConstableRepository.findById(policeConstableId);

        if (optionalComplaint.isPresent() && optionalPoliceConstable.isPresent()) {
            Complaint complaint = optionalComplaint.get();
            PoliceConstable policeConstable = optionalPoliceConstable.get();

            // Assign police constable to complaint
            complaint.setAssignedPoliceConstable(policeConstable);

            // Add complaint to police constable's assigned complaints (if needed)
            policeConstable.getAssignedComplaints().add(complaint);

            complaintRepository.save(complaint);
            policeConstableRepository.save(policeConstable);
        } else {
            throw new RuntimeException("Complaint or Police Constable not found with provided IDs.");
        }
    }
    
    
    public Complaintdto getComplaintById(Long complaintId) {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(complaintId);

        if (optionalComplaint.isPresent()) {
            Complaint complaint = optionalComplaint.get();
            Complaintdto complaintdto = new Complaintdto(
                    complaint.getId(), // complaintId
                    complaint.getComplaintTitle(),
                    complaint.getComplaintDescription(),
                    complaint.getComplaintDate(),
                    complaint.getStatus(),
                    complaint.getCategory(),
                    complaint.getLocation(),
                    complaint.getUser().getId() // userId
                );
           return complaintdto;
            
        } else {
            throw new RuntimeException("Complaint not found with ID: " + complaintId);
        }
    }


	@Override
	public List<Criminal> getAllCriminals() {
		
		return criminalRepository.findAll();
	}
}