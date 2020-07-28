import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { ClockCircleOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

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
        <div >
          <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
        </div>
      </div>
      <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 3, gridRowEnd: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            London 1:21
          </div>
          <div>
            <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            London 1:21
          </div>
          <div>
            <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
          </div>
        </div>
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
