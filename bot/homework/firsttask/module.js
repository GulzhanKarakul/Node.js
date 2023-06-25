export function getCurrTimeWeather(apiResponse){
    let currentWeather = apiResponse.current;
    return `<i><b>Город: ${apiResponse.location.name}</b>\nТекущее время: ${currentWeather.last_updated}\n${currentWeather.condition.text}: ${getWeatherSymbol(currentWeather.condition.text)}\nТекущая температура: ${currentWeather.temp_c} \u00B0C\nОщущается как: ${currentWeather.feelslike_c} \u00B0C\nВлажность воздуха: ${currentWeather.humidity}\nНаправление и скорость ветра: ${currentWeather.wind_dir} ${currentWeather.wind_kph} км/ч\n\n <b>Хотите еще узнать погоду:</b></i>`;
}

export function getThreeDayWeather(arrOfThreeDaysWeather){
    let response = '';
    for(let x of arrOfThreeDaysWeather){
        response += `<b>${x.date}</b>\n ${x.day.condition.text}: ${getWeatherSymbol(x.day.condition.text)}\n Макс температура: ${x.day.maxtemp_c}  \u00B0C\n Миним температура: ${x.day.mintemp_c} \u00B0C\n\n`
    }
    return response = `<i>${response}</i>`;
}

function getWeatherSymbol(description) {
    description = description.toLowerCase();
    let weatherSymbol;

    if (description.includes('ясно')) {
        weatherSymbol = '☀️';
    } else if (description.includes('местами дождь')) {
        weatherSymbol = '🌦';
    } else if (description.includes('местами облачно')) {
        weatherSymbol = '⛅️';
    } else if (description.includes('облачно')) {
        weatherSymbol = '☁️';
    } else if (description.includes('пасмурно')) {
        weatherSymbol = '☁️☁️';
    } else if (description.includes('дождь')) {
        weatherSymbol = '🌧';
    } else if (description.includes('сильный дождь')) {
        weatherSymbol = '⛈';
    } else if (description.includes('гроза')) {
        weatherSymbol = '🌩';
    } else if (description.includes('гроза с дождем')) {
        weatherSymbol = '⛈🌧';
    } else if (description.includes('снег')) {
        weatherSymbol = '🌨';
    } else {
        weatherSymbol = '❓';
    }

    return weatherSymbol;
}
