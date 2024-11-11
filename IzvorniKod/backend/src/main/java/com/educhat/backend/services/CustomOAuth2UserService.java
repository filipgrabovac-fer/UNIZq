package com.educhat.backend.services;

import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUser(OAuth2User oauth2User) {
        String email = oauth2User.getAttribute("email");

        if (userRepository.findByEmail(email) == null) {
            User user = new User();
            user.setEmail(email);
            user.setLoginType(LoginType.GOOGLE);
            userRepository.save(user);
        }
    }
}
