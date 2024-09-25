import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const [activePage, setActivePage] = useState(props.activePage);

  const callbacks = {};

  const handleClick = page => { 
    page > 0 && setActivePage(page);
    page > 0 && props.onClickPage(page);
  };

  const renderPagination = page => {
    const pages = [];
    if (props.pageCount === 4 || props.pageCount === 5) {
      for (let i = 2; i < props.pageCount; i++) {
        pages.push(i);
      }
    } else if (page >= 1 && page <= 2) {
      for (let i = 2; i <= 3; i++) {
        pages.push(i);
      }
    } else if (page >= props.pageCount - 2) {
      for (let i = props.pageCount - 3; i <= props.pageCount - 1; i++) {
        pages.push(i);
      }
    } else {
      pages.push(activePage - 1, activePage, activePage + 1);
    }
    return pages.map(el => (
      <button value={el} className={activePage === el ? 'active' : ''}>{el}</button>
    ));
  };

  useEffect(()=>{
    setActivePage(props.activePage)
  },[props.activePage])

  return (
    <div className={cn()}>
      <div className={cn('wrapper')} onClick={e => handleClick(+e.target.value)}>
        <button className={activePage === 1 ? 'active' : ''} value={1}>1</button>
        {activePage > 3 && props.pageCount > 5 && <div className={cn('divider')}>...</div>}
        {renderPagination(activePage)}
        {activePage < props.pageCount - 2 && props.pageCount > 5 && <div className={cn('divider')}>...</div>}
        <button className={activePage === props.pageCount ? 'active' : ''} value={props.pageCount}>{props.pageCount}</button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number,
  onClickPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default memo(Pagination);
