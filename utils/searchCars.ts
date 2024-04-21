import { CarPost } from "@/types/post";

export const searchCars = (searchTerm: string, cars: CarPost[]): CarPost[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return cars.filter(car => 
        car.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        car.carBrand.toLowerCase().includes(lowerCaseSearchTerm) ||
        car.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

export const filterCarBrand = (filterTerm:string, cars:CarPost[]) => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return cars.filter(car => 
        car.carBrand.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterCarType = (filterTerm:string[], cars:CarPost[]): CarPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredCars = cars.filter(car => 
        car.carType.some(type => 
            lowerCaseFilterTerm.includes(type.toLowerCase())
        )
    );

    if (filteredCars.length > 0) {
        return filteredCars
    }else {
        return cars
    }
}

export const filterCarPrice = (min: string, max: string, cars: CarPost[]): CarPost[] => {
    const minPrice = parseInt(min);
    const maxPrice = parseInt(max);

    return cars.filter(car => 
        car.priceRange[0] >= minPrice && car.priceRange[1] <= maxPrice
    );
}

export const filterCarYear = (min: string, max: string, cars: CarPost[]): CarPost[] => {
    const minYear = parseInt(min);
    const maxYear = parseInt(max);

    return cars.filter(car => 
        car.yearRange[0] >= minYear && car.yearRange[1] <= maxYear
    );
}

export const filterCarDistance = (min: string, max: string, cars: CarPost[]): CarPost[] => {
    const minDistance = parseInt(min);
    const maxDistance = parseInt(max);

    return cars.filter(car => 
        car.distanceRange[0] >= minDistance && car.distanceRange[1] <= maxDistance
    );
}

export const filterGearType = (filterTerm:string[], cars:CarPost[]): CarPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredCars = cars.filter(car => 
        car.gearType.some(type => 
            lowerCaseFilterTerm.includes(type.toLowerCase())
        )
    );

    if (filteredCars.length > 0) {
        return filteredCars
    }else {
        return cars
    }
}

export const filterFuelType = (filterTerm:string[], cars:CarPost[]): CarPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredCars = cars.filter(car => 
        car.fuelType.some(type => 
            lowerCaseFilterTerm.includes(type.toLowerCase())
        )
    );

    if (filteredCars.length > 0) {
        return filteredCars
    }else {
        return cars
    }
}

export const filterCarCountry = (filterTerm:string, cars:CarPost[]) => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return cars.filter(car => 
        car.region.split(', ')[0].toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterCarCity = (filterTerm:string, cars:CarPost[]) => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return cars.filter(car => 
        car.region.split(', ')[1].toLowerCase().includes(lowerCaseFilterTerm)
    );
}