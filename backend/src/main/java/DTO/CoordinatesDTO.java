package DTO;

public class CoordinatesDTO {

    private int ID;
    private double coordX;
    private double coordY;

    public CoordinatesDTO(int ID, double coordX, double coordY) {
        this.ID = ID;
        this.coordX = coordX;
        this.coordY = coordY;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public double getCoordX() {
        return coordX;
    }

    public void setCoordX(double coordX) {
        this.coordX = coordX;
    }

    public double getCoordY() {
        return coordY;
    }

    public void setCoordY(double coordY) {
        this.coordY = coordY;
    }

}
