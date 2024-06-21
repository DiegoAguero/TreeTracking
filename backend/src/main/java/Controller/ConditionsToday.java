package Controller;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import DAO.*;
import DTO.*;
import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "ConditionsToday", urlPatterns = {"/conditions"})
public class ConditionsToday extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        /**
         * Missing: date check
         */
//        Date today = dateToday();
//        if(!hasDataToday(today)){
//            newEntry();
//            callAPI();
//            saveConditionsInNewEntry();
//            sendConditionsJson(id_newEntry);
//        } else {
//            EntryDTO entry = new EntryDAO().selectByDate(today);
//            sendConditionsJson(entry.getId_entry());
//        }

        try {
            List<ConditionDTO> conditionsToday = new ConditionDAO().selectByDate(1);
            String json = new Gson().toJson(conditionsToday);
            response.getWriter().write(json);
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
