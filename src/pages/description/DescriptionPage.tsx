import React, { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './DescriptionPage.css';
import microsoft from './microsoft.png';
import whatIsHackathon from './what_is_hackathon.png';

// TODO: need documentions!
const DescriptionPage: FunctionComponent = () => (
  <>
    <Container className="header-container position-relative" fluid={true}>
      <Row className="header-content-row position-absolute text-white">
        <Col>
          <h1>欢迎参加四校黑客松2020！</h1>
          <h4 className="font-weight-light">
            本次比赛将于<u>2月30日</u>在<u>中山带学</u>正式进行。
            <Link to="/signup">立刻报名！</Link>
          </h4>
        </Col>
      </Row>
    </Container>
    <Container fluid={true} className="content-item">
      <Row>
        <Col as="h2">
          <span className="font-weight-light">黑客松，</span>是什么？
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col sm={6}>
          <img
            className="img-fluid"
            src={whatIsHackathon}
            alt="What is Hackathon"
          />
        </Col>
      </Row>
    </Container>
    <Container fluid={true} className="content-item custom-bg-gray">
      <Row>
        <Col as="h2">
          <span className="font-weight-light">那么，</span>谁能参加呢？
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <h4>在校带学生</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col sm={4}>
          <h4>毕业生</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col sm={4}>
          <h4>任何人</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
    </Container>
    <Container fluid={true} className="content-item">
      <Row>
        <Col as="h2">
          <span className="font-weight-light">我...还有点</span>犹豫。
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <h4>我够格吗？</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col sm={6}>
          <h4>比赛流程会不会很麻烦？</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <h4>我要不要女装参赛呢？</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col sm={6}>
          <h4>包吃包住吗？</h4>
          {/* tslint:disable-next-line: max-line-length */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
    </Container>
    <Container fluid={true} className="content-item custom-bg-green">
      <Row>
        <Col as="h2" className="text-white">
          <span className="font-weight-light">既然如此，</span>我想来试试！
        </Col>
      </Row>
      <Row>
        <Col className="text-white">
          找几个小伙伴组个队伍，然后
          <u>
            <Link to="/signup" className="text-white">
              点击这里
            </Link>
          </u>
          填写报名表吧！
        </Col>
      </Row>
    </Container>
    <Container fluid={true} className="content-item">
      <Row>
        <Col as="h2">
          <span className="font-weight-light">比赛赞助商</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <img className="img-fluid" src={microsoft} alt="Microsoft logo" />
        </Col>
      </Row>
    </Container>
  </>
);

export default DescriptionPage;
