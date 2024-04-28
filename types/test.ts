class Vehicle {

  plate: string;
  brand: string;
  model: string;
  
  constructor(plate: string, brand: string, model: string) {
    this.plate = plate;
    this.brand = brand;
    this.model = model;
  }

  getPlate() {
    return this.plate;
  }

  getBrand() {
    return this.brand;
  }

  getModel() {
    return this.model;
  }

  setPlate(plate: string) {
    this.plate = plate;
  }

  setBrand(brand: string) {
    this.brand = brand;
  }

  setModel(model: string) {
    this.model = model;
  }
}

const vehicle = new Vehicle("22", "33", "44");

console.log(vehicle.getPlate().slice(1));
