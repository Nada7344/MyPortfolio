export interface IProject {
  _id?: string;
  order: number;
  method: string;
  endpoint: string;
  title: string;
  description: string;
  points: string[];
  tags: string[];
  sourceUrl: string;
}
