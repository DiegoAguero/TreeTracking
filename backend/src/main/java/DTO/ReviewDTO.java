package DTO;

/*
 * CREATE TABLE valoraciones (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id),
        zona_verde_id INT REFERENCES zonas_verdes(id),
        puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
        comentario TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
 */
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
