export interface Availability {
  isAvailable: boolean;
  title: string;
  description: string;
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface IHome {
  _id?: string;
  name: string;
  role: string;
  roleHighlight: string[];
  bio: string;
  availability: Availability;
  profileImage: string;
  resume: string;
  socialLinks: SocialLinks;
  terminalStack: string[];
}
