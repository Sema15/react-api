import React, {Component} from 'react';

class About extends Component {

  componentDidMount() {
    this.receivedData()
  }

  receivedData() {
    fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11", {
      "method": "GET",
    })
        .then(response => response.json())
        .then(response => {
          this.setState({
            courses: response
          })
        })
        .catch(err => {
          console.log(err);
        });
  }

  render() {
    return (
        <div>
          {this.state && this.state.courses.map((course, index) => {
            return <React.Fragment key={index}>
              <p>{course.ccy} to {course.base_ccy}</p>
              <p>Покупка {course.buy}</p>
              <p>Продажа {course.sale}</p>
            </React.Fragment>
          })}
        </div>
    );
  }
}

export default About;
