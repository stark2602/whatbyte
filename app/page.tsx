'use client';

import React, { useEffect, useState,useMemo } from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,ReferenceLine } from 'recharts';

// Data for Comparison Graph
const comparisonData = [
  { percentile: 0, value: 0 },
  { percentile: 10, value: 10 },
  { percentile: 20, value: 25 },
  { percentile: 30, value: 50 },
  { percentile: 40, value: 80 },
  { percentile: 50, value: 100 },
  { percentile: 60, value: 80 },
  { percentile: 70, value: 50 },
  { percentile: 80, value: 25 },
  { percentile: 90, value: 10 },
  { percentile: 100, value: 0 },
];

// Data for Question Analysis


const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    rank: 1,
    percentile: 30,
    score:10,
  });

  const [modalData, setModalData] = useState({
    rank: statistics.rank,
    percentile: statistics.percentile,
    score: statistics.score,
  });

  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUpdateClick = () => {
    setModalData({ ...statistics });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatistics({ ...modalData });
    setIsModalOpen(false);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
  
    // Ensure score is an integer
    const updatedValue = (name === 'percentile' || name === 'score') 
    ? parseInt(value, 10) 
    : value;
  
    setModalData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const questionAnalysisData = useMemo(() => [
    { name: 'Correct', value: statistics.score, color: '#2d6cdb' },
    { name: 'Incorrect', value: 15 - statistics.score, color: '#d9e1ed' },
  ], [statistics.score]);
  console.log(statistics);
  return (
    <div className="layout">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />
      <div className="navbar">
        <div className="logo">
          <img src="/whatbytes_cover.png" alt="" />
        <h1>  WhatBytes</h1>
        </div>
        <div className="profile">
          <div className="profile-image">
            <Image
              src="/profile.svg"
              alt="Profile"
              className="rounded-full"
              width={30}
              height={30}
            />
            <span>Rahil Siddique</span>
          </div>
        </div>
      </div>
      <div className="body">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <img src="/dashboard.svg" alt="" width={30} height={30} /> Dashboard
              </li>
              <li>
                <img src="/badge.svg" alt="" width={30} height={30} /> Skill Test
              </li>
              <li>
                <img src="/file.svg" alt="" width={20} height={20} /> Internship
              </li>
            </ul>
          </nav>
        </aside>

        <div className="main-content">
          <header className="header">
            <span>Skill Test</span>
          </header>

          <div className="grid">
            <div className="left-grid">
              <div className="card">
                <div className="card-head">
                  <img src="/html-5.png" alt="" />
                  <div className="content">
                    <h3>Hyper Text Markup Language</h3>
                    <p>
                      Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={handleUpdateClick}>
                    Update
                  </button>
                </div>
              </div>

              <div className="card">
                <h3>Quick Statistics</h3>
                <div className="grid">
                  <div className="box">
                    <img src="/trophy.png" alt="" />
                    <div>
                      <h3>{statistics.rank}</h3>
                      <p>Your Rank</p>
                    </div>
                  </div>
                  <div className="box">
                    <img src="/pad.png" alt="" />
                    <div>
                      <h3>{statistics.percentile} %</h3>
                      <p>Percentile</p>
                    </div>
                  </div>
                  <div className="box">
                    <img src="/tick.png" alt="" />
                    <div>
                      <h3>{statistics.score}/ 15</h3>
                      <p>Correct Answers</p>
                    </div>
                  </div>
                </div>
              </div>


              {/* modal form  */}

              {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="header">
        <h2>Update Score</h2>
        <img src="html-5.png" alt="" />
      </div>

      <form onSubmit={handleModalSubmit}>
        <div className="form-group">
          <div className="point">1</div>
          <label>Update your Rank</label>
          <input
            type="text"
            name="rank"
            value={modalData.rank}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <div className="point">2</div>
          <label>Update your Percentile</label>
          <input
            type="text"
            name="percentile"
            value={modalData.percentile || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (!isNaN(value) && value >= 0 && value <= 100)) {
                handleInputChange(e);
              }
            }}
            required
          />
          {modalData.percentile !== "" && (modalData.percentile < 0 || modalData.percentile > 100) && (
            <p className="warning">Please enter a value between 0 and 100.</p>
          )}
        </div>

        <div className="form-group">
          <div className="point">3</div>
          <label>Update your Current Score (out of 15)</label>
          <input
            type="text"
            name="score"
            value={modalData.score || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (!isNaN(value) && value >= 0 && value <= 15)) {
                handleInputChange(e);
              }
            }}
            required
          />
          {modalData.score !== "" && (modalData.score < 0 || modalData.score > 15) && (
            <p className="warning">Please enter a value between 0 and 15.</p>
          )}
        </div>

        <div className="footer">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}



          
              

            <div className="card">
              <div className="card-head">
                <div className="content">
                  <h3>Comparison Graph</h3>
                  <p>
                    <span>You scored {statistics.percentile} percentile</span>, which is lower than the average
                    percentile of 72% for all engineers who took this assessment.
                  </p>
                </div>
                <img src="/line-chart.png" alt="" />
              </div>
              <br />
              <LineChart width={500} height={300} data={comparisonData}>
  <CartesianGrid horizontal={false} vertical={false} />
  <XAxis
    dataKey="percentile"
    type="number" // Ensures the axis treats values as numbers
    domain={[0, 100]} // Set the domain to cover the entire range of percentiles
    label={{ value: 'Percentile', position: 'insideBottom', offset: -5 }}
  />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />

  <ReferenceLine
    x={statistics.percentile}
    stroke="grey"
    strokeWidth={1}
    label={{
      value: `Your Percentile`,
      position: 'right',
      offset: 10,
      fill: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    }}
  />
