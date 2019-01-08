import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { connect } from 'react-redux';
import { fetchAllTables } from '../redux/actions';
import { createBrowserHistory } from "history";
import { Link } from 'react-router-dom';
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";
const hist = createBrowserHistory();
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  componentWillMount(){
    this.props.fetchAllTables();
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  renderLastUpdated(time){
    if(time === "never"){
      return "Brand New"
    } else {
      return `Last updated ${time.split("T")[0]} at ${time.split("T")[1].split(":")[0]}:${time.split("T")[1].split(":")[1]}`;
    }
  }
  renderTableList(tables){
    return tables.map(t => {
      console.log(t.table.toString().toLowerCase());
      return (
        <tr key={`table-${t.id}`}>
          <td>
            <p className="title">{t.table}</p>
            <p className="text-muted">
              {this.renderLastUpdated(t.lastUpdated)}
            </p>
          </td>
          <td className="td-actions text-right">
            <Link
              color="link"
              id={`tooltip636901683-${t.id}`}
              title=""
              to={`/admin/cms/${t.table.toString().toLowerCase()}`}
            >
              <i className="tim-icons icon-zoom-split" />
            </Link>
            <UncontrolledTooltip
              delay={0}
              target={`tooltip636901683-${t.id}`}
              placement="right"
            >
              See All Content
            </UncontrolledTooltip>
          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Tables</h6>
                  <p className="card-category d-inline"></p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        {this.renderTableList(this.props.tables)}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps =  (state, ownProps) => {
  return { tables: Object.values(state.tables) };
}
export default connect(mapStateToProps, { fetchAllTables })(Dashboard);
