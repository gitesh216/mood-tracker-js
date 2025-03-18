const mood_btns = document.querySelectorAll(".mood-btn");
const updateMoodBtn = document.getElementById("updateMood");

mood_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.getAttribute("data-mood");
    const date = new Date().toISOString().split("T")[0];

    const moods = JSON.parse(localStorage.getItem("moodData")) || {};
    moods[date] = mood;
    localStorage.setItem("moodData", JSON.stringify(moods));
    alert("Mood saved");
    updateTodayMood();
    disableMoodBtns();
  });
});

function updateTodayMood() {
  console.log("hii");
  const mood_ptag = document.getElementById("todayMood");
  const date = new Date().toISOString().split("T")[0];
  console.log(date);
  const moods = JSON.parse(localStorage.getItem("moodData")) || {};
  console.log(moods);
  const mood = moods[date] || "";
  if (!mood) {
    mood_ptag.innerText = `You have not selected today's mood yet`;
  } else {
    mood_ptag.innerText = `Your today's mood is: ${mood}`;
    disableMoodBtns();
  }
}

function disableMoodBtns() {
  mood_btns.forEach((btn) => {
    btn.disabled = true;
  });
}

function enableMoodBtns() {
  mood_btns.forEach((btn) => {
    btn.disabled = false;
  });
}

updateMoodBtn.addEventListener("click", () => {
  enableMoodBtns();
  setTimeout(() => {
    disableMoodBtns();
  }, 15 * 1000);
});

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  let moods = JSON.parse(localStorage.getItem("moodData")) || {};

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";

    let dateKey = getDateKey(currYear, currMonth + 1, i); // YYYY-MM-DD format
    let moodEmoji = moods[dateKey]
      ? `<span class="emoji">${moods[dateKey]}</span>`
      : "";

    liTag += `<li class="${isToday}">${i} ${moodEmoji}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
