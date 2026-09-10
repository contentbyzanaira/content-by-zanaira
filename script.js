const CALENDAR_API = "https://script.google.com/macros/s/AKfycbwX0jmaepm1C5RoS1EpgYZNYobiOonmOqNV-r-5zTPT0oZJysaAL2XuGTaVfXzc3-epLA/exec";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(CALENDAR_API);
    const events = await response.json();

    const calendarDates = document.querySelectorAll(".calendar-dates > div");

    const bookedDates = new Set();
    const limitedDates = new Set();

    events.forEach(event => {
      let start = new Date(event.start + "T00:00:00");
      let end = new Date(event.end + "T00:00:00");

      // Google all-day events normally end on the following day
      end.setDate(end.getDate() - 1);

      while (start <= end) {
        const date = start.toISOString().split("T")[0];

        if (event.title && event.title.toLowerCase().includes("limited")) {
          limitedDates.add(date);
        } else {
          bookedDates.add(date);
        }

        start.setDate(start.getDate() + 1);
      }
    });

    // Your current calendar is September 2026
    const year = 2026;
    const month = 8; // September (January = 0)

    calendarDates.forEach(day => {
      const number = parseInt(day.textContent.trim());

      if (isNaN(number)) return;

      const date = new Date(year, month, number);
      const dateString =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");

      day.classList.remove("booked", "limited");

      if (bookedDates.has(dateString)) {
        day.classList.add("booked");
      } else if (limitedDates.has(dateString)) {
        day.classList.add("limited");
      }
    });

  } catch (error) {
    console.error("Calendar connection error:", error);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".video-box video");

  if (!video) return;

  video.addEventListener("click", () => {
    video.muted = false;
    video.play();

    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    } else if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  });
});
