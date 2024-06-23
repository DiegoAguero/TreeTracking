package Controller;

import DTO.ConditionDTO;
import Utilities.WeatherConsults;

import com.google.gson.Gson;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@WebServlet(name = "ConditionsByHumidity", urlPatterns = {"/conditions/humidity"})
public class ConditionsByHumidity extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            float minHumidity = Float.parseFloat(request.getParameter("min"));
            float maxHumidity = Float.parseFloat(request.getParameter("max"));
            Date currentDate = Date.valueOf(LocalDate.now());
            List<ConditionDTO> conditionsToday = new WeatherConsults().getConditionsForToday(currentDate);

            if (conditionsToday != null) {
                conditionsToday = conditionsToday.stream()
                        .filter(c -> c.getHumidity() >= minHumidity && c.getHumidity() <= maxHumidity)
                        .collect(Collectors.toList());
            } else {
                response.getWriter().write("{}");
                return;
            }

            String json = new Gson().toJson(conditionsToday);
            response.getWriter().write(json);

        } catch (NumberFormatException ex) {
            Logger.getLogger(ConditionsByHumidity.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsByHumidity.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (Exception ex) {
            Logger.getLogger(ConditionsByHumidity.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        }
    }
}
