

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

    let daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    weekday = daysOfTheWeek[weekday - 1]

    month = monthsOfTheYear[month -1]


    let timeObject = {
        "year": year,
        "month": month,
        "day": day,
        "weekday": weekday,
        "hour": hour,
        "minute": minute,
        "second": second
    }

    function getOrdinal() {
        let  dayAsString = String(day) ;
        let endOfDayString = dayAsString.charAt(dayAsString.length -1)
    
       if (endOfDayString === "1" && dayAsString !== "11") {
           ordinal = "st"
       } else if (endOfDayString === "2" && dayAsSting !== "12"){
           oridnal = "nd"
       } else if (endOfDayString === "3" && dayAsSting !== "13"){
           ordinal = "rd"
       } else {
           ordinal = "th"
       }
    
       return ordinal
    } 
   
    
    let chosenOrdinal = getOrdinal() ;
    
    let timeDisplay = weekday + ", " + month + " " + day + chosenOrdinal ;
    
    let otherTimeDisplay = hour + ":" + minute + ":" + second;

    currentDay.text(timeDisplay) ;
    timeDisplayEl.text(otherTimeDisplay)
}






setInterval(displayTime, 1000)