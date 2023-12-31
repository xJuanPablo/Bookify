// .content container animation w/ GSAP node package
const items = document.querySelectorAll('.content');
const text = "Bookify";
const element = document.getElementById("myElement");

// splits text into individ chars
const chars = text.split("");

// sets x-axis at -100% or off the screen to the left
gsap.set(items, { x: '-100%' });

// animates container box into view
gsap.to(items, {
    duration: 4,
    x: 0,
    y: '25%',
    opacity: 1,
    stagger: 0.1,
    ease: 'power2.out',
    onComplete: function () {
        console.log('Animation Completed!');

        // animates invidid chars
        chars.forEach((char, index) => {
            const charSpan = document.createElement("span");
            charSpan.textContent = char;
            charSpan.style.opacity = 0;
            element.appendChild(charSpan);

            gsap.to(charSpan, {
                duration: 0.5,
                opacity: 1,
                delay: index * 0.1,
            });
        });
    }
});
//===========================================================
// doughtnut chart on homepage.hbs
// used apex charts with help from flowbite
// window.addEventListener("load", function () {
//     const getChartOptions = () => {
//         return {
//             series: [90, 85, 70],
//             colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
//             chart: {
//                 height: "380px",
//                 width: "100%",
//                 type: "radialBar",
//                 sparkline: {
//                     enabled: true,
//                 },
//             },
//             plotOptions: {
//                 radialBar: {
//                     track: {
//                         background: '#E5E7EB',
//                     },
//                     dataLabels: {
//                         show: false,
//                     },
//                     hollow: {
//                         margin: 0,
//                         size: "32%",
//                     }
//                 },
//             },
//             grid: {
//                 show: false,
//                 strokeDashArray: 4,
//                 padding: {
//                     left: 2,
//                     right: 2,
//                     top: -23,
//                     bottom: -20,
//                 },
//             },
//             labels: ["Books to read", "Pages per day", "Books finished"],
//             legend: {
//                 show: true,
//                 position: "bottom",
//                 fontFamily: "Inter, sans-serif",
//                 colors: "#FFFFFF",
//             },
//             tooltip: {
//                 enabled: true,
//                 x: {
//                     show: false,
//                 },
//             },
//             yaxis: {
//                 show: false,
//                 labels: {
//                     formatter: function (value) {
//                         return value + '%';
//                     }
//                 }
//             }
//         }
//     }

//     if (document.getElementById("radial-chart") && typeof ApexCharts !== 'undefined') {
//         var chart = new ApexCharts(document.querySelector("#radial-chart"), getChartOptions());
//         chart.render();
//     }
// });
// //==============================================================
// // ApexCharts options and config
// window.addEventListener("load", function () {
//     const getChartOptions = () => {
//         return {
//             series: [52.8, 26.8, 20.4],
//             colors: ["#1C64F2", "#16BDCA", "#9061F9"],
//             chart: {
//                 height: 420,
//                 width: "100%",
//                 type: "pie",
//             },
//             stroke: {
//                 colors: ["white"],
//                 lineCap: "",
//             },
//             plotOptions: {
//                 pie: {
//                     labels: {
//                         show: true,
//                     },
//                     size: "100%",
//                     dataLabels: {
//                         offset: -25
//                     }
//                 },
//             },
//             labels: ["Thriller", "Romance", "Science Fiction"],
//             dataLabels: {
//                 enabled: true,
//                 style: {
//                     fontFamily: "Inter, sans-serif",
//                 },
//             },
//             legend: {
//                 position: "bottom",
//                 fontFamily: "Inter, sans-serif",
//             },
//             yaxis: {
//                 labels: {
//                     formatter: function (value) {
//                         return value + "%"
//                     },
//                 },
//             },
//             xaxis: {
//                 labels: {
//                     formatter: function (value) {
//                         return value + "%"
//                     },
//                 },
//                 axisTicks: {
//                     show: false,
//                 },
//                 axisBorder: {
//                     show: false,
//                 },
//             },
//         }
//     }

//     if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
//         const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
//         chart.render();
//     }
// });
// //===================================================================
// // ApexCharts options and config
// window.addEventListener("load", function () {
//     let options = {
//         // set grid lines to improve the readabilit of the chart, learn more here: https://apexcharts.com/docs/grid/
//         grid: {
//             show: true,
//             strokeDashArray: 4,
//             padding: {
//                 left: 2,
//                 right: 2,
//                 top: -26
//             },
//         },
//         series: [
//             {
//                 name: "Average performance",
//                 data: [50, 41, 45, 52, 35, 25],
//                 color: "#FF0000",
//             },
//             {
//                 name: "Excellent performance",
//                 data: [74, 61, 76, 51, 82, 93],
//                 color: "#00FF00",
//             },
//         ],
//         chart: {
//             height: "90%",
//             maxWidth: "100%",
//             type: "area",
//             fontFamily: "Inter, sans-serif",
//             dropShadow: {
//                 enabled: false,
//             },
//             toolbar: {
//                 show: false,
//             },
//         },
//         tooltip: {
//             enabled: true,
//             x: {
//                 show: false,
//             },
//         },
//         legend: {
//             show: true
//         },
//         fill: {
//             type: "gradient",
//             gradient: {
//                 opacityFrom: 0.55,
//                 opacityTo: 0,
//                 shade: "#1C64F2",
//                 gradientToColors: ["#1C64F2"],
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             width: 6,
//         },
//         xaxis: {
//             categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
//             labels: {
//                 show: false,
//             },
//             axisBorder: {
//                 show: false,
//             },
//             axisTicks: {
//                 show: false,
//             },
//         },
//         yaxis: {
//             show: false,
//             labels: {
//                 formatter: function (value) {
//                     return '$' + value;
//                 }
//             }
//         },
//     }

//     if (document.getElementById("grid-chart") && typeof ApexCharts !== 'undefined') {
//         const chart = new ApexCharts(document.getElementById("grid-chart"), options);
//         chart.render();
//     }
// });

// //=====================