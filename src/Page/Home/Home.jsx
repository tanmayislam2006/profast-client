import CustomerReview from "./CustomerReview";
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
      <HowWorks />
      <OurServices />
      <OurClient />
      <ExploreFeatures />
      <Marchent />
      <CustomerReview />
      <FAQ />
    </div>
  );
};

export default Home;
