package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import DTO.ReviewDTO;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ReviewDAO {

    private static final String SQL_INSERT = "INSERT INTO review(user_id, property_id, valoration) VALUES(?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE review SET coord_x=?, coord_y=?, description=? WHERE id_property = ?";
    private static final String SQL_DELETE = "DELETE FROM review WHERE id_property=?";

    private static final String SQL_ALL_AVERAGES_VALORATIONS
            = "SELECT id_property, AVG(valoration) AS average_valoration "
            + "FROM reviews "
            + "GROUP BY id_property";

    private static final String SQL_AVERAGE_VALORATION_BY_ID_PROPERTY
            = "SELECT id_property, AVG(valoration) AS average_valoration "
            + "FROM reviews "
            + "WHERE id_property = ?";

    private ReviewDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_property = rs.getInt("id_property");
        int average_valoration = rs.getInt("average_valoration");

        ReviewDTO review = new ReviewDTO(id_property, average_valoration);

        return review;
    }

    public int insert(ReviewDTO review) {
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

    public ReviewDTO selectByIdProperty(int id_property) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ReviewDTO review = null;

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_AVERAGE_VALORATION_BY_ID_PROPERTY);
                stmt.setInt(1, id_property);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    review = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            review = null;
        }
        return review;
    }
    
    public List<ReviewDTO> selectAll_averagesValorations() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ReviewDTO review = null;
        List<ReviewDTO> reviews = new ArrayList<ReviewDTO>();
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_ALL_AVERAGES_VALORATIONS);
            rs = stmt.executeQuery();
            while (rs.next()) {
                review = fromResultSet(rs);
                if (review != null) {
                    reviews.add(review);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            reviews = null;
        }

        return reviews;
    }

}
