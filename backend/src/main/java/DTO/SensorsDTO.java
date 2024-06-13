/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

/**
 *
 * @author Diego Estudio
 */
public class SensorsDTO {
    private float humidity;
    private boolean isOnFire;
    private String description;
    private int coordID;

    public SensorsDTO(float humidity, boolean isOnFire, String description, int coordID) {
        this.humidity = humidity;
        this.isOnFire = isOnFire;
        this.description = description;
        this.coordID = coordID;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }

    public void setIsOnFire(boolean isOnFire) {
        this.isOnFire = isOnFire;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCoordID(int coordID) {
        this.coordID = coordID;
    }

    public float getHumidity() {
        return humidity;
    }

    public boolean isIsOnFire() {
        return isOnFire;
    }

    public String getDescription() {
        return description;
    }

    public int getCoordID() {
        return coordID;
    }
    
}
