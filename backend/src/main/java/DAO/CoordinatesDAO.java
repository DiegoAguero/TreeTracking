/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import java.sql.*;
import java.util.*;
import DTO.CoordinatesDTO;

/**
 *
 * @author Diego Estudio
 */
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
        return coordList;
    }
}
