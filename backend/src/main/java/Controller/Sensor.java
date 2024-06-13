package Controller;

import DAO.CoordinatesDAO;
import DAO.SensorsDAO;
import DTO.CoordinatesDTO;
import DTO.SensorsDTO;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;
import com.google.gson.Gson;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "Sen sor", urlPatterns = {"/sensor"})
public class Sensor extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            ArrayList<SensorsDTO> listSensors;
            listSensors = new SensorsDAO().getSensors();
            String json = new Gson().toJson(listSensors);
            response.getWriter().write(json);
        } catch (SQLException ex) {
            Logger.getLogger(Sensor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
