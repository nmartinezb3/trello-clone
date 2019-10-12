import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BoardContainer } from '../styles/Board.styles';
import CardList from '../components/CardList';
import {
  addCard,
  removeCard,
  addList,
  removeList,
  reOrderList,
  moveCardToList,
  setCardContent,
  setListName
} from '../actions/boardActions';

const Board = props => {
  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // Dropped in the same list
      props.reOrderList(source.droppableId, source.index, destination.index);
    } else {
      // Drop in other list
      props.moveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index,

      );
    }
  };
  return (
    <div>
      <BoardContainer countColumns={5}>
        <DragDropContext onDragEnd={onDragEnd}>
          {props.lists.map((list, listIndex) => (
            <CardList
              key={list.id}
              droppableId={list.id}
              list={list}
              onChangeListName={listName => props.onChangeListName(listIndex, listName)}
              onRemoveList={() => props.onRemoveList(listIndex)}
              onChangeCardContent={(cardIndex, content) => props.onChangeCardContent(listIndex, cardIndex, content)}
              searchText={props.search}
            />
          ))}
        </DragDropContext>
      </BoardContainer>
      <button onClick={() => props.addList('La nueva lista')}> Agregar lista</button>
    </div>
  );
};

Board.propTypes = {
  reOrderList: PropTypes.func,
  moveCardToList: PropTypes.func,
  lists: PropTypes.array,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  onChangeCardContent: PropTypes.func,
  search: PropTypes.string,
  addList: PropTypes.func,
};
const mapStateToProps = state => ({
  lists: state.board.lists,
  search: state.board.search,
});

const mapDispatchToProps = dispatch => ({
  addCard: bindActionCreators(addCard, dispatch),
  removeCard: bindActionCreators(removeCard, dispatch),
  addList: bindActionCreators(addList, dispatch),
  removeList: bindActionCreators(removeList, dispatch),
  reOrderList: bindActionCreators(reOrderList, dispatch),
  moveCardToList: bindActionCreators(moveCardToList, dispatch),
  onChangeCardContent: bindActionCreators(setCardContent, dispatch),
  onChangeListName: bindActionCreators(setListName, dispatch),
  onRemoveList: bindActionCreators(removeList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
