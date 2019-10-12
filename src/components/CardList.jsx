import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { CardListContainer } from '../styles/CardList.styles';
import CardListHeader from './CardListHeader';

const CardList = props => {
  return (
    <div>
      <CardListHeader
        listName={props.listName}
        onChangeListName={props.onChangeListName}
        onRemoveList={props.onRemoveList}
      />
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <CardListContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {props.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onChangeCardContent={content => props.onChangeCardContent(index, content)}
              />
            ))}
            {provided.placeholder}
          </CardListContainer>
        )}
      </Droppable>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.object,
  onChangeCardContent: PropTypes.func,
  listName: PropTypes.string,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  droppableId: PropTypes.string
};
export default CardList;
