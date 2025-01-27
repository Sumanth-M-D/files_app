import Navbar from "./Navbar";

function Applayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Applayout;
