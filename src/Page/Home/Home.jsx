import ExploreFeatures from "./ExploreFeatures";
import HowWorks from "./HowWorks";
import Marchent from "./Marchent";
import OurClient from "./OurClient";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <HowWorks/>
      <ExploreFeatures/>
      <Marchent/>
      <OurClient/>
    </div>
  );
};

export default Home;
