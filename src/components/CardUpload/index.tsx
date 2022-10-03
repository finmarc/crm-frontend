import { Lucide } from "../../base-components";
import UploadButtonComponent from "../UploadButtonComponent";

interface Props {
  description: string;
  key: number;
  id: number;
  cardInput?: number;
  filename?: string;
  titleIndex: number;
  onChange: any
}
export default function CardUpload(props: Props) {
  const { description, onChange, filename, cardInput, id} = props;
  console.log(cardInput);
  return (
    <div className="container flex mx-auto p-4 max-w-md">
      <div className="p-6 bg-gray-50 rounded-lg border-blue-700 border-solid cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden border-2 h-full ">
        <div className="lg:h-10 mb-3 ">
          <p className="text-md text-center font-semibold ">{description}</p>
        </div>
        {filename && cardInput && id == cardInput ? (
          <div className="flex justify-center mt-4">
            <span className="text-blue-700 mr-1">{filename}</span>
            <a href="" className="text-danger flex items-center">
              <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
            </a>
          </div>
       ): ""} 
        <UploadButtonComponent onChange={onChange} />
      </div>
    </div>
  );
}
