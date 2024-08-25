package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Missing_Person;

public interface IMissingPersonRepository extends JpaRepository<Missing_Person,Long> {

}
