import { DevicePost } from "@/types/post";

export const searchDevices = (searchTerm:string, devices:DevicePost[]): DevicePost[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return devices.filter(device => 
        device.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        device.deviceType.toLowerCase().includes(lowerCaseSearchTerm) ||
        device.deviceBrand.toLowerCase().includes(lowerCaseSearchTerm) ||
        device.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

export const filterDeviceType = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
     const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(device => 
        device.deviceType.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterDeviceBrand = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
     const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(car => 
        car.deviceBrand.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterDeviceCondition = (filterTerm: string[], devices: DevicePost[]): DevicePost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredDevices = devices.filter(device => 
        device.deviceCondition.some(condition => 
            lowerCaseFilterTerm.includes(condition.toLowerCase())
        )
    );

    if (filteredDevices.length > 0) {
        return filteredDevices
    }else {
        return devices
    }
}

export const filterDevicePrice = (min: string, max: string, devices: DevicePost[]): DevicePost[] => {
    const minPrice = parseInt(min);
    const maxPrice = parseInt(max);

    return devices.filter(device => 
        device.priceRange[0] >= minPrice && device.priceRange[1] <= maxPrice
    );
}

export const filterDeviceOS = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
     const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(car => 
        car.deviceOS.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterDeviceStorage = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
     const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(car => 
        car.deviceStorage.toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterDeviceCountry = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(car => 
        car.region.split(', ')[0].toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterDeviceCity = (filterTerm: string, devices: DevicePost[]): DevicePost[] => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return devices.filter(car => 
        car.region.split(', ')[1].toLowerCase().includes(lowerCaseFilterTerm)
    );
}
