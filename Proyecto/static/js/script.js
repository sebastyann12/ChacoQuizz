//******/ codigo nuevo 

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit"); 
const continue_btn = info_box.querySelector(".buttons .restart");/******/
const quiz_box = document.querySelector(".quiz_box");

const quiz_boxf = document.querySelector(".quiz_boxf"); /****/
const quiz_boxd = document.querySelector(".quiz_boxd");  /******/

const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

const option_listf  = document.querySelector(".option_listf"); /***/
const option_listd  = document.querySelector(".option_listd"); /***/

const time_line = document.querySelector("header .time_line");
const time_linef = document.querySelector("header .time_linef"); /***/
const time_lined = document.querySelector("header .time_lined");/****/
const timeText = document.querySelector(".timer .time_left_txt");    
const timeTextf = document.querySelector(".timer .time_left_txtf");/***/
const timeTextd = document.querySelector(".timer .time_left_txtd");/***/
const timeCount = document.querySelector(".timer .timer_sec");
const timeCountf = document.querySelector(".timer .timer_secf");/***/
const timeCountd = document.querySelector(".timer .timer_secd");/***/


const dif_box = document.querySelector(".dif_box"); /******/
const niv_med = dif_box.querySelector(".botones .b_med"); /******/
const niv_fac = dif_box.querySelector(".botones .b_fac");/******/
const niv_hard = dif_box.querySelector(".botones .b_dif");/******/

const bandera = document.querySelector(".banderac");

// boton comenzar
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
    bandera.classList.add("sacar");
}


// boton salir
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
     bandera.classList.remove("sacar");
}

// boton continuar
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    dif_box.classList.add("activeDif"); /****/
}

// boton nivel facil ******
niv_fac.onclick = ()=>{
    dif_box.classList.remove("activeDif"); 
    quiz_boxf.classList.add("activeQuizf"); 
    showQuetionsf(0); 
    queCounterf(1); 
    startTimerf(20); 
    startTimerLinef(0); 
}

// boton nivel  medio  
niv_med.onclick = ()=>{
    dif_box.classList.remove("activeDif"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15);
    startTimerLine(0); 
}


// boton nivel dificil  ******
niv_hard.onclick = ()=>{
    dif_box.classList.remove("activeDif"); 
    quiz_boxd.classList.add("activeQuizd"); 
    showQuetionsd(0); 
    queCounterd(1); 
    startTimerd(10); 
    startTimerLined(0); 
}

let timeValue =  15;
let timeValuef =  20;/***/
let timeValued =  10;/***/
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// jugar otra vez
restart_quiz.onclick = ()=>{
    dif_box.classList.add("activeDif");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
}

    

// salir
quit_quiz.onclick = ()=>{
    window.location.reload(); // te hace un refresh para que se reinicie todo
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// boton siguiente niv medio
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Tiempo"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine);
        showResult(); 
    }
}




// sacar las prguntas del arreglo
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag;
    
    const option = option_list.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



// el tick y la x 
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//cuando se elige la opcion 
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}

//los resultados 
function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ 
        
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>Bien!😎, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p>Puntaje: '+userScore*20+' </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 9){ //cuando llega al 9 se le agrega un 0 para que cumpla el formato 0X
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Tiempo agotado"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

//La barrita de tiempo hay que modificar los values para las otras dificultades
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}


//////////////////////////////////////////***las preguntas faciles****/////////////////////////////////////////////////////////


const next_btnf = document.querySelector("footer .next_btnf");
const bottom_ques_counterf = document.querySelector("footer .total_quef");


