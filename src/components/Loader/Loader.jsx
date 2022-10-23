import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Spinner = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
};
