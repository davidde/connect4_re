import React from 'react';
import Column from './column';
import './game.css';


function Game(props) {
  // This may seem like a nasty wall of code, but it is entirely
  // inline-svg; it does nothing than set the visuals of the grid
  // and its checkers. The magic happens in its <Column/> child
  // components, and its parent component, <App/>.

  // Standard Medium Gridsize: props.rows = 6
  let cols = props.rows + 1; // 7

  let pillarCorrection = (props.rows - 6) * 2; // 0
  let width = cols * 100; // 700
  let height = cols * 100 + 8; // 708
  let viewbox = '0 0 ' + (width + 100) + ' ' + (height + 80); // '0 0 800 788'
  let bottomPaddingWidth = width - (props.rows * 2); // 688
  let bottomPaddingY = height + 7; // 715
  let pillarHeight = width - 20; // 680
  let rightPillarX = width + 36 - pillarCorrection; // 736

  let gridFocus = '';
  if (props.gameOver) gridFocus = 'gridNoFocus';

  return (
    <div id='game'>
      <div id='grid'>
        <svg id='svg-container' viewBox={viewbox} xmlns='http://www.w3.org/2000/svg'>
          {/* This is the container svg, which holds the left and right 'pillars', the bottom padding,
              and an extra invisible top row, which will show the checkers that are about to drop,
              when hovering. Turn on the $LSD bool in 'src/app/app.scss' to visualise this. */}
          <defs>
            {/* Gradients to make checkers look all fancy */}
            <radialGradient id='yellow' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
              <stop offset='63%' stopColor='rgb(251, 255, 0)' stopOpacity='0.9' />
              <stop offset='100%' stopColor='rgb(255, 174, 0)' stopOpacity='1' />
            </radialGradient>
            <radialGradient id='orange' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='65%' stopColor='rgb(253, 156, 0)' stopOpacity='0.65' />
                <stop offset='100%' stopColor='rgb(253, 101, 0)' stopOpacity='0.95' />
            </radialGradient>
            <radialGradient id='red' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='60%' stopColor='rgb(246, 75, 7)' stopOpacity='0.8' />
                <stop offset='100%' stopColor='rgb(209, 0, 7)' stopOpacity='1' />
            </radialGradient>
            <radialGradient id='green' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='65%' stopColor='rgb(134, 246, 7)' stopOpacity='0.8' />
                <stop offset='100%' stopColor='rgb(21, 139, 0)' stopOpacity='1' />
            </radialGradient>
            <radialGradient id='cyan' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='65%' stopColor='rgb(66, 255, 182)' stopOpacity='1' />
                <stop offset='100%' stopColor='rgb(15, 119, 145)' stopOpacity='1' />
            </radialGradient>
            <radialGradient id='blue' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='60%' stopColor='rgb(7, 210, 246)' stopOpacity='0.8' />
                <stop offset='100%' stopColor='rgb(0, 79, 251)' stopOpacity='1' />
            </radialGradient>
            <radialGradient id='purple' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
                <stop offset='60%' stopColor='rgb(255, 84, 190)' stopOpacity='0.8' />
                <stop offset='100%' stopColor='rgb(159, 0, 251)' stopOpacity='1' />
            </radialGradient>

            {/* Gradients to make board look more realistic */}
            <linearGradient id='blackBottom' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='30%' stopColor='rgb(10, 10, 10)' stopOpacity='0.8' />
                <stop offset='50%' stopColor='rgb(0, 0, 0)' stopOpacity='0.9' />
                <stop offset='85%' stopColor='rgb(54, 51, 51)' stopOpacity='1' /> 
            </linearGradient>
            <linearGradient id='blackPillars' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0%' stopColor='rgb(0, 0, 0)' stopOpacity='1' />
                <stop offset='20%' stopColor='rgb(25, 25, 25)' stopOpacity='1' />
                <stop offset='35%' stopColor='rgb(40, 40, 40)' stopOpacity='1' />
                <stop offset='50%' stopColor='rgb(60, 60, 60)' stopOpacity='1' />
                <stop offset='65%' stopColor='rgb(40, 40, 40)' stopOpacity='1' />
                <stop offset='80%' stopColor='rgb(25, 25, 25)' stopOpacity='1' />
                <stop offset='100%' stopColor='rgb(0, 0, 0)' stopOpacity='1' />
            </linearGradient>
            <linearGradient id='blackGreyBlack' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0%' stopColor='rgb(0, 0, 0)' stopOpacity='1' />
                <stop offset='12%' stopColor='rgb(25, 25, 25)' stopOpacity='0.95' />
                <stop offset='35%' stopColor='rgb(25, 25, 25)' stopOpacity='0.9' />
                <stop offset='50%' stopColor='rgb(30, 30, 30)' stopOpacity='0.85' />
                <stop offset='65%' stopColor='rgb(25, 25, 25)' stopOpacity='0.9' />
                <stop offset='88%' stopColor='rgb(25, 25, 25)' stopOpacity='0.95' />
                <stop offset='100%' stopColor='rgb(0, 0, 0)' stopOpacity='1' />
            </linearGradient>

            {/* pattern and mask to punch the holes in the grid */}
            <pattern id='hole' patternUnits='userSpaceOnUse' width='100' height='100'>
              {/* The <pattern> matches the size of a cell, 100x100, and contains a <circle>,
                  representing the hole, that matches the size of the checker.
                  The <circle> gets a fill color of 'black'; in the context of a <mask>, this
                  means the absence of space, or full transparency, as opposed to literal black. */}
              <circle cx='50' cy='50' r='42' fill='black'></circle>
            </pattern>
            <mask id='cell-mask'>
              {/* The <mask> is composed of two <rect> elements that match the grid column size;
                  the first gets a fill color of 'white' (opposite of 'black' in a mask) to represent
                  the part of the column we want to be opaque/visible.
                  The second <rect> sits on top of the first and has a fill of url(#hole) which refers
                  to the pattern we created above. */}
              <rect width='100' height={height} fill='white'></rect>
              <rect width='100' height={height} fill='url(#hole)'></rect>
              {/* Now, we can set the mask attribute for our grid column <rect>, by referencing
                  the <mask> element by id: 'url(#cell-mask)'. A nice feature of the <pattern> element
                  is that it repeats itself, based on the height/width attributes we've provided.
                  This means we can reveal the 6 rows of a single column without adding each
                  circular hole to the DOM explicitly. To build multiple columns, we simply add
                  a nested <svg> element at the correct x position to wrap each masked <rect>! */}
            </mask>

            {/* Filter for generating red svg tags for LSD */}
            <filter id='redtags' x='-0.25' y='-0.25' width='1.5' height='1.6'>
              <feFlood floodColor='red'/>
              <feComposite in='SourceGraphic'/>
            </filter>
          </defs>

          <svg id='svg-grid' className={gridFocus} width={width} height={height} x='54' y='8' xmlns='http://www.w3.org/2000/svg'>
            {/* This is the actual grid svg consisting of 7 column svg's;
                each column is 700px high by 100px wide, with the top cell an invisible one,
                to show pending checkers. */}
            {
              // Since regular looping is not available inside JSX code,
              // we use an array construct to 'loop' to create
              // the columns of the grid!
              [...Array(cols)].map((el, i) => {
                return <Column
                          key={i}
                          colID={i}
                          rows={props.rows}
                          colData={props.grid[i]}
                          fullColumn={props.fullColumns[i]}
                          gameOver={props.gameOver}
                          p1Next={props.p1Next}
                          p1Color={props.p1Color}
                          p2Color={props.p2Color}
                          onColumnClick={props.onColumnClick}
                       />;
              })
            }
          </svg>

          <g className={gridFocus}>
            <rect id='bottom-padding' width={bottomPaddingWidth} height='20' x='54' y={bottomPaddingY} fill='url(#blackBottom)' />
            <rect id='left-pillar' width='60' height={pillarHeight} fill='url(#blackPillars)' x='0' y='100' rx='10' ry='10' />
            <rect id='right-pillar' width='60' height={pillarHeight} fill='url(#blackPillars)' x={rightPillarX} y='100' rx='10' ry='10' />
          </g>
        </svg>
      </div>

      <div id='buttons'>
        {/* Reset button; the 'value={props.rows}' is necessary because it is the argument to
        the 'resetGrid' event handler */}
        {/*
          <button type="button" value={props.rows} onClick={props.resetGrid}>Start</button>
        */}
          <button type="button" value={props.rows} onClick={props.resetGrid}>Reset</button>
      </div>
    </div>
  );
}


export default Game;