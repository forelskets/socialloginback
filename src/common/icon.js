import React, { useState, useEffect, useLayoutEffect } from "react";
import { Collapse, Menu, Modal, Tabs } from "antd";
import images from "./../themes/appImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { drawerAction } from "./../redux/actions/authentication";

import { getMemoizedAuthenticationData } from "./../redux/selectors/authentication";

const { Panel } = Collapse;
const Icon1 = (props) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);

  const [imageSrc, setimageSrc] = useState(images.mobilecut);

  const authenticationData = useSelector(getMemoizedAuthenticationData);
  const { drawerState } = authenticationData;

  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useLayoutEffect(() => {
    if (resultIndex < 2) {
      setResultIndex(resultIndex + 1);
    } else {
      setResultIndex(0);
    }
  }, [imageSrc]);

  const handlewClick = () => {
    let action = drawerState ? false : true;
    dispatch(drawerAction(action, "drawerState"));
  };

  const _modelView = () => {
    return (
      <Modal
        centered
        width={500}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <img alt="" src={images.logohome} style={{ width: "200px" }} />
            <div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#000",
                  marginTop: "20px",
                  marginBottom: 0,
                }}
              >
                Privacy Settings
              </p>
              <p
                style={{
                  fontWeight: 700,
                }}
              >
                This tool helps you to select and deactivate various tags /
                trackers / analytic tools used on this website. More info see
                Privacy Statement
              </p>
            </div>
            <div>
              <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane tab="Categories" key="1">
                  <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
                    <Panel header="Marketing" key="1">
                      <p></p>
                    </Panel>
                    <Panel header="Functional" key="2">
                      <p></p>
                    </Panel>
                    <Panel header="Essential" key="3">
                      <p></p>
                    </Panel>
                    <Panel header="Statistics" key="4">
                      <p></p>
                    </Panel>
                  </Collapse>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Services" key="2">
                  <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
                    <Panel header="Marketing" key="1">
                      <p></p>
                    </Panel>
                    <Panel header="Functional" key="2">
                      <p></p>
                    </Panel>
                    <Panel header="Essential" key="3">
                      <p></p>
                    </Panel>
                    <Panel header="Statistics" key="4">
                      <p></p>
                    </Panel>
                  </Collapse>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <a
        className="floating-logo"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <img
          src={images.floatLogo}
          alt="logo"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      </a>
      {_modelView()}
    </div>
  );
};
export default Icon1;
