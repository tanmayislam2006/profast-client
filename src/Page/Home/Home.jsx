import ExploreFeatures from "./ExploreFeatures";
import HowWorks from "./HowWorks";
import OurClient from "./OurClient";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <HowWorks/>
      <ExploreFeatures/>
      <OurClient/>
    </div>
  );
};

export default Home;
