import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export class MyConnection extends Component {
  state = {
    open: false,
  };

  handleMore = () => {
    if (this.state.open === false) {
      $(".menuMore").animate(
        {
          width: 200 + "px",
          height: 50 + "px",
          visibility: "visible",
        },
        50
      );

      this.setState({ open: true });
    } else {
    }
  };
  handleClickAway = () => {
    this.setState({
      open: false,
    });
    $(".menuMore").animate(
      {
        width: 0 + "px",
        height: 0 + "px",
      },
      50
    );
  };
  render() {
    const { myconnections } = this.props;
    return (
      <div className="connection-list">
        <h5>
          <p>{myconnections.length} Connections</p>
        </h5>
        {myconnections.length !== 0
          ? myconnections.map((r) => (
              <div className="card" style={{ backgroundColor: "#" }} key={r.id}>
                <div className="card-body d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div>
                      <Link
                        to={`/profile/${r.from_user.first_name}/${r.from_user.id}`}
                      >
                        <h5 className="card-title">
                          {r.from_user.first_name} {r.from_user.last_name}
                        </h5>
                      </Link>
                    </div>
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted inline-block">
                        {r.created.split("T")[0]}
                      </h6>
                    </div>
                  </div>
                  {/* <div> */}
                  <button
                    type="submit"
                    className="btns btn-second inline-block"
                    style={{ float: "right" }}
                    onClick={() => this.removeConnection(r.from_user.id)}
                  >
                    Remove Connection
                  </button>
                </div>
              </div>
            ))
          : "No Connections"}
      </div>
    );
  }
}

export default MyConnection;
