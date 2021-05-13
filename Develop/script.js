let DateTime = luxon.DateTime ;

function displayTime() {
    let timeDisplayEl = $('#time-display');

    let currentDay = $('#currentDay')

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


    // let timeObject = {
    //     "year": year,
    //     "month": month,
    //     "day": day,
    //     "weekday": weekday,
    //     "hour": hour,
    //     "minute": minute,
    //     "second": second
    // }

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


setInterval(displayTime, 1000)



//Do I need to pair each textarea element with it's own unique id?

let textareaArray = []

let arrayTextareaEl = document.getElementsByClassName("textarea") ;
console.log(arrayTextareaEl) ;

let arrayTextareaContent = [] ;


if (localStorage.getItem("textareaArrray") === null) {
    for (let i=0; i< arrayTextareaEl.length; i++) {
        textareaArray.push({"textarea": ""})
        localStorage.setItem("textareaArray", JSON.stringify(textareaArray))
    }
}



function doThisStuff() {

    for (textarea of arrayTextareaEl) {
        arrayTextareaContent.push(textarea.value)
    }
    
    // localStorage.setItem("textareaArray", JSON.stringify(textareaArray))

}

console.log(arrayTextareaContent) ;
console.log(textareaArray) ;

//for each save button, create an event listener that runs local storage function for it's corresponding textarea

let arraySaveButtons = document.getElementsByClassName("saveBtn") ;

console.log(arraySaveButtons) ;


for (let i = 0; i < arraySaveButtons.length; i++) {
    arraySaveButtons[i].addEventListener("click", function() {
        console.log("savebuttonclicked") ;
        doThisStuff() ;
        toLocalStorage(i) ;
    })
}   
//------
// document.addEventListener("click", function(event){
//     console.log(event.target.previousSibling) ;
//     console.log(event.target.closest(".event"))
// })
//--------

function toLocalStorage(i) {
    console.log("save button clicked") ;
    let areaText = arrayTextareaContent[i]
    let textareaArray = JSON.parse(localStorage.getItem("textareaArray")) ;

    console.log(textareaArray[i]["textarea"])
    textareaArray[i]["textarea"] = areaText ;

    localStorage.setItem("textareaArray", JSON.stringify(textareaArray))
}