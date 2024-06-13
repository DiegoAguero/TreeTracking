package Controller;

import DAO.CoordinatesDAO;
import DTO.CoordinatesDTO;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

@WebServlet(name = "Sensor", urlPatterns = {"/sensor"})
public class Sensor extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<CoordinatesDTO> listCoordinates = new CoordinatesDAO().getCoords();
        request.setAttribute("listCoordinates",listCoordinates);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
}
