import React from "react";
import Marquee from "react-fast-marquee";
import Brand2 from "../../assets/brands/amazon_vector.png";
import Brand3 from "../../assets/brands/casio.png";
import Brand4 from "../../assets/brands/start.png";
import Brand5 from "../../assets/brands/start-people 1.png";
import Brand6 from "../../assets/brands/moonstar.png";
import Brand7 from "../../assets/brands/randstad.png";
const OurClient = () => {
  return (
    <div className="my-20">
      <Marquee className="" pauseOnHover={true} speed={80}>
        <img src={Brand2} className="ml-10" alt="" />
        <img src={Brand3} className="ml-10" alt="" />
        <img src={Brand4} className="ml-10" alt="" />
        <img src={Brand5} className="ml-10" alt="" />
        <img src={Brand6} className="ml-10" alt="" />
        <img src={Brand7} className="ml-10" alt="" />
      </Marquee>
    </div>
  );
};

export default OurClient;
