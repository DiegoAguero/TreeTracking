package Controller;

import DAO.SensorsDAO;
import DTO.SensorsDTO;
import com.google.gson.Gson;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@WebServlet(name = "SensorFilterByFire", urlPatterns = {"/sensorFilterByFire"})
public class SensorFilterByFire extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            boolean isFire="1".equals(request.getParameter("isFire"));

            ArrayList<SensorsDTO> listSensors;
            listSensors = new SensorsDAO().getSensors();

            List<SensorsDTO> listSensorsFilter = listSensors.stream()
                    .filter(sensor -> sensor.isIsOnFire() == isFire)
                    .collect(Collectors.toList());

            String json = new Gson().toJson(listSensorsFilter);
            response.getWriter().write(json);
        } catch (SQLException ex) {
            Logger.getLogger(Sensor.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
