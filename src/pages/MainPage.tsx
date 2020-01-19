import React, { FunctionComponent } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './MainPage.css';

const MainPage: FunctionComponent = () => (<>
    <Carousel className="mainpage-carousel" controls={false}>
        <Carousel.Item className="slide-container slide-one">
            <Carousel.Caption>
                <h3>挑战自己</h3>
                <p>试试女装（图片是临时使用的）</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slide-container slide-two">
            <Carousel.Caption>
                <h3>相信自己</h3>
                <p>以及爱情（图片是临时使用的）</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
</>);

export default MainPage;
