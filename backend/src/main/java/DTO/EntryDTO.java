package DTO;

import java.sql.Date;

public class EntryDTO {
    
    private int id_entry;
    private Date date;

    /**
     * 
     * @param id_entry
     * @param date 
     */
    public EntryDTO(int id_entry, Date date) {
        this.id_entry = id_entry;
        this.date = date;
    }

    /**
     * 
     * @param date 
     */
    public EntryDTO(Date date) {
        this.date = date;
    }

    public int getId_entry() {
        return id_entry;
    }

    public void setId_entry(int id_entry) {
        this.id_entry = id_entry;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return 
                String.format("Entry: \n")+
                String.format("Date: %t\n",this.getDate());
    }
    
    
}
