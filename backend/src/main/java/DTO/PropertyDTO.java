package DTO;

public class PropertyDTO {

    private int id_property;
    private double coord_x;
    private double coord_y;
    private String description;
    private String locality;
    private String country;

    /**
     *
     * @param coord_x
     * @param coord_y
     * @param description
     */
    public PropertyDTO(double coord_x, double coord_y, String description, String locality, String country) {
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.description = description;
        this.locality = locality;
        this.country = country;
    }

    /**
     *
     * @param id_property
     * @param coord_x
     * @param coord_y
     * @param description
     */
    public PropertyDTO(int id_property, double coord_x, double coord_y, String description, String locality, String country) {
        this.id_property = id_property;
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.description = description;
        this.locality = locality;
        this.country = country;
    }

    public int getId_property() {
        return id_property;
    }

    public void setId_property(int id_property) {
        this.id_property = id_property;
    }

    public double getCoord_x() {
        return coord_x;
    }

    public void setCoord_x(double coord_x) {
        this.coord_x = coord_x;
    }

    public double getCoord_y() {
        return coord_y;
    }

    public void setCoord_y(double coord_y) {
        this.coord_y = coord_y;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }
    
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return String.format("Property: \n")
                + String.format("Coord X: %f\n", this.getCoord_x())
                + String.format("Coord Y: %f\n", this.getCoord_y())
                + String.format("Description: %s\n", this.getDescription())
                + String.format("Locality: %s\n", this.getLocality())
                + String.format("Country: %s\n", this.getCountry());
    }

}
