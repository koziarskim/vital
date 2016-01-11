package com.vital.web.controller;

import com.vital.web.domain.User;
import com.vital.web.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Inject
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public User createUser(@RequestBody @Valid final User user) {
        LOGGER.debug("Received request to create the {}", user);
        return userService.save(user);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> listUsers() {
        LOGGER.debug("Received request to list all users");
        return userService.getList();
    }

    @RequestMapping("/session/user")
    public Principal user(Principal user) {
        return user;
    }
}
