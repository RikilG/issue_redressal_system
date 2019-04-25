import React, { Component } from "react";
import './Dashboard.css';
import { Doughnut, Line } from 'react-chartjs-2';
import loadingIcon from '../../Assets/loading.gif';
import moment from 'moment';

//sent as data in props
const doughnutData = {
    labels: ['Red', 'Green', 'Yellow'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            // hoverBackgroundColor: [ '#202020', '#36A2EB', '#FFCE56' ]
        }
    ]
}

const lineData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            // fill: false,
            fill: "start",
            lineTension: 0.3, //lower the pointier.
            backgroundColor: 'rgba(45,152,255,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
}

const lineData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            // fill: false,
            fill: "start",
            lineTension: 0.3, //lower the pointier.
            backgroundColor: 'rgba(45,152,255,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
}

const lineData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            // fill: false,
            fill: "start",
            lineTension: 0.3, //lower the pointier.
            backgroundColor: 'rgba(45,152,255,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
}

const lineData4 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            // fill: false,
            fill: "start",
            lineTension: 0.3, //lower the pointier.
            backgroundColor: 'rgba(45,152,255,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
}

const lineData5 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            // fill: false,
            fill: "start",
            lineTension: 0.3, //lower the pointier.
            backgroundColor: 'rgba(45,152,255,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
}
const dlineData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    datasets: [
        {
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            borderWidth: 1.5,
            data: [100, 200, 30, 400, 50, 600, 700, 800, 90, 1000, 1100, 102, 1310, 104, 1510, 106, 1701, 180, 1901, 2100, 210, 202, 203, 240, 250, 260, 207, 2080, 290],
            fill: "start",
            label: "Current Month",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            pointHoverRadius: 13,
            pointRadius: 0,
        },
        {
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgba(255,65,105,1)",
            borderDash: [3, 3],
            borderWidth: 1,
            data: [100, 20, 300, 400, 500, 60, 200, 80, 90, 100, 1012, 132, 113, 140, 1250, 135, 173, 1800, 190, 220, 211, 122, 23, 1204, 125, 26, 207, 280, 209],
            fill: "start",
            label: "Past Month",
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(255,65,105,1)",
            pointHoverBackgroundColor: "rgba(255,65,105,1)",
            pointHoverRadius: 12,
            pointRadius: 0,
        }
    ],
}
// can be sent as props
const legend = {
    display: false,
    position: "top",
    fullWidth: true,
    reverse: false,
    labels: {
        fontColor: "rgb(255, 99, 132)"
    },
}

const options = {
    legend: {
        // onClick: onClick(),
        // onHover: onHover(),
    },
    scales: {
        xAxes: [{
            // ticks: {
            //     display: false //this will remove only the label
            // }
            display: false,
        }],
        yAxes: [{
            // ticks: {
            //     display: false //this will remove only the label
            // }
            display: false,
        }],
    },
    responsive: true,
    maintainAspectRatio: false,
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            noc: null,
            noi: null,
            nof: null,
            noo: null,
            numval1: [],
            numval2: [],
            numval3: [],
            numval4: [],
            numval5: [],
            dates: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        /*let tempdate = new Date();
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        if (month == 1) {
            month = 12;
            year = year - 1;
        }
        else {
            month = month - 1;
        }
        let date = new Date(year + "-" + month + "-18");
        fetch('/dashboard2', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: date
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    numb: data.num
                });
            })*/

        let arr = [];
        for (let i = 0; i < 7; ++i) {
            arr[i] = new Date(moment().subtract((7 * i), 'days'));
        }
        let numb1 = [];
        let numb2 = [];
        let numb3 = [];
        let numb4 = [];
        let numb5 = [];
        let numb6 = [];
        let date = [];
        for (let i = 0; i < 6; ++i) {
            fetch('/dashboard3', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date1: arr[i],
                    date2: arr[i + 1]
                })
            })
                .then(res => res.json())
                .then(data => {
                    numb1[5 - i] = data.num1;
                    numb2[5 - i] = data.num2;
                    numb3[5 - i] = data.num3;
                    numb4[5 - i] = data.num4;
                    numb5[5 - i] = data.num5;
                    numb6[5 - i] = data.num6;
                })
        }
        for (let i = 0; i < 6; ++i) {
            let year = arr[i].getFullYear();
            let month = arr[i].getMonth() + 1;
            let day = arr[i].getDate();
            date[i] = new String(day + "-" + month + "-" + year);
        }
        this.setState({ numval1: numb1, numval2: numb2, numval3: numb3, numval4: numb4, numval5: numb5, numval6: numb6, dates: date.reverse() }, () => {
            lineData1.labels = this.state.dates;
            lineData2.labels = this.state.dates;
            lineData3.labels = this.state.dates;
            lineData4.labels = this.state.dates;
            lineData5.labels = this.state.dates;

            dlineData.labels = this.state.dates;
            dlineData.datasets[0].data = this.state.numval1;
            dlineData.datasets[1].data = this.state.numval2;

            lineData1.datasets[0].data = this.state.numval1;
            lineData2.datasets[0].data = this.state.numval3;
            lineData3.datasets[0].data = this.state.numval4;
            lineData4.datasets[0].data = this.state.numval5;
            lineData5.datasets[0].data = this.state.numval6;
        });

        fetch('/dashboard', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "admin@issueredressal"
            })
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    noc: data.noc,
                    noi: data.noi,
                    nof: data.nof,
                    noo: data.noo,
                });
            })
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        let { noc, noi, nof, noo } = this.state;

        return (
            <div className="dashRoot">
                <div id="dashHeader">
                    <h2 style={{ display: "inline" }}>Dashboard</h2>
                    {(this.state.loading) ? <img alt="loading..." src={loadingIcon} style={{ width: "2.6em", height: "2.6em", float: "right", margin: "1em" }} /> : null}
                </div>
                <div id="dashStats">
                    <div className="dashStatsCard">
                        <div className="vcenter">
                            <h3>Issues</h3>
                            <h3>{noi}</h3>
                        </div>
                        <Line data={lineData1} legend={legend} options={options} />
                    </div>
                    <div className="dashStatsCard">
                        <div className="vcenter">
                            <h3>Customers</h3>
                            <h3>{noc}</h3>
                        </div>
                        <Line data={lineData2} legend={legend} options={options} />
                    </div>
                    <div className="dashStatsCard">
                        <div className="vcenter">
                            <h3>Freelancers</h3>
                            <h3>{nof}</h3>
                        </div>
                        <Line data={lineData3} legend={legend} options={options} />
                    </div>
                    <div className="dashStatsCard">
                        <div className="vcenter">
                            <h3>Organizations</h3>
                            <h3>{noo}</h3>
                        </div>
                        <Line data={lineData4} legend={legend} options={options} />
                    </div>
                    <div className="dashStatsCard">
                        <div className="vcenter">
                            <h3>Comments</h3>
                            <h3>(Number)</h3>
                        </div>
                        <Line data={lineData5} legend={legend} options={options} />
                    </div>
                </div>
                <div id="dashStats">
                    <div className="dashGraphCard flx-lg"><Line data={dlineData} /></div>
                    <div className="dashGraphCard flx-sm"><Doughnut data={doughnutData} options={options} /></div>
                </div>
            </div>
        );
    }
}

export default Dashboard;