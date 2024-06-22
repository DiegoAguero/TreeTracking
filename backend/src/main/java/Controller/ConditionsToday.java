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

        Date currentDate = Date.valueOf(LocalDate.now());
        try {
            Optional<EntryDTO> entryToday = entryToday(currentDate);
            List<ConditionDTO> conditionsToday = null;
            
            if (entryToday.isPresent()) {
                conditionsToday = new ConditionDAO().selectByEntry(entryToday.get());
            } else {

                EntryDTO entryNewDay = new EntryDTO(currentDate);
                int id_EntryNewDay = new EntryDAO().insert(entryNewDay);

                //Call API with today date
                //save data with new data from API and id_EntryNewDay
                if (id_EntryNewDay != 0) {
                    conditionsToday = new ConditionDAO().selectByEntry(entryNewDay);
                }
            }
            
            String json = new Gson().toJson(conditionsToday);
            response.getWriter().write(json);
            
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private Optional<EntryDTO> entryToday(Date today) throws Exception {
        List<EntryDTO> entries;
        try {
            entries = new EntryDAO().selectAll();
            for (EntryDTO entry : entries) {
                if (entry.getDate().equals(today)) {
                    return Optional.of(entry);
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, "Database connection problem", ex);
            throw new Exception("Failed to connect to the database");
        }
        return Optional.empty();
    }
}
