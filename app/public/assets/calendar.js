const arrowLeftElement = document.getElementById("arrowL");
const arrowRightElement = document.getElementById("arrowR");
const monthElement = document.getElementById("month");
let liElementCollection = document.getElementById("matrix").getElementsByTagName("li");

arrowLeftElement.click();
arrowRightElement.click();

document.getElementById("location").addEventListener("click", function () {
    document.getElementById('getLocationForm').value = document.getElementById('location').value;
})

let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const dateForNOtRefresh = urlParams.get('date');
// if (dateForNOtRefresh  !== null)
//     document.getElementById("dateSelectForm").value =dateForNOtRefresh;
// else
//     document.getElementById("dateSelectForm").value = moment().format('YYYY-MM-DD');
//
// const linkLocation = urlParams.get('location');
// if (linkLocation !== null)
// document.getElementById('location').value = linkLocation;

function surfNextMonth() {
    let monthDisplayed = monthElement.innerText.slice(0, -5);
    let year = monthElement.innerText.split(" ")[1];
    if (monthDisplayed === "December") {
        year++;
    }
    let nextMonth;
    if (monthDisplayed !== "December") {
        nextMonth = monthsArray[monthsArray.indexOf(monthDisplayed) + 1];
    } else {
        nextMonth = monthsArray[0];
        monthDisplayed = "January";
        monthElement.innerText = `${monthDisplayed} ${year}`;
    }
    let startingDayOfNextMonth = moment().year(parseInt(year)).month(monthsArray.indexOf(nextMonth)).startOf('month').day();
    let numberOfDaysInNextMonth = moment().year(parseInt(year)).month(nextMonth).daysInMonth();

    for (let liElement of liElementCollection) {
        liElement.style.pointerEvents = "none";
        liElement.innerText = "";
        liElement.style.visibility = "hidden";
    }
    let k = 1;
    for (let i = 0; i < numberOfDaysInNextMonth + startingDayOfNextMonth; i++) {
        liElementCollection[i].style.visibility = "visible";
        if (liElementCollection[i].style.backgroundColor === "purple")
            liElementCollection[i].style.backgroundColor = "rgb(142, 142, 218)";
        if (i >= startingDayOfNextMonth) {
            liElementCollection.item(i).innerText = k.toString();
            liElementCollection[i].style.pointerEvents = "auto";
            k++;
        }
    }

    monthElement.innerText = `${nextMonth} ${year}`;
}

function surfPreviousMonth() {
    let monthDisplayed = monthElement.innerText.slice(0, -5);
    let year = monthElement.innerText.split(" ")[1];
    if (monthDisplayed === "January") {
        year--;
    }
    let previousMonth;
    if (monthDisplayed !== "January") {
        previousMonth = monthsArray[monthsArray.indexOf(monthDisplayed) - 1];
    } else {
        previousMonth = monthsArray[monthsArray.length - 1];
        monthDisplayed = "December";
        monthElement.innerText = `${monthDisplayed} ${year}`;
    }


    let startingDayOfPreviousMonth = moment().year(parseInt(year)).month(monthsArray.indexOf(previousMonth)).startOf('month').day();
    let numberOfDaysInPreviousMonth = moment().year(parseInt(year)).month(previousMonth).daysInMonth();

    for (let liElement of liElementCollection) {
        liElement.style.pointerEvents = "none";
        liElement.innerText = "";
        liElement.style.visibility = "hidden";
    }
    let k = 1;
    for (let i = 0; i < numberOfDaysInPreviousMonth + startingDayOfPreviousMonth; i++) {
        liElementCollection[i].style.visibility = "visible";
        if (liElementCollection[i].style.backgroundColor === "purple")
            liElementCollection[i].style.backgroundColor = "rgb(142, 142, 218)";
        if (i >= startingDayOfPreviousMonth) {
            liElementCollection.item(i).innerText = k.toString();
            liElementCollection[i].style.pointerEvents = "auto";
            k++;
        }
    }
    monthElement.innerText = `${previousMonth} ${year}`;
}

arrowRightElement.addEventListener("click", surfNextMonth);
arrowLeftElement.addEventListener("click", surfPreviousMonth);

function refreshCalendarToCurrentDate() {
    let currentDate = moment();
    // if(dateForNOtRefresh !=null)
    //  currentDate = moment(dateForNOtRefresh ,"YYYY-MM-DD");

    console.log(currentDate);
    let currentDay = currentDate.format('DD');
    let currentMonth = currentDate.format('MMMM');
    let currentYear = currentDate.format('YYYY');
    document.getElementById("month").innerText = `${currentMonth} ${currentYear}`;
    // const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('date')
    if (product !== null)
        document.getElementById("scheduleDate").innerText = `Schedule for ${product}`;
    else
        document.getElementById("scheduleDate").innerText = `Schedule for ${currentMonth} ${currentDay}, ${currentYear}`;
    arrowLeftElement.click();
    arrowRightElement.click();
}

if (!document.URL.includes('!')) {
    refreshCalendarToCurrentDate();
}

function showDate() {
    let month = document.getElementById(("month")).innerText.slice(0, -5);
    let year = document.getElementById(("month")).innerText.split(" ")[1];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('date')
    if (product !== null)
        document.getElementById("scheduleDate").innerText = `Schedule for ${product}`;
    else
        document.getElementById("scheduleDate").innerText = `Schedule for ${month} ${this.innerText}, ${year}`;
    let x = `${year}-${moment().month(month).format("M")}-${this.innerText}`;
    let y = moment(x).format('YYYY-MM-DD');
    document.getElementById("getDateForm").value = y;
    document.getElementById('getLocationForm').value = document.getElementById('location').value;
    document.getElementById('getDateFormForApt').value = y;
    document.getElementById('getLocationFormForApt').value = document.getElementById('location').value;
    document.getElementById('invisible').submit();
}

for (const li of liElementCollection) {
    li.addEventListener("click", showDate);
}
console.log( )
