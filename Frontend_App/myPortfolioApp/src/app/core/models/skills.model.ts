export interface ISkillItem {
  _id?: string;
  name: string;
  icon: string;
}

export interface ISkills {
  _id?: string;
  description: string;
  items: ISkillItem[];
}
