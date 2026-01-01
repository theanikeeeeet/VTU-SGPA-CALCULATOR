import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({ subjects }) => {
    const labels = subjects.map((s) => s.code);

    const data = {
        labels,
        datasets: [
            {
                label: "Marks",
                data: subjects.map((s) => parseFloat(s.marks) || 0),
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            },
            {
                label: "Credits",
                data: subjects.map((s) => parseFloat(s.credits) || 0),
                backgroundColor: "rgba(153, 102, 255, 0.6)"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Subject Marks vs Credits"
            }
        }
    };

    return <Bar options={options} data={data} />;
};

export default Charts;
