//////////////////////////////////////////// Car Constructor/////////////////////////////////

function Car () {
    this.name,
    this.position,
    this.turn,
    this.kicked = false;
};

//////////////////////////////////////////// Functions /////////////////////////////////


//making number of moves for each car

function moveNumber () 
{
    return (Math.floor(Math.random() * (10 - 1 + 1) + 1));       //randomize formula between '1' and '10' for moving
}


//move cars

function moveCar (car, index, prevCarPosition) 
{
    if (map[car[index].position] === "* ")               //if there is no car in destination, then move the car
    {
        map[prevCarPosition] = "* ";                             //putting '*' instead of previous 'car[index].position'
        map[car[index].position] = car[index].name + " ";       //put the car in its new position
    }        
    
    
    else        //if there is a car in destination

        for (let j = 0; j < carNum; j++) 
        {
            //if an accident happened

            if (map[car[index].position] === (car[j].name + " ") || map[car[index].position] === ("#" + car[j].name + "# "))   
            {
                map[prevCarPosition] = "* ";                             //putting '*' instead of previous 'car[index].position'

                map[car[j].position] = "#" + car[index].name + "# ";    
                // '#' means that this car has kicked another car in this position


                car[j].position = 0;         //change kicked 'car' position to start
                car[j].kicked = true;       // shows that this 'car' has been kicked
                
                
                break;       //don't continue the loop for all cars
            }
        }
}


////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////// primitive information ///////////////////////////

//getting the number of cars from the user

let carNum = +prompt("Enter the number of cars:");


let car = [];       //container for cars' information

//make 'carNum' number of cars

for (let i = 0; i < carNum; i++)

    car[i] = new Car();


//getting car names from the user

for (let i = 0; i < carNum; i++)

    car[i].name = prompt(`Enter the Name of Car ${i + 1}`);


//making a map with 100 '*'s

let map = [];

for (let i = 0; i < 100; i++)
    map[i] = '* '         


////////////////////////////// Start Positioning ///////////////////////////////


let testRandom;           //for testing unequl random-number cerated
let randomNum = [];      //container of random-numbers created
let carPosition = [];   //container for car positions


//initializing the first position of cars

for (let i = 0; randomNum.length < carNum; i++)       
{
    testRandom = Math.floor(Math.random() * ((carNum - 1) - 0 + 1) + 0)      //randomize formula between '0' and 'last position'
    

    if (randomNum.indexOf(testRandom) === -1)       //if 'testRandom' does not exist in 'randomNum'
        randomNum.push(testRandom);
}


//assigning random numbers to car posiotions for start

for (let i = 0; i < carNum; i++)

    car[i].position = randomNum[i];      


//show the start position of the cars

for (let i = 0; i < carNum; i++)

    console.log(`Start Position of Car '${car[i].name}': ${car[i].position}`);


//positioning the start position of cars

for (let i = 0; i < carNum; i++)     
    map[car[i].position] = car[i].name + " ";

console.log(map.join(''));


///////////////////////////// giving a reandom 'turn' to each car ////////////////////////////////


randomNum = [];     //clearing 'randomNum' Array for another use


//unequal reandom 'turn' maker

for (let i = 0; randomNum.length < carNum; i++) 
{
    testRandom = Math.floor(Math.random() * (carNum - 1 + 1) + 1)      //randomize formula between 'first car' and 'last car'

    if (randomNum.indexOf(testRandom) === -1)       //if 'testRandom' does not exist in 'randomNum'
        randomNum.push(testRandom);
}


//giving a turn to each car

for (let i = 0; i < carNum; i++)

    car[i].turn = randomNum[i];

//show the turn of each car

for (let i = 0; i < carNum; i++)

    console.log(`Turn of Car '${car[i].name}': ${car[i].turn}`); 
    

////////////////////////////// moving ///////////////////////////////


let prevCarPosition;       //a container for position of cars before moving

let ranking = [];       //an Array for containing Winners


//move cars

while (ranking.length < carNum)          //while there is a car that hasn't finished the game
{

    for (let turn = 1; turn <= carNum; turn++)       //move the cars in turn
    {

        for (let i = 0; i < carNum; i++)         
        {

            if (car[i].turn === turn)       //find the car which is its 'turn'
            {
                //if the 'car' has been kicked by another 'car', don't move in this round
                if (car[i].kicked === true) 
                {
                    car[i].kicked = false;      //in this round, don't move and just clear 'car.kicked' for next round

                    console.log("not Allowed to move in this Round.");
                    

                    break;      //don't continue the loop for all cars. because when the car with 'turn' needed is found,
                               //other cars don't need to be checked by that 'turn'
                }   
                
                else
                {
                    prevCarPosition = car[i].position;      // 'prevCarPosition' = current 'car.position'

                    car[i].position += moveNumber();      //chage its position


                    //put '***' in front of 'car' name when a 'car' finishes the game
                    if (car[i].position > 99)
                        console.log(`'${car[i].name}' position: `, `${car[i].position}***`);

                    //print 'car' name and its 'position'
                    else
                        console.log(`'${car[i].name}' position: `, car[i].position);



                    //if the car passed the last home (if won the game)
                    if (car[i].position > 99) 
                    {
                        ranking.push(car[i].name);

                        map[prevCarPosition] = "* ";    //remove the car from the map

                        car[i].turn = 0;              //*** remove the car from the loop ('turn's start from 1) ***
                    }

                    else

                        moveCar(car, i, prevCarPosition);
                

                
                    break;      //don't continue the loop for all cars. because when the car with 'turn' needed is found,
                               //other cars don't need to be checked by that 'turn'
                }
            }        
        }
    }

    console.log(map.join(''));
}

////////////////////////////// Announcing the Ranking ///////////////////////////////


console.log(`Winner is: '${ranking[0]}'`);

for (let i = 1; i <ranking.length; i++)

    console.log(`Rank ${i + 1} is for: '${ranking[i]}'`);