next_btnf.onclick = ()=>{
    if(que_count < pfacil.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetionsf(que_count); 
        queCounterf(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimerf(timeValuef); 
        startTimerLinef(widthValue); 
        timeTextf.textContent = "Tiempo"; 
        next_btnf.classList.remove("show"); 
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResultf(); 
    }
}


function showQuetionsf(index){
    const que_textf = document.querySelector(".que_textf");

    
    let que_tagf = '<span>'+ pfacil[index].numb + ". " + pfacil[index].question +'</span>';
    let option_tagf = '<div class="option"><span>'+ pfacil[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ pfacil[index].options[3] +'</span></div>';
    que_textf.innerHTML = que_tagf; 
    option_listf.innerHTML = option_tagf; 
    
    const optionf = option_listf.querySelectorAll(".option");

    
    for(i=0; i < optionf.length; i++){
        optionf[i].setAttribute("onclick", "optionSelectedf(this)"); //***********************************
    }
}




function optionSelectedf(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent;
    let correcAns = pfacil[que_count].answer; 
    const allOptions = option_listf.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_listf.children[i].textContent == correcAns){ 
                option_listf.children[i].setAttribute("class", "option correct"); 
                option_listf.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_listf.children[i].classList.add("disabled"); 
    }
    next_btnf.classList.add("show");
}


function showResultf(){
    info_box.classList.remove("activeInfo"); 
    quiz_boxf.classList.remove("activeQuizf"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ 
        
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ pfacil.length +'</p>Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>Bien! 😎, acertaste<p>'+ userScore +'</p>de<p>'+ pfacil.length +'</p> Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ pfacil.length +'</p>Puntaje: '+userScore*10+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimerf(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCountf.textContent = time; 
        time--;
        if(time < 9){ 
            let addZero = timeCountf.textContent; 
            timeCountf.textContent = "0" + addZero; 
        }
        if(time < 0){
            clearInterval(counter);
            timeTextf.textContent = "Tiempo agotado"; 
            const allOptions = option_listf.children.length; 
            let correcAns = pfacil[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_listf.children[i].textContent == correcAns){ 
                    option_listf.children[i].setAttribute("class", "option correct"); 
                    option_listf.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_listf.children[i].classList.add("disabled"); 
            }
            next_btnf.classList.add("show"); 
        }
    }
}






function startTimerLinef(time){
    counterLine = setInterval(timer, 38);
    function timer(){
        time += 1; 
        time_linef.style.width = time + "px";
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounterf(index){

    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ pfacil.length +'</p> Preguntas</span>';
    bottom_ques_counterf.innerHTML = totalQueCounTag;  
}


//////////////////////////////////////////*****las preguntas dif*****/////////////////////////////////////////////////////////////////////


const next_btnd = document.querySelector("footer .next_btnd");
const bottom_ques_counterd = document.querySelector("footer .total_qued");

next_btnd.onclick = ()=>{
    if(que_count < pdif.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetionsd(que_count); 
        queCounterd(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimerd(timeValued); 
        startTimerLined(widthValue); 
        timeTextd.textContent = "Tiempo";
        next_btnd.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResultd(); 
    }
}


function showQuetionsd(index){
    const que_textd = document.querySelector(".que_textd");

    
    let que_tagd = '<span>'+ pdif[index].numb + ". " + pdif[index].question +'</span>';
    let option_tagd = '<div class="option"><span>'+ pdif[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ pdif[index].options[3] +'</span></div>';
    que_textd.innerHTML = que_tagd;
    option_listd.innerHTML = option_tagd; 
    
    const optiond = option_listd.querySelectorAll(".option");

   
    for(i=0; i < optiond.length; i++){
        optiond[i].setAttribute("onclick", "optionSelectedd(this)"); //***********************************
    }
}

function optionSelectedd(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = pdif[que_count].answer;
    const allOptions = option_listd.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_listd.children[i].textContent == correcAns){ 
                option_listd.children[i].setAttribute("class", "option correct"); 
                option_listd.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_listd.children[i].classList.add("disabled"); 
    }
    next_btnd.classList.add("show"); 
}

function showResultd(){
    info_box.classList.remove("activeInfo"); 
    quiz_boxd.classList.remove("activeQuizd"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ 
        
        let scoreTag = '<span>Genial!🎉, acertaste <p>'+ userScore +'</p> de <p>'+ pdif.length +'</p>Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>Bien!😎, acertaste<p>'+ userScore +'</p>de<p>'+ pdif.length +'</p> Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>Lastima😐, acertaste <p>'+ userScore +'</p> de <p>'+ pdif.length +'</p>Puntaje: '+userScore*30+'  </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimerd(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCountd.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCountd.textContent; 
            timeCountd.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeTextd.textContent = "Tiempo agotado"; 
            const allOptions = option_listd.children.length; 
            let correcAns = pdif[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_listd.children[i].textContent == correcAns){ 
                    option_listd.children[i].setAttribute("class", "option correct"); 
                    option_listd.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_listd.children[i].classList.add("disabled"); 
            }
            next_btnd.classList.add("show"); 
        }
    }
}

function startTimerLined(time){
    counterLine = setInterval(timer, 20);
    function timer(){
        time += 1; 
        time_lined.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounterd(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ pdif.length +'</p> Preguntas</span>';
    bottom_ques_counterd.innerHTML = totalQueCounTag;  
}
