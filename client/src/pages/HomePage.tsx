import Applayout from "../components/general/Applayout";
import Folders from "../components/home/Folders";

function HomePage() {
  return (
    <div>
      <Applayout>
        <Folders />
      </Applayout>
    </div>
  );
}

export default HomePage;
