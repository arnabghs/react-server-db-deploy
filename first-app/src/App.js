import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { details: [] };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let name = data.get("firstname");
    event.target.reset();
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify({ name });
    fetch("/add_name", { method: "POST", headers, body })
      .then(res => res.json())
      .then(jsonData => this.setState({ details: jsonData.details }));
  }

  showNames(details) {
    return details.map(detail => (
      <div>
        {" "}
        {detail.name} launched missile at {detail.time}{" "}
      </div>
    ));
  }

  componentDidMount() {
    fetch("/get_details")
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ details: jsonData.details });
      });
  }

  render() {
    return (
      <div className="launching-platform">
        <div className="launched-missile-details">Missile Launch Info :</div>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              First name:
              <input type="text" name="firstname" required />
            </label>

            <input className="launch-button" type="submit" value="Launch" />
          </form>
        </div>
        <div>{this.showNames(this.state.details)} </div>
      </div>
    );
  }
}

export default App;
