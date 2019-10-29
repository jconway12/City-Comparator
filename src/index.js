import './styles/index.scss';
import {getCountriesXML, getStatesXML, getCitiesXML, getStationsXML, getStationInfoXML} from './scripts/air_data';
import {getUrbanAreasXML} from './scripts/life_data';
import {getAreas} from './scripts/life_data_main';
import {sortBestToWorst, sortWorstToBest} from './scripts/sorting';


window.addEventListener('DOMContentLoaded', () => {
    const inputDivs = document.getElementsByClassName('input-div');
    for(let i = 0; i < inputDivs.length; i++) {
        const slide = inputDivs[i].childNodes[2];
        const minVal = slide.value;
        const label = document.createTextNode(`Min: ${minVal}`);
        const labelDiv = document.createElement("div");
        labelDiv.appendChild(label);
        inputDivs[i].appendChild(labelDiv);

        inputDivs[i].addEventListener('mousemove', e => {
            const slide = e.currentTarget.childNodes[2];
            const minVal = slide.value;
            const labelD = e.currentTarget.childNodes[3];
            labelD.innerHTML = "";
            const newText = document.createTextNode(`Min: ${minVal}`);
            labelD.appendChild(newText);
            e.currentTarget.appendChild(labelD);
        })
    }

    document.getElementById('to-git').addEventListener('click', e => {
        window.location.href = "https://github.com/jconway12/City-Comparator";
    })

    document.getElementById('to-link').addEventListener('click', e => {
        window.location.href = "https://www.linkedin.com/in/jesse-conway-35120815b/";
    })

    document.getElementById('to-angel').addEventListener('click', e => {
        window.location.href = "https://angel.co/jessica-conway-1";
    })

    const root = document.getElementById('app');
    var svg = d3.select("#svg-container")
        .append("svg")
        .attr("class", "svg")
        .attr("width", 8010)
        .attr("height", 980)
        .attr("fill", "white");

    const input = document.getElementById('toggle-button');
    const formObj = {};
    const sliderObj = {};

    getAreas().then(urbanAreas => {
            const loader = document.getElementsByClassName('loader')[0];
            loader.classList.remove('loader');
            loader.classList.add('loaded');

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
            .text(function (d) { return d.name })
            .on('mouseover', e => {
                const tooltip = document.getElementById("tooltip");
                tooltip.innerHTML = "";
                // tooltip.setAttribute('style', `height: 500px; width: 100px;`);

                const city = e.name;
                const scores = e.scoresArr;
                const newDiv = document.createElement("div");
                const newContent = document.createTextNode(`${city}`);
                newDiv.appendChild(newContent);
                tooltip.appendChild(newDiv);

                const newUl = document.createElement("ul");
                for (let i = 0; i < scores.length; i++) {
                    const newLi = document.createElement('li');
                    const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                    const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                    newLi.appendChild(listItem)
                    newUl.appendChild(newLi);
                }
                tooltip.appendChild(newUl);
            });

        selection.selectAll("rect")
            .data(function (d) { return d.scoresArr; })
            .enter().append("rect")
            .attr('id', function (s) { return s.name })
            .attr("width", 20)
            .attr("y", function (s) { return s.startHeight })
            .attr("height", function (s) { return s.score_out_of_10 * 5; })
            .style("fill", function (s) { return s.color });

        document.getElementById('search-button').addEventListener('click', (e) => {
            const search = document.getElementById('search-bar');
            const value = search.value;
            const dropdown = document.getElementById('search-dropdown');
            dropdown.innerHTML = "";
            const inputDivs = document.getElementsByClassName('input-div');

            for (let i = 0; i < inputDivs.length; i++) {
                const check = inputDivs[i].childNodes[0];
                const slide = inputDivs[i].childNodes[2];
                check.checked = true;
                slide.value = "0";
            }

            const dUrbanAreas = [];
            for (let i = 0; i < urbanAreas.length; i++) {
                let obj = Object.assign({}, urbanAreas[i]);
                let scores = obj.scoresArr;
                let newScores = [];

                if (obj.name === value || value === "") {
                    for (let j = 0; j < scores.length; j++) {
                      let scoreObj = Object.assign({}, scores[j]);
                      let prevScores = newScores.slice(0, j);
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
            }

            // debugger
            svg.selectAll('rect').remove();
            var selection2 = svg.selectAll(".series2")
                .data(dUrbanAreas)
                .enter().append("g")
                .attr('class', function (d) { return `series ${d.name}`; })
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name });

                const sideBar = document.getElementById('single-bar');
                sideBar.innerHTML = "";
                sideBar.setAttribute('style', `height: 380px;`);

                    const city = dUrbanAreas[0].name;
                    const scores = dUrbanAreas[0].scoresArr;
                    // debugger
                    const newDiv = document.createElement("div");
                    const newContent = document.createTextNode(`${city}`);
                    newDiv.appendChild(newContent);
                    sideBar.appendChild(newDiv);
                    // debugger
                    const newUl = document.createElement("ul");
                    for (let i = 0; i < scores.length; i++) {
                        // debugger
                        const newLi = document.createElement('li');
                        const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                        const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                        newLi.appendChild(listItem)
                        newUl.appendChild(newLi);
                    }
                    sideBar.appendChild(newUl);

            selection2.selectAll("rect")
                .data(function (d) { return d.scoresArr; })
                .enter().append("rect")
                .attr('id', function (s) { return s.name })
                .attr("width", 20)
                .attr("y", function (s) { return s.startHeight })
                .attr("height", function (s) { return s.score_out_of_10 * 5; })
                .style("fill", function (s) { return s.color });
        })

        input.addEventListener('click', (e) => {
            const inputs = document.getElementsByClassName('inputs');
            const sliders = document.getElementsByClassName('slider');
            for (let i = 0; i < inputs.length; i++) {
                formObj[inputs[i].value] = inputs[i].checked
            }
            for (let j = 0; j < sliders.length; j++) {
                sliderObj[sliders[j].id] = sliders[j].value;
            } //obj of minimum vals per score category
            // const loader = document.getElementsByClassName('loaded')[0];
            // loader.classList.remove('loaded');
            // loader.classList.add('loader');
            document.getElementById('single-bar').setAttribute('style', `height: 0;`);

            const dUrbanAreas = [];
            for (let i = 0; i < urbanAreas.length; i++) {
                let obj = Object.assign({}, urbanAreas[i]);
                let scores = obj.scoresArr;
                let exclude = false;
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

                    if (sliderObj[scoreObj.name] > scoreObj.score_out_of_10) {
                        exclude = true;
                    }
                    if (formObj[scoreObj.name] == false) {
                        scoreObj.score_out_of_10 = 0;
                    }

                    newScores.push(scoreObj);
                }
                obj['scoresArr'] = newScores;
                if (!exclude) {
                    dUrbanAreas.push(obj);
                }
            }
            // debugger
            svg.selectAll('rect').remove();
            var selection2 = svg.selectAll(".series2")
                .data(dUrbanAreas)
                .enter().append("g")
                .attr('class', function (d) { return `series ${d.name}`; })
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name })
                .on('mouseover', e => {
                    const tooltip = document.getElementById("tooltip");
                    tooltip.innerHTML = "";
                    // tooltip.setAttribute('style', `height: 500px; width: 100px;`);

                    const city = e.name;
                    const scores = e.scoresArr;
                    const newDiv = document.createElement("div");
                    const newContent = document.createTextNode(`${city}`);
                    newDiv.appendChild(newContent);
                    tooltip.appendChild(newDiv);

                    const newUl = document.createElement("ul");
                    for (let i = 0; i < scores.length; i++) {
                        if (scores[i].score_out_of_10 > 0) {
                            const newLi = document.createElement('li');
                            const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                            const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                            newLi.appendChild(listItem)
                            newUl.appendChild(newLi);
                        }
                    }
                    tooltip.appendChild(newUl);
                });

            selection2.selectAll("rect")
                .data(function (d) { return d.scoresArr; })
                .enter().append("rect")
                .attr('id', function (s) { return s.name })
                .attr("width", 20)
                .attr("y", function (s) { return s.startHeight })
                .attr("height", function (s) { return s.score_out_of_10 * 5; })
                .style("fill", function (s) { return s.color });

        })

        document.getElementById('all-cities').addEventListener('click', (e) => {
        const search = document.getElementById('search-bar');
        const dropdown = document.getElementById('search-dropdown');
        dropdown.innerHTML = "";
        search.value = "";
        document.getElementById('single-bar').setAttribute('style', `height: 0;`);
        const inputDivs = document.getElementsByClassName('input-div');
        for(let i = 0; i < inputDivs.length; i++) {
            const check = inputDivs[i].childNodes[0];
            const slide = inputDivs[i].childNodes[2];
            check.checked = true;
            slide.value = "0";
        }

            const dUrbanAreas = [];
            for (let i = 0; i < urbanAreas.length; i++) {
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
                .attr('class', function (d) { return `series ${d.name}`; })
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name })
                .on('mouseover', e => {
                    const tooltip = document.getElementById("tooltip");
                    tooltip.innerHTML = "";
                    // tooltip.setAttribute('style', `height: 500px; width: 100px;`);

                    const city = e.name;
                    const scores = e.scoresArr;
                    const newDiv = document.createElement("div");
                    const newContent = document.createTextNode(`${city}`);
                    newDiv.appendChild(newContent);
                    tooltip.appendChild(newDiv);

                    const newUl = document.createElement("ul");
                    for (let i = 0; i < scores.length; i++) {
                        const newLi = document.createElement('li');
                        const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                        const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                        newLi.appendChild(listItem)
                        newUl.appendChild(newLi);
                    }
                    tooltip.appendChild(newUl);
                });

            selection2.selectAll("rect")
                .data(function (d) { return d.scoresArr; })
                .enter().append("rect")
                .attr('id', function (s) { return s.name })
                .attr("width", 20)
                .attr("y", function (s) { return s.startHeight })
                .attr("height", function (s) { return s.score_out_of_10 * 5; })
                .style("fill", function (s) { return s.color });
        })

        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', e => {
            const dropdown = document.getElementById("search-dropdown");
            dropdown.innerHTML = "";
            document.getElementById('single-bar').setAttribute('style', `height: 0;`);

                const newDiv = document.createElement("div");
                dropdown.appendChild(newDiv);

                const ul = document.createElement('ul');
                const box = dropdown.childNodes[0];

                dUrbanAreas.forEach(area => {
                    const li = document.createElement('li');
                    const name = document.createTextNode(`${area.name}`);
                    li.appendChild(name);
                    if (area.name.includes(searchBar.value)) {
                        ul.appendChild(li);
                        li.addEventListener('click', e => {
                            searchBar.value = e.target.innerText;
                            dropdown.innerHTML = "";
                        })
                    }
                })
                box.appendChild(ul);
        })

        //add two event listeners for min to max, vice versa
        document.getElementById('best').addEventListener('click', (e) => {
            const inputDivs = document.getElementsByClassName('input-div');
            for (let i = 0; i < inputDivs.length; i++) {
                const check = inputDivs[i].childNodes[0];
                const slide = inputDivs[i].childNodes[2];
                check.checked = true;
                slide.value = "0";
            }

            let dUrbanAreas = [];
            for (let i = 0; i < urbanAreas.length; i++) {
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

                    newScores.push(scoreObj);
                }
                obj['scoresArr'] = newScores;
                dUrbanAreas.push(obj);
            }

            dUrbanAreas = sortBestToWorst(dUrbanAreas);
            // debugger
            svg.selectAll('rect').remove();
            var selection2 = svg.selectAll(".series2")
                .data(dUrbanAreas)
                .enter().append("g")
                .attr('class', function (d) { return `series ${d.name}`; })
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name })
                .on('mouseover', e => {
                    const tooltip = document.getElementById("tooltip");
                    tooltip.innerHTML = "";
                    // tooltip.setAttribute('style', `height: 500px; width: 100px;`);

                    const city = e.name;
                    const scores = e.scoresArr;
                    const newDiv = document.createElement("div");
                    const newContent = document.createTextNode(`${city}`);
                    newDiv.appendChild(newContent);
                    tooltip.appendChild(newDiv);

                    const newUl = document.createElement("ul");
                    for (let i = 0; i < scores.length; i++) {
                        const newLi = document.createElement('li');
                        const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                        const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                        newLi.appendChild(listItem)
                        newUl.appendChild(newLi);
                    }
                    tooltip.appendChild(newUl);
                });

            selection2.selectAll("rect")
                .data(function (d) { return d.scoresArr; })
                .enter().append("rect")
                .attr('id', function (s) { return s.name })
                .attr("width", 20)
                .attr("y", function (s) { return s.startHeight })
                .attr("height", function (s) { return s.score_out_of_10 * 5; })
                .style("fill", function (s) { return s.color });
        })

        document.getElementById('worst').addEventListener('click', (e) => {
            const inputDivs = document.getElementsByClassName('input-div');
            for (let i = 0; i < inputDivs.length; i++) {
                const check = inputDivs[i].childNodes[0];
                const slide = inputDivs[i].childNodes[2];
                check.checked = true;
                slide.value = "0";
            }

            let dUrbanAreas = [];
            for (let i = 0; i < urbanAreas.length; i++) {
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

                    newScores.push(scoreObj);
                }
                obj['scoresArr'] = newScores;
                dUrbanAreas.push(obj);
            }
            dUrbanAreas = sortWorstToBest(dUrbanAreas);
            // debugger
            svg.selectAll('rect').remove();
            var selection2 = svg.selectAll(".series2")
                .data(dUrbanAreas)
                .enter().append("g")
                .attr('class', function (d) { return `series ${d.name}`; })
                .attr("transform", function (d, i) {
                    return "translate(" + i * 30 + ",0)";
                })
                .text(function (d) { return d.name })
                .on('mouseover', e => {
                    const tooltip = document.getElementById("tooltip");
                    tooltip.innerHTML = "";
                    // tooltip.setAttribute('style', `height: 500px; width: 100px;`);

                    const city = e.name;
                    const scores = e.scoresArr;
                    const newDiv = document.createElement("div");
                    const newContent = document.createTextNode(`${city}`);
                    newDiv.appendChild(newContent);
                    tooltip.appendChild(newDiv);

                    const newUl = document.createElement("ul");
                    for (let i = 0; i < scores.length; i++) {
                        const newLi = document.createElement('li');
                        const score = Number(Math.round(scores[i].score_out_of_10 + 'e' + 2) + 'e-' + 2);
                        const listItem = document.createTextNode(`${scores[i].name}: ${score}`);
                        newLi.appendChild(listItem)
                        newUl.appendChild(newLi);
                    }
                    tooltip.appendChild(newUl);
                });

            selection2.selectAll("rect")
                .data(function (d) { return d.scoresArr; })
                .enter().append("rect")
                .attr('id', function (s) { return s.name })
                .attr("width", 20)
                .attr("y", function (s) { return s.startHeight })
                .attr("height", function (s) { return s.score_out_of_10 * 5; })
                .style("fill", function (s) { return s.color });
    })
    })

    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.setAttribute('style', `left: ${ e.clientX }px; top: ${e.clientY}px;`);
        if (e.clientX < 250 || e.clientY < 150) {
            tooltip.innerHTML = "";
        }
    })

    document.addEventListener('click', (e) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = "";
        const dropdown = document.getElementById("search-dropdown");
        dropdown.innerHTML = "";
    })

    const howTo = document.getElementById('info-link');
    howTo.addEventListener('click', e => {
        const infoPanel = document.getElementById('informational-dropdown');
        infoPanel.setAttribute('style', `height: ${550}px;`);
    })

    const close = document.getElementById('close');
    close.addEventListener('click', e => {
        const infoPanel = document.getElementById('informational-dropdown');
        infoPanel.setAttribute('style', `height: 0;`);
    })
})

