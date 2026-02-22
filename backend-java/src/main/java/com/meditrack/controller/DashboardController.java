package com.meditrack.controller;

import com.meditrack.model.DashboardStats;
import com.meditrack.service.PatientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PatientService patientService;

    public DashboardController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/stats")
    public DashboardStats getStats() {
        return patientService.getDashboardStats();
    }
}
