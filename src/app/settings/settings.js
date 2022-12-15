import React from 'react';
import './settings.css';

import GridSize from './gridsize-setting';
import CheckerColor from './checkercolor-setting';
import TimerInput from './timer-setting';


function Settings(props) {
  let sidebarClass = 'sidebar';
  let bgClass = 'sidebar-background';
  let contentClass = 'sidebar-content';

  if (props.landscapePassive) {
    sidebarClass += ' landscapePassive';
    contentClass += ' landscapePassive';
  }

  if (props.portraitActive) {
    sidebarClass += ' portraitActive';
    bgClass += ' portraitActive';
    contentClass += ' portraitActive';
  }

  return (
    <div className={sidebarClass} onClick={props.onSideClick}>
        <button className="sidebar-trigger" onClick={props.onClick}>
          &#9881;
        </button>

        {/* A mock background layer to hide the sidebar by clicking on it: */}
        <div className={bgClass} onClick={props.onClick} />

        {/* The content of the sidebar: */}
        <div className={contentClass} >
            <div className='sidebar-name'>Settings</div>
            <hr className='line' />
            <div className='padding'>
              <GridSize
                rows={props.rows}
                resetGrid={props.resetGrid}
              />
              <CheckerColor
                player='Player 1:'
                color={props.p1Color}
                setCheckerColor={props.setCheckerColor}
              />
              <CheckerColor
                player='Player 2:'
                color={props.p2Color}
                setCheckerColor={props.setCheckerColor}
              />
              <TimerInput
                timer={props.timer}
                setTimer={props.setTimer}
              />
            </div>
        </div>
    </div>
  );
}


export default Settings;