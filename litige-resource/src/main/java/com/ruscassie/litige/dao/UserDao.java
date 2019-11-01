package com.ruscassie.litige.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ruscassie.litige.entity.Users;

@Repository
public interface UserDao extends CrudRepository<Users, Long> {
	Users findByUsername(String username);
}