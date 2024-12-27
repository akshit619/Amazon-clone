class Car{
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carBrand,carModel){
        this.brand = carBrand;
        this.model = carModel;
    }

    displayInfo(){
        console.log(`${this.brand},${this.model}, Speed=${this.speed} km/h, Trunk: ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
    }
    go(){
        if(!this.isTrunkOpen && this.speed<=295) this.speed+=5;
    }

    brake(){
        if(this.speed>=5) this.speed-=5;
    }
    openTrunk(){
        if(this.speed === 0) this.isTrunkOpen = true;
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
};

class RaceCar extends Car{
    acceleration;
    go(){
        if(!this.isTrunkOpen && this.speed <= (300-this.acceleration))
        this.speed+=this.acceleration;
    }
    brake(){
        if(this.speed>=this.acceleration) this.speed-=this.acceleration;
    }

    openTrunk(){
        
    }

    constructor(){
        super();
        this.acceleration = 20;
    }
}

const toyotaCorolla = new Car('Toyota','Corolla');
const teslaModel3 = new Car('Tesla','Model 3');


const mcLarenF1 = new RaceCar('McLaren','F1',20);
console.log(mcLarenF1);