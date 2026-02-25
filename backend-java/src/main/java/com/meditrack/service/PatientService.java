package com.meditrack.service;

import com.meditrack.model.DashboardStats;
import com.meditrack.model.Patient;
import com.meditrack.repository.PatientRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @PostConstruct
    public void init() {
        if (patientRepository.count() == 0) {
            addSamplePatients();
        }
    }

    private void addSamplePatients() {
        Patient p1 = new Patient();
        p1.setId("1");
        p1.setName("Priya Sharma");
        p1.setAvatarId("avatar-1");
        p1.setDateOfBirth("1985-05-15");
        p1.setGender("Female");
        p1.setContact("555-0101");
        p1.setAddress("123 Maple St, Springfield");
        p1.setMedicalHistory(List.of("Hypertension", "Asthma"));
        p1.setAdmissionDate(LocalDate.now().minusDays(10).toString());
        p1.setStatus("Admitted");
        p1.setRoomNumber("301A");
        p1.setWard("Women's Ward");
        patientRepository.save(p1);

        Patient p2 = new Patient();
        p2.setId("2");
        p2.setName("Rohan Mehra");
        p2.setAvatarId("avatar-2");
        p2.setDateOfBirth("1972-09-20");
        p2.setGender("Male");
        p2.setContact("555-0102");
        p2.setAddress("456 Oak Ave, Springfield");
        p2.setMedicalHistory(List.of("Diabetes Type 2"));
        p2.setAdmissionDate(LocalDate.now().minusDays(2).toString());
        p2.setStatus("ICU");
        p2.setRoomNumber("ICU-02");
        p2.setWard("ICU");
        patientRepository.save(p2);

        Patient p3 = new Patient();
        p3.setId("3");
        p3.setName("Anjali Gupta");
        p3.setAvatarId("avatar-4");
        p3.setDateOfBirth("1990-02-25");
        p3.setGender("Female");
        p3.setContact("555-0103");
        p3.setAddress("789 Pine Ln, Springfield");
        p3.setMedicalHistory(List.of());
        p3.setAdmissionDate(LocalDate.now().minusDays(15).toString());
        p3.setDischargeDate(LocalDate.now().minusDays(2).toString());
        p3.setStatus("Discharged");
        p3.setWard("Women's Ward");
        patientRepository.save(p3);
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    public Optional<Patient> findById(String id) {
        return patientRepository.findById(id);
    }

    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    public DashboardStats getDashboardStats() {
        long total = patientRepository.count();
        List<Patient> all = patientRepository.findAll();
        long admitted = all.stream()
                .filter(p -> "Admitted".equals(p.getStatus()) || "ICU".equals(p.getStatus()))
                .count();
        long discharged = all.stream()
                .filter(p -> "Discharged".equals(p.getStatus()))
                .count();
        long vitalsMonitored = 12L; // placeholder
        return new DashboardStats(total, admitted, vitalsMonitored, discharged);
    }
}
