import ExploreFeatures from "./ExploreFeatures";
import HowWorks from "./HowWorks";
import Marchent from "./Marchent";
import OurClient from "./OurClient";
import OurServices from "./OurServices";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <HowWorks/>
      <OurServices/>
      <ExploreFeatures/>
      <Marchent/>
      <OurClient/>
    </div>
  );
};

export default Home;
