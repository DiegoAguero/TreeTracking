package Controller;

import DAO.ConditionDAO;
import DTO.ConditionDTO;
import com.google.gson.Gson;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "IntervalConditionsByUbication", urlPatterns = {"/conditions/ubication/interval"})
public class IntervalConditionsByUbication extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        try {
            int id_property = Integer.parseInt(request.getParameter("id"));
            int days = Integer.parseInt(request.getParameter("days"));

            List<ConditionDTO> intervalConditions = new ConditionDAO().selectIntervalByProperty(id_property, days);

            if (intervalConditions == null) {
                response.getWriter().write("{}");
                return;
            }

            String json = new Gson().toJson(intervalConditions);
            response.getWriter().write(json);

        } catch (NumberFormatException ex) {
            Logger.getLogger(IntervalConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (SQLException ex) {
            Logger.getLogger(IntervalConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect(request.getContextPath() + "/conditions");
            return;
        } catch (Exception ex) {
            Logger.getLogger(IntervalConditionsByUbication.class.getName()).log(Level.SEVERE, null, ex);
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
