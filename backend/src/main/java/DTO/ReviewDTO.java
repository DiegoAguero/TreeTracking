package DTO;

public class ReviewDTO {

    private int id;
    private int user_id;
    private int property_id;
    private int valoration;

    /**
     * @param id
     * @param user_id
     * @param property_id
     * @param valoration
     */
    public ReviewDTO(int id, int user_id, int property_id, int valoration) {
        this.id = id;
        this.user_id = user_id;
        this.property_id = property_id;
        this.valoration = valoration;
    }

    /*
     * @param user_id
     * @param property_id
     * @param valoration
     */
    public ReviewDTO(int user_id, int property_id, int valoration) {
        this.user_id = user_id;
        this.property_id = property_id;
        this.valoration = valoration;
    }

    /**
     *
     * @param id_property
     * @param valoration
     */
    public ReviewDTO(int id_property, int valoration) {
        this.property_id = id_property;
        this.valoration = valoration;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setProperty_id(int property_id) {
        this.property_id = property_id;
    }

    public void setValoration(int valoration) {
        this.valoration = valoration;
    }

    public int getId() {
        return id;
    }

    public int getUser_id() {
        return user_id;
    }

    public int getProperty_id() {
        return property_id;
    }

    public int getValoration() {
        return valoration;
    }

}
