package Controller.AccessControl;

import java.io.IOException;

import com.google.gson.Gson;

import Auth.TokenService;
import Utilities.Handler.JwtHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "AuthToken", urlPatterns = {"/auth"})
public class AuthToken extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String header = request.getHeader("Authorization");
        TokenService tokenService = new TokenService();
        Gson gson = new Gson();
        System.out.println(header);
        if (header.startsWith("Bearer ")) {
            String JWT = header.substring(7);
            String jwtVerified = tokenService.verifyJWT(JWT);
            response.getWriter().write(gson.toJson(new JwtHandler(true, "The JWT has been verified", jwtVerified)));
        } else {
            response.getWriter().write(gson.toJson(new JwtHandler(false, "The JWT is not valid", null)));
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
