import { JobPost } from "@/types/post";

const searchJobs = (searchTerm:string, jobs:JobPost[]) => {
    const searchResult:JobPost[] = [];

    jobs.map(job => {
        if (job.postTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(job);
        }
        else if (job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(job);
        }
    })

    return searchResult;
}

export default searchJobs;