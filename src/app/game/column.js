import React from 'react';
import Checker from './checker';
import './column.css';


class Column extends React.Component {
  // PROPS: (- key)
  //        - colID
  //        - rows
  //        - colData
  //        - fullColumn
  //        - gameOver
  //        - p1Next
  //        - p1Color
  //        - p2Color
  //        - onColumnClick: onClick-handler that executes within the App
  //          component's context, and returns colData when necessary.
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  // ES6 Arrow functions are a more concise syntax for writing JavaScript
  // functions; we avoid having to type the 'function' and 'return' keyword.
  // On top of that, arrow functions are anonymous and change the way
  // 'this' binds in functions; this is why we don't need
  // 'this.mouseEnter = this.mouseEnter.bind(this);' in the constructor.
  mouseEnter = () => {
    this.setState({ isHovered: true });
  }
  mouseLeave = () => {
    this.setState({ isHovered: false });
  }

  handleClick = () => {
    // Guard against changing colData after gameOver or fullColumn:
    if (this.props.fullColumn || this.props.gameOver)
      return;
    let updateGridState = this.props.onColumnClick;
    updateGridState(this.props.colID);

    this.mouseLeave();
  }

  render() {
    let id = 'column' + this.props.colID;
    let x = (98 * this.props.colID).toString();
    let color = this.props.p1Next ? this.props.p1Color : this.props.p2Color;

    let className = 'colNoFocus';
    let hoverChecker = false;
    if (this.state.isHovered && !this.props.fullColumn && !this.props.gameOver) {
      // In these conditions, enable a column to be focussed on,
      // and hovered over with a checker.
      className = 'colInFocus';
      hoverChecker = true;
    }

    return (
      <React.Fragment>
        <svg x={x} y='0'
              id={id}
              className={className}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              onClick={this.handleClick}>
          {/* Any checkers in the column should come at the start of the svg,
              so they're effectively BEHIND the column! So checkers go here: */}
          {
            hoverChecker ? // Hover checker in invisible top row:
                <Checker color={color} rowID={0} /> : null
          }

          {
            this.props.colData.map((checker, i) => {
              // Each checker string is of the form: 'p1:color', 'p2:color', 'w1:color' or 'w2:color'
              if (checker) {
                  let color = checker.slice(3);
                  let winningChecker = false;
                  if (checker[0] === 'w') winningChecker = true;
                  return <Checker
                            key={i}
                            // Invert rowID order because svg orders top down
                            // and the colData array is ordered bottom up!
                            rowID={Math.abs(i - this.props.rows)}
                            color={color}
                            winningChecker={winningChecker}
                          />;
              }
              return null;
            })
          }
          {/* Invisible top cell: */}
          <rect x='0' y='0' width='100' height='100' fill='none' />
          {/* Actual visible column: */}
          <rect x='0'
                y='92' // This is changed to make the space above the top cell in the grid bigger;
                       // However, this complicates things in both grid and checker!
                width='100'
                height={(this.props.rows * 100 + 16).toString()}
                fill='url(#blackGreyBlack)'
                mask='url(#cell-mask)' />
        </svg>
      </React.Fragment>
    );
  }
}


export default Column;