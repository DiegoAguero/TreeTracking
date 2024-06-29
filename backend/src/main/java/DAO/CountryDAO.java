package DAO;

import DTO.CountryDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CountryDAO {
    private static final String SQL_SELECT_ALL = "SELECT * FROM countries";

    private CountryDTO fromResultSet(ResultSet rs) throws SQLException {
        int id_country = rs.getInt("id_country");
        String countryName = rs.getString("countryName");

        CountryDTO country = new CountryDTO(id_country, countryName);

        return country;
    }

    public List<CountryDTO> selectAll() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        CountryDTO country = null;
        List<CountryDTO> countries = new ArrayList<CountryDTO>();

        try {
            conn = ConnectionDAO.getConnection();
            stmt = conn.prepareStatement(SQL_SELECT_ALL);
            rs = stmt.executeQuery();
            while (rs.next()) {
                country = fromResultSet(rs);
                if (country != null) {
                    countries.add(country);
                }
            }
            conn.close();
        } catch (SQLException ex) {
            countries = null;
        }

        return countries;
    }
}
