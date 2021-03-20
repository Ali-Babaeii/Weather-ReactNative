export const setIcon = () => {
    switch (props.apiAddress) {
      case "01d":
        return clearDay;
      case "01n":
        return clearNight;
      case "02d":
        return fewCloudDay;
      case "02n":
        return fewCloudNight;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return clouds;
      case "09d":
      case "09n":
        return showerRain;
      case "10d":
        return rainDay;
      case "10n":
        return rainNight;
      case "11d":
      case "11n":
        return thunderstorm;
      case "13d":
      case "13n":
        return snow;
      case "50d":
      case "50n":
        return mist;
      default:
        return snow;
    }
  };