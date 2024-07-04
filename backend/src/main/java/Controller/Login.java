package Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;


import Auth.TokenService;
import DAO.UserDAO;
import DTO.UserDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
@WebServlet(name = "Login", urlPatterns = {"/login"})
public class Login extends HttpServlet {


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
                
        BufferedReader reader = request.getReader();
        StringBuilder jsonBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            jsonBuilder.append(line);
        }
        String jsonString = jsonBuilder.toString();
        Gson gson = new Gson();
        UserDTO userLogin = gson.fromJson(jsonString, UserDTO.class);
        UserDAO users = new UserDAO();
        UserDTO user = null;
        try {
            user = users.login(userLogin.getEmail(), userLogin.getPassword());
            if(user != null){
                TokenService tokenService = new TokenService();
                String JWT = tokenService.createJWT(String.valueOf(user.getId()), user.getEmail(), String.valueOf(user.getId_Locality()));
                response.addHeader("Authorization", "Bearer " + JWT);
                String jsonJWT = new Gson().toJson(JWT);
                response.getWriter().write(jsonJWT);
            }else{
                String json = new Gson().toJson("{status: '404', message: 'gmail invalido o contraseña invalida'}");
                response.getWriter().write(json);
            }
        } catch (SQLException e) {
            user = null;
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
