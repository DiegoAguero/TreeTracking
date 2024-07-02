package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import DTO.ReviewDTO;


public class ReviewDAO {
    private static final String SQL_SELECT_ALL = "SELECT * FROM review";
    private static final String SQL_SELECT = "SELECT * FROM review WHERE id_user=?";
    private static final String SQL_INSERT = "INSERT INTO review(user_id, property_id, valoration) VALUES(?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE review SET coord_x=?, coord_y=?, description=? WHERE id_property = ?";
    private static final String SQL_DELETE = "DELETE FROM review WHERE id_property=?";
    
    public int insert (ReviewDTO review){
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_INSERT);
            stmt.setInt(1, review.getUser_id());
            stmt.setInt(2, review.getProperty_id());
            stmt.setInt(3, review.getValoration());
            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }
    
}
