export type Upgrade = {
  id: number;
  cost: number;
  name: string;
  description: string;
  key: string;
  modifier: number;
  type: string;
  callback?: Function;
};
