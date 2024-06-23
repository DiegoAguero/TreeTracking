package DAO;

import DTO.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ConditionDAO {

    private static final String SQL_SELECT_ALL = "SELECT * FROM conditions";
    private static final String SQL_SELECT = "SELECT * FROM conditions WHERE id_condition=?";
    private static final String SQL_SELECT_BY_DATE = "SELECT * FROM conditions WHERE id_entry=?";
    private static final String SQL_INSERT = "INSERT INTO conditions(humidity, fire_detected, temperature, id_entry, id_property) VALUES(?, ?, ?, ?, ?)";
    private static final String SQL_UPDATE = "UPDATE conditions SET humidity=?, fire_detectedP=?, temperature=?, id_entry=?, id_property=? WHERE id_condition = ?";
    private static final String SQL_DELETE = "DELETE FROM conditions WHERE id_condition=?";

    private ConditionDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_condition = rs.getInt("id_condition");
        float humidity = rs.getFloat("humidity");
        boolean fire_detected = rs.getBoolean("fire_detected");
        float temperature = rs.getFloat("temperature");
        int id_entry = rs.getInt("id_entry");
        int id_property = rs.getInt("id_property");

        EntryDTO entry = new EntryDAO().select(id_entry);
        PropertyDTO property = new PropertyDAO().select(id_property);

        ConditionDTO condition = new ConditionDTO(
                id_condition,
                humidity,
                fire_detected,
                temperature,
                entry,
                property
        );

        return condition;
    }

    public List<ConditionDTO> selectAll() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ConditionDTO condition = null;
        List<ConditionDTO> conditions = new ArrayList<ConditionDTO>();

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_SELECT_ALL);
            rs = stmt.executeQuery();
            while (rs.next()) {
                condition = fromResultSet(rs);
                if (condition != null) {
                    conditions.add(condition);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            conditions = null;
        }

        return conditions;
    }

    public ConditionDTO select(int id_condition) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ConditionDTO condition = null;

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT);
                stmt.setInt(1, id_condition);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    condition = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            condition = null;
        }
        return condition;
    }
    
    public List<ConditionDTO> selectByEntry(EntryDTO entry) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ConditionDTO condition = null;
        List<ConditionDTO> conditions = new ArrayList<ConditionDTO>();

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT_BY_DATE);
                stmt.setInt(1, entry.getId_entry());
                rs = stmt.executeQuery();
                while (rs.next()) {
                condition = fromResultSet(rs);
                if (condition != null) {
                    conditions.add(condition);
                }
            }
                conn.close();
            }
        } catch (SQLException ex) {
            condition = null;
        }
        return conditions;
    }

    public int insert(ConditionDTO condition) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_INSERT);
            stmt.setFloat(1, condition.getHumidity());
            stmt.setBoolean(2, condition.isFire_detected());
            stmt.setFloat(3, condition.getTemperature());
            stmt.setInt(4, condition.getEntry().getId_entry());
            stmt.setInt(5, condition.getProperty().getId_property());

            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }

    public int update(ConditionDTO condition) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_UPDATE);
            stmt.setFloat(1, condition.getHumidity());
            stmt.setBoolean(2, condition.isFire_detected());
            stmt.setFloat(3, condition.getTemperature());
            stmt.setInt(4, condition.getEntry().getId_entry());
            stmt.setInt(5, condition.getProperty().getId_property());

            stmt.setInt(6, condition.getId_condition());

            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }

    public int delete(ConditionDTO condition) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_DELETE);
            stmt.setInt(1, condition.getId_condition());
            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }
}
