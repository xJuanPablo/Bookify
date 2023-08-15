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
    x: '50%',
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
window.addEventListener("load", function () {
    const getChartOptions = () => {
        return {
            series: [90, 85, 70],
            colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
            chart: {
                height: "380px",
                width: "100%",
                type: "radialBar",
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    track: {
                        background: '#E5E7EB',
                    },
                    dataLabels: {
                        show: false,
                    },
                    hollow: {
                        margin: 0,
                        size: "32%",
                    }
                },
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -23,
                    bottom: -20,
                },
            },
            labels: ["Done", "In progress", "To do"],
            legend: {
                show: true,
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                labels: {
                    formatter: function (value) {
                        return value + '%';
                    }
                }
            }
        }
    }

    if (document.getElementById("radial-chart") && typeof ApexCharts !== 'undefined') {
        var chart = new ApexCharts(document.querySelector("#radial-chart"), getChartOptions());
        chart.render();
    }
});
//==============================================================
