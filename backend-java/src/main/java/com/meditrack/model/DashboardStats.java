package com.meditrack.model;

public class DashboardStats {

    private long totalPatients;
    private long admittedPatients;
    private long vitalsMonitored;
    private long dischargedPatients;

    public DashboardStats(long totalPatients, long admittedPatients, long vitalsMonitored, long dischargedPatients) {
        this.totalPatients = totalPatients;
        this.admittedPatients = admittedPatients;
        this.vitalsMonitored = vitalsMonitored;
        this.dischargedPatients = dischargedPatients;
    }

    public long getTotalPatients() { return totalPatients; }
    public void setTotalPatients(long totalPatients) { this.totalPatients = totalPatients; }
    public long getAdmittedPatients() { return admittedPatients; }
    public void setAdmittedPatients(long admittedPatients) { this.admittedPatients = admittedPatients; }
    public long getVitalsMonitored() { return vitalsMonitored; }
    public void setVitalsMonitored(long vitalsMonitored) { this.vitalsMonitored = vitalsMonitored; }
    public long getDischargedPatients() { return dischargedPatients; }
    public void setDischargedPatients(long dischargedPatients) { this.dischargedPatients = dischargedPatients; }
}
