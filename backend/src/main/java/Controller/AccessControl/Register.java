package Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

import com.google.gson.Gson;

import DAO.UserDAO;
import DTO.UserDTO;
import Utilities.RegisterHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "Register", urlPatterns = {"/register"})
public class Register extends HttpServlet {
  
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
                
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
                
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        UserDAO users = new UserDAO();
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonBuilder.append(line);
        }
        String jsonString = jsonBuilder.toString();
        Gson gson = new Gson();
        UserDTO userToRegister = gson.fromJson(jsonString, UserDTO.class);
        try {
          if (users.emailExists(userToRegister.getEmail())) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson(new RegisterHandler(false, "User already exists", "The user " + userToRegister.getEmail() + " already exists")));
          } else {
            int userCreated = users.insert(userToRegister);
            if (userCreated > 0) {
              response.setStatus(HttpServletResponse.SC_OK);
              response.getWriter().write(gson.toJson(new RegisterHandler(true, "User created successfully", "The user " + userToRegister.getEmail() + " has been created successfully")));

            } else {
              response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
              response.getWriter().write(gson.toJson(new RegisterHandler(false, "User insertion error",  userToRegister.getEmail())));

            }
          }
        } catch (SQLException e) {
          response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
          response.getWriter().write(gson.toJson(new RegisterHandler(false, "Internal server error", e.getMessage())));
          users = null;
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
