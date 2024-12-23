import { ThreeDots } from "react-loader-spinner";

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = "#4fa94d" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color={color}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Loader;
