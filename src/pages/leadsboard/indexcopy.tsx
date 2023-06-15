
type Props = {
  children?: React.ReactNode;
  data: {
    id: number;
    uuid: string;
    title: string;
    subtitle: string;
    updatedAt: string;
  };
};

const Card = ({ data }: Props) => {
  return (
    <div className="shadow-lg flex w-full cursor-pointer">
      <div className="rounded-l-md p-5 w-36 bg-blue-200">
        <img src="./card.svg" alt="Ícone padrão de item do card" />
      </div>

      <main className="py-7 px-5 rounded-r-md w-full bg-white">
        <span className="flex flex-row justify-between">
          <h4 className="uppercase font-normal">{data.subtitle}</h4>
          <p>{data.updatedAt}</p>
        </span>
        <h1 className="font-bold text-xl">{data.title}</h1>
      </main>
    </div>
  );
};

export function Leadsboard() {
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

              <div className={"p-3 w-80 flex-shrink-0 bg-gray-100 rounded"}>
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
            
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}