import { useState } from 'react';
import EventCard from '../../components/EventCard';
import Select from '../../components/Select';
import { useData } from '../../contexts/DataContext';
import Modal from '../Modal';
import ModalEvent from '../ModalEvent';
import './style.scss';

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState('Toutes');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
    (event, index) => {
      if (
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
      ) {
        return true;
      }
      return false;
    }
  );

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events?.map((event) => event.type));

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  let allEventsByType = [];
  const filterEventByTheme = (events) => {
    let filteredEventPerPage = [];
    events?.forEach((event) => {
      if (type === 'Toutes') {
        filteredEventPerPage = allEventsByType;
        allEventsByType.push(event);
      } else if (event.type === type) {
        filteredEventPerPage = events.filter((event) => event.type === type);
        allEventsByType.push(event);
      }
    });
    return filteredEventPerPage.slice(
      (currentPage - 1) * PER_PAGE,
      currentPage * PER_PAGE
    );
  };

  return (
    <>
      {error && <div>Il semble y avoir une erreur</div>}
      <>
        <h3 className="SelectTitle">Catégories</h3>
        <Select
          selection={Array.from(typeList)}
          value={type}
          onChange={changeType}
        />
        <div id="events" className="ListContainer">
          {filterEventByTheme(data?.events).map((event) => (
            <Modal key={event.id} Content={<ModalEvent event={event} />}>
              {({ setIsOpened }) => (
                <EventCard
                  onClick={() => setIsOpened(true)}
                  imageSrc={event.cover}
                  title={event.title}
                  date={new Date(event.date)}
                  label={event.type}
                />
              )}
            </Modal>
          ))}
        </div>
        <div className="Pagination">
          {allEventsByType.length > PER_PAGE ? (
            [...Array(pageNumber || 0)].map((_, n) => (
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))
          ) : (
            <a key={1} href="#events">
              {1}
            </a>
          )}
        </div>
      </>
    </>
  );
};

export default EventList;
