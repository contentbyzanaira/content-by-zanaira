const CALENDAR_API = "https://script.google.com/macros/s/AKfycbwX0jmaepm1C5RoS1EpgYZNYobiOonmOqNV-r-5zTPT0oZJysaAL2XuGTaVfXzc3-epLA/exec";

async function loadAvailability() {
  try {
    const response = await fetch(CALENDAR_API);
    const events = await response.json();

    const bookedDates = new Set();

    events.forEach(event => {
      let date = new Date(event.start + "T00:00:00");
      const end = new Date(event.end + "T00:00:00");

      while (date <= end) {
        bookedDates.add(date.toISOString().split("T")[0]);
        date.setDate(date.getDate() + 1);
      }
    });

    document.querySelectorAll(".calendar-day").forEach(day => {
      const date = day.dataset.date;

      if (bookedDates.has(date)) {
        day.classList.add("booked");
        day.classList.remove("available", "limited");
      }
    });

  } catch (error) {
    console.error("Calendar connection error:", error);
  }
}

loadAvailability();
