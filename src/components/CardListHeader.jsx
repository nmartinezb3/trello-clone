import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CardListHeader as StyledCardListHeader } from '../styles/CardList.styles';
import OutsideClickHandler from './OutsideClickHandler';
import ContentEditable from './ContentEditable';
import IconButton from './IconButton';
import * as UtilsHelper from '../helpers/utils';

const CardListHeader = props => {
  const ref = useRef(null);
  const [onHover, setOnHover] = useState(false);
  const [editListName, setEditListName] = useState(false);
  const [listName, setListName] = useState(props.listName);

  const toggleOnHover = () => {
    setOnHover(hover => !hover);
  };
  const onClickSaveEdit = () => {
    if (editListName) {
      props.onChangeListName(listName);
    }
    setEditListName(isEditing => !isEditing);
  };

  const onClickRemoveList = () => {
    props.onRemoveList();
  };

  useEffect(() => {
    if (editListName) {
      UtilsHelper.focusCursorToEnd(ref);
    }
  }, [editListName]);

  const onClickOutside = () => {
    setEditListName(false);
    props.onChangeListName(listName);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      setEditListName(false);
      ref.current.blur();
      const name = ref.current.innerText;
      props.onChangeListName(name);
    }
  };
  return (
    <OutsideClickHandler
      shouldListenClick={editListName}
      onClickOutside={onClickOutside}
    >
      <StyledCardListHeader
        onMouseEnter={toggleOnHover}
        onMouseLeave={toggleOnHover}
      >
        <ContentEditable
          innerRef={ref}
          html={listName}
          onChange={e => setListName(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: 24 }}
        />
        {(onHover || editListName) && (
          <IconButton.ButtonContainer
            top="11px"
            right={editListName ? '11px' : '30px'}
          >
            <IconButton
              onClick={onClickSaveEdit}
              type={editListName ? 'confirm' : 'edit'}
            />
          </IconButton.ButtonContainer>
        )}
        {onHover && !editListName && (
          <IconButton.ButtonContainer
            top="11px"
            right="11px"
          >
            <IconButton
              onClick={onClickRemoveList}
              type="delete"
            />
          </IconButton.ButtonContainer>
        )}
      </StyledCardListHeader>
    </OutsideClickHandler>
  );
};

CardListHeader.propTypes = {
  listName: PropTypes.string,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
};

export default CardListHeader;
