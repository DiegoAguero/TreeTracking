package Utilities;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.github.prominence.openweathermap.api.OpenWeatherMapClient;
import com.github.prominence.openweathermap.api.enums.Language;
import com.github.prominence.openweathermap.api.enums.UnitSystem;
import com.github.prominence.openweathermap.api.model.Coordinate;
import com.github.prominence.openweathermap.api.model.weather.Weather;

import Controller.ConditionsToday;
import DAO.ConditionDAO;
import DAO.ConnectionDAO;
import DAO.EntryDAO;
import DAO.PropertyDAO;
import DTO.ConditionDTO;
import DTO.EntryDTO;
import DTO.PropertyDTO;


public class WeatherConsults {
    public WeatherConsults(){}
    private Optional<EntryDTO> entryToday(Date today) throws Exception {
        List<EntryDTO> entries = null;
        try {
            entries = new EntryDAO().selectAll();
        } catch (SQLException ex) {
            Logger.getLogger(ConditionsToday.class.getName()).log(Level.SEVERE, "Database connection problem", ex);
            throw new Exception("Failed to connect to the database");
        }
        if(entries !=null){
            for (EntryDTO entry : entries) {
                if (entry.getDate().equals(today)) {
                    return Optional.of(entry);
                }
            }
        }

        return Optional.empty();
    }

    public List<ConditionDTO> getConditionsForToday(Date currentDate) throws SQLException, Exception {
        Optional<EntryDTO> entryToday = entryToday(currentDate);
        List<ConditionDTO> conditionsToday = null;
        if (entryToday.isPresent()) {
            conditionsToday = new ConditionDAO().selectByEntry(entryToday.get());
        } else {
            EntryDTO entryNewDay = new EntryDTO(currentDate);
            int id_EntryNewDay = new EntryDAO().insert(entryNewDay);
            conditionsToday = getConditionsFromAPI(currentDate, id_EntryNewDay);
            if (id_EntryNewDay != 0) {
                conditionsToday = new ConditionDAO().selectByEntry(entryNewDay);
            } else {
                //No data situation
                conditionsToday = null;
            }
        }
        return conditionsToday;
    }

    private List<ConditionDTO> getConditionsFromAPI(Date currentDate, int id) throws SQLException{
        OpenWeatherMapClient openWeatherMapClient = new OpenWeatherMapClient(ConnectionDAO.getWeatherApiKey());
        List<PropertyDTO> listOfProperties = new PropertyDAO().selectAll();
        final List<ConditionDTO> conditionsToday = new ArrayList<>();
        EntryDTO entry = new EntryDAO().select(id);
        listOfProperties.forEach(property ->{
            final Weather weather = openWeatherMapClient
            .currentWeather()
            .single()
            .byCoordinate(Coordinate.of(property.getCoord_x(), property.getCoord_y()))
            .language(Language.ENGLISH)
            .unitSystem(UnitSystem.METRIC)
            .retrieve()
            .asJava();
            ConditionDTO newConditions = new ConditionDTO(
            (float) weather.getHumidity().getValue(), 
            false, 
            (float) weather.getTemperature().getValue(), 
            entry,
            property);
            conditionsToday.add(newConditions);
            try{
                int insertConditions = new ConditionDAO().insert(newConditions);
            } catch(SQLException e){
                e.printStackTrace();
            }
        });
        return conditionsToday;
    }
}
