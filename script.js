const CALENDAR_API = "https://script.google.com/macros/s/AKfycbwX0jmaepm1C5RoS1EpgYZNYobiOonmOqNV-r-5zTPT0oZJysaAL2XuGTaVfXzc3-epLA/exec";

document.addEventListener("DOMContentLoaded", async () => {

  // Calendar
  try {
    const response = await fetch(CALENDAR_API);
    const events = await response.json();

    const calendarDates = document.querySelectorAll(".calendar-dates > div");

    const bookedDates = new Set();
    const limitedDates = new Set();

    events.forEach(event => {
      let start = new Date(event.start + "T00:00:00");
      let end = new Date(event.end + "T00:00:00");

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

    const year = 2026;
    const month = 8;

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


  // Portfolio videos
  const videos = document.querySelectorAll(".video-box video");

  videos.forEach(video => {
    video.addEventListener("click", async () => {

      video.muted = false;
      video.volume = 1;

      try {
        await video.play();
      } catch (error) {
        console.log("Video play error:", error);
      }

      if (video.requestFullscreen) {
        try {
          await video.requestFullscreen();
        } catch (error) {
          console.log("Fullscreen unavailable:", error);
        }
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    });
  });

});
