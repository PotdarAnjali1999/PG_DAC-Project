package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.Complaintdto;
import com.app.dto.Feedbackdto;
import com.app.dto.MissingPersondto;
import com.app.dto.Userdto;
import com.app.entites.Address;
import com.app.entites.Complaint;
import com.app.entites.Feedback;
import com.app.entites.Missing_Person;
import com.app.entites.User;
import com.app.enums.Gender;
import com.app.enums.Role;
import com.app.enums.Status;
import com.app.exception.InvalidCredentialsException;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.IComplaintRepository;
import com.app.repository.IFeedbackRepository;
import com.app.repository.IMissingPersonRepository;
import com.app.repository.IUserRepository;

@Service
@Transactional
public class UserServices implements IUserServices {

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IComplaintRepository complaintRepository;
	
	@Autowired
	private IFeedbackRepository feedbackRepository;
	
	@Autowired
	private IMissingPersonRepository missingPersonRepository;
	@Autowired
	private ModelMapper modelmapper;

	@Override
	public User addUser(Userdto userdto) {
		// TODO Auto-generated method stub
		
		if(userRepository.findByEmailId(userdto.getEmailId()).isPresent()) {
			throw new IllegalArgumentException("Email ID is already exist");
		}
		
		validatePassword(userdto.getPassword());

		User users = new User();
		users.setFirstName(userdto.getFirstName());
		users.setLastName(userdto.getLastName());
		// users.setAddress(userdto.getAddress());
		users.setContactNo(userdto.getContactNo());
		users.setDob(userdto.getDob());
		users.setEmailId(userdto.getEmailId());
		users.setPassword(userdto.getPassword());
		users.setGender(Gender.valueOf(userdto.getGender()));
		users.setRole(Role.valueOf(userdto.getRole()));

		if (userdto.getAddress() != null) {
			Address address = new Address();
			address.setAdrLine1(userdto.getAddress().getAdrLine1());
			address.setCity(userdto.getAddress().getCity());
			address.setState(userdto.getAddress().getState());
			address.setCountry(userdto.getAddress().getCountry());
			// address.setZipCode(userdto.getAddress().getZipCode());
			address.setZipCode(userdto.getAddress().getZipCode());
		
			users.setAddress(address);
		}

		return userRepository.save(users);

	}
	
	private void validatePassword(String password) {
		if(password == null || password.length() < 8 || !password.matches(".*\\d.*")) {
			throw new IllegalArgumentException("Password must be at least 8 characters long and contain at least one digit.");
		}
	}
	@Override
	public Feedback addFeedback(Feedbackdto feedbackdto) {
	    // Fetch the User entity based on userId from the Feedbackdto
	    User user = userRepository.findById(feedbackdto.getUserId())
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid User Id"));

	    // Map Feedbackdto to Feedback entity
	    Feedback feedback = modelmapper.map(feedbackdto, Feedback.class);

	    // Set the fetched User entity in the Feedback entity
	    feedback.setUser(user);

	    // Save the Feedback entity in the repository
	    return feedbackRepository.save(feedback);
	}
	@Override
	public User editUser(Long id,Userdto userdto) {
		
		User existingUser=userRepository.findById(id)
				.orElseThrow(() ->new RuntimeException("Invalid User Id"));
		
		modelmapper.map(userdto, existingUser);
		
		
		return userRepository.save(existingUser);
	}

	@Override
	public Complaint editComplaint(Long id, Complaintdto cdto) {

		Complaint existingComplaint=complaintRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Invalid Complaint Id"));
		
		modelmapper.map(cdto,existingComplaint);
		return complaintRepository.save(existingComplaint);
	}

	@Override
	public Missing_Person editMissingPerson(Long id, MissingPersondto cdto) {

		Missing_Person ms=missingPersonRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Invalid Missing Person Id"));
		modelmapper.map(cdto,ms);
		return missingPersonRepository.save(ms);
	}

	@Override
	public Userdto getAllDetails(Long id) {
		
		User users=userRepository.findById(id)
				.orElseThrow(() ->new RuntimeException ("Invalid User Id"));
		return modelmapper.map(users,Userdto.class);
		
		//return userRepository.findAllById(users);
	}

