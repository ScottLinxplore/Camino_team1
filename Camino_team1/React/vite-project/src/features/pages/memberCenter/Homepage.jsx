import React from "react";
import Navbar1 from "../../homepage/Navbar1";
import Banner from "../../homepage/Banner";
import Navbar2 from "../../homepage/Navbar2";
import Package from "../../homepage/Package";
import RouteInfo from "../../homepage/RouteInfo";
import RoutePlanning from "../../homepage/RoutePlanning";
import Info from "../../homepage/Info";
import Feedback from "../../homepage/Feedback";
import About from "../../homepage/About";
import Footer from "../../homepage/Footer";

function Homepage({ routes }) {
  return (
    <>
      <Banner />
      <Navbar2 />
      <Package routes={routes} />
      <RouteInfo routes={routes} />
      <RoutePlanning routes={routes} />
      <Info />
      <Feedback />
      <About />
    </>
  );
}

export default Homepage;
