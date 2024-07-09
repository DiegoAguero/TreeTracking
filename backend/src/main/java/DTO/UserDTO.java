package DTO;

import java.sql.Date;

public class UserDTO {

    private int id;
    private String email;
    private String password;
    private int id_locality;
    private Date registerDate;

    /**
     * 
     * @param id
     * @param email
     * @param password
     * @param id_locality 
     */
    public UserDTO(int id, String email, String password, int id_locality) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.id_locality = id_locality;
        this.registerDate = new Date(System.currentTimeMillis());
    }

    /**
     * 
     * @param email
     * @param password
     * @param id_locality 
     */
    public UserDTO(String email, String password, int id_locality) {
        this.email = email;
        this.password = password;
        this.id_locality = id_locality;
        this.registerDate = new Date(System.currentTimeMillis());
    }

    /**
     * 
     * @param email
     * @param password 
     */
    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
        this.registerDate = new Date(System.currentTimeMillis());
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLocality_id(int id_locality) {
        this.id_locality = id_locality;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public int getId_Locality() {
        return id_locality;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

}
