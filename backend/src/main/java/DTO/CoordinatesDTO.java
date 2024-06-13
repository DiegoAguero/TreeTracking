/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

/**
 *
 * @author Diego Estudio
 */
public class CoordinatesDTO {
    private double X;
    private double Y;

    public CoordinatesDTO(double X, double Y) {
        this.X = X;
        this.Y = Y;
    }
    
    public void setX(double X) {
        this.X = X;
    }

    public void setY(double Y) {
        this.Y = Y;
    }

    public double getX() {
        return X;
    }

    public double getY() {
        return Y;
    }
    
}
