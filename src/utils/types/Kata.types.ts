export enum KataLevel {
  BASIC = "Basic",
  MEDIUM = "Medium",
  HIGH = "High",
}
export type IValorationUser = {
  user: string;
  stars: number;
};

export type Kata = {
  _id: string;
  name: string;
  description: string;
  level: KataLevel;
  intents: number;
  stars: {
    average: number;
    users: IValorationUser[];
  };
  creator: string;
  solution: string;
  participants: string[];
};
