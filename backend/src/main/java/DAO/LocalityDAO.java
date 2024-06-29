package DAO;

import DTO.LocalityDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LocalityDAO {

    private static final String SQL_SELECT_ALL
            = "SELECT \n"
            + "	   l.id_locality,\n"
            + "    l.localityName,\n"
            + "    c.countryName\n"
            + "FROM localities l\n"
            + "JOIN countries c \n"
            + "ON l.id_country = c.id_country";

    private LocalityDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_locality = rs.getInt("id_locality");
        String localityName = rs.getString("localityName");
        String countryName = rs.getString("countryName");

        LocalityDTO locality = new LocalityDTO(id_locality, localityName, countryName);

        return locality;
    }

    public List<LocalityDTO> selectAll() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        LocalityDTO locality = null;
        List<LocalityDTO> localities = new ArrayList<LocalityDTO>();

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_SELECT_ALL);
            rs = stmt.executeQuery();
            while (rs.next()) {
                locality = fromResultSet(rs);
                if (locality != null) {
                    localities.add(locality);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            localities = null;
        }

        return localities;
    }
}
