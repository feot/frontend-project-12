import PulseLoader from 'react-spinners/PulseLoader';

const override = {
  display: "inline-block",
  margin: "0 auto",
};

const Spinner = () => (
  <div className="w-100 h-100 d-flex align-items-center">
    <PulseLoader
      color="#adb5bd"
      loading={true}
      cssOverride={override}
      size={10}
      aria-label="Loading Spinner"
    />
  </div>
)
export default Spinner;
