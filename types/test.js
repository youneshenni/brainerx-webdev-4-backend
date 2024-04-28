var Vehicle = /** @class */ (function () {
    function Vehicle(plate, brand, model) {
        this.plate = plate;
        this.brand = brand;
        this.model = model;
    }
    Vehicle.prototype.getPlate = function () {
        return this.plate;
    };
    Vehicle.prototype.getBrand = function () {
        return this.brand;
    };
    Vehicle.prototype.getModel = function () {
        return this.model;
    };
    Vehicle.prototype.setPlate = function (plate) {
        this.plate = plate;
    };
    Vehicle.prototype.setBrand = function (brand) {
        this.brand = brand;
    };
    Vehicle.prototype.setModel = function (model) {
        this.model = model;
    };
    return Vehicle;
}());
var vehicle = new Vehicle("22", "33", "44");
console.log(vehicle.getPlate().slice(3));
