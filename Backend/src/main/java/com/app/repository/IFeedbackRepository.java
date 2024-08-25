package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Feedback;

public interface IFeedbackRepository extends JpaRepository<Feedback,Long> {

}
