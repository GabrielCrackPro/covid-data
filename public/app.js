const API_URLS = {
 countryByName: "https://covid19-api.com/country?name=",
 countryByCode: "https://covid19-api.com/country/code?code=",
 allCountries: "https://covid19-api.com/country/all?format=json",
 totalReport: "https://covid19-api.com/report/totals?format=json",
 totals: "https://covid19-api.com/totals?format=json"
}
const dataContainer = document.querySelector('.data-container')

const getData = async (url) => {
let data = fetch(url).then(response => response.json())
return data
}
const formatNumber = (number) => {
return number.toLocaleString()
}
const formatDate = (date) => {
return new Date(date).toLocaleString()
}

window.onload = async () => {
let totalData = await getData(API_URLS.totals)
const globalData = {
 confirmed: totalData[0].confirmed,
 recovered: totalData[0].recovered,
 critical: totalData[0].critical,
 deaths: totalData[0].deaths,
 updatedAt: totalData[0].lastUpdate
}
dataContainer.innerHTML = `
<h3 class="bg-danger fw-bold text-white text-center p-2">Global</h3>
<div id="global" class="d-flex flex-column align-items-center justify-content-center">
 <p><span class="fw-bold text-danger">Confirmed:</span> ${formatNumber(globalData.confirmed)}</p>
 <p><span class="fw-bold text-danger">Recovered:</span> ${formatNumber(globalData.recovered)}</p>
 <p><span class="fw-bold text-danger">Critical:</span> ${formatNumber(globalData.critical)}</p>
 <p><span class="fw-bold text-danger">Deaths:</span> ${formatNumber(globalData.deaths)}</p>
 <p><span class="fw-bold text-danger">Updated At:</span> ${formatDate(globalData.updatedAt)}</p>
</div>
<div class="countries-container"></div>
`
const countriesContainer = document.querySelector('.countries-container')

let countriesData = await getData(API_URLS.allCountries)
countriesData.forEach(country => {
countriesContainer.innerHTML += `
<h3 class="bg-danger text-white text-center p-2">#${countriesData.indexOf(country) + 1} - ${country.country}</h3>
<p class="text-center"><span class="fw-bold text-danger">Confirmed:</span>${formatNumber(country.confirmed)}</p>
<p class="text-center"><span class="fw-bold text-danger">Recovered:</span>${formatNumber(country.recovered)}</p>
<p class="text-center"><span class="fw-bold text-danger">Critical:</span>${formatNumber(country.critical)}</p>
<p class="text-center"><span class="fw-bold text-danger">Deaths:</span>${formatNumber(country.deaths)}</p>
<p class="text-center"><span class="fw-bold text-danger">Updated At:</span>${formatDate(country.lastUpdate)}</p>
`
})
}
