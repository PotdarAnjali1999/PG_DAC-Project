package com.app.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Logindto;
import com.app.dto.Userdto;
import com.app.services.IUserServices;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")

public class AuthController {
	
	@Autowired
	private IUserServices userServices;
	
//	@PostMapping("/login")
//	public Logindto signIn(@RequestBody Logindto logindto)
//	{
//		userServices.signIn(logindto);
//		session.setAttribute("user", userdto);
//		return logindto;
//		
//	}
	
	@PostMapping("/login")
    public Userdto signIn(@RequestBody Userdto logindto, HttpSession session) {
        // Authenticate the user and get their details
		System.out.println("In Auth Controller"+getClass());
        Userdto userdto = userServices.signIn(logindto);
        
        // Store user information in the session
        session.setAttribute("user", userdto);
        
        // Return the original Logindto object (or modify it if needed)
        return userdto;
    }
	
	 @PostMapping("/logout")
	    public ResponseEntity<Void> logout(HttpSession session) {
	        // Invalidate the session to log the user out
	        session.invalidate();
	        return ResponseEntity.ok().build();
	    }


}
