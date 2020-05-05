import React from "react";
import logo from "../../images/teenivo-elephant.png";
import SearchPeople from "../SearchPeople";
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import ForumIcon from "@material-ui/icons/Forum";
import rewardLogo from "../../images/reward-icon.png";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link, Router } from "react-router-dom";
import { getUser, removeUserSession } from "../../Utils/Common";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const user = getUser();
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0.5,
  },
  logo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: theme.spacing(10),
    },
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999999",
  },
  sectionDesktop: {
    //  display: "inline-block",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      color: "white",
      marginLeft: "100px",
      marginRight: "120px",
    },
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [removeUser, setRemoveUser] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  React.useEffect(() => {
    if (isLoading === true) {
      getProfile();
    }
  }, [isLoading]);

  const getProfile = () => {
    if (user.length !== 0) {
      const id = user.id;
      const url = `https://teenivoapi.herokuapp.com/accounts/profilesId/${id}`;
      axios.get(url).then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      });
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    removeUserSession();
    setRemoveUser(true, redirectToSigin());
  };
  const redirectToSigin = () => {
    if (!removeUser) {
      return <Redirect to="/signin" />;
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "middle", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "middle", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to={"/myProfile"}>
        <MenuItem>My Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  return (
    <div className="Appbar">
      <nav class="navbar-light justify-content-center navbar-expand-sm">
        <div className="justify-content-center nav-logo inline-block">
          <img className="" src={logo} alt="logo" />
        </div>
        <SearchPeople />
        {/* <div className={classes.grow} style={{ display: "inline-block" }} /> */}
        <div
          className={classes.sectionDesktop}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <IconButton
            aria-label="Home Section"
            color="inherit"
            classes={{ label: classes.iconButtonLabel }}
            style={{ padding: "0px 20px" }}
          >
            <Link to={"/feed"} style={{ color: "white" }}>
              <HomeIcon />
              <div>Home</div>
            </Link>
          </IconButton>
          <IconButton
            aria-label="My Friends section"
            color="inherit"
            classes={{ label: classes.iconButtonLabel }}
            style={{ padding: "0px 20px" }}
          >
            <Link to={"/mynetwork"} style={{ color: "white" }}>
              <PeopleIcon />
              <div>My Friends</div>
            </Link>
          </IconButton>
          <IconButton
            aria-label="Messages Section"
            color="inherit"
            classes={{ label: classes.iconButtonLabel }}
            style={{ padding: "0px 20px" }}
          >
            <ForumIcon />
            <div>Messaages</div>
          </IconButton>
          <IconButton
            aria-label="show 17 new notifications"
            color="inherit"
            classes={{ label: classes.iconButtonLabel }}
            style={{ padding: "0px 20px" }}
          >
            <NotificationsActiveIcon />
            <div>Notifications</div>
          </IconButton>
          <IconButton
            aria-label="My Points section"
            color="inherit"
            style={{ padding: "0px 20px" }}
          >
            <div className="mypoint-icon d-flex flex-column">
              <img src={rewardLogo} alt="My Points icon"></img>
              <label>My Points</label>
            </div>
          </IconButton>

          {/* <IconButton
            edge="end"
            aria-controls={menuId}
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            classes={{ label: classes.iconButtonLabel }}
            style={{ padding: "0px" }}
          >
            <div className="profile-photo">
              <img src={users.header_photo} alt="profie of user"></img>
              <div>Me</div>
            </div>
          </IconButton> */}
          <IconButton
            aria-label="Me Dropdown"
            color="inherit"
            style={{ padding: "0px 20px", height: "64px" }}
          >
            <button
              className="navbar-toggler nav-btn"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown position-static">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ padding: "0px" }}
                  >
                    <div className="profile-photo inline-block justify-content-center">
                      <img src={users.header_photo} alt="profie of user"></img>
                      <div>Me</div>
                    </div>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="myProfile">
                      View Profile
                    </a>
                    <a className="dropdown-item" href="myProfile">
                      Sign out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </IconButton>
        </div>
      </nav>
      {renderMenu}
      {redirectToSigin}
    </div>
  );
}
