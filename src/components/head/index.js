import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { useLocale } from '../../hooks/localization/locale-provider';

function Head({ title }) {
  const { langList, changeLang } = useLocale()
  const cn = bem('Head');

  const handleChangeLang = (lang) => {
    changeLang(lang.code)
  }

  const renderLangButtons = () => {
    return langList.map((lang,index) => (
      <button onClick={e=>handleChangeLang(langList[index])}>{lang.name}</button>
    ))
  }

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('buttons-wrapper')}>{renderLangButtons()}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
