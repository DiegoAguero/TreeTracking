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
    public CoordinatesDAO(){}
    public ArrayList<CoordinatesDTO> getCoordsById(int id, Connection stablishConnection) throws SQLException{
        String SQLQuery = "SELECT * FROM coordenadas WHERE id = ?";
        PreparedStatement st = stablishConnection.prepareStatement(SQLQuery);
        st.setInt(1, id);
        ResultSet rs = st.executeQuery();
        ArrayList<CoordinatesDTO> coordList = new ArrayList<CoordinatesDTO>();
        while(rs.next()){
            int idCoord = rs.getInt("id");
            double x = rs.getDouble("coordX");
            double y = rs.getDouble("coordY");
            CoordinatesDTO coord = new CoordinatesDTO(idCoord, x, y);
            coordList.add(coord);
        }
        return coordList;
    } 
        public ArrayList<CoordinatesDTO> getCoords(Connection stablishConnection) throws SQLException{
        String SQLQuery = "SELECT * FROM coordenadas";
        Statement st = stablishConnection.createStatement();
        ResultSet rs = st.executeQuery(SQLQuery);
        ArrayList<CoordinatesDTO> coordList = new ArrayList<CoordinatesDTO>();
        while(rs.next()){
            int idCoord = rs.getInt("id");
            double x = rs.getDouble("coordX");
            double y = rs.getDouble("coordY");
            CoordinatesDTO coord = new CoordinatesDTO(idCoord, x, y);
            coordList.add(coord);
        }
        return coordList;
    }
}
