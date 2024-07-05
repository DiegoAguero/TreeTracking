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

@WebServlet(name = "ConditionsByUbication", urlPatterns = {"/conditions/ubication"})
public class ConditionsByUbication extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            int id_property = Integer.parseInt(request.getParameter("id"));

            Date currentDate = Date.valueOf(LocalDate.now());
            List<ConditionDTO> conditionsToday = new WeatherConsults().getConditionsForToday(currentDate);
            ConditionDTO condition = null;
            if (conditionsToday != null) {
                conditionsToday = conditionsToday.stream()
                        .filter(c -> c.getProperty().getId_property() == id_property)
                        .collect(Collectors.toList());
                condition = conditionsToday.get(0);
            } else {
                response.getWriter().write("{}");
                return;
            }
            String json = new Gson().toJson(condition);
            response.getWriter().write(json);

        } catch (NumberFormatException ex) {
            Logger.getLogger(ConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (Exception ex) {
            Logger.getLogger(ConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setStatus(HttpServletResponse.SC_OK);
    }
}
