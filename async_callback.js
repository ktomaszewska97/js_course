// func sends request
const getTodos = (callback) => {

    const request = new XMLHttpRequest();
  
    request.addEventListener('readystatechange', () => {
  
      if(request.readyState === 4 && request.status === 200){
        callback(undefined, request.responseText);
      } else if (request.readyState === 4){
        callback('could not fetch the data', undefined);
      }
  
    });
    
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
    request.send();
  
  };
  
  console.log(1);
  console.log(2);
  
  // exec of method
  // (err, data) => ... is a function
  getTodos((err, data) => {
    console.log('callback function fired');
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
  });
  
  console.log(3);
  console.log(4);
  
// very ugly - chaining callbacks

//   getTodos('json/luigi.json', (err, data) => {
//     console.log(data);
//     getTodos('json/mario.json', (err, data) => {
//       console.log(data);
//       getTodos('json/shaun.json', (err, data) => {
//         console.log(data);
//       });
//     });
//   });