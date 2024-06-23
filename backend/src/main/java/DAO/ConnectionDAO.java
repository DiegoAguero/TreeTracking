package DAO;

import java.io.*;
import java.sql.*;
import java.util.Properties;
import java.util.logging.*;

public class ConnectionDAO {

    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final Properties properties = new Properties();

    static {
        try (InputStream inputStream = ConnectionDAO.class.getClassLoader().getResourceAsStream("config.properties")) {
            properties.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static final String DB_URL = properties.getProperty("JDBC_URL");
    private static final String DB_USER = properties.getProperty("JDBC_USER");
    private static final String DB_PASSWORD = properties.getProperty("JDBC_PASS");
    private static final String WEATHER_API_KEY = properties.getProperty("WEATHER_API_KEY");

    public static Connection getConnection() throws SQLException {
        Connection conn = null;
        try {
            Class.forName(DRIVER);
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
        } catch (SQLException e) {
            throw e;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ConnectionDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return conn;
    }

    public static String getWeatherApiKey(){
        return WEATHER_API_KEY;
    }

}
