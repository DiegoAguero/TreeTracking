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
    public ArrayList<CoordinatesDTO> getCoordsById(int id, Connection sta){
        String SQLQuery = "SELECT * FROM coordenadas";
    } 
}
