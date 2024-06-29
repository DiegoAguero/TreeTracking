package DTO;

public class CountryDTO {

    private int id_country;
    private String countryName;

    public CountryDTO(int id_country, String countryName) {
        this.id_country = id_country;
        this.countryName = countryName;
    }

    public CountryDTO(String countryName) {
        this.countryName = countryName;
    }

    public int getId_country() {
        return id_country;
    }

    public void setId_country(int id_country) {
        this.id_country = id_country;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    @Override
    public String toString() {
        return String.format("Country: %s\n", this.getCountryName());
    }
}
