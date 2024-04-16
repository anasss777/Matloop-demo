import { CarPost } from "@/types/post";

const searchCars = (searchTerm:string, cars:CarPost[]) => {
    const searchResult:CarPost[] = [];

    cars.map(car => {
        if (car.postTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(car);
        }
        else if (car.carBrand.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(car);
        }
        else if (car.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(car);
        }
    })

    return searchResult;
}

export default searchCars;