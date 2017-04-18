let x = [
  {name: 'Alice'},
  {name: 'Bob'},
  {name: 'Charlie'},
  {name: 'Deborah'},
  {name: 'Edward'},
];

export default function(state = x, action) {
  console.log(x.map(p => p.name))
  return state
}
