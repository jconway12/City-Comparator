import './styles/index.scss';
import {getCountriesXML, getStatesXML, getCitiesXML, getStationsXML, getStationInfoXML} from './scripts/air_data';
import {getUrbanAreasXML} from './scripts/life_data';
import {getAreas} from './scripts/life_data_main';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerText = "hey ya";

    window.getCountries = getCountriesXML;
    window.getStates = getStatesXML;
    window.getCities = getCitiesXML;
    window.getStations = getStationsXML;
    window.getStationInfo = getStationInfoXML;
    window.getUrbanAreas = getUrbanAreasXML;
    window.getAreas = getAreas;

    const scoresArr = getAreas();
    
    var svg = d3.select("#app")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 500);

    svg.append("rect")
        .attr('x', 0)
        .attr('width', 100)
        .attr('height', 100)
        .attr('fill', 'white');
})