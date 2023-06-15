import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Card } from './card'
import List from './list'
import { useState } from 'react'

export function Leadsboard() {

  const itemsNormal = {
    available: [
      {
        id: 1,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477",
        title: "What is Lorem Ipsum?",
        subtitle: "Lorem Ipsum is simply dummy",
        updatedAt: "6 days ago",
      },
      {
        id: 2,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
        title: "Why do we use it?",
        subtitle: "The point of using at its layout",
        updatedAt: "2 days ago",
      },
      {
        id: 3,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449",
        title: "Where does it come from?",
        subtitle: "Contrary to popular belief, Lorem Ipsum is not simply",
        updatedAt: "3 days ago",
      },
    ],

    assigned: [
      {
        id: 5,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450",
        title: "Where can I get some?",
        subtitle: "There are many variations",
        updatedAt: "6 days ago",
      },
      {
        id: 6,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451",
        title: "Morbi sagittis tellus a efficitur",
        subtitle: "Etiam mollis eros eget mi.",
        updatedAt: "2 days ago",
      },
    ],
  };

  const [items, setItems] = useState(itemsNormal);

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      console.log(result);
      return;
    }
    const listCopy: any = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setItems(listCopy);
  };

  return (
    <div className="App">
      <div className={"h-screen flex"}>
        <div className={"w-64 px-8 py-4 bg-gray-100 border-r overflow-auto"}>
          <nav className={"mt-8"}>
            <h3 className={"text-xs font-semibold text-gray-600 uppercase tracking-wide text-left"}>Plataformas</h3>
            <div className={"mt-2 -mx-3"}>
              <a href="#" className={"flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-900 "}>BNDES</span>
                <span className={"text-xs font-semibold text-gray-700 "}>36</span>
              </a>  
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Instagram</span>
                <span className={"text-xs font-semibold text-gray-700 "}>2</span>
              </a>  
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Facebook</span>
                <span className={"text-xs font-semibold text-gray-700 "}>2</span>
              </a>  
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Site</span>
                <span className={"text-xs font-semibold text-gray-700 "}>1</span>
              </a>  
            </div>
            <h3 className={"mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide text-left"}>Outros</h3>
            <div className={"mt-2 -mx-3"}>
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Bug</span>
              </a>
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Marketing</span>
              </a>
              <a href="#" className={"flex justify-between items-center px-3 py-2 rounded-lg"}>
                <span className={"text-sm font-medium text-gray-700 "}>Design</span>
              </a>   
            </div>
          </nav>
        </div>
        <div className={"flex-1 min-w-0 bg-white flex flex-col mt-1"}>
          <div className={"flex-shrink-0 border-b-2 border-gray-200"}>
            <header className={"px-6"}>
              <div className={"flex justify-between items-center py-5"}>
                <div className={"flex"}>
                  <h2 className={"text-2xl font-semibold text-gray-900 leading-tight"}>BNDES Leads</h2>
                </div>
              </div>
            </header>
          </div>
          
          <div className={"flex-1 overflow-auto"}>
            <main className={"p-3 inline-flex"}>
            <DragDropContext onDragEnd={onDragEnd}>

                <List title="Novo Leads" onDragEnd={onDragEnd} name="available">
                  {items.available.map((item) => (
                <Draggable key={item.id} draggableId={item.id + ""} index={item.id}>
                  {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card  />
                      </div>
                    )}
                  </Draggable>
                  ))}
                </List>     

                <List title="Disponíveis" onDragEnd={onDragEnd} name="available">
                  {items.assigned.map((item) => (
                <Draggable key={item.id} draggableId={item.id + ""} index={item.id}>
                {(provided, snapshot) => (
                       <div
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                       >
                         <Card />
                       </div>
                     )}
                   </Draggable>
                  ))}
                </List>              
            
              <div className={"flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3"}>
                <h3 className={"text-sm font-medium text-gray-900"}>Backlogs</h3>
                <ul className={"mt-2"}>
                  <li className={""}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                </ul>  
              </div>
            

              <div className={"flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3"}>
                <h3 className={"text-sm font-medium text-gray-900"}>Backlogs</h3>
                <ul className={"mt-2"}>
                  <li className={""}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                </ul>  
              </div>
            

              <div className={"flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3"}>
                <h3 className={"text-sm font-medium text-gray-900"}>Backlogs</h3>
                <ul className={"mt-2"}>
                  <li className={""}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                </ul>  
              </div>
            

              <div className={"flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3"}>
                <h3 className={"text-sm font-medium text-gray-900"}>Backlogs</h3>
                <ul className={"mt-2"}>
                  <li className={""}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className={"mt-3"}>
                    <a href="#" className={"block p-5 bg-white rounded shadow"}>
                      <div className={"flex justify-between"}>
                        <p className={"text-sm font-medium leading-snug text-gray-900 text-left"}>
                          Lorem ipsum dolor sit amet
                        </p>
                        <span>
                          <img
                            className={"h-6 w-6 rounded-full"}
                            src="https://i.pravatar.cc/100" alt="avatar"
                          />
                        </span> 
                      </div>
                      <div className={"flex justify-between items-baseline"}>
                        <div className={"text-sm text-gray-600"}>
                          <time dateTime="2019-09-14">Sep 14</time>
                        </div>
                        <div className={"mt-2"}>
                          <span className={"px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded"}>
                            <svg className={"h-2 w-2 text-teal-500"} viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3"/>
                            </svg>
                            <span className={"text-sm ml-2 font-medium text-teal-900"}>Feature Request</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>

                </ul>  
              </div>
              </DragDropContext>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}