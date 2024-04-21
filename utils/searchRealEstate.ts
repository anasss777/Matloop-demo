import { RealEstatePost } from "@/types/post";

export const searchRealEstate = (searchTerm:string, realEstates:RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return realEstates.filter(realEstates => 
        realEstates.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        realEstates.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

export const filterPropertyType = (filterTerm:string, realEstates:RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.propertyType.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterOwnerShipType = (filterTerm:string, realEstates:RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.ownershipType.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterRentType = (filterTerm:string, realEstates:RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.rentType.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterRealEstatePrice = (min: string, max: string, realEstates: RealEstatePost[]): RealEstatePost[] => {
    const minPrice = parseInt(min);
    const maxPrice = parseInt(max);

    return realEstates.filter(realEstate => 
        realEstate.priceRange[0] >= minPrice && realEstate.priceRange[1] <= maxPrice
    );
}

export const filterRealEstateAge = (min: string, max: string, realEstates: RealEstatePost[]): RealEstatePost[] => {
    const minAge = parseInt(min);
    const maxAge = parseInt(max);

    return realEstates.filter(realEstate => 
        realEstate.ageRange[0] >= minAge && realEstate.ageRange[1] <= maxAge
    );
}

export const filterNumberOfRooms = (filterTerm:string, realEstates:RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.numberOfRooms.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterRealEstateCountry = (filterTerm:string, realEstates: RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.address.split(', ')[0].toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterRealEstateCity = (filterTerm:string, realEstates: RealEstatePost[]): RealEstatePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return realEstates.filter(realEstate => 
        realEstate.address.split(', ')[1].toLowerCase().includes(lowerCaseFilterTerm)
    );
}