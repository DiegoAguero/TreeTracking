package Controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import DTO.*;
import Utilities.WeatherConsults;

import com.google.gson.Gson;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "ConditionsToday", urlPatterns = {"/conditions"})
public class ConditionsToday extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Date currentDate = Date.valueOf(LocalDate.now());
        try {
            WeatherConsults weatherConsults = new WeatherConsults();
            List<ConditionDTO> conditionsToday = weatherConsults.getConditionsForToday(currentDate);
            if (conditionsToday != null) {
                String json = new Gson().toJson(conditionsToday);
                response.getWriter().write(json);
            } else {
                response.getWriter().write("{}");
                return;
            }

        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, null, ex);
        }
    }


}
