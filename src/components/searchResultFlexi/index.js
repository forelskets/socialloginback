import React, { useState, useEffect, useLayoutEffect } from "react";
import images from "../../themes/appImage";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";

import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import Icon1 from "../../common/icon";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { Col, Row } from "antd";
import { Card, Paper, Button } from "@material-ui/core";
import { getFlexiTktDetailInitiate } from "../../redux/actions/flexiTickets";
import { getMemoizedFlexiTicketsData } from "../../redux/selectors/flexiTickets";

const SearchResult = (props) => {
  const [fareDetails, setFareDetails] = useState({});
  const [standardPrice, setStandardPrice] = useState([]);
  const [firstPrice, setFirstPrice] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const searchedData = state?.data ? JSON.parse(state?.data) : "";
  const user = JSON.parse(localStorage.getItem("userDetails"));

  console.log("searchedData", searchedData);
  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
    if (!searchedData) {
      navigate("/newBokkings");
    } else {
      dispatch(getFlexiTktDetailInitiate(searchedData, navigate));
    }
    setStandardPrice(
      searchedData.price?.standard.map((e, k) => {
        if (
          e.d.m == searchedData.duration.m &&
          e.d.d == searchedData.duration.d
        ) {
          setFareDetails({ type: "Standard", ...e });
          e.active = true;
        }
        return e;
      })
    );
    setFirstPrice(searchedData.price?.first);
    return () => {
      // setTotalAmount(0);
      // dispatch(updateNewBookingsState({}, "searchTrainList"));
    };
  }, []);

  const flexiTicketsData = useSelector(getMemoizedFlexiTicketsData);
  // const { requestFlexiTktDetails } = flexiTicketsData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const CheckOutHandler = (e, data) => {
    e.preventDefault();
    setFareDetails(data);
    setStandardPrice(
      standardPrice.map((e) => {
        e.active =
          e.d.m === data.d.m && e.d.d === data.d.d && data.type === "Standard";
        return e;
      })
    );
    setFirstPrice(
      firstPrice.map((e) => {
        e.active =
          e.d.m === data.d.m && e.d.d === data.d.d && data.type === "First";
        return e;
      })
    );
    window.scroll({ top: 600, behavior: "smooth" });
  };

  const handleCheckout = () => {
    const data = searchedData;
    data.price = fareDetails.p;
    data.duration = fareDetails.d;
    data.validUpto = fareDetails.v;
    data.class = fareDetails.type;
    data.travellers = [
      {
        key: user?._id,
        title: user?.title,
        firstName: user?.firstName,
        lastName: user?.lastName,
        age: 22,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
    ];
    navigate("/basketFlexi", {
      state: { data: JSON.stringify(data) },
    });
  };

  const findDuration = (d) => {
    let str = "";
    if (d.m > 0) {
      str += d.m + (d.m > 1 ? " Months" : " Month");
    }
    if (d.d > 0) {
      str += " " + d.d + (d.d > 1 ? " Days" : " Day");
    }
    return str;
  };

  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />

      <div className="press" style={{ marginTop: "100px" }}>
        <div className="container-fluid">
          <h2 className="line">
            Search <span className="color-d">Result</span>
          </h2>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
              <br />
              <br />
              <Row
                style={{
                  rowGap: "15px",
                  justifyContent: "flex-end",
                  marginRight: "calc(2.5% + 15px)",
                }}
              >
                {searchedData.price?.first.map((ele) => (
                  <Card
                    style={{
                      borderRadius: 20,
                      marginRight: "15px",
                      width: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(222,222,222,1)",
                    }}
                  >
                    <div
                      className="color1"
                      style={{
                        width: "100%",
                        height: "2.3rem",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        textAlign: "center",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "100%",
                        height: "2.3rem",
                        textAlign: "center",
                      }}
                    >
                      <h6
                        style={{
                          color: "#00D9B2",
                          paddingTop: ".7rem",
                          fontWeight: 600,
                        }}
                      >
                        Flexi
                      </h6>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem .5rem .5rem",
                      }}
                    >
                      <h6 style={{ padding: "0", fontWeight: 700 }}>
                        {findDuration(ele.d)}
                      </h6>

                      {/* <h6>
                        <small>
                          <b>28 Days</b>
                        </small>
                      </h6> */}
                    </div>
                  </Card>
                ))}
              </Row>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <h4
            style={{
              margin: "2rem 0 1rem 2rem",
              color: "#00D9B2",
              fontWeight: 700,
            }}
          >
            Standard Class
          </h4>
          <div style={{ width: "95%", margin: "auto" }}>
            <Row
              gutter={24}
              style={{
                background: "rgb(247 247 247)",
                borderRadius: "10px",
                marginTop: "10px",
                padding: ".5rem",
              }}
            >
              <Col span={8} style={{ paddingLeft: "2rem" }}>
                <Row gutter={12}>
                  <h6 style={{ fontWeight: 800 }}>
                    {searchedData.source} to {searchedData.destination}
                  </h6>
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  Not valid for travel via (Changing trains of passing through)
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  London Tarminal
                </Row>
              </Col>
              <Col
                span={16}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {standardPrice.map((ele) => (
                  <Button
                    variant="contained"
                    component={Paper}
                    style={{
                      marginRight: "15px",
                      background: "white",
                      borderRadius: 8,
                      minWidth: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(207,207,207,1)",
                    }}
                    className={ele?.active && "active"}
                    onClick={(e) =>
                      CheckOutHandler(e, { type: "Standard", ...ele })
                    }
                  >
                    £{ele.p}
                  </Button>
                ))}
              </Col>
            </Row>
          </div>
        </div>
        <div className="container-fluid">
          <h4
            style={{
              margin: "2rem 0 1rem 2rem",
              color: "#00D9B2",
              fontWeight: 700,
            }}
          >
            First Class Fares
          </h4>
          <div style={{ width: "95%", margin: "auto" }}>
            <Row
              gutter={24}
              style={{
                background: "rgb(247 247 247)",
                borderRadius: "10px",
                marginTop: "10px",
                padding: ".5rem",
              }}
            >
              <Col span={8} style={{ paddingLeft: "2rem" }}>
                <Row gutter={12}>
                  <h6 style={{ fontWeight: 800 }}>
                    {searchedData.source} to {searchedData.destination}
                  </h6>
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  Not valid for travel via (Changing trains of passing through)
                </Row>
                <Row gutter={12} style={{ fontWeight: 600, fontSize: "15px" }}>
                  London Tarminal
                </Row>
              </Col>
              <Col
                span={16}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {firstPrice.map((ele) => (
                  <Button
                    variant="contained"
                    component={Paper}
                    style={{
                      marginRight: "15px",
                      background: "white",
                      borderRadius: 8,
                      minWidth: "8rem",
                      boxShadow: "0px 0px 35px 0px rgba(207,207,207,1)",
                    }}
                    className={ele?.active && "active"}
                    onClick={(e) =>
                      CheckOutHandler(e, { type: "First", ...ele })
                    }
                  >
                    £{ele.p}
                  </Button>
                ))}
              </Col>
            </Row>
          </div>
        </div>

        {fareDetails && (
          <div className="container-fluid" style={{ marginTop: "2rem" }}>
            <hr />
            <Row gutter={24}>
              <Col span={14}></Col>
              <Col span={10}>
                <Row gutter={24}>
                  <Col span={12}>
                    <h5
                      style={{
                        fontWeight: 800,
                        fontSize: "22px",
                        color: "#00D9B2",
                      }}
                    >
                      Checklist
                    </h5>
                    <h6 className="d-flex align-item-center">
                      <CheckCircleFilled
                        style={{ fontSize: "16px", color: "rgb(0, 187, 156)" }}
                      />
                      &nbsp; Journey Selected
                    </h6>
                    {/* <h6 className="d-flex align-item-center">
                      <CloseCircleFilled
                        style={{ fontSize: "16px", color: "red" }}
                      />
                      &nbsp; Traveller Name Completed
                    </h6> */}
                  </Col>
                  <Col
                    span={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div align="right" style={{ paddingRight: "40px" }}>
                      <h5
                        style={{
                          fontWeight: 700,
                          fontSize: "22px",
                          color: "#00D9B2",
                          display: "inline",
                        }}
                      >
                        Fare
                      </h5>
                      <h5
                        style={{
                          fontWeight: 800,
                          fontSize: "20px",
                          // color: "#00D9B2",
                          display: "inline",
                          margin: "1rem",
                        }}
                      >
                        £{fareDetails.p}
                      </h5>
                    </div>
                    <div
                      style={{
                        paddingLeft: "120px",
                        paddingRight: "40px",
                        paddingTop: "15px",
                      }}
                    >
                      <Button
                        className="color1"
                        style={{
                          color: "white",
                          width: "100%",
                        }}
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <FooterMain />

      <Icon1 handleClick={handlewClick} />
    </div>
  );
};
export default SearchResult;