	@Override
	public Userdto signIn(Userdto logindto) {
		
		System.out.println(logindto.getEmailId()+ " "+logindto.getPassword());
		User users=userRepository.findByEmailIdAndPassword(logindto.getEmailId(), logindto.getPassword())
				.orElseThrow(()-> new InvalidCredentialsException("Invalid Email And Password"));
		return modelmapper.map(users,Userdto.class );
	}

	@Override
	public Status getComplaintStatus(Long complaintId) {
		
		Optional<Complaint> optionalComplaint = complaintRepository.findById(complaintId);
		if(optionalComplaint.isPresent()) {
			//return optionalComplaint.get().getStatus();
			return optionalComplaint.get().getStatus();
		} else {
			throw new RuntimeException( "Complaint not found with id" + complaintId);
		}
	
	}

	@Override
	public List<Complaintdto> getUserComplaints(Long userId) {
		
	    List<Complaint> complaints = complaintRepository.findByUserId(userId);
	    return complaints.stream()
	        .map(complaint -> {
	            Complaintdto dto = new Complaintdto();
	            dto.setComplaintTitle(complaint.getComplaintTitle());
	            dto.setComplaintDescription(complaint.getComplaintDescription());
	            dto.setComplaintDate(complaint.getComplaintDate());
	            dto.setStatus(complaint.getStatus());
	            dto.setCategory(complaint.getCategory());
	            dto.setLocation(complaint.getLocation());
	            dto.setUserId(complaint.getId());
	            // Map other fields as necessary
	            return dto;
	        })
	        .collect(Collectors.toList());
	}

	@Override
	public Complaint addComplaint(Complaintdto complaintDTO, List<MissingPersondto> missingPersonDTOs) {
		    // Map ComplaintDTO to Complaint entity
	        Complaint complaint = new Complaint();
	        //complaint.setId(complaintDTO.getComplaintId());
	        complaint.setComplaintTitle(complaintDTO.getComplaintTitle());
	        complaint.setComplaintDescription(complaintDTO.getComplaintDescription());
	        complaint.setComplaintDate(complaintDTO.getComplaintDate());
	        complaint.setLocation(complaintDTO.getLocation());
	        complaint.setCategory(complaintDTO.getCategory());
	        complaint.setStatus(Status.PENDING);

	        // Retrieve the User entity from userId
	        User user = userRepository.findById(complaintDTO.getUserId())
	                .orElseThrow(() -> new RuntimeException("User not found with id: " + complaintDTO.getUserId()));
	        complaint.setUser(user);

	        // Save the complaint first
	        Complaint savedComplaint = complaintRepository.save(complaint);

	        // Map MissingPersonDTOs to MissingPerson entities and save them
	        for (MissingPersondto missingPersonDTO : missingPersonDTOs) {
	            Missing_Person missingPerson = new Missing_Person();
	            missingPerson.setFirstName(missingPersonDTO.getFirstName());
	            missingPerson.setLastName(missingPersonDTO.getLastName());
	            missingPerson.setGender(missingPersonDTO.getGender());
	            missingPerson.setMissingSince(missingPersonDTO.getMissingSince());
	            missingPerson.setLastKnownLocation(missingPersonDTO.getLastKnownLocation());
	            missingPerson.setImageUrl(missingPersonDTO.getImageUrl());
	            missingPerson.setContactNo(missingPersonDTO.getContactNo());
	            missingPerson.setAge(missingPersonDTO.getAge());
	            missingPerson.setComplaint(savedComplaint);

	            // Save each missing person
	            missingPersonRepository.save(missingPerson);
	        }

	        return savedComplaint;
	    }

	@Override
	public List<Complaintdto> getComplaintsByUserId(Long userId) {
        List<Complaint> complaints = complaintRepository.findByUserId(userId);

        return complaints.stream()
            .map(complaint -> new Complaintdto(
                complaint.getComplaintTitle(),
              
               // complaint.getDateCreated(),
                complaint.getStatus(),
                complaint.getCategory()
               
                
               
            ))
            .collect(Collectors.toList());
    }
	
}
			