</LineChart>

            </div>

            </div>

            <div className="right-grid">
            <div className="card">
  <h3>Syllabus Wise Analysis</h3>
  <ul>
    <ul>
      <div className="progress-container" >
        <span>HTML Tools, Forms, History</span>
        <div className="bar-body">
        <div className="progress-bar" style={{ width: '80%', backgroundColor: '#d9e1ed' }}>
          <div className="progress" style={{ width: '80%', backgroundColor: '#2d6cdb' }}></div>
        </div>
        <span className="progress-percentage" style={{ color: '#2d6cdb' , fontWeight:900}}>80%</span>
      </div>
      </div>
    </ul>
    <ul>
      <div className="progress-container">
        <span>Tags & References in HTML</span>
        <div className="bar-body">
        <div className="progress-bar"  style={{ width: '80%', backgroundColor: '#eee0da' }}>
          <div className="progress" style={{ width: '60%', backgroundColor: '#ff9800' }}></div>
        </div>
        <span className="progress-percentage" style={{ color: '#ff9800' , fontWeight:900}}>60%</span>
      </div>
      </div>
    </ul>
    <ul>
      <div className="progress-container">
        <span>Tables & References in HTML</span>
        <div className="bar-body">
        <div className="progress-bar"  style={{ width: '80%', backgroundColor: '#eedbdb' }}>
          <div className="progress" style={{ width: '24%', backgroundColor: '#f44336' }}></div>
        </div>
        <span className="progress-percentage" style={{ color: '#f44336' , fontWeight:900}}>24%</span>
        </div>
      </div>
    </ul>
    <ul>
      <div className="progress-container">
        <span>Tables & CSS Basics</span>
        <div className="bar-body">
        <div className="progress-bar"  style={{ width: '80%', backgroundColor: '#d5e9de' }}>
          <div className="progress" style={{ width: '96%', backgroundColor: '#4caf50' }}></div>
        </div>
        <span className="progress-percentage" style={{ color: '#4caf50' , fontWeight:900}}>96%</span>
        </div>
        
        
      </div>
    </ul>
  </ul>
</div>

              <div className="card">
                <div className="card-head">
                <h3>Question Analysis</h3>
                <span> {statistics.score} / 15</span>
                </div>
                <div className="content">
                <p>
                 <span> You scored {statistics.score} questions correctly out of 15.<br/></span> However, there are areas that need improvement.
                </p>
                </div >
                <div className='piechart'>
                  {isClient ? (
                    <PieChart width={210} height={210}>
                    <Pie
                      data={questionAnalysisData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      dataKey="value"
                      // label
                    >
                      {questionAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    
                  </PieChart>
                  
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};
export default Dashboard;
