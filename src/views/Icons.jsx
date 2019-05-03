import React from "react";
import { NumericTextBox, Switch, MaskedTextBox,Input } from '@progress/kendo-react-inputs';
import { Calendar,DatePicker,DateInput,TimePicker,DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Toolbar,ToolbarItem,ToolbarSeparator,Button,DropDownButton,ButtonGroup,SplitButton,SplitButtonItem,DropDownButtonItem } from '@progress/kendo-react-buttons';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { Upload } from '@progress/kendo-react-upload';
import '@progress/kendo-theme-default/dist/all.css';
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Form, FormGroup  } from "reactstrap";

class Icons extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">100 Awesome Nucleo Icons</h5>
                  <p className="category">
                    Handcrafted by our friends from{" "}
                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                  </p>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                  <Form>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          MaskedTextBox
                        </label>

                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Input
                        </label>
                        <Input label="First name"/>
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label>NumericTextBox</label>
                        <NumericTextBox
                          defaultValue={123.4}
                          format="c2"
                      />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Switch
                        </label>
                        <Switch />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Calendar
                        </label>
                        <Calendar
                              value={new Date()}
                              onChange={() => {console.log("Date Changed");}}
                          />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          DatePicker
                        </label>
                        <DatePicker
                            value={new Date()}
                            onChange={() => {console.log("datePicker changed");}}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          DateInput
                        </label>
                        <DateInput
                            value={new Date()}
                            onChange={() => {console.log("dateInput changed");}}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          TimeInput
                        </label>
                        <TimePicker
                            value={new Date()}
                            onChange={() => {console.log("timePicker changed");}}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          DateRangePicker
                        </label>
                        <DateRangePicker
                            onChange={() => {console.log("DateRangePicker changed");}}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          DropDownList
                        </label>
                        <DropDownList
                          data={[1,2,3,4,5,6]}
                          defaultValue={1}
                          onChange={() => {console.log("DateRangePicker changed");}}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          MultiSelect
                        </label>
                        <MultiSelect
                        data={[1,2,3,4,5,6,7]} defaultValue={[ 1, 2 ]} />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          AutoComplete
                        </label>
                        <AutoComplete
                          data={[1,2,3,4,5,6]} placeholder="Your choice" />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Upload
                        </label>
                        <Upload
                            batch={false}
                            multiple={true}
                            defaultFiles={[]}
                            withCredentials={false}
                            saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                            removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Toolbar
                        </label>
                        <Toolbar>
                          <ToolbarItem>
                              <ButtonGroup>
                                  <Button togglable={true} icon="bold" />
                                  <Button togglable={true} icon="italic" />
                                  <Button togglable={true} icon="underline" />
                              </ButtonGroup>
                          </ToolbarItem>
                          <ToolbarItem>
                              <ButtonGroup>
                                  <Button icon="hyperlink">Insert Link</Button>
                                  <Button icon="image">Insert Image</Button>
                                  <Button icon="table">Insert Table</Button>
                              </ButtonGroup>
                          </ToolbarItem>
                      </Toolbar>
                      </FormGroup>
                    </Row>
                  </Form>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Icons;
