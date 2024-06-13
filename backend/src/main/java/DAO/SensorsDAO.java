/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;
import DTO.SensorsDTO;
import java.sql.*;
import java.util.*;
/**
 *
 * @author Diego Estudio
 */
public class SensorsDAO {
    public SensorsDAO(){}
    public ArrayList<SensorsDTO> getData(Connection stablishConnection) throws SQLException{
        String SQLQuery = "SELECT * FROM sensores";
        Statement st = stablishConnection.createStatement();
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
    }   
}
