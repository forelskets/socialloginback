import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import images from "../../themes/appImage";
import { Collapse, Select, DatePicker, Space } from "antd";
import { Radio, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemoizedAuthenticationData } from "../../redux/selectors/authentication";
import { drawerAction } from "../../redux/actions/authentication";
import MobileSidebar from "../../common/mobilesidebar";
import HeaderMain from "../../common/header";
import FooterMain from "../../common/footer";
import { appConstants } from "../../themes/appConstant";
const { Option } = Select;

const PrivacyPolicy = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(1);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };
  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MobileSidebar isVisible={drawerState} handlewClick={handlewClick} />
      <HeaderMain handleClick={handlewClick} />
      <div className="mobileabout text-item">
        <div className="container-fluid spacert">
          <h3>{appConstants.privacy}</h3>
        </div>
      </div>
      <div className="press">
        <div className="container">
          {/* <h2 className="line">{appConstants.privacy}</h2> */}
          {/* <div className="text-line" style={{ paddingBottom: "20px" }}>
            <img src={images.border1} style={{ width: "400px" }} />
          </div> */}
          <div className="">
            <div class="line-text_text investors">
              <p>
                Welcome to Passengerhub’s Privacy Policy. When you use our
                services, you're trusting us with your information. This Privacy
                Policy will inform you as to how we look after your personal
                data when you use our services. We understand this is a big
                responsibility and we work hard to protect your personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};
export default PrivacyPolicy;
