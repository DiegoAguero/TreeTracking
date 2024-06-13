package Controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.List;
import java.util.stream.*;
import com.google.gson.Gson;
import DAO.SensorsDAO;
import DTO.SensorsDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "SensorFilterByHumidity", urlPatterns = {"/sensorFilterByHumidity"})
public class SensorFilterByHumidity extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            ArrayList<SensorsDTO> listSensors;
            listSensors = new SensorsDAO().getSensors();
            float humidity = Float.parseFloat(request.getParameter("humidity"));
            if(humidity > 90.0f){
                response.getWriter().write("");
            }else{
                List<SensorsDTO> sensorFiltered = listSensors.stream()
                .filter(sensor -> sensor.getHumidity() >= humidity && sensor.getHumidity() <= 100)
                .sorted(Comparator.comparingDouble(SensorsDTO::getHumidity).reversed())
                .collect(Collectors.toList());
                String json = new Gson().toJson(sensorFiltered);
                response.getWriter().write(json);
            }

        } catch (SQLException ex) {
            Logger.getLogger(Sensor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
