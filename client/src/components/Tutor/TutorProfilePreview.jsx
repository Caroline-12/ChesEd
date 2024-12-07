import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function TutorProfilePreview({ profile }) {
  return (
    <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage
            src={profile.profilePhoto instanceof File ? URL.createObjectURL(profile.profilePhoto) : profile.profilePhoto}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <AvatarFallback>{`${profile.firstName?.[0]}${profile.lastName?.[0]}`}</AvatarFallback>
        </Avatar>
        
        <h2 className="text-2xl font-bold mb-2">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-600 mb-4">{profile.email}</p>
        
        {profile.specialization?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {profile.specialization.map((spec, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {profile.bio && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        )}

        {profile.calendlyProfile && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Schedule a Session</h3>
            <a
              href={profile.calendlyProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Book a tutoring session
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
