package DTO;


public class ConditionDTO {
    
    private int id_condition;
    private float humidity;
    private boolean fire_detected;
    private float temperature;
    private EntryDTO entry;
    private PropertyDTO property;

    /**
     * 
     * @param id_condition
     * @param humidity
     * @param fire_detected
     * @param temperature
     * @param entry
     * @param property 
     */
    public ConditionDTO(int id_condition, float humidity, boolean fire_detected, float temperature, EntryDTO entry, PropertyDTO property) {
        this.id_condition = id_condition;
        this.humidity = humidity;
        this.fire_detected = fire_detected;
        this.temperature = temperature;
        this.entry = entry;
        this.property = property;
    }

    /**
     * 
     * @param humidity
     * @param fire_detected
     * @param temperature
     * @param entry
     * @param property 
     */
    public ConditionDTO(float humidity, boolean fire_detected, float temperature, EntryDTO entry, PropertyDTO property) {
        this.humidity = humidity;
        this.fire_detected = fire_detected;
        this.temperature = temperature;
        this.entry = entry;
        this.property = property;
    }

    public int getId_condition() {
        return id_condition;
    }

    public void setId_condition(int id_condition) {
        this.id_condition = id_condition;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }

    public boolean isFire_detected() {
        return fire_detected;
    }

    public void setFire_detected(boolean fire_detected) {
        this.fire_detected = fire_detected;
    }

    public float getTemperature() {
        return temperature;
    }

    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }

    public EntryDTO getEntry() {
        return entry;
    }

    public void setEntry(EntryDTO entry) {
        this.entry = entry;
    }

    public PropertyDTO getProperty() {
        return property;
    }

    public void setProperty(PropertyDTO property) {
        this.property = property;
    }
    
    @Override
    public String toString() {
        return
                this.getEntry().toString()+
                String.format("Condition: \n")+
                String.format("Humidity: %f %\n",this.getHumidity())+
                String.format("Has Fire?: %b\n",this.isFire_detected()?"yes":"no")+
                String.format("Temperature: %f ºC\n",this.getTemperature())+
                this.getProperty().toString();
    }
}
