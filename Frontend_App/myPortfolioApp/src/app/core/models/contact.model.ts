export interface IContact {
  _id?: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  badgeMethod: string;
  badgeEndpoint: string;
  badgeStatus: string;
  heading: string;
  headingGhost: string;
  subtitle: string;
  reasonOptions: string[];
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  showReasonField: boolean;
  showEmailField: boolean;
  showPhoneField: boolean;
  enableFormSubmission: boolean;
}

export interface IContactMessage {
  name: string;
  email: string;
  reason: string;
  message: string;
}
