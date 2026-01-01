const sem1_2022 = [
    { code: "BMATS101", name: "Mathematics-I", credits: 4 },
    { code: "BPHYS102", name: "Applied Physics", credits: 4 },
    { code: "BPOPS103", name: "Principles of Programming Using C", credits: 3 },
    { code: "BESCK104x", name: "Engineering Science Course-I", credits: 3 },
    { code: "BETCK105x", name: "Emerging Technology Course-I / PLC-I", credits: 3 },
    { code: "BPWSK106", name: "Professional Writing Skills", credits: 1 },
    { code: "BENGK106", name: "Communicative English", credits: 1 },
    { code: "BICOK107", name: "Indian Constitution / Languages / Culture", credits: 1 },
    { code: "BIDTK158", name: "Innovation & Design Thinking / Scientific Foundations of Health", credits: 1 }
];

const sem2_2022 = [
    { code: "BMATS201", name: "Mathematics-II", credits: 4 },
    { code: "BPHYS202", name: "Applied Physics", credits: 4 },
    { code: "BPOPS203", name: "Principles of Programming Using C", credits: 3 },
    { code: "BESCK204x", name: "Engineering Science Course-II", credits: 3 },
    { code: "BPLCK205x", name: "Programming Language Course-II / EDC-II", credits: 3 },
    { code: "BENGK206", name: "English Communication / Prof. Writing Skills", credits: 1 },
    { code: "BKSKK207", name: "Kannada / Samskrutika Kannada / Indian Constitution", credits: 1 },
    { code: "BIDTK258", name: "Innovation & Design Thinking / Scientific Foundations of Health", credits: 1 }
];


// Third semester subjects — 2022 (verified common CS related) :contentReference[oaicite:3]{index=3}
const sem3_2022 = [
    { code: "BCS301", name: "Mathematics for Computer Science", credits: 4 },
    { code: "BCS302", name: "Digital Design and Computer Organization", credits: 4 },
    { code: "BCS303", name: "Operating Systems", credits: 4 },
    { code: "BCS304", name: "Data Structures and Applications", credits: 3 },
    { code: "BCSL305", name: "Data Structures Lab", credits: 1 },
    { code: "BCS306A", name: "Object Oriented Programming with Java", credits: 3 },
    { code: "BCS358A", name: "Data Analytics with Excel", credits: 3 },
    { code: "BSCK307", name: "Social Connect & Responsibility", credits: 1 }
];

// Fourth semester subjects — 2022 (common CS related) :contentReference[oaicite:4]{index=4}
const sem4_2022 = [
    { code: "BCS401", name: "Analysis & Design of Algorithms", credits: 3 },
    { code: "BCS402", name: "Microcontrollers", credits: 3 },
    { code: "BCS403", name: "Database Management Systems", credits: 3 },
    { code: "BCSL404", name: "DBMS/Algorithms Lab", credits: 1 },
    { code: "BBOC407", name: "Biology for Computer Engineers", credits: 2 },
    { code: "BUHK408", name: "Universal Human Values", credits: 1 },
    { code: "BCS456A", name: "Green IT and Sustainability", credits: 3 }
];

// Fifth semester subjects — 2022 (common CS related) :contentReference[oaicite:5]{index=5}
const sem5_2022 = [
    { code: "BCS501", name: "Software Engineering & Project Management", credits: 4 },
    { code: "BCS502", name: "Computer Networks", credits: 4 },
    { code: "BCS503", name: "Theory of Computation", credits: 4 },
    { code: "BCSL504", name: "Web Technology Lab", credits: 1 },
    { code: "BRMK557", name: "Research Management Course", credits: 3 },
    { code: "BCS515", name: "Professional Elective Course", credits: 3 },
    { code: "BCS586", name: "Mini Project", credits: 2 },
    { code: "BCS508", name: "Environmental Studies & E-Waste Management", credits: 1 }
];


// Create the full JSON mapping for 2022 scheme
const vtuSubjects = {
    "2022": {
        "CSE": {
            "1": sem1_2022,
            "2": sem2_2022,
            "3": sem3_2022,
            "4": sem4_2022,
            "5": sem5_2022
        },
        "CSDS": {
            "1": sem1_2022,
            "2": sem2_2022,
            "3": sem3_2022,
            "4": sem4_2022,
            "5": sem5_2022
        },
        "ISE": {
            "1": sem1_2022,
            "2": sem2_2022,
            "3": sem3_2022,
            "4": sem4_2022,
            "5": sem5_2022
        },
        "CS": {
            "1": sem1_2022,
            "2": sem2_2022,
            "3": sem3_2022,
            "4": sem4_2022,
            "5": sem5_2022
        },
        "AIML": {
            "1": sem1_2022,
            "2": sem2_2022,
            "3": sem3_2022,
            "4": sem4_2022,
            "5": sem5_2022
        }
    }
};

export default vtuSubjects;
