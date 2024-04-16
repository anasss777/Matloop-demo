import { DevicePost } from "@/types/post";

const searchDevices = (searchTerm:string, devices:DevicePost[]) => {
    const searchResult:DevicePost[] = [];

    devices.map(device => {
        if (device.postTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(device);
        }
        else if (device.deviceType.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(device);
        }
        else if (device.deviceBrand.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(device);
        }
        else if (device.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(device);
        }
    })

    return searchResult;
}

export default searchDevices;