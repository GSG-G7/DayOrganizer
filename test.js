var test = require('tape');
var logic = require('./logic');
var state = [
  { id: -3, description: 'first todo',done:true },
  { id: -2, description: 'second todo',done: false },
  { id: -1, description: 'third todo',done: false }
];
// make test for add function
test("testing for add function",(t)=>{
  const actual  = logic.addTodo(state,'first task');
  const expected = [
                      { id: -3, description: 'first todo' , done:true},
                      { id: -2, description: 'second todo', done: false},
                      { id: -1, description: 'third todo', done: false },
                      { id: 1, description:'first task',done: false}
  ];
  const stateAfterAdd = [
    { id: -3, description: 'first todo' , done:true},
    { id: -2, description: 'second todo', done: false},
    { id: -1, description: 'third todo', done: false },
    { id: 1, description:'first task',done: false}
  ];
  const actual1  = logic.addTodo(stateAfterAdd,'second task');
  const expected1 = [
                      { id: -3, description: 'first todo' , done:true},
                      { id: -2, description: 'second todo', done: false},
                      { id: -1, description: 'third todo', done: false },
                      { id: 1, description:'first task',done: false},
                      { id: 2, description:'second task',done: false}
  ];
  t.deepEqual(actual,expected, 'should be add first task');
  t.deepEqual(state,[
                      { id: -3, description: 'first todo',done:true },
                      { id: -2, description: 'second todo',done: false },
                      { id: -1, description: 'third todo',done: false }
                    ],'check for pure function [state not changed]');
  t.deepEqual(actual1,expected1,'should be add second task');
  t.deepEqual(state,[
    { id: -3, description: 'first todo',done:true },
    { id: -2, description: 'second todo',done: false },
    { id: -1, description: 'third todo',done: false }
  ],'check for pure function [state not changed]');

  t.end();
  });
  //make test for delete function
  test("test for delete function",(t)=>{
  const actual = logic.deleteTodo(state,-1);
  const expected =  [
    { id: -3, description: 'first todo',done:true },
    { id: -2, description: 'second todo',done: false }
  ];
  const stateAfterDelete = [
    { id: -3, description: 'first todo',done:true },
    { id: -2, description: 'second todo',done: false }
  ];
  const actual1 = logic.deleteTodo(stateAfterDelete,-2);
  const expected1 = [
    { id: -3, description: 'first todo',done:true }
  ];
  t.deepEqual(actual,expected, 'the first task was successfuly deleted');
  t.deepEqual(state,[
                      { id: -3, description: 'first todo',done:true },
                      { id: -2, description: 'second todo',done: false },
                      { id: -1, description: 'third todo',done: false }
                    ], 'check for pure function after delete one tasks [state not changed]');
  t.deepEqual(actual1,expected1, 'the second task was successfuly deleted');
  t.deepEqual(state,[
                      { id: -3, description: 'first todo',done:true },
                      { id: -2, description: 'second todo',done: false },
                      { id: -1, description: 'third todo',done: false }
                    ], 'check for pure function after delete two tasks [state not changed]');                  
  t.end();
  });
 //make test for mark function
 test("test for mark function",(t)=>{
  const actual = logic.markTodo(state,-3);
  const expected =  [
    { id: -3, description: 'first todo',done:false },
    { id: -2, description: 'second todo',done: false },
    { id: -1, description: 'third todo',done: false }
  ];
  const actual1 = logic.markTodo(state,-2);
  const expected1 =  [
    { id: -3, description: 'first todo',done:true },
    { id: -2, description: 'second todo',done: true },
    { id: -1, description: 'third todo',done: false }
  ];
  
  t.deepEqual(actual,expected,'the selected task[-3] toggeled done value');
  t.deepEqual(state,[
                      { id: -3, description: 'first todo',done:true },
                      { id: -2, description: 'second todo',done: false },
                      { id: -1, description: 'third todo',done: false }
  ], 'check for pure function after marking a task [state not changed]');
  t.deepEqual(actual1,expected1,'the selected task[-2] toggeled done value');
  t.deepEqual(state,[
                      { id: -3, description: 'first todo',done:true },
                      { id: -2, description: 'second todo',done: false },
                      { id: -1, description: 'third todo',done: false }
], 'check for pure function after marking a task [state not changed]');
  t.end();
 });
  //make test for sort function

