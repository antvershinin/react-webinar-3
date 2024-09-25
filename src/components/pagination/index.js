import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const [activePage, setActivePage] = useState(1);

  const callbacks = {};

  const handleClick = e => {
    const page = +e.target.getAttribute('value');
    page > 0 && setActivePage(+e.target.getAttribute('value'));
    props.onClickPage(page)
  };

  const renderPagination = page => {
    const elements = [];
    if (props.pageCount === 4 || props.pageCount === 5) {
      for (let i = 2; i < props.pageCount; i++) {
        elements.push(<div value={i}>{i}</div>);
      }
    } else if (page >= 1 && page <= 2) {
      for (let i = 2; i <= 3; i++) {
        elements.push(<div value={i}>{i}</div>);
      }
    } else if (page >= props.pageCount - 2) {
      for (let i = props.pageCount - 3; i <= props.pageCount - 1; i++) {
        elements.push(<div value={i}>{i}</div>);
      }
    } else {
      elements.push(
        <div value={activePage - 1}>{activePage - 1}</div>,
        <div value={activePage}>{activePage}</div>,
        <div value={activePage + 1}>{activePage + 1}</div>,
      );
    }
    return elements;
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')} onClick={e => handleClick(e)}>
        <div value={1}>1</div>
        {activePage > 3 && props.pageCount > 5 && <div>...</div>}
        {renderPagination(activePage)}
        {activePage < props.pageCount - 2 && props.pageCount > 5 && <div>...</div>}
        <div value={props.pageCount}>{props.pageCount}</div>
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
