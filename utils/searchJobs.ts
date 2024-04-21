import { JobPost } from "@/types/post";

export const searchJobs = (searchTerm: string, jobs: JobPost[]): JobPost[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return jobs.filter(job => 
        job.postTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        job.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

export const filterJobType = (filterTerm:string[], jobs: JobPost[]): JobPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredJobs = jobs.filter(job => 
        job.jobType.some(type => 
            lowerCaseFilterTerm.includes(type.toLowerCase())
        )
    );

    if (filteredJobs.length > 0) {
        return filteredJobs
    }else {
        return jobs
    }
}

export const filterJobLocation = (filterTerm:string[], jobs: JobPost[]): JobPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredJobs = jobs.filter(job => 
        job.jobLocation.some(location => 
            lowerCaseFilterTerm.includes(location.toLowerCase())
        )
    );

    if (filteredJobs.length > 0) {
        return filteredJobs
    }else {
        return jobs
    }
}

export const filterJobEducation = (filterTerm:string[], jobs: JobPost[]): JobPost[] => {
    const lowerCaseFilterTerm = filterTerm.map(term => term.toLowerCase());
    const filteredJobs = jobs.filter(job => 
        job.educationLevel.some(education => 
            lowerCaseFilterTerm.includes(education.toLowerCase())
        )
    );

    if (filteredJobs.length > 0) {
        return filteredJobs
    }else {
        return jobs
    }
}

export const filterJobSalary = (min: string, max: string, jobs: JobPost[]): JobPost[] => {
    const minSalary = parseInt(min);
    const maxSalary = parseInt(max);

    return jobs.filter(job => 
        job.salaryRange[0] >= minSalary && job.salaryRange[1] <= maxSalary
    );
}
export const filterJobCountry = (filterTerm:string, jobs:JobPost[]) => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return jobs.filter(job => 
        job.address.split(', ')[0].toLowerCase().includes(lowerCaseFilterTerm)
    );
}

export const filterJobCity = (filterTerm:string, jobs:JobPost[]) => {
    const lowerCaseFilterTerm = filterTerm.toLowerCase();

    return jobs.filter(job => 
        job.address.split(', ')[1].toLowerCase().includes(lowerCaseFilterTerm)
    );
}