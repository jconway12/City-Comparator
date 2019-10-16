import './styles/index.scss';
import {getCountriesXML, getStatesXML, getCitiesXML, getStationsXML, getStationInfoXML} from './scripts/air_data';
import {getUrbanAreasXML} from './scripts/life_data';
import {getAreas} from './scripts/life_data_main';

window.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    var svg = d3.select("#svg-container")
        .append("svg")
        .attr("class", "svg")
        .attr("width", 8010)
        .attr("height", 1000)
        .attr("fill", "white");

    const input = document.getElementById('toggle-button');
    const formObj = {};

    input.addEventListener('click', (e) => {
        const inputs = document.getElementsByClassName('inputs');
        for (let i = 0; i < inputs.length; i++) {
            formObj[inputs[i].value] = inputs[i].checked
        }
        const loader = document.getElementsByClassName('loaded')[0];
        loader.classList.remove('loaded');
        loader.classList.add('loader');

        getAreas().then(urbanAreas => { 
         const dUrbanAreas = [];
         for(let i = 0; i < urbanAreas.length; i++) {
            let obj = Object.assign({}, urbanAreas[i]);
            let scores = obj.scoresArr;
            let newScores = [];

            for (let j = 0; j < scores.length; j++) {
                let scoreObj = Object.assign({}, scores[j]);
                let prevScores = newScores.slice(0, j);
                let sum = 0;
                prevScores.forEach(e => {
                    sum = sum + e.score_out_of_10 * 5;
                })
                scoreObj['startHeight'] = sum;

                //if not selected for, make score 0
                if (formObj[scoreObj.name] == false) {
                    scoreObj.score_out_of_10 = 0;
                } 
                 
                newScores.push(scoreObj);
            }
            obj['scoresArr'] = newScores;
            dUrbanAreas.push(obj);
            }  
            // debugger
            svg.selectAll('rect').remove();
            var selection2 = svg.selectAll(".series2")
                .data(dUrbanAreas)
                .enter().append("g")
                .attr('class', function(d) {return `series ${d.name}`;})
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name });
        
            selection2.selectAll("rect")
              .data(function (d) { return d.scoresArr; })
              .enter().append("rect")
              .attr('id', function (s) { return s.name })
              .attr("width", 20)
              .attr("y", function (s) { return s.startHeight })
              .attr("height", function (s) { return s.score_out_of_10 * 5; })
              .style("fill", function (s) { return s.color });


            const loader = document.getElementsByClassName('loader')[0];
            loader.classList.remove('loader');
            loader.classList.add('loaded');
         });
    })

    getAreas().then(urbanAreas => {
        const dUrbanAreas = [];
        for (let i = 0; i < urbanAreas.length; i++) {
            let obj = Object.assign({}, urbanAreas[i]);
            let scores = obj.scoresArr;
            let newScores = [];

            for (let j = 0; j < scores.length; j++) {
                let scoreObj = Object.assign({}, scores[j]);
                let prevScores = scores.slice(0, j);
                let sum = 0;
                prevScores.forEach(e => {
                    sum = sum + e.score_out_of_10 * 5;
                })
                scoreObj['startHeight'] = sum;

                newScores.push(scoreObj);
            }
            obj['scoresArr'] = newScores;
            dUrbanAreas.push(obj);
        }
        // debugger
        var selection = svg.selectAll(".series")
            .data(dUrbanAreas)
            .enter().append("g")
            .attr('class', function (d) { return `series ${d.name}`; })
            .attr("transform", function (d, i) {
                return "translate(" + i * 30 + ",0)";
            })
            .text(function (d) { return d.name });

        selection.selectAll("rect")
            .data(function (d) { return d.scoresArr; })
            .enter().append("rect")
            .attr('id', function (s) { return s.name })
            .attr("width", 20)
            .attr("y", function (s) { return s.startHeight })
            .attr("height", function (s) { return s.score_out_of_10 * 5; })
            .style("fill", function (s) { return s.color });

        const loader = document.getElementsByClassName('loader')[0];
        loader.classList.remove('loader');
        loader.classList.add('loaded');
    });
})

