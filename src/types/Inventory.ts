export type inventory = {
  entries: {
    baseId: number;
    count: number;
    worn?: true;
  }[];
};
export type inventoryEquip = {
  inv: {
    entries: {
      baseId: number;
      count: number;
      worn?: true;
      name: string;
    }[];
  };
};
