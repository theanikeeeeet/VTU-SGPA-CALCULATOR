import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Charts from "./components/Charts.js";
import SubjectRow from "./components/SubjectRow.js";
import "./App.css";
import vtuSubjects from "./data/vtuSubjects";

const getGradePoint = (marks) => {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 45) return 5;
  if (marks >= 40) return 4;
  return 0;
};

function App() {
  const [activeTab, setActiveTab] = useState("sgpa");
  const [scheme, setScheme] = useState("2022");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1");
  const [subjects, setSubjects] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const list =
      vtuSubjects[scheme] &&
        vtuSubjects[scheme][branch] &&
        vtuSubjects[scheme][branch][semester]
        ? vtuSubjects[scheme][branch][semester]
        : [];

    setSubjects(list.map((s) => ({ ...s, marks: "" })));
    setResult("");
  }, [scheme, branch, semester]);

  const handleMarks = (idx, val) => {
    const updated = [...subjects];
    updated[idx].marks = val;
    setSubjects(updated);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedPoints = 0;
    let hasValid = false;

    subjects.forEach((s) => {
      const mk = Number(s.marks);
      const cr = Number(s.credits);
      if (Number.isFinite(mk) && Number.isFinite(cr) && mk >= 0 && mk <= 100) {
        hasValid = true;
        totalCredits += cr;
        weightedPoints += getGradePoint(mk) * cr;
      }
    });

    if (!hasValid || totalCredits <= 0) {
      setResult('Please enter at least one valid mark (0–100) to calculate SGPA.');
      return;
    }

    const sgpa = Math.round((weightedPoints / totalCredits) * 100) / 100;
    setResult(`SGPA: ${sgpa.toFixed(2)}`);
  };

  const addSemester = () => {
    if (!result || typeof result !== 'string' || !result.startsWith('SGPA')) {
      alert('Calculate SGPA before saving!');
      return;
    }
    const sgpaValue = parseFloat(result.replace('SGPA: ', '')) || 0;
    const totalCredits = subjects.reduce((a, s) => {
      const c = Number(s.credits);
      return a + (Number.isFinite(c) ? c : 0);
    }, 0);
    setAllSemesters([
      ...allSemesters,
      { semester, sgpa: Number(sgpaValue.toFixed(2)), credits: totalCredits },
    ]);
  };

  const calculateCGPA = () => {
    if (!allSemesters || allSemesters.length === 0) {
      setResult('Add at least one semester first!');
      return;
    }
    let totalCr = 0;
    let weightedSum = 0;
    allSemesters.forEach((sem) => {
      const c = Number(sem.credits);
      const s = Number(sem.sgpa);
      if (Number.isFinite(c) && Number.isFinite(s)) {
        totalCr += c;
        weightedSum += s * c;
      }
    });
    if (totalCr === 0) {
      setResult('No credit information found for semesters.');
      return;
    }
    const cgpa = Math.round((weightedSum / totalCr) * 100) / 100;
    setResult(`CGPA: ${cgpa.toFixed(2)}`);
  };

  const exportToPDF = async () => {
    try {
      const exportNode = document.getElementById('export-area');
      if (!exportNode) {
        alert('Nothing to export!');
        return;
      }
      const canvas = await html2canvas(exportNode, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('VTU-GradeFlow-Report.pdf');
    } catch (err) {
      // console.error(err);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="App">

      {/* Header */}
      <header>VTU GradeFlow</header>

      {/* ============================= */}
      {/* VTU Official Result Button */}
      {/* ============================= */}
      <div className="vturesult-button">
        <button
          onClick={() =>
            window.open(
              "https://results.vtu.ac.in/",
              "_blank"
            )
          }
        >
          Check VTU Official Result
        </button>
      </div>

      {/* ===== Tabs Centered ===== */}
      <div className="tabs-container">
        <div className="selector-tabs">
          <div
            className={`selector-tab ${activeTab === "sgpa" ? "active" : ""
              }`}
            onClick={() => setActiveTab("sgpa")}
          >
            SGPA Calculator
          </div>

          <div
            className={`selector-tab ${activeTab === "cgpa" ? "active" : ""
              }`}
            onClick={() => setActiveTab("cgpa")}
          >
            CGPA Calculator
          </div>

          <div
            className={`selector-tab ${activeTab === "grade" ? "active" : ""
              }`}
            onClick={() => setActiveTab("grade")}
          >
            Grade Predictor
          </div>
        </div>
      </div>

      {/* ===== Main Card ===== */}
      <div className="card-main">
        <AnimatePresence exitBeforeEnter>

          {/* SGPA Tab */}
          {activeTab === "sgpa" && (
            <motion.div
              key="sgpa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* Charts preview */}
              <div style={{ margin: "1rem 0" }}>
                <Charts subjects={subjects} />
              </div>

              <div className="form-group">
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                >
                  {Object.keys(vtuSubjects).map((sch) => (
                    <option key={sch} value={sch}>
                      {sch}
                    </option>
                  ))}
                </select>

                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {Object.keys(vtuSubjects[scheme] || {}).map(
                    (b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  {Object.keys(
                    vtuSubjects[scheme]?.[branch] || {}
                  ).map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              {subjects.map((sub, idx) => (
                <SubjectRow key={`${sub.code}-${idx}`} subject={sub} index={idx} onChange={handleMarks} />
              ))}

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={calculateSGPA} disabled={!subjects.some(s => { const m = parseFloat(s.marks); return Number.isFinite(m) && m >= 0 && m <= 100; })}>
                  Calculate SGPA
                </button>
                <button onClick={addSemester} disabled={!result.toString().startsWith('SGPA')}>
                  Save Semester
                </button>
                <button onClick={exportToPDF}>
                  Export Result
                </button>
              </div>
              <div style={{ marginTop: '6px', textAlign: 'center', color: '#6c6e8a', fontSize: 13 }}>
                <em>Enter valid marks (0–100). Empty fields are ignored.</em>
              </div>

              <div className="result-box">{result}</div>
            </motion.div>
          )}

          {/* CGPA Tab */}
          {activeTab === "cgpa" && (
            <motion.div
              key="cgpa"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {allSemesters.length === 0 ? (
                <div className="result-box">
                  Add SGPA first!
                </div>
              ) : (
                <>
                  <div className="sem-list">
                    {allSemesters.map((sem, i) => (
                      <div key={i}>
                        Sem {sem.semester}: SGPA {sem.sgpa}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{ textAlign: "center", marginTop: "1rem" }}
                  >
                    <button onClick={calculateCGPA}>
                      Calculate CGPA
                    </button>
                    <button onClick={exportToPDF}>
                      Export Result
                    </button>
                  </div>

                  <div className="result-box">{result}</div>
                </>
              )}
            </motion.div>
          )}

          {/* Grade Predictor */}
          {activeTab === "grade" && (
            <motion.div
              key="grade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="result-box">
                Grade Predictor Coming Soon!
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ===== Hidden Export Area ===== */}
      <div
        id="export-area"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <div style={{ width: "800px", padding: "20px", textAlign: "center" }}>
          <h2>VTU GradeFlow Report</h2>

          {activeTab === "sgpa" && (
            <>
              <h3>{result}</h3>
              <p style={{ fontWeight: "600" }}>
                Semester: {semester}
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #444", padding: "8px" }}>
                      Subject
                    </th>
                    <th style={{ border: "1px solid #444", padding: "8px" }}>
                      Marks
                    </th>
                    <th style={{ border: "1px solid #444", padding: "8px" }}>
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((s, idx) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid #444", padding: "6px" }}>
                        {s.code} — {s.name}
                      </td>
                      <td style={{ border: "1px solid #444", padding: "6px" }}>
                        {s.marks || "-"}
                      </td>
                      <td style={{ border: "1px solid #444", padding: "6px" }}>
                        {s.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === "cgpa" && (
            <>
              <h3>{result}</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #444", padding: "8px" }}>
                      Semester
                    </th>
                    <th style={{ border: "1px solid #444", padding: "8px" }}>
                      SGPA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSemesters.map((sem, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid #444", padding: "6px" }}>
                        {sem.semester}
                      </td>
                      <td style={{ border: "1px solid #444", padding: "6px" }}>
                        {sem.sgpa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
