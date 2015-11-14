package com.vital.web.service;

import com.vital.web.domain.User;

import java.util.List;

public interface UserService {

    User save(User user);

    List<User> getList();

}
