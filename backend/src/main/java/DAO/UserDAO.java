package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import DTO.UserDTO;

public class UserDAO {
    public UserDAO(){}
    private static final String SQL_SELECT_ALL = "SELECT * FROM users";
    private static final String SQL_LOGIN = "SELECT * FROM users WHERE email = ? AND password = ?";
    private static final String SQL_SELECT = "SELECT * FROM users WHERE id_user = ?";
    private static final String SQL_SELECT_BY_EMAIL = "SELECT * FROM users WHERE email = ?";
    private static final String SQL_INSERT = "INSERT INTO users(email, password, id_locality, registerDate) VALUES(?, ?, ?, NOW())";
    private static final String SQL_UPDATE = "UPDATE properties SET coord_x=?, coord_y=?, description=? WHERE id_property = ?";
    private static final String SQL_DELETE = "DELETE FROM properties WHERE id_property=?";
    private UserDTO fromResultSet(ResultSet rs) throws SQLException{
        int id_user = rs.getInt("id_user");
        String email = rs.getString("email");
        String password = rs.getString("password");
        int id_locality = rs.getInt("id_locality");
        
        UserDTO user = new UserDTO(id_user, email, password, id_locality);
        
        return user;
    }
    public int insert (UserDTO user) throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        int rows = 0;
        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_INSERT);
            if(user.getId_Locality() >= 1){
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());
                stmt.setInt(3, user.getId_Locality());
            }else{
                stmt.setString(1, user.getEmail());
                stmt.setString(2, user.getPassword());
                stmt.setNull(3, user.getId_Locality());
            }
            rows = stmt.executeUpdate();
            conn.close();
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            rows = 0;
        }
        return rows;
    }

    public UserDTO select(int id)throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        UserDTO user = null;
        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT);
                stmt.setInt(1, id);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    user = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            user = null;
        }
        return user;
    }

    public String selectByEmail(String email) throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        UserDTO user = null;
        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT_BY_EMAIL);
                stmt.setString(1, email);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    user = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            user = null;
        }
        return user.getPassword();
    }

    public boolean emailExists(String email) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        boolean exists = false;
        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_SELECT_BY_EMAIL);
                stmt.setString(1, email);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    exists = rs.getInt(1) > 0;
                }
            }
        } catch (SQLException ex) {
            exists = false;
        } finally {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
        return exists;
    }

    public UserDTO login(String email, String password) throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        UserDTO user = null;
        try {
            conn = ConnectionDAO.getConnection();
            if (conn != null) {
                stmt = conn.prepareStatement(SQL_LOGIN);
                stmt.setString(1, email);
                stmt.setString(2, password);
                rs = stmt.executeQuery();
                if (rs.next()) {
                    user = fromResultSet(rs);
                }
                conn.close();
            }
        } catch (SQLException ex) {
            user = null;
        }
        return user;
    }

}
