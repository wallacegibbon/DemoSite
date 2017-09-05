import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import reqSvc from "./reqSvc";


class Body extends Component {

  reqIsLoggedIn = async () => {
    try {
      const r = await reqSvc({ action: "IsLoggedIn" });
      if (r.status !== "success") {
        console.error("Failed IsLoggedIn:", r);
        return;
      }

      this.props.logInfoAcknowledge(r.data);
    } catch (e) {
      console.error("reqSvc failed:", e);
    }
  }

  componentDidMount() {
    this.reqIsLoggedIn();
  }

  render() {
    return this.props.children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logInfoAcknowledge: isLoggedIn => {
      if (isLoggedIn) dispatch({ type: "LOGIN" });
      else dispatch({ type: "LOGOUT" });
    }
  }
}


export default withRouter(
  connect(null, mapDispatchToProps)(Body)
);

