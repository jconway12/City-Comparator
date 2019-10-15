import './styles/index.scss';

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerText = "hey ya";

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