'use strict';
 
/*
const bookings = []

const createBooking = function(flightNum,numPassengers = 1 ,price = 199){

    numPassengers ve price variablesinin hal hazirda bir deyeri olmadigi ucun , standart deyeri qebul edir.Bu ES5 de dir
   
    numPassengers = numPassengers || 1;
    price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);
    bookings.push(booking)
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123',undefined, 300)

undefinied yazaraq numpassengers variablesinin deyerini standart olaraq belli edrirk

*/

/*
/// REFERENCE

const flight = 'LH234';
const jonas = {
    name:"Reshad Qarayev",
    passport:23124412144,
}

const checkIn = function(flightNum,passenger){
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if(passenger.passport === 23124412144){
        alert('Checked in')
    }else{
        alert('Wrong passport!')
    } 
}

checkIn(flight,jonas);
console.log(flight);
LH234
console.log(jonas);
{name: 'Mr. Reshad Qarayev', passport: 23124412144}

Yuxarida etdiyimizin sade numunesi
const flightNum = flight;
const passenger = jonas;

 Burada biz artiq oz passport nomremizi deyisirik. Yeniden checkIn funksiyasi isleyerken else bloku isleyecek ve output olaraq "Wrong passport cavabini alacayiq"
const newPassport = function(person){
    person.passport = Math.trunc(Math.random() * 100000)
}

newPassport(jonas);
checkIn(flight,jonas)

JavaScriptde diger dillerden ferqli olaraq referencele value oturme mumkun deil

*/

/*
/// Callback funksiyalar

const oneWord =  function(str){
    return str.replace(/ /g,'').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ')
}


Yuksek dereceli funksiya
const transformer = function(str, fn){
    console.log(`Original string : ${str}`);
    console.log(`Transformed string : ${fn(str)}`);

    console.log(`Transformed by : ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord)
Original string : JavaScript is the best!
Transformed string : JAVASCRIPT is the best!
Transformed by : upperFirstWord

transformer('JavaScript is the best!', oneWord)
Original string : JavaScript is the best!
Transformed string : javascriptisthebest!
Transformed by : oneWord

JavaScript callback funksiyalara hemise ehtiyac duyur
const high5 = function(){
    console.log('Hello');
}

document.body.addEventListener('click',high5);
['Reshad','Qara','Apollo'].forEach(high5)

*/

// const greet = function(greeting){
//     return function(name){
//         console.log(`${greeting} ${name}`);
//     }
// }

// const greeterHey = greet("Hey");
// greeterHey("Reshad") // Hey Reshad
// greeterHey('Bibos') // Hey Bibos

// greet('Hello')("Reshad") // Hello Reshad

// const greet = (greeting)=> name => console.log(`${greeting} ${name}`);

// greet("Hello")("Alakbar") // Hello Alakbar 




// Call and Apply Method

const lutthansa = {
    airline: "Luthansa",
    iataCode : "LH",
    bookings : [],
    book(flightNum,name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight:`${this.iataCode}${flightNum}`,name})
    }
}

lutthansa.book(238,'Reshad Qarayev');
// Reshad Qarayev booked a seat on Luthansa flight LH238
lutthansa.book(636,'Nicat Alizada');
// Nicat Alizada booked a seat on Luthansa flight LH636
console.log(lutthansa);

const eurowings =  {
    airline:"Eurowings",
    iataCode:"EW",
    bookings:[]
}

const book = lutthansa.book;

// Biz isteyirik ki eurowings obyektinde book funksiyasini isledek. Bu yolla yazsaq undefinied verecek
// book(23,'Sarh Williams')

// call -- bu method da ilk hansi objeni deyirikse onu yaziriq, daha sonra fuknsiya  arqumentlerini yaziriq
book.call(eurowings,23,'Sarah Williams');
// Sarah Williams booked a seat on undefined flight EW23
console.log(eurowings);

book.call(lutthansa,238,'Cristiano Ronaldo');
//Cristiano Ronaldo booked a seat on Luthansa flight LH238


// CALL methodu bir funksiyani muxtelif objelerde cagirmaqa yardimci olur.

const swiss = {
    airline: "Swiss Air Lines",
    iataCode:"LX",
    bookings:[]
}

book.call(swiss,444,'Lionel Messi')
// Lionel Messi booked a seat on Swiss Air Lines flight LX444

// Apply Methodu - call methodu ile eyni isi gorur.Ferqi odur ki , bu method funksiya arqumentlerini yalniz array icinde qebul edir. Diger hallarda error verir

// Hal hazirda modern JS de apply methodu islenmir
const flightData = [533,"George Coper"];
book.apply(swiss,flightData)
// George Coper booked a seat on Swiss Air Lines flight LX533

// Bind method -- bu method da digerlerine oxsardir. Amma bu method yeni bir funksiya return edir ve this ifadesi onun terkibinde olan objeye aid olur.

// book.call(eurowings,23,'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lutthansa);
const bookLX = book.bind(swiss);

bookEW(23,'Seteven Williams');

const bookEW23 = book.bind(eurowings,23);
bookEW23('Reshad Qarayev');
// Reshad Qarayev booked a seat on Eurowings flight EW23

bookEW23('Nicat Alizade');
// Nicat Alizade booked a seat on Eurowings flight EW23
