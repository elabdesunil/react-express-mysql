import React, { Component } from "react";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  async componentDidMount() {
    console.log("try 1");
    const res = await fetch("/api/students");
    console.log("try 2");
    console.log("res ", res);
    const data = await res.json();
    console.log("try");
    console.log(data);
    this.setState({
      students: data
    });
  }
  render() {
    console.log(this.state.students);
    return this.state.students ? (
      <div>{this.state.students.map(el => el.firstName)} test </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Students;
