import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { ClockCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface Clock { // Type defining what a clock consists of.
  city: string,
  time: string
}

let clocks: Clock[] = [
  {city: "London", time: "12:21"},
  {city: "Vancouver", time: "5:21"},
  {city: "Tokyo", time: "11:21"}
]

const App: React.FC = () => {

  let [isSettings, setIsSettings] = React.useState(false)

  function toggleSettings() {
    setIsSettings(!isSettings)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '10% 15% auto 15% 10%', gridTemplateRows: '25% 15% auto 10%', height: '100vh' }}>
      <div style={{ display: 'flex', gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 3, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>
            Sydney 12:21
          </h2>
        </div>
        <div>
          <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
        </div>
      </div>
      <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 3, gridRowEnd: 4 }}>
        {/* https://dev.to/ibrahima92/15-must-know-javascript-array-methods-in-2020-1kd8 */}
        {clocks.map(clock => <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {clock.city} {clock.time}
          </div>
          <div>
            <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
          </div>
        </div>)}
        {
          isSettings ? <>
            <div style={{ height: 10 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="ghost" shape="circle" icon={<PlusOutlined />} />
              <Button type="ghost" icon={<DeleteOutlined />}></Button>
            </div>
          </> : null
        }

      </div>
      <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 4, gridRowEnd: 5, placeSelf: 'center' }}>
        <Button type="ghost" onClick={toggleSettings}>{isSettings ? 'Done' : 'Edit'}</Button>
      </div>
    </div>
  );
}

export default App;
