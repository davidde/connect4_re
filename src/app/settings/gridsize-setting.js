import React from 'react';
import './settings.css';


function Gridsize(props) {

  return (
    <form>
      <label className='fontColor'>Gridsize: &nbsp;
        <select name='gridsize' value={props.rows} onChange={props.resetGrid} >
          {/* value = number of rows in the grid; this is used to determine the gridsize
              by passing it to the resetGrid event handler. */}
          <option value='4'>extra small</option>
          <option value='5'>small</option>
          <option value='6'>medium</option>
          <option value='7'>large</option>
          <option value='8'>extra large</option>
          <option value='9'>huge</option>
          <option value='10'>massive</option>
        </select>
      </label>
    </form>
  );
}


export default Gridsize;