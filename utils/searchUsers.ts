import { Profile } from "@/types/profile";

export const searchProfiles = (searchTerm: string, profiles: Profile[]): Profile[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return profiles.filter(profile => 
        profile.userId?.toLowerCase().includes(lowerCaseSearchTerm) ||
        profile.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        profile.username?.toLowerCase().includes(lowerCaseSearchTerm) ||
        profile.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
        profile.country?.toLowerCase().includes(lowerCaseSearchTerm) ||
        profile.phoneNumber?.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
}