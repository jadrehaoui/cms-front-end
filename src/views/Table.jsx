import React from "react";
import { connect } from 'react-redux';
import { fetchTableContent, softDeleteSelection, restoreItems, unpublishItems, publishItems } from '../redux/actions';
import NotificationAlert from "react-notification-alert";
import {Link} from 'react-router-dom';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown
} from "reactstrap";

class CMSTable extends React.Component {
  notify = (place, msg, type) => {
    var color = Math.floor(Math.random() * 5 + 1);
    // var type;
    // switch (color) {
    //   case 1:
    //     type = "primary";
    //     break;
    //   case 2:
    //     type = "success";
    //     break;
    //   case 3:
    //     type = "danger";
    //     break;
    //   case 4:
    //     type = "warning";
    //     break;
    //   case 5:
    //     type = "info";
    //     break;
    //   default:
    //     break;
    // }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {msg}
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  state = {
    products: ["title", "price", "quantity", "createdBy", "updatedBy"],
    projects: ["title", "createdBy", "updatedBy"],
    users: ["givenName"],
    selectedItems: [],
    checked: false,
    routes: ['product', 'user', 'project'],
    currentRoute: ''
  }
  componentWillMount(){
    this.props.fetchTableContent(this.props.match.params.table);
  }

  renderTableHeaders(){
    if(this.state[this.props.match.params.table] !== undefined){
      return this.state[this.props.match.params.table].map((header, i) => {
        if(header === 'createdBy'){
          header = "created by"
        }
        if(header === 'updatedBy'){
          header = "updated By"
        }
        if(header === 'createdTs'){
          header = "created at"
        }
        if(header === 'updatedTs'){
          header = "updated at"
        }
        return (
          <th key={`header-${i}`}>{header}</th>
        )
      })
    } else {
      return <th>This table is not configured with headers.</th>
    }

  }
  renderData(row){
    return this.state[this.props.match.params.table].map((header, i) => {
      if(i === 0){
        return (<td id={`data-${i}-${row._id}`} key={`data-${i}-${row._id}`}>
          <Link
            color="link"
            title=""
            to={`/admin/cms/${this.props.match.params.table}/${row._id}`}
          >
            {row[header]}
          </Link></td>)
      } else {
        return <td id={`data-${i}-${row._id}`} key={`data-${i}-${row._id}`}>{row[header]}</td>
      }

    })
  }
  renderTableContent(obj){
    if(obj){
      var rows = Object.values(obj);
      if(rows.length === 0){
        return <tr>
            <td align="center" colSpan={this.state[this.props.match.params.table].length}>This table has no content yet .</td>
          </tr>;
      }
      return rows.map(row => {
        var color = ""
        var style = { borderLeft: "2px solid #0000"};
        if (row.deleted) {
          style = {borderLeft: "2px solid #fd5d93"}
          // style= {backgroundImage: "radial-gradient(#8f989e, #27293e)"}
        } else if(row.published){
          style = {borderLeft: "2px solid #1d8cf8"}
          // style= {backgroundImage: "radial-gradient(#2c59f9, #27293e)"}
        } else if(!row.published){
          style = {borderLeft: "2px solid white"}
        }
        return (
          <tr key={row._id} style={style} id={row._id}>
            <td>
            <FormGroup check>
              <Label check>
                <Input onClick={() => this.handleSelectedItem(row)} defaultValue="" type="checkbox" />
                <span id={`span_${row._id}`} className="form-check-sign">
                  <span className="check"/>
                </span>
              </Label>
            </FormGroup>
            </td>
            {this.renderData(row)}
          </tr>
        )
      })
    }
    else {
      return (
        <tr>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
          <td className="text-center">Loading</td>
        </tr>
      )
    }
  }
  handleSelectedItem(item){
    var selectedItems = this.state.selectedItems;
    if(selectedItems.indexOf(item._id) != -1){
      selectedItems.pop(item._id);
      this.setState({selectedItems: selectedItems})
    } else {
      selectedItems.push(item._id);
      this.setState({selectedItems: selectedItems})
    }
  }
  handleDropdownDelete(){
    if(this.state.selectedItems.length === 0){
      console.log("No items to delete");
    } else {
      var response = this.props.softDeleteSelection(this.props.match.params.table,this.state.selectedItems)
      .then(res => {
        if(this.props.deleted.status === 200){
            var selectedItems = this.state.selectedItems;
            var msg = `${this.props.deleted.number} ${this.props.deleted.recordType} /s were successfully soft deleted from your databse !`;
            this.notify('br', msg ,"danger");
            // TODO: RE CHECK POOR CODE
            var el = "";
            selectedItems.map((item, i) => {
              if(selectedItems[i+1]){
                  el+="#span_"+item+",";
              } else {
                el+="#span_"+item;
              }
            })
            document.querySelectorAll(el).forEach(function(item){item.click()});
            // TODO: RE CHECK POOR CODE END
            this.setState({
              selectedItems: [],
              checked: false
            });
            this.props.fetchTableContent(this.props.match.params.table);
        }
      });
    }
  }
  handleDropdownRestore(){
    if(this.state.selectedItems.length === 0){
      console.log("No items to restore");
    } else {
      var response = this.props.restoreItems(this.props.match.params.table,this.state.selectedItems)
      .then(res => {
        if(this.props.restored.status === 200){
            var selectedItems = this.state.selectedItems;
            var msg = `${this.props.restored.number} ${this.props.restored.recordType} /s were successfully restored to your databse !`;
            this.notify('br', msg, "success");
            // TODO: RE CHECK POOR CODE
            var el = "";
            selectedItems.map((item, i) => {
              if(selectedItems[i+1]){
                  el+="#span_"+item+",";
              } else {
                el+="#span_"+item;
              }
            })
            document.querySelectorAll(el).forEach(function(item){item.click()});
            // TODO: RE CHECK POOR CODE END
            this.setState({
              selectedItems: []
            })
            this.props.fetchTableContent(this.props.match.params.table);
        }
      });
    }
  }
  handleDropdownUnpublish(){
    if(this.state.selectedItems.length === 0){
      console.log("No items to unpublish");
    } else {
      var response = this.props.unpublishItems(this.props.match.params.table,this.state.selectedItems)
      .then(res => {
        if(this.props.unpublished.status === 200){
            var selectedItems = this.state.selectedItems;
            var msg = `${this.props.unpublished.number} ${this.props.unpublished.recordType} /s were successfully unpublished !`;
            this.notify('br', msg, "success");
            // TODO: RE CHECK POOR CODE
            var el = "";
            selectedItems.map((item, i) => {
              if(selectedItems[i+1]){
                  el+="#span_"+item+",";
              } else {
                el+="#span_"+item;
              }
            })
            document.querySelectorAll(el).forEach(function(item){item.click()});
            // TODO: RE CHECK POOR CODE END
            this.setState({
              selectedItems: []
            })
            this.props.fetchTableContent(this.props.match.params.table);
        }
      });
    }
  }
  handleDropdownPublish(){
    if(this.state.selectedItems.length === 0){
      console.log("No items to publish");
    } else {
      var response = this.props.publishItems(this.props.match.params.table,this.state.selectedItems)
      .then(res => {
        if(this.props.published.status === 200){
            var selectedItems = this.state.selectedItems;
            var msg = `${this.props.published.number} ${this.props.published.recordType} /s were successfully published !`;
            this.notify('br', msg, "success");
            // TODO: RE CHECK POOR CODE
            var el = "";
            selectedItems.map((item, i) => {
              if(selectedItems[i+1]){
                  el+="#span_"+item+",";
              } else {
                el+="#span_"+item;
              }
            })
            document.querySelectorAll(el).forEach(function(item){item.click()});
            // TODO: RE CHECK POOR CODE END
            this.setState({
              selectedItems: []
            })
            this.props.fetchTableContent(this.props.match.params.table);
        }
      });
    }
  }
  render() {
    return (
      <>
        <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
          <Row>
            <Col md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h4 className="title d-inline">{this.props.match.params.table.toString().toUpperCase()}</h4>
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
                        href=""
                        onClick={() => this.handleDropdownDelete()}
                      >
                        Delete
                      </DropdownItem>
                      <DropdownItem
                        href=""
                        onClick={() => this.handleDropdownRestore()}
                      >
                        Restore
                      </DropdownItem>
                      <DropdownItem
                        href=""
                        onClick={() => this.handleDropdownPublish()}
                      >
                        Publish
                      </DropdownItem>
                      <DropdownItem
                        href=""
                        onClick={() => this.handleDropdownUnpublish()}
                      >
                        Unpublish
                      </DropdownItem>
                      <DropdownItem
                        href=""
                        onClick={() => {console.log("IMPORT FROM EXCEL");}}
                      >
                        Import from excel
                      </DropdownItem>
                      <DropdownItem
                        href=""
                        onClick={() => {console.log("EXPORT TO EXCEL");}}
                      >
                        Export to excel
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                    <Button
                      className="btn-icon"
                      color="#ffff"
                      type="button"
                      onClick={() => {console.log("CLICKED !");}}
                    >
                      <i className="tim-icons icon-simple-add" />
                    </Button>


                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th></th>
                        {this.renderTableHeaders()}
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderTableContent(this.props.content)}
                    </tbody>
                  </Table>
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
  return {
    deleted: state.tableState.deleted,
    restored: state.tableState.restored,
    unpublished: state.tableState.unpublished,
    published: state.tableState.published,
    content: state.tableState.content
  }
}
export default connect(mapStateToProps, { fetchTableContent, softDeleteSelection, restoreItems, unpublishItems, publishItems })(CMSTable);
