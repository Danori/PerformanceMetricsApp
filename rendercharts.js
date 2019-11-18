window.onload = () => { 
    let lowBeta_af3 = [];
    let highBeta_af3 = [];
    let alpha_af3 = [];
    let theta_af3 = [];
    let engagement_af3 = [];
    let fatigue_af3 = [];

    let lowBeta_af4 = [];
    let highBeta_af4 = [];
    let alpha_af4 = [];
    let theta_af4 = [];
    let engagement_af4 = [];
    let fatigue_af4 = [];

    let splineGraph_af3 = new CanvasJS.Chart("chartContainer_af3", {
        title: {
            text: "Performance Metrics - AF3"
        },
        axisX: {
            title: "Time (seconds)"
        },
        axisY: {
            title: "Spectral Power Density"
        },
        data: [{
            type: "spline",
            markerSize: 0,
            dataPoints: lowBeta_af3,
            name: "Low Beta",
            showInLegend: true
        }, 
        {
            type: "spline",
            markerSize: 0,
            dataPoints: highBeta_af3,
            name: "High Beta",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: alpha_af3,
            name: "Alpha",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: theta_af3,
            name: "Theta",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: engagement_af3,
            name: "Engagement",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: fatigue_af3,
            name: "Fatigue",
            showInLegend : true
        }]
    });

    let splineGraph_af4 = new CanvasJS.Chart("chartContainer_af4", {
        title: {
            text : "Performance Metrics - AF4"
        },
        axisX: {
            title : "Time (seconds)"
        },
        axisY: {
            title : "Spectral Power Density"
        },
        data: [{
            type: "spline",
            markerSize: 0,
            dataPoints: lowBeta_af4,
            name: "Low Beta",
            showInLegend: true
        }, 
        {
            type: "spline",
            markerSize: 0,
            dataPoints: highBeta_af4,
            name: "High Beta",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: alpha_af4,
            name: "Alpha",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: theta_af4,
            name: "Theta",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: engagement_af4,
            name: "Engagement",
            showInLegend: true
        },
        {
            type: "spline",
            markerSize: 0,
            dataPoints: fatigue_af4,
            name: "Fatigue",
            showInLegend: true
        }]
    });

    let time = -50;
    let updateInterval = 1000;
    let timeWindow = -time;

    updateCharts = (count) => {
        const socketUrl = "ws://localhost:8080";
        const ws = new WebSocket(socketUrl);

        ws.onopen = (evt) => {
            ws.send("Requesting brain data ... " + Date.now());
        };

        ws.onmessage = (evt) => {
            let data = JSON.parse(evt.data);

            count = count || 1;
            for (let j = 0; j < count; j++) {	
                theta_af3.push({
                    x: time,
                    y: data['pow'][0]
                });

                alpha_af3.push({
                    x: time,
                    y: data['pow'][1]
                });

                lowBeta_af3.push({
                    x: time,
                    y: data['pow'][2]
                });

                highBeta_af3.push({
                    x: time,
                    y: data['pow'][3]
                });

                engagement_af3.push({
                    x: time,
                    y: (data['pow'][3] / (data['pow'][1] + data['pow'][0]))
                })

                fatigue_af3.push({
                    x: time,
                    y: ((data['pow'][1] + data['pow'][0]) / data['pow'][2])
                })

                theta_af4.push({
                    x: time,
                    y: data['pow'][20]
                });

                alpha_af4.push({
                    x: time,
                    y: data['pow'][21]
                });

                lowBeta_af4.push({
                    x: time,
                    y: data['pow'][22]
                });

                highBeta_af4.push({
                    x: time,
                    y: data['pow'][23]
                });

                engagement_af4.push({
                    x: time,
                    y: (data['pow'][23] / (data['pow'][21] + data['pow'][20]))
                })

                fatigue_af4.push({
                    x: time,
                    y: ((data['pow'][21] + data['pow'][20]) / data['pow'][22])
                })

                time++;
            }

            
            if (lowBeta_af3.length > timeWindow) {
                lowBeta_af3.shift();
                highBeta_af3.shift();
                alpha_af3.shift();
                theta_af3.shift();
                engagement_af3.shift();
                fatigue_af3.shift();
                lowBeta_af4.shift();
                highBeta_af4.shift();
                alpha_af4.shift();
                theta_af4.shift();
                engagement_af4.shift();
                fatigue_af4.shift();
            }

            splineGraph_af3.render();
            splineGraph_af4.render();
        }
    }

    updateCharts(timeWindow); 
    setInterval(() => { 
        updateCharts();
    }, updateInterval); 
}