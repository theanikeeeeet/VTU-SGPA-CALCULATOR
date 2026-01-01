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
    if (!subjects || subjects.length === 0) {
        return <div style={{ textAlign: 'center', color: '#6c6e8a' }}>No data to display</div>;
    }

    const labels = subjects.map((s) => s.code || '—');
    const marks = subjects.map((s) => {
        const m = parseFloat(s.marks);
        return Number.isFinite(m) ? m : 0;
    });
    const credits = subjects.map((s) => {
        const c = parseFloat(s.credits);
        return Number.isFinite(c) ? c : 0;
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Marks",
                data: marks,
                backgroundColor: "rgba(37, 99, 235, 0.8)"
            },
            {
                label: "Credits",
                data: credits,
                backgroundColor: "rgba(99, 102, 241, 0.6)"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Subject Marks vs Credits"
            }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div style={{ width: '100%', height: 260 }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default Charts;
