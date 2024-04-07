import PulseLoader from 'react-spinners/PulseLoader';
import { useTranslation } from 'react-i18next';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div className="w-100 h-100 d-flex align-items-center">
      <PulseLoader
        color="#adb5bd"
        loading
        cssOverride={override}
        size={10}
        aria-label={t('spinnerLabel')}
      />
    </div>
  );
};
export default Spinner;
