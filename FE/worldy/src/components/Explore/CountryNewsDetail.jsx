import "./styles.scss";

import React, { useState } from "react";

import {ReactComponent as ArrowBackIosNewIcon} from "../../assets/images/arrowback.svg";
import {ReactComponent as ArrowForwardIosIcon}  from "../../assets/images/arrowfront.svg";
import {ReactComponent as LinkIcon}  from "../../assets/images/glyph.svg";

const MAX_VISIBILITY = 2;

const Card = props => (
  <div className="flex flex-col w-[550px] h-[700px] rounded-3xl decoration-[#9ca3af] text-justify ease-out duration-300 justify-end" >
    <div
      className="rounded-t-3xl"
      style={{
        flex: "0.4",
        width: "100%",
        backgroundImage: `url(${props.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
    />
    <div className="pr-[1rem] pb-[0.5rem] pl-[1rem] bg-white rounded-b-3xl flex flex-col items-center" style={{ flex:"0.6", width:"100%"}}>
      <div className="flex text-4xl font-extrabold pt-10 pb-10 pl-20 pr-20">{props.title}</div>
      <p className="h-1/2 pl-10 pr-10 pb-10 inline-block whitespace-normal ">{props.content}</p>

      {/* {props.content ? (
        props.content.length < 500 ? (
          <div className="flex-4 pl-10 pr-10 pb-10 inline-block whitespace-nowrap " >{props.content}</div>
          ) 
          : null
          // (
          //   <div className="flex-4 pl-10 pr-10 pb-10 inline-block whitespace-normal">{props.content.substr(0, 500) + "..."}</div>
          //   )
            ) : null} */}
      <div 
        className="flex flex-row pt-10 pb-10 justify-between items-center " 
        onClick={event => {
          // event.preventDefault();
          window.open(props.link)
        }}>
        <LinkIcon className="w-5 mr-5  "/>
        <div className="text-xl text-color text-blue-500  cursor-pointer">뉴스 전문보기</div> 
      </div>            
    </div>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(1);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <ArrowBackIosNewIcon className="nav left" style={{ width: "3rem" }} onClick={() => setActive(i => i - 1)}/>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointerEvents": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <ArrowForwardIosIcon className="nav right" style={{ width: "3rem" }} onClick={() => setActive(i => i + 1)}/>
      )}
    </div>
  );
};

const CountryNewsDetail = props => {
  return (
    <div className="flex flex-row">
      <Carousel>
        {props.data.map((item, idx) => {
          return (
            <Card
              title={item.title.length <= 15 ? item.title : item.title.substr(0, 15) + "..."}
              content={
                item.summary
                  ? item.summary.length <= 30
                    ? item.summary
                    : item.summary.substr(0, 30) + "..."
                  : null
              }
              src={item.thumbnailLink || item.thumbnail}
              link={item.link || item.url}
              key={idx}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default CountryNewsDetail;
