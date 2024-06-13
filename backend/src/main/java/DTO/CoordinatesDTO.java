/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

public class CoordinatesDTO {
    private int id;
    private double X;
    private double Y;

 
    public CoordinatesDTO(int id, double X, double Y) {
        this.id = id;
        this.X = X;
        this.Y = Y;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public void setX(double X) {
        this.X = X;
    }

    public void setY(double Y) {
        this.Y = Y;
    }
    
    public int getId() {
        return id;
    }
    
    public double getX() {
        return X;
    }

    public double getY() {
        return Y;
    }
    
}
