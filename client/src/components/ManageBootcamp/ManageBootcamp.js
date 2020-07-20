import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AddBootcamp from "./AddBootcamp";
import EditBootcamp from "./EditBootcamp";
import Spinner from "../Spinner/Spinner";

const ManageBootcamp = ({ user, loading, bootcamp }) => {
  if (user && user.role === "user") {
    return <Redirect to="/bootcamps" />;
  }

  return loading ? (
    <Spinner />
  ) : user.bootcamps.length > 0 || bootcamp ? (
    <EditBootcamp />
  ) : (
    <AddBootcamp />
  );
};

ManageBootcamp.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  bootcamp: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  bootcamp: state.bootcamps.bootcamp,
});

export default connect(mapStateToProps)(ManageBootcamp);
