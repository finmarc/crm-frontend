import React from "react";
import {
  Droppable,
  DragDropContext,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  name: string;
};

const List = ({ children, title, onDragEnd, name }: ListProps) => {
  return (
    <div className={"flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3"}>
      <h3 className={"text-sm font-medium text-gray-900"}>{title}</h3>
      <ul className={"mt-2"}>
        <Droppable droppableId={name}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef}>
                {children}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
    </div>
  );
};

export default List;
