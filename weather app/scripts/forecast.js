class Forecast {
    constructor() {
        this.key = 'DCfwp01xiwCd16yIvgOFXRyWLVkBMXeW';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key)
    
        return {
            // Object shorthand notation
            // when the property name is the same as value name
            cityDetails,
            weather
            // cityDetails: cityDetails,
            // weather: weather
        };
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI+query);
        const data = await response.json();
    
        return data[0];
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI+query);
        const data = await response.json();
    
        return data[0];
    }
}

// const key = 'DCfwp01xiwCd16yIvgOFXRyWLVkBMXeW';

// const getWeather = async (cityKey) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${cityKey}?apikey=${key}`;

//     const response = await fetch(base+query);
//     const data = await response.json();

//     return data[0];

// };

// const getCity = async (city) => {

//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base+query);
//     const data = await response.json();

//     return data[0];

// };

// getCity('Wroclaw').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// })
// .catch(err => console.log(err));