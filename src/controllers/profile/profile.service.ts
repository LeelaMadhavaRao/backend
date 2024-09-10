import { platform } from "os";
import { TProfile } from "./profile.types";
import { PlatformsService } from "../platforms/platfroms.service";
import { Profile } from "../../models/profile/profile.model";

export class ProfileService {

    async setUpUser(profileData: TProfile) {
        const updatedProfile = await this.getPlatformsData(profileData);
        let totalScore = 0;
        updatedProfile.map((profile: any) => {
            totalScore += profile.scores.score;
        }
        );
    
        const result = await Profile.create({
            user: profileData.user,
            profiles: updatedProfile,
            socials: profileData.socials,
            totalScore: totalScore,
            rank: 0
        });
        return result;  
    }

    async getPlatformsData(profileData: TProfile) {
        const platforms = profileData.profiles;
        const updatedProfile = await Promise.all(platforms.map(async platform => {
            return await new PlatformsService().getPlatformData(platform);
        }));
        return updatedProfile;
    }
}