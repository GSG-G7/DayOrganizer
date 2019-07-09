var test = require('tape');
var logic = require('./logic');
var state = [
  { id: -3, description: 'first todo' },
  { id: -2, description: 'second todo' },
  { id: -1, description: 'third todo' },
];
// make test for add function
test("testing for add function",(t)=>{
  const actual  = logic.addTodo(state,'add ');
  const clonedstate  = [...state];
  const expected = [
    { id: -3, description: 'first todo' },
    { id: -2, description: 'second todo'  },
    { id: -1, description: 'third todo' },
    { id: 1, description:'add ',done: false}
  ];
  t.deepEqual(actual,expected, 'should be actual = expected');
  t.deepEqual(clonedstate,state,'check for pure function');

  t.end();
  });
