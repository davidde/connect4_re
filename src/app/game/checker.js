import React from 'react';
import './checker.css';

import gsap from '../../GSAP';


class Checker extends React.Component {
  // PROPS: - color
  //        - rowID: the row of the checker; with '0' being the invisible top row,
  //                 '1' = the top row, '2' the second from the top, etc.
  //        (- key: Each child in an array or iterator should have a unique "key" prop;
  //                this is a requirement because of the Array construct we used to
  //                'loop' the checkers.)
  constructor(props) {
    super(props);
    this.node = null;  // Reference to the DOM node
    this.tween = null; // Reference to the animation
  }

  componentDidMount() {
    let cy = this.props.rowID * 100;
    if (this.props.rowID !== 0)
      cy = cy + 8;
    let duration = this.props.rowID * 0.055 + 0.35;

    this.tween = gsap.to(
      this.node, // Use the node ref to create the animation
      {
        duration: duration,
        x: 0,
        y: cy,
        ease: 'bounce'
      }
    );
  }

  render() {
    let className = this.props.color;

    if (this.props.winningChecker) {
      className += ' winningChecker';
    }

    return <circle
              r ='42.5'
              cx='50'
              cy='42.5'
              className={className}
              fill={'url(#' + this.props.color + ')'}
              ref={circle => this.node = circle}
            />;
  }
}


export default Checker;