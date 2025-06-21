import ExploreFeatures from "./ExploreFeatures";
import FAQ from "./FAQ";
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
      <FAQ/>
    </div>
  );
};

export default Home;
