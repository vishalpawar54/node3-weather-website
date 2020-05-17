console.log('client side javascript');

const weatherForm = document.querySelector('form');
const search  = document.querySelector('input');
const msgOne = document.querySelector('p#message-1');
const msgTwo = document.querySelector('p#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // debugger;
    const location = search.value;
    msgOne.textContent = 'Loading....';
    msgTwo.textContent = '';
    console.log('Submit clicked!!!!', location);
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
                msgOne.textContent = data.error;
            }
            else {
                msgOne.textContent = data.location;
                msgTwo.textContent = 'Humidity is ' + data.data;
                // if(msgTwo && msgTwo.textContent) {
                // msgTwo.textContent = data.location + 'Latitude is ' + data.latitude + 
                //     ' Longitude is '+ data.longitude+ ' and humidity is '+ data.data;
                // }
                console.log(data.location);
                console.log(data.latitude);
                console.log(data.longitude);                
            }
        })
    })
})