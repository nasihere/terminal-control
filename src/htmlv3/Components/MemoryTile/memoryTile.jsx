import * as React from 'react';
import {Panel, Col, Row} from 'react-bootstrap';
import {LineChart} from 'react-easy-chart'

export class MemoryTile extends React.Component {
    state;
    constructor() {
        super()
        const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
        this.state = {showToolTip: false, windowWidth: 100};
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    handleResize() {
        if (this.refs.mem)
            this.setState({windowWidth: this.refs.mem.offsetWidth });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    render () {
        let header = (<h4>{this.props.title}</h4>)
        let item = this.props.values ? this.props.values[this.props.values.length - 1]: [0,0,0,0,0];
        let pre = 'memory-tile';
        let gridSize=this.state.windowWidth < 280 ? 12 : this.state.windowWidth < 512 ? 6 : 4;
        let RSSize=this.state.windowWidth < 512 ? 12 : 4;
        return (

            <Panel header={header} className="memtile" bsStyle="primary" collapsible defaultExpanded>
                <Row>
                    <Col xs={gridSize} className={`${pre}__col`}>
                        <div className={`${pre}__block`}>
                            <h4 className={`${pre}__block__header`}>Total Heap</h4>
                            <div className={`${pre}__block__body`}>
                                {parseInt(item[0] / 1000)}
                            </div>
                            <div className={`${pre}__block__footer`}>Kilobytes</div>

                        </div>
                    </Col>
                    <Col xs={gridSize} className={`${pre}__col`}>
                        <div className={`${pre}__block`}>
                            <h4 className={`${pre}__block__header`}>Used Heap</h4>
                            <div className={`${pre}__block__body`}>
                                {parseInt(item[1] / 1000)}
                            </div>
                            <div className={`${pre}__block__footer`}>Kilobytes</div>

                        </div>
                    </Col>
                    <Col xs={RSSize} className={`${pre}__col`}>
                        <div className={`${pre}__block`}>
                            <h4 className={`${pre}__block__header`}>RSS</h4>
                            <div className={`${pre}__block__body`}>
                                {parseInt(item[2] / 1000)}
                            </div>
                            <div className={`${pre}__block__footer`}>Kilobytes</div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <div ref="mem" style={{background:"#464545", margin:"0 15px 0 15px"}}>
                        <div className="pull-right small">{item[4]+"s"}</div>
                    <LineChart
                        className="memLine"
                        xType={"text"}
                        width={this.state.windowWidth}

                        height={50}
                        xTicks={10}
                        yTicks={10}
                        lineColors={['red']}
                        margin={{top: 10, right: 10, bottom: 10, left: 10}}

                        data={[this.props.chartValues || [{x:0,y:0}]]
                        }
                    />
                    </div>
                </Row>
            </Panel>
        )
    }
}