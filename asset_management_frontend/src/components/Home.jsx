import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import './Home.css'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

function Home(props) {
  const { assets, buildings, departments, users, unallocated, ...rest } = props.details
  
  Chart.register(...registerables);

  const PieChart = ({ allocated, unallocated }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Allocated', 'Unallocated'],
          datasets: [
            {
              data: [allocated, unallocated],
              backgroundColor: ['#36a2eb', '#ff6384'],
            },
          ],
        },
      });

      // Cleanup: Destroy the chart when the component is unmounted
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [allocated, unallocated]);

    return <canvas ref={chartRef} />;
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>
      <div className='sub-container'>
        <div className='main-cards'>
          <div className='card'>
            <div className='card-inner'>
              <h3>Assets</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>{assets}</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>Buildings</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>{buildings}</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>Departments</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>{departments}</h1>
          </div>
          <div className='card'>
            <div className='card-inner'>
              <h3>Users</h3>
              <BsFillBellFill className='card_icon' />
            </div>
            <h1>{users}</h1>
          </div>
        </div>
        {/* New Pie Chart component */}
        <div className='chart'>
          <div className='chart-inner'>
            <h3>Allocated vs. Unallocated</h3>
          </div>
          <PieChart allocated={assets - unallocated} unallocated={unallocated} />
        </div>

      </div>
    </main>
  );
}

export default Home;


