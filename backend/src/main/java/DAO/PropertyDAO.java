package DAO;

import DTO.PropertyDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PropertyDAO {

    private static final String SQL_SELECT_ALL
            = "SELECT \n"
            + "	p.id_property, \n"
            + "	p.coord_x, \n"
            + "	p.coord_y, \n"
            + "	p.description, \n"
            + "	l.localityName, \n"
            + "	c.countryName \n"
            + "FROM properties p \n"
            + "JOIN localities l ON p.id_locality = l.id_locality\n" 
            + "JOIN countries c ON l.id_country = c.id_country";
    private static final String SQL_SELECT
            = "SELECT \n"
            + "	p.id_property, \n"
            + "	p.coord_x, \n"
            + "	p.coord_y, \n"
            + "	p.description, \n"
            + "	l.localityName, \n"
            + "	c.countryName \n"
            + "FROM properties p \n"
            + "JOIN localities l ON p.id_locality = l.id_locality\n" 
            + "JOIN countries c ON l.id_country = c.id_country\n"
            + "WHERE p.id_property = ?";

    private static final String SQL_INSERT = "INSERT INTO properties(coord_x, coord_y, description) VALUES(?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE properties SET coord_x=?, coord_y=?, description=? WHERE id_property = ?";
    private static final String SQL_DELETE = "DELETE FROM properties WHERE id_property=?";

    private PropertyDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_property = rs.getInt("id_property");
        double coord_x = rs.getDouble("coord_x");
        double coord_y = rs.getDouble("coord_y");
        String description = rs.getString("description");
        String locality = rs.getString("localityName");
        String country = rs.getString("countryName");

        PropertyDTO property = new PropertyDTO(id_property, coord_x, coord_y, description, locality, country);

        return property;
    }

    public List<PropertyDTO> selectAll() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        PropertyDTO property = null;
        List<PropertyDTO> properties = new ArrayList<PropertyDTO>();
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_SELECT_ALL);
            rs = stmt.executeQuery();
            while (rs.next()) {
                property = fromResultSet(rs);
                if (property != null) {
                    properties.add(property);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            properties = null;
        }

        return properties;
    }

    public PropertyDTO select(int id_property) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        PropertyDTO property = null;

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT);
                stmt.setInt(1, id_property);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    property = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            property = null;
        }
        return property;
    }

    public int insert(PropertyDTO property) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_INSERT);
            stmt.setDouble(1, property.getCoord_x());
            stmt.setDouble(2, property.getCoord_y());
            stmt.setString(3, property.getDescription());

            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }

    public int update(PropertyDTO property) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_UPDATE);
            stmt.setDouble(1, property.getCoord_x());
            stmt.setDouble(2, property.getCoord_y());
            stmt.setString(3, property.getDescription());

            stmt.setInt(4, property.getId_property());

            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }

    public int delete(PropertyDTO property) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_DELETE);
            stmt.setInt(1, property.getId_property());
            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }
}
