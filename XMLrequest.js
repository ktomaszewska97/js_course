// an old way of making http request
// we don't use it anymore
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', () => {
  // console.log(request);
  // check if the request is OK
  if(request.readyState === 4 && request.status === 200){
    console.log(request.responseText);
    // error
  } else if (request.readyState === 4){
    console.log('could not fetch the data');
  }
});

request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
request.send();

