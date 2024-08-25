package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Complaint;


public interface IComplaintRepository extends JpaRepository<Complaint, Long> {

	Optional<Complaint> findByUserIdAndId(Long userId, Long complaintId);
	List<Complaint> findByUserId(Long userId);
	
	}
