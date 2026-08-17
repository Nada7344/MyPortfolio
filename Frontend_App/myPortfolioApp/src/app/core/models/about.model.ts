export interface IBadge {
  _id?: string;
  name: string;
  icon: string;
}

export interface IFocusCard {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

export interface IEducation {
  _id?: string;
  dateRange: string;
  title: string;
  subtitle: string;
}

export interface IAbout {
  _id?: string;
  role: string;
  roleHighlight: string[];
  leadText: string;
  description: string;
  location: string;
  focusAreas: string[];
  badges: IBadge[];
  focusCards: IFocusCard[];
  education: IEducation[];
}
