package DAO;

import java.sql.*;
import java.util.*;
import DTO.CoordinatesDTO;

public class CoordinatesDAO {

    public CoordinatesDAO() {
    }

    public CoordinatesDTO getCoordsById(int id) throws SQLException {
        String SQLQuery = "SELECT * FROM coordenadas WHERE id = ?";
        Connection conn = ConnectionDAO.getConnection();
        PreparedStatement st = conn.prepareStatement(SQLQuery);
        st.setInt(1, id);
        ResultSet rs = st.executeQuery();
        CoordinatesDTO coord = null;
        while (rs.next()) {
            int idCoord = rs.getInt("id");
            double x = rs.getDouble("coordX");
            double y = rs.getDouble("coordY");
            coord = new CoordinatesDTO(idCoord, x, y);
        }
        conn.close();
        return coord;
    }

    public ArrayList<CoordinatesDTO> getCoords() throws SQLException {
        String SQLQuery = "SELECT * FROM coordenadas";
        Connection conn = ConnectionDAO.getConnection();

        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(SQLQuery);
        ArrayList<CoordinatesDTO> coordList = new ArrayList<CoordinatesDTO>();
        while (rs.next()) {
            int idCoord = rs.getInt("id");
            double x = rs.getDouble("coordX");
            double y = rs.getDouble("coordY");
            CoordinatesDTO coord = new CoordinatesDTO(idCoord, x, y);
            coordList.add(coord);
        }
        conn.close();
        return coordList;
    }
    
}
