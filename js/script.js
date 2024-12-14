let todayCardName=document.getElementById('todaycardday')
let todayCardNumber=document.getElementById('todayNumber')
let todayCardMonth=document.getElementById('todayMonth')
let todayCardTemp=document.getElementById('todayTemp')
let todayCardText=document.getElementById('todayText')
let todayCardCountry=document.getElementById('todayCountry')
let todayCardImg=document.getElementById('todayImg')
let todayHumidity=document.getElementById('todayRain')
let todayCardWind=document.getElementById('todayWind')
let todayWindDirection=document.getElementById('todayCompass')

let tomorrowCardName=document.getElementById('tomorrowName')
let tomorrowCardImg=document.getElementById('tomorrowImg')
let tomorrowCardMaxTemp=document.getElementById('tomorrowMaxTemp')
let tomorrowCardMinTemp=document.getElementById('tomorrowMinTemp')
let tomorrowCardText=document.getElementById('tomorrowText')

let aftertomorrowCardName=document.getElementById('aftertomorrowName')
let aftertomorrowCardImg=document.getElementById('aftertomorrowImg')
let aftertomorrowCardMaxTemp=document.getElementById('aftertomorrowMaxTemp')
let aftertomorrowCardMinTemp=document.getElementById('aftertomorrowMinTemp')
let aftertomorrowCardText=document.getElementById('aftertomorrowText')

let searchInput=document.getElementById('searchInput')

navigator.geolocation.getCurrentPosition((position)=>{
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    getWeatherData(`${latitude},${longitude}`)
    
})

searchInput.addEventListener('input',(e)=>{
    let inputValue=e.target.value
    getWeatherData(inputValue)
})
async function getWeatherData(query) {
    let data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=152a03feda014687aa8131947241412&q=${query}&days=3&aqi=no&alerts=no`)
    let result=await data.json()
    console.log(result);
    displayTodayWeather(result)
    displayTomorrowWeather(result)
    displayAfterTomorrowWeather(result)
  }

function displayTodayWeather(result){
    let todayDate=result.current.last_updated
    
    let todayWholeDate=new Date(todayDate)
    let todayName=todayWholeDate.toLocaleString('en-us',{weekday:'long'})
    todayCardName.innerHTML=todayName
    let todayNumber=todayWholeDate.getDate()
    let todayMonth=todayWholeDate.toLocaleString('en-us',{month:'long'})
    todayCardNumber.innerHTML=todayNumber
    todayCardMonth.innerHTML=todayMonth
    todayCardTemp.innerHTML=result.current.temp_c
    todayCardText.innerHTML=result.current.condition.text
    todayCardCountry.innerHTML=result.location.region
    let todayImgSrc=result.current.condition.icon
    let todayImgFullPath=`https:${todayImgSrc}`
    todayCardImg.setAttribute('src',todayImgFullPath)
    todayHumidity.innerHTML=result.current.humidity
    todayCardWind.innerHTML=result.current.wind_kph
    todayWindDirection.innerHTML=result.current.wind_dir
}

function displayTomorrowWeather(result){
    let tomorrowData=result.forecast.forecastday[1]

    let tomorrowDate=tomorrowData.date
    let tomorrowWholeDate=new Date(tomorrowDate)
    let tomorrowName=tomorrowWholeDate.toLocaleString('us-en',{weekday:'long'})
    tomorrowCardName.innerHTML=tomorrowName

    let tomorrowImgSrc=tomorrowData.day.condition.icon
    let tomorrowImgFullPath=`https:${tomorrowImgSrc}`
    tomorrowCardImg.setAttribute('src',tomorrowImgFullPath)
    tomorrowCardMaxTemp.innerHTML=tomorrowData.day.maxtemp_c
    tomorrowCardMinTemp.innerHTML=tomorrowData.day.mintemp_c

    tomorrowCardText.innerHTML=tomorrowData.day.condition.text
    
}

function displayAfterTomorrowWeather(result){
    let afterTomorrowData=result.forecast.forecastday[2]
    console.log(afterTomorrowData);
    
    let afterTomorrowDate=afterTomorrowData.date
    let afterTomorrowWholeDate=new Date(afterTomorrowDate)

    let afterTomorrowDateName=afterTomorrowWholeDate.toLocaleString('en-us',{weekday:'long'})
    aftertomorrowCardName.innerHTML=afterTomorrowDateName

    let afterTomorrowImgSrc=afterTomorrowData.day.condition.icon
    let afterTomorrowFullPath=`https:${afterTomorrowImgSrc}`
    aftertomorrowCardImg.setAttribute('src',afterTomorrowFullPath)

    aftertomorrowCardMaxTemp.innerHTML=afterTomorrowData.day.maxtemp_c

    aftertomorrowCardMinTemp.innerHTML=afterTomorrowData.day.mintemp_c

    aftertomorrowCardText.innerHTML=afterTomorrowData.day.condition.text
}