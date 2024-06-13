/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;
import DTO.SensorsDTO;
import java.sql.*;
import java.util.*;
import DAO.ConnectionDAO;

public class SensorsDAO {
    public SensorsDAO(){}
    public ArrayList<SensorsDTO> getSensors() throws SQLException{
        String SQLQuery = "SELECT * FROM sensores";
        Connection conn = ConnectionDAO.getConnection();
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(SQLQuery);
        ArrayList<SensorsDTO> sensorList = new ArrayList<SensorsDTO>();
        while(rs.next()){
            int idSensor = rs.getInt("id");
            float humidity = rs.getFloat("humedad");
            boolean isOnFire = rs.getBoolean("hayFuego");
            String description = rs.getString("descripcion");
            int coordId = rs.getInt("coordID");
            SensorsDTO sensor = new SensorsDTO(idSensor, humidity, isOnFire, description, coordId);
            sensorList.add(sensor);
        }
        return sensorList;
    }   
    public ArrayList<SensorsDTO> getSensorById(int id) throws SQLException{
        String SQLQuery = "SELECT * FROM sensores WHERE id = ?";
        Connection conn = ConnectionDAO.getConnection();
        PreparedStatement st = conn.prepareStatement(SQLQuery);
        st.setInt(1, id);
        ResultSet rs = st.executeQuery();
        ArrayList<SensorsDTO> sensorList = new ArrayList<SensorsDTO>();
        while(rs.next()){
            int idSensor = rs.getInt("id");
            float humidity = rs.getFloat("humedad");
            boolean isOnFire = rs.getBoolean("hayFuego");
            String description = rs.getString("descripcion");
            int coordId = rs.getInt("coordID");
            SensorsDTO sensor = new SensorsDTO(idSensor, humidity, isOnFire, description, coordId);
            sensorList.add(sensor);
        }
        return sensorList;
    }  
}
