package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.Userdto;
import com.app.entites.User;


public interface IUserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmailId(String emailId);
	
	Optional<User> findByEmailIdAndPassword(String emailID, String password);
	
	
	
	}
