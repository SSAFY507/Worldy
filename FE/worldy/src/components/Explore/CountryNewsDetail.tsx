import "./styles.scss";

import React, { useState } from "react";

import {AiOutlineLeft} from 'react-icons/ai'
import {ReactComponent as ArrowBackIosNewIcon} from "../../assets/images/arrowback.svg";
import {ReactComponent as ArrowForwardIosIcon}  from "../../assets/images/arrowfront.svg";
import {ReactComponent as LinkIcon}  from "../../assets/images/glyph.svg";
import {NewsDataType} from "./CountrySpeak";

interface CardProps {
  title: string;
  content: string;
  src: string;
  link: string;
};

interface CarouselProps {
  children: React.ReactNode[] | undefined;
};

interface CountryNewsDetailProps {
  axiosGetNewsData: NewsDataType[] | undefined;
};

const MAX_VISIBILITY = 1;

const Card = (props:CardProps) => (
  <div className="flex flex-col w-[550px] h-[700px] rounded-3xl decoration-[#9ca3af] text-justify ease-out duration-300 justify-end shadow-2xl" >
    <div
      className="rounded-t-3xl"
      style={{
        height: "300px",
        width: "100%",
        backgroundImage: `url(${props.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
    />
    <div className="h-[400px] pr-[1rem] pb-[2.0rem] pl-[1rem] bg-white rounded-b-3xl flex flex-col items-center" style={{ flex:"0.6", width:"100%"}}>
      <div className="h-[200px] text-3xl text-center py-10 pl-20 pr-20 font-PtdExtraBold inline-block ">{props.title}</div>
      <p className="h-[200px] text-xl opacity-50 pl-10 pr-10 text-center inline-block whitespace-normal font-PtdRegular overflow-auto">{props.content}</p>
      <div 
        className="h-[100px] flex flex-row pt-5 justify-between items-center " 
        onClick={event => {
          // event.preventDefault();
          window.open(props.link)
        }}>
        <LinkIcon className="w-5 mr-5  "/>
        <div className="text-xl text-color text-blue-500  cursor-pointer font-PtdRegular">뉴스 전문보기</div> 
      </div>            
    </div>
  </div>
);

const Carousel = ({ children }:CarouselProps) => {
  const count = children!.length;
  const [active, setActive] = useState<number>(Math.floor(count / 2));

  return (
    <div className="carousel">
      {active > 0 && (
        <ArrowBackIosNewIcon className="nav left" onClick={() => setActive(i => (i + count - 1) % count)}/>
        )}
      {/* <ArrowBackIosNewIcon className="nav left" style={{ width: "3rem" }} onClick={() => setActive(i => (i + count - 1) % count)}/> */}
      {children!.map((child, i) => (
        <div
          key={i}
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 2,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointerEvents": active === i ? "auto" : "none",
            // opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "1" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }as React.CSSProperties}
        >
          {child}
        </div>
      ))}
      {/* <AiOutlineLeft className="nav right" /> */}
      {/* <ArrowForwardIosIcon className="nav right shadow-none" style={{ width: "3rem" }} onClick={() => setActive(i => (i + 1) % count)}/> */}
      {active < count - 1 && (
        <ArrowForwardIosIcon className="nav right" onClick={() => setActive(i => (i + 1) % count)}/>
      )}
    </div>
  );
};

const CountryNewsDetail = ({axiosGetNewsData}:CountryNewsDetailProps) => {
  return (
    <Carousel>
      {axiosGetNewsData!.map((item, idx) => {
        return (
          <Card
            key={idx}
            title={item.newsTitle.length <= 30 ? item.newsTitle : item.newsTitle.substr(0, 30) + "..."}
            content={item.newsSummary}
              // item.newsSummary
              //   ? item.newsSummary.length <= 100
              //     ? item.newsSummary
              //     : item.newsSummary.substr(0, 100) + "..."
              //   : null
            // }
            src={item.newsImg}
            link={item.newsUrl}
          />
        );
      })}
    </Carousel>
  );
};

export default CountryNewsDetail;
