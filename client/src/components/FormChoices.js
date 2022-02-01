export const categories = [
  { name: 'Pokemon', value: "Pokemon", subCategory: "Trading Card Games" },
  { name: 'Yu-Gi-Oh!', value: "Yu-Gi-Oh!", subCategory: "Trading Card Games" },
  { name: 'Magic the Gathering', value: "Magic the Gathering", subCategory: "Trading Card Games" },
  { name: 'Dragon Ball Super', value: "Dragon Ball Super", subCategory: "Trading Card Games" },
  { name: 'Digimon', value: "Digimon", subCategory: "Trading Card Games" },
  { name: 'Star Trek', value: "Star Trek", subCategory: "Pop Culture" },
  { name: 'Star Wars', value: "Star Wars", subCategory: "Pop Culture" },
  { name: 'Marvel', value: "Marvel", subCategory: "Pop Culture" },
  { name: 'Garbage Pail Kids', value: "Garbage Pail Kids", subCategory: "Pop Culture" },
  { name: 'Baseball', value: "Baseball", subCategory: "Sports" },
  { name: 'Basketball', value: "Basketball", subCategory: "Sports" },
  { name: 'Boxing', value: "Boxing", subCategory: "Sports" },
  { name: 'Football', value: "Football", subCategory: "Sports" },
  { name: 'Golf', value: "Golf", subCategory: "Sports" },
  { name: 'Hockey', value: "Hockey", subCategory: "Sports" },
  { name: 'MMA', value: "MMA", subCategory: "Sports" },
  { name: 'Tennis', value: "Tennis", subCategory: "Sports" },
  { name: 'Soccer', value: "Soccer", subCategory: "Sports" },
  { name: 'Wrestling', value: "Wrestling", subCategory: "Sports" },
];

export const conditions = [
  {name: 'Mint', value: 'Mint'},
  {name: 'Near Mint', value: 'Near Mint'},
  {name: 'Excellent', value: 'Excellent'},
  {name: 'Good', value: 'Good'},
  {name: 'Lightly Played', value: 'Lightly Played'},
  {name: 'Played', value: 'Played'},
  {name: 'Poor', value: 'Poor'},
  {name: 'Damaged', value: 'Damaged'},
]

export const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red" };
  }
};