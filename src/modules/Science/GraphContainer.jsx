import React from 'react';
import BackButton from './BackButton';

const GraphContainer = (props) => (
    <div className="science-graph-container">
        <BackButton
            handleBackButton={props.handleBackButton}
        />
        {/* <div className="science-geiger-graph"> */}
        {/* <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+points',
                marker: { color: 'red' },
              },
              { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ autosize: true, width: 320, height: 200, title: 'A Fancy Plot' }}
          />
        </div> */}
    </div>
);

export default GraphContainer;