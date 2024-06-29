package DTO;

public class LocalityDTO {
    
    private int id_locality;
    private String localityName;
    private String countryName;

    /**
     * 
     * @param id_locality
     * @param localityName
     * @param countryName 
     */
    public LocalityDTO(int id_locality, String localityName, String countryName) {
        this.id_locality = id_locality;
        this.localityName = localityName;
        this.countryName = countryName;
    }
    
    /**
     * 
     * @param localityName
     * @param countryName 
     */
    public LocalityDTO(String localityName, String countryName) {
        this.localityName = localityName;
        this.countryName = countryName;
    }

    public int getId_locality() {
        return id_locality;
    }

    public void setId_locality(int id_locality) {
        this.id_locality = id_locality;
    }

    public String getLocalityName() {
        return localityName;
    }

    public void setLocalityName(String localityName) {
        this.localityName = localityName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
    
    @Override
    public String toString() {
        return String.format("Locality: \n")
                + String.format("Locality name: %s\n", this.getLocalityName())
                + String.format("Country: %s\n", this.getCountryName());
    }
    
}
