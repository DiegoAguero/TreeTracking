package DTO;

public class SensorsDTO {
    private int id;
    private float humidity;
    private boolean isOnFire;
    private String description;
    private int coordID;

    public SensorsDTO(int id, float humidity, boolean isOnFire, String description, int coordID) {
        this.id = id;
        this.humidity = humidity;
        this.isOnFire = isOnFire;
        this.description = description;
        this.coordID = coordID;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getId() {
        return id;
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
