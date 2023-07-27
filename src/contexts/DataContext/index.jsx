import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Loader from '../../components/Loader';

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch(
      'https://chloegerry.github.io/Debugguer-P10/events.json'
    );
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      <Loader />;
      setError(true);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);

  return (
    <DataContext.Provider
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
