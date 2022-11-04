import { Lucide } from "../../base-components";
import {  Documents } from "../../pages/budgets/interfaces/budget";
import UploadButtonComponent from "../UploadButtonComponent";

interface Props {
  description: string;
  key: number;
  id: number;
  cardInput?: number;
  filename?: string;
  documents?: Documents[]
  titleIndex: number;
  onChange: any;
  onRemove?: any;
}
export default function CardUpload(props: Props) {
  const { description, onChange, onRemove, filename, cardInput, id, documents } = props;

  const docs = documents && documents?.length > 0 ? documents.filter(doc => (doc?.document?.type_document.name == description)) : [];
  return (
    <div className="container flex mx-auto p-4 max-w-md">
      <div className="p-6 bg-gray-50 rounded-lg border-blue-700 border-solid cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden border-2 h-full ">
        <div className="lg:h-10">
          <p className="text-md text-center font-semibold ">{description}</p>
        </div>
        <ul className="mb-3 ">
            {
            docs.map(doc => (
              <div className="flex justify-around">
                <li className="text-red-500 text-xs mr-1">
                  <a target="_blank" href={doc?.document.path}>
                    {doc?.document.filename}
                  </a>
                  </li>
                <div onClick={() => onRemove(doc?.document.id)} className="text-danger flex items-center">
                  <Lucide icon="Trash2" className="w-4 h-4 text-red-700" />
              </div>
              </div>
            ))
            }
        </ul>
        <UploadButtonComponent onChange={onChange} />
      </div>
    </div>
  );
}
