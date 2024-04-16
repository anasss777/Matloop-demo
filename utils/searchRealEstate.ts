import { RealEstatePost } from "@/types/post";

const searchRealEstate = (searchTerm:string, realEstates:RealEstatePost[]) => {
    const searchResult:RealEstatePost[] = [];

    realEstates.map(realEstate => {
        if (realEstate.postTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(realEstate);
        }
        else if (realEstate.propertyType.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(realEstate);
        }
        else if (realEstate.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(realEstate);
        }
    })

    return searchResult;
}

export default searchRealEstate;