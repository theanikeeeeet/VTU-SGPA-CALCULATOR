import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

const SubjectRow = ({ subject, index, onChange }) => {
    const [value, setValue] = useState(subject.marks || '');
    const [error, setError] = useState('');

    useEffect(() => {
        setValue(subject.marks || '');
    }, [subject.marks]);

    const handleChange = (raw) => {
        // allow empty, else numeric
        if (raw === '' || raw === null) {
            setValue('');
            setError('');
            onChange(index, '');
            return;
        }
        const v = Number(raw);
        if (!Number.isFinite(v)) {
            setError('Invalid number');
            setValue(raw);
            onChange(index, raw);
            return;
        }
        const nv = clamp(v, 0, 100);
        setValue(nv);
        setError('');
        onChange(index, nv);
    };

    return (
        <div className="subject-row" style={{ alignItems: 'center' }}>
            <div className="sub-info">{subject.code} — {subject.name} ({subject.credits} cr)</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <input
                    type="number"
                    placeholder="Marks"
                    value={value}
                    min={0}
                    max={100}
                    onChange={(e) => handleChange(e.target.value)}
                    style={{ width: 110 }}
                />
                {error && <div style={{ color: '#dc2626', fontSize: 12 }}>{error}</div>}
            </div>
        </div>
    );
};

SubjectRow.propTypes = {
    subject: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SubjectRow;
