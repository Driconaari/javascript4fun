package com.example.javascript4fun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index(Model model) {
        // Add a dynamic message from the server to Thymeleaf
        model.addAttribute("message", "Welcome to Spring Boot and Thymeleaf!");
        return "index";
    }


    @GetMapping("play-with-sand")
    public String playWithSand(Model model) {
        return "play-with-sand";
    }

    @GetMapping("starship")
    public String starship(Model model) {
        return "starship-game";
    }
}


