import React from "react";
import { NumericTextBox, Switch, MaskedTextBox,Input } from '@progress/kendo-react-inputs';
import { Calendar,DatePicker,DateInput,TimePicker,DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Toolbar,ToolbarItem,ToolbarSeparator,Button,DropDownButton,ButtonGroup,SplitButton,SplitButtonItem,DropDownButtonItem } from '@progress/kendo-react-buttons';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { Upload } from '@progress/kendo-react-upload';
import str2json from 'string-to-json';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchForm } from '../redux/actions';
import '@progress/kendo-theme-default/dist/all.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Row,
  Col
} from "reactstrap";

class FormView extends React.Component {
  state = {
    inputs: [],
    timeInput: null,
    datePicker: null,
    calendar: null,
    dateInput: null,
    config: {
      date: null
    },
    submitForm: {

    },
    fields: ""
  }
  componentWillMount(){
    this.props.fetchForm(this.props.match.params.table).then(res => {
      console.log("FORMSTATE",this.props.formState);
      this.setState({form: this.props.formState});
      if(!_.isEmpty(this.state.form.fields.foundRecord[0])){
        this.setState({fields: this.state.form.fields.foundRecord[0].obj})
      }
    })
  }
  componentDidMount(){
    var input = this.state.inputs;

    // fields.map((field, i) => {
    //   console.log(field, i);
    //   input.push({name: field.label, id: i});
    // })
    // this.setState({inputs: input})
  }
  renderInputs(fields){
    var json = {}
    if(fields !== ""){
      json = JSON.parse(fields);
      fields = json.fields;
      var inputs = [];
      fields.map((field, i) => {
        inputs.push({name: field.label, id: i+1})
      })
      console.log(inputs);
      return fields.map( (field, i) => {
        if(field.type === "input"){
          return <Row key={`big-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup>
                <Input style={{width:"100%"}} label={field.label}/>
              </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "upload"){
          return <Row  key={`big-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup>
              <label htmlFor={field.label}>{field.label}</label>
              <Upload
                  batch={false}
                  multiple={true}
                  defaultFiles={[]}
                  withCredentials={false}
                  saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                  removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}/>
              </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "calendar"){
          return   <Row key={`big-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup>
                <label htmlFor={field.label}>
                  {field.label}<br/>
                </label><br/>
                <Calendar
                      value={this.state.calendar}
                      onChange={(v) => {this.setState({calendar: v.value})}}
                  />
              </FormGroup>
              </Col>
            </Row>;
        }
        if(field.type === "datePicker"){
          return <Row key={`big-${i}`}>
          <Col className="pr-md-12" md="12">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">
                {field.label}
              </label>
              <DatePicker
                  value={this.state.datePicker}
                  onChange={(v) => {this.setState({datePicker: v.value})}}
              />
            </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "dateInput"){
          return <Row key={`big-${i}`}>
            <Col className="pr-md-12" md="12">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">
                {field.label}
              </label>
              <DateInput
                  value={this.state.dateInput}
                  onChange={(v) => {this.setState({dateInput: v.value})}}
              />
            </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "timeInput"){
          return   <Row key={`big-${i}`}>
          <Col className="pr-md-12" md="12">
              <FormGroup>
                <label htmlFor={field.label}>
                  {field.label}
                </label>
                <TimePicker
                    value={this.state.timeInput}
                    onChange={(v) => {this.setState({timeInput: v.value})}}
                />
              </FormGroup>
              </Col>
            </Row>
        }
        if(field.type === "dateRangePicker"){
          return <Row key={`big-${i}`}>
          <Col className="pr-md-12" md="12">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">
                {field.label}
              </label><br/>
              <DateRangePicker
                  onChange={() => {console.log("DateRangePicker changed");}}
              />
            </FormGroup>
            </Col>
          </Row>
        }
        if(field.type === "multiSelect"){
          return <Row key={`big-${i}`}>
          <Col className="pr-md-12" md="12">
            <FormGroup>
              <label htmlFor={field.label}>
                {field.label}
              </label>
              <MultiSelect
              data={[1,2,3,4,5,6,7]} defaultValue={[ 1, 2 ]} />
            </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "autoComplete"){
          return <Row key={`big-${i}`}>
          <Col className="pr-md-12" md="12">
            <FormGroup>
              <label htmlFor={field.label}>
                {field.label}
              </label>
              <AutoComplete
                data={[1,2,3,4,5,6]} placeholder="Your choice" />
            </FormGroup>
            </Col>
          </Row>;
        }
        if(field.type === "editor"){
          return <Row key={`big-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup>
                <Input style={{width:"100%"}} label={field.label}/>
              </FormGroup>
            </Col>
          </Row>;
        }
      })
    } else {
      return <img
        alt="..."
        className="loading"
        src={require("assets/img/loaderAjax.gif")}
      />;
    }
  }
  renderSideInputs(fields){
    var json = {};
    if(fields != ""){
      json = JSON.parse(fields);
      fields = json.fields;
      return fields.map((field, i) => {
        if(field.type === "numeric"){
          return <Row key={`small-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup style={{width: "100%!important"}}>
              <label>{field.label}</label>
              <NumericTextBox
                style={{width:"100%"}}
                defaultValue={0.00}
                format={field.format}
                />
              </FormGroup>
            </Col>
          </Row>;} //1
        if(field.type === "switch"){
          return  <Row key={`small-${i}`}>
            <Col className="pr-md-12" md="12">
              <FormGroup style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <label style={{marginBottom: "0"}} htmlFor={field.label}>{field.label}</label><br/>
                <Switch style={{width:"100%"}}/>
              </FormGroup>
            </Col>
          </Row>;} // 2
        if(field.type === "select"){
          return "select";} // 3
      })
    }
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="9">
              <Card style={{background: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)"}}>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody style={this.state.fields === "" ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                  <Form>
                    {this.renderInputs(this.state.fields)}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={() => console.log("STATENOW", this.state)}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="3" >
              <Card className="card-user" style={{background: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)"}}>
              <CardBody>
                <Form>
                  {this.renderSideInputs(this.state.fields)}
                </Form>
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
  console.log("STATE", state);
  return {
    formState: state.formState
  }
}
export default connect(mapStateToProps, { fetchForm })(FormView);
