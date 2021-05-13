function displayTime() {
    let timeDisplayEl = $('#time-display');

    let currentDay = $('#currentDay')

    let DateTime = luxon.DateTime ;

    let now = DateTime.now()

    let year = now.year ;

    let month = now.month ;

    let day = now.day ;

    let hour = now.hour ;

    let minute = now.minute ;

    let second = now.second ;

    let weekday = now.weekday ;

    let daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] ;

    let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] ;

    weekday = daysOfTheWeek[weekday - 1]

    month = monthsOfTheYear[month -1]

//---------------------------------------------------
    function getOrdinal() {
        let  dayAsString = String(day) ;
        let endOfDayString = dayAsString.charAt(dayAsString.length -1)
    
       if (endOfDayString === "1" && dayAsString !== "11") {
           ordinal = "st"
       } else if (endOfDayString === "2" && dayAsString !== "12"){
           oridnal = "nd"
       } else if (endOfDayString === "3" && dayAsString !== "13"){
           ordinal = "rd"
       } else {
           ordinal = "th"
       }
    
       return ordinal
    } 
   
//---------------------------------------------------
    
    let chosenOrdinal = getOrdinal() ;
    
    let timeDisplay = weekday + ", " + month + " " + day + chosenOrdinal + ", " + year;
    
    let otherTimeDisplay = hour + ":" + minute + ":" + second;

    currentDay.text(timeDisplay) ;
    timeDisplayEl.text(otherTimeDisplay)

    let timeBlockArray = $(".event") ;
    for (let i = 0; i < timeBlockArray.length; i++ ){

        timeBlock = timeBlockArray.eq(i) ;
        timeBlockHead = timeBlock.siblings().first() ;
        timeBlockHeadValue = timeBlockHead[0].getAttribute("value");

        if (timeBlockHeadValue < hour) {
            timeBlock[0].classList.remove("present")
            timeBlock[0].classList.remove("future")
            timeBlock[0].classList.add("past")

        } else if (timeBlockHeadValue == hour){
            timeBlock[0].classList.remove("past") ;
            timeBlock[0].classList.remove("future") ;
            timeBlock[0].classList.add("present") ;

        } else if (timeBlockHeadValue > hour) {
            timeBlock[0].classList.remove("past") ;
            timeBlock[0].classList.remove("present") ;
            timeBlock[0].classList.add("future") ;
        }
    }
}
//---------------------------------------------------
setInterval(displayTime, 1000)
//---------------------------------------------------

//Initialize local storage / populate page

function initializePage() {

    if (localStorage.getItem("textareaArray") === null) {

        let textareaArray = []
    
        let numberOfTR = document.querySelectorAll("tr") ;
    
        for (let i=0; i< numberOfTR.length; i++) {
            textareaArray.push({"textarea": ""})  
        }
    
        localStorage.setItem("textareaArray", JSON.stringify(textareaArray))
    } else {
        textareaArray = JSON.parse(localStorage.getItem("textareaArray")) ;
        let arrayTextareaEl = document.getElementsByClassName("textarea") ;

        for (let i = 0; i < arrayTextareaEl.length; i++) {
            arrayTextareaEl[i].value =  textareaArray[i]["textarea"] ;
        }
    }
}
//---------------------------------------------------
initializePage() ;
//---------------------------------------------------

let arraySaveButtons = document.getElementsByClassName("saveBtn") ;

for (let i = 0; i < arraySaveButtons.length; i++) {
    arraySaveButtons[i].addEventListener("click", function() {
        console.log("save button clicked") ;
        toLocalStorage(i) ;
    })
}   
//---------------------------------------------------

//Function to get content of textarea and send to local storage
function toLocalStorage(i) {
    // console.log("save button clicked") ;
    let arrayTextareaContent = [] ;
    let arrayTextareaEl = document.getElementsByClassName("textarea") ;

    for (textarea of arrayTextareaEl) {
        
        arrayTextareaContent.push(textarea.value)
    }
    
    let areaText = arrayTextareaContent[i]
    let textareaArray = JSON.parse(localStorage.getItem("textareaArray")) ;

    
    textareaArray[i]["textarea"] = areaText ;
    console.log(textareaArray[i]["textarea"])

    localStorage.setItem("textareaArray", JSON.stringify(textareaArray))
}