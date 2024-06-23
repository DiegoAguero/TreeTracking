package Controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import DAO.*;
import DTO.*;
import com.google.gson.Gson;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "ConditionsToday", urlPatterns = {"/conditions"})
public class ConditionsToday extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        Date currentDate = Date.valueOf(LocalDate.now());
        try {
            List<ConditionDTO> conditionsToday = getConditionsForToday(currentDate);
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

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setStatus(HttpServletResponse.SC_OK);
    }

    private Optional<EntryDTO> entryToday(Date today) throws Exception {
        List<EntryDTO> entries = null;
        try {
            entries = new EntryDAO().selectAll();
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, "Database connection problem", ex);
            throw new Exception("Failed to connect to the database");
        }
        if (entries != null) {
            for (EntryDTO entry : entries) {
                if (entry.getDate().equals(today)) {
                    return Optional.of(entry);
                }
            }
        }

        return Optional.empty();
    }

    protected List<ConditionDTO> getConditionsForToday(Date currentDate) throws SQLException, Exception {
        Optional<EntryDTO> entryToday = entryToday(currentDate);
        List<ConditionDTO> conditionsToday = null;

        if (entryToday.isPresent()) {
            conditionsToday = new ConditionDAO().selectByEntry(entryToday.get());
        } else {
            EntryDTO entryNewDay = new EntryDTO(currentDate);
            int id_EntryNewDay = new EntryDAO().insert(entryNewDay);

            // Call API with today's date
            // Save data with new data from API and id_EntryNewDay
            if (id_EntryNewDay != 0) {
                conditionsToday = new ConditionDAO().selectByEntry(entryNewDay);
            } else {
                //No data situation
                conditionsToday = null;
            }
        }

        return conditionsToday;
    }
}
