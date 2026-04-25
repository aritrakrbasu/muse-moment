export const getEnvironmentData = async () => {
  const time = new Date();
  const hour = time.getHours();

  // 1. Determine the "Time Vibe"
  let timeVibe = "Late Night";
  if (hour >= 5 && hour < 12) timeVibe = "Early Morning";
  else if (hour >= 12 && hour < 17) timeVibe = "Midday";
  else if (hour >= 17 && hour < 21) timeVibe = "Golden Hour";
  else if (hour >= 21 || hour < 5) timeVibe = "Deep Night";

  // 2. Fetch Weather based on Geolocation
  try {
    const pos = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej),
    );
    const { latitude, longitude } = pos.coords;

    const API_KEY = "01935381a2a31e143218bbe56529f112";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();

    return {
      temp: data.main.temp,
      condition: data.weather[0].main, // Rain, Clear, Clouds, etc.
      description: data.weather[0].description,
      city: data.name,
      timeVibe,
      isDark: hour >= 19 || hour < 6,
    };
  } catch (error) {
    return { temp: 22, condition: "Clear", timeVibe, isDark: true }; // Fallback
  }
};
