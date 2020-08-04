import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { TimezonePicker } from "@blueprintjs/timezone";
import { Button } from 'antd';
import moment, { MomentZone } from 'moment-timezone';
import React from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DraggableStateSnapshot, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd";

const reorder = (list: MomentZone[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App: React.FC = () => {
  let [clocks, setClocks] = React.useState([
    moment.tz.zone('Australia/Sydney') as MomentZone,
    moment.tz.zone('America/Vancouver') as MomentZone
  ])

  let [isSettings, setIsSettings] = React.useState(false)

  function toggleSettings() {
    setIsSettings(!isSettings)
  }

  function handleTimezoneChange(tzName: string) {
    setClocks(prev => [...prev, moment.tz.zone(tzName) as MomentZone,])
  }

  let [, setDummy] = React.useState(0)

  React.useEffect(() => {
    setInterval(() => {
      setDummy(prev => prev + 1)
    }, 500)
  }, [])

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "delete") {
      setClocks(clocks.filter((tz, i) => i !== result.source.index))
    } else {
      const items = reorder(
        clocks,
        result.source.index,
        result.destination.index
      );
  
      setClocks(items);
    }
  }

  return (<div>
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'grid', gridTemplateColumns: '10% 15% auto 15% 10%', gridTemplateRows: '25% 15% auto 10%', height: '100vh' }}>
        <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 3 }}>
          <Droppable droppableId="droppableTop">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
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
            )}
          </Droppable>
        </div>
        <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 3, gridRowEnd: 4 }}>
          <Droppable droppableId="droppable">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* https://dev.to/ibrahima92/15-must-know-javascript-array-methods-in-2020-1kd8 */}
                {clocks.map((tz, i) => i === 0 ? null : <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style, display: 'flex', justifyContent: 'space-between' }}
                    >
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
                    </div>
                  )}
                </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {
            isSettings ? <>
              <div style={{ height: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TimezonePicker onChange={handleTimezoneChange} />
                <Droppable droppableId="delete">
                  {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Button type="ghost" icon={<DeleteOutlined />}></Button>
                    </div>
                  )}
                </Droppable>
              </div>
            </> : null
          }

        </div>
        <div style={{ gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 4, gridRowEnd: 5, placeSelf: 'center' }}>
          <Button type="ghost" onClick={toggleSettings}>{isSettings ? 'Done' : 'Edit'}</Button>
        </div>
      </div>
    </DragDropContext>
  </div>);
}

export default App;
