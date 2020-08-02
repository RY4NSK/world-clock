import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { ClockCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment, { MomentZone } from 'moment-timezone'
import { REPL_MODE_STRICT } from 'repl';
import { TimezonePicker } from "@blueprintjs/timezone";

const App: React.FC = () => {

  let [clocks, setClocks] = React.useState([
    moment.tz.zone('Australia/Sydney') as MomentZone,
    moment.tz.zone('America/Vancouver') as MomentZone
  ])

  let [isSettings, setIsSettings] = React.useState(false)

  function toggleSettings() {
    setIsSettings(!isSettings)
  }

  function handleTimezoneChange(tzName: string){
    setClocks(prev => [...prev, moment.tz.zone(tzName) as MomentZone,])
  }
ç
  let [, setDummy] = React.useState(0)

  React.useEffect(() => {
    setInterval(() => {
      setDummy(prev => prev + 1)
    }, 500)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '10% 15% auto 15% 10%', gridTemplateRows: '25% 15% auto 10%', height: '100vh' }}>
      <div style={{ display: 'flex', gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 3, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>
            {clocks[0].name} {moment.tz(moment(), clocks[0].name).calendar(moment(), {
              sameDay: 'h:mm:ssa',
              nextDay: '[Tomorrow at] h:çmm:ssa',
              lastDay: '[Yesterday at] h:mm:ssa'
            })}
          </h2>
        </div>
        <div>
          <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
        </div>
      </div>
      <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 3, gridRowEnd: 4 }}>
        {/* https://dev.to/ibrahima92/15-must-know-javascript-array-methods-in-2020-1kd8 */}
        {clocks.map((tz, i) => i === 0 ? null : <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {tz.name} {moment.tz(moment(), tz.name).calendar(moment(), {
              sameDay: 'h:mm:ssa',
              nextDay: '[Tomorrow at] h:çmm:ssa',
              lastDay: '[Yesterday at] h:mm:ssa'
            })}
          </div>
          <div>
            <Button type="ghost" icon={<ClockCircleOutlined />}></Button>
          </div>
        </div>)}
        {
          isSettings ? <>
            <div style={{ height: 10 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TimezonePicker onChange={handleTimezoneChange} />
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
