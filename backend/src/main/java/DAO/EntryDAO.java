package DAO;

import DTO.EntryDTO;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class EntryDAO {

    private static final String SQL_SELECT_ALL = "SELECT * FROM entries";
    private static final String SQL_SELECT = "SELECT * FROM entries WHERE id_entry=?";
    private static final String SQL_SELECT_BY_DATE = "SELECT * FROM entries WHERE date=?";
    private static final String SQL_INSERT = "INSERT INTO entries(date) VALUES(?)";
    private static final String SQL_UPDATE = "UPDATE entries SET date=? WHERE id_entry = ?";
    private static final String SQL_DELETE = "DELETE FROM entries WHERE id_entry=?";

    private EntryDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_entry = rs.getInt("id_entry");
        Date date = rs.getDate("date");

        EntryDTO entry = new EntryDTO(id_entry, date);

        return entry;
    }

    public List<EntryDTO> selectAll() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        EntryDTO entry = null;
        List<EntryDTO> entries = new ArrayList<EntryDTO>();

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_SELECT_ALL);
            rs = stmt.executeQuery();
            while (rs.next()) {
                entry = fromResultSet(rs);
                if (entry != null) {
                    entries.add(entry);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            entries = null;
        }

        return entries;
    }

    public EntryDTO select(int id_entry) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        EntryDTO entry = null;

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT);
                stmt.setInt(1, id_entry);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    entry = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            entry = null;
        }
        return entry;
    }
    
    public EntryDTO selectByDate(Date date) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        EntryDTO entry = null;

        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT_BY_DATE);
                stmt.setDate(1, date);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    entry = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            entry = null;
        }
        return entry;
    }

    public int insert(EntryDTO entry) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int generatedId = 0;
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS);
            stmt.setDate(1, entry.getDate());
            
            stmt.executeUpdate();
            
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            generatedId = -1;
            if(generatedKeys.next()){
                generatedId = generatedKeys.getInt(1);
            } else {
                throw new SQLException("Error genereating new id_entry");
            }
            
            conn.close();
        } catch (SQLException ex) {
            generatedId = 0;
        }

        return generatedId;
    }

    public int update(EntryDTO entry) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_UPDATE);
            stmt.setDate(1, entry.getDate());

            stmt.setInt(2, entry.getId_entry());

            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }

    public int delete(EntryDTO entry) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_DELETE);
            stmt.setInt(1, entry.getId_entry());
            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            rows = 0;
        }

        return rows;
    }
}
