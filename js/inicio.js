'use strict' 

function ir(){

    const c=2163;

    const u="valentina";

    if(document.form.password.value==c && document.form.login.value==u){
        // alert ("Welcome to the Game.");
        // window.location= "Rock Paper Scissor/index.html";
        document.getElementById("login").style.display = "none";
        document.getElementById("game").style.display = "block";

    }else{
        alert("Enter Valid Username & Password.");
    }
}

let userPoints = document.querySelector("#userPoints");
let compPoints = document.querySelector("#compPoints");

let choices = document.querySelectorAll(".choices");

let userResult = document.querySelector("#userResult");
let resultText = document.querySelector("#resultText");
let compResult = document.querySelector("#compResult");
let overallRounds = document.querySelector("#Overallpoints");
let listUser = document.querySelector("#userlist");
let listComp = document.querySelector("#complist");

//let userWin = 0;
//let compWin = 0;
let rounds = 0;
const points = [];
let userWin = [];
let compWin = [];
let lsMaster = {};

choices.forEach((choose, UserChoose) => {
    choose.addEventListener("click", () => {
  
        userResult.innerHTML = `${choose.innerHTML}
                <h3>User</h3>`;

        //Generate Random Number For Computer turn
        let computerChoose = Math.floor(Math.random() * 3);
        //        console.log(computerChoose);

        if (computerChoose === 0) {
            compResult.innerHTML = `<i><img  width=70 height= 70 src="images/left-st.jpg"></i>
                <h3>Comp</h3>`;
        } else if (computerChoose === 1) {
            compResult.innerHTML = `<i><img width=70 height= 70 src="images/paper.jpg"></i>
                <h3>Comp</h3>`;
        } else if (computerChoose === 2) {
            compResult.innerHTML = `<i><img width=70 height= 70 src="images/right-sc.jpg"></i>
                <h3>Comp</h3>`;
               
        }
        

        //RESULT
        //0 = Rock
        //1 = Paper
        //2 = Scissor

        if (UserChoose === computerChoose) {
            resultText.innerText = `Draw`;
        } else if (UserChoose === 0 && computerChoose === 1) {
            //Computer Win
            compWin.push(-30); //(-30 pts cpu)
            userWin.push(100);
            resultText.innerText = `Loss`;
        } else if (UserChoose === 1 && computerChoose === 2) {
            //Computer Win
            compWin.push(-30); //(-30 pts cpu)
            userWin.push(100);
            resultText.innerText = `Loss`;
        } else if (UserChoose === 2 && computerChoose === 0) {
            //Computer Win
            compWin.push(-30); //(-30 pts cpu)
            userWin.push(100);
            resultText.innerText = `Loss`;
        } else {
            //User Win
            compWin.push(-30);
            userWin.push(100); //100pts
            resultText.innerText = `Win`;
        }
       // totalOverall = totalOverall+(userWin-compWin);

        //let gameNumber = (localStorage.length);

        //document.getElementById("Total").innerHTML=`
        //<div>total points. ${(totalOverall)}</div>`

         //OVERALL STATISTICS
        
        let numeros = [1, 2, 3, 4, 5];
        let total = numeros.reduce((a, b) => a + b, 0);

        console.log(total);
        let userTotal = userWin.reduce((a, b) => a + b, 0);
        let compTotal = compWin.reduce((a, b) => a + b, 0);
        userPoints.innerText = userTotal ;
        compPoints.innerText = compTotal ;
        //console.log(userWin,compWin);

        //ROUNDS NUMBER
       
        rounds+=1;
        overallRounds.innerHTML=rounds;
        if (rounds === 10){ 
            points.push(userWin);
            rounds = 0;
           // userWin = 0;
            //compWin = 0;
            //console.log(points);
            //userWin.reduce((a, b) => a + b, 0);
            //compWin.reduce((a, b) => a + b, 0);
            let winnersUser = userWin.reduce((a, b) => a + b, 0);
            let winnersComp = compWin.reduce((a, b) => a + b, 0);
            //console.log(winnersUser, "user");
            //console.log(winnersComp, "comp");
            

            let hp1 = localStorage.getItem("userScoreHistory");
            //alert(hp1);
            let hp2 = localStorage.getItem("compuScoreHistory");
            
            let hp1_b = {};
            let hp1_k = 1;
      
          	let hp2_b = {};
            let hp2_k = 1;

          	if (hp1===null){
                hp1_b = {};
                hp1_k = 1;
                hp2_b = {};
                hp2_k = 1;
            
            }else{                
                hp1_b = JSON.parse(hp1);
                let hp1_largo = Object.keys(hp1_b).length;
                hp1_k = hp1_largo+1;

                hp2_b = JSON.parse(hp2);
                let hp2_largo = Object.keys(hp2_b).length;
                hp2_k = hp2_largo+1;
            }
          
          
          
            hp1_b[hp1_k] = winnersUser;
            let hp1_save = JSON.stringify(hp1_b);
            localStorage.setItem("userScoreHistory", hp1_save);

	          hp2_b[hp2_k] = winnersComp;
            let hp2_save = JSON.stringify(hp2_b);
            localStorage.setItem("compuScoreHistory", hp2_save);

          
          
          
            listUser.innerHTML = ``;
            for (let i = hp1_k; i >hp1_k -5; i--) {
                if (hp1_b[i]===undefined){  
                }else {
                    listUser.innerHTML += hp1_b[i]+"<br>";
                }
            }
            listComp.innerHTML = ``;
            for (let i = hp2_k; i >hp2_k -5; i--) {
                if (hp2_b[i]===undefined){  
                }else {
                    listComp.innerHTML += hp2_b[i]+"<br>";
                }
            }

          
          
            userWin = [];
            compWin = [];
            
        }; 
    })
})
//RESET BUTTON

    document.getElementById("btn-clear").onclick = function(){
    localStorage.clear();
    location.reload();
};


//LOCAL STORAGE



window.addEventListener("DOMContentLoaded", function () {
    let userHistory = localStorage.getItem("userScoreHistory");
    let compuHistory = localStorage.getItem("compuScoreHistory");
    //console.log("pepe");
 
  if (userHistory !== null){
      
 
    

        let hp1 = JSON.parse(userHistory);
        let hp1largo = Object.keys(hp1).length;
        for (let i = hp1largo; i >hp1largo -5; i--) {
            if (hp1[i]===undefined){  
            }else {
                listUser.innerHTML += hp1[i]+"<br>";
            }
        }
        let hp2 = JSON.parse(compuHistory);
        let hp2largo = Object.keys(hp2).length;
        for (let i = hp2largo; i >hp2largo -5; i--) {
            if (hp2[i]===undefined){  
            }else {
                listComp.innerHTML += hp2[i]+"<br>";
            }
        }
    }
  });






