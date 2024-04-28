package types;

public class Vehicle {
    String plate;
    String brand;
    String model;

    public Vehicle(String plate, String brand, String model) {
        this.plate = plate;
        this.brand = brand;
        this.model = model;
    }

    public String getPlate() {
        return plate;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

}
