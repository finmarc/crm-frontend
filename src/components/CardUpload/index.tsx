import UploadButtonComponent from "../UploadButtonComponent";

export default function CardUpload(props: any) {
  const { description, index} = props;

  if (index === 6) {
    return (
      <div className="container flex mx-auto p-4 max-w-md">
        <div className="p-6 bg-gray-50 rounded-lg border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden border-2 h-full ">
          <div className="lg:h-10 mb-12">
            <p className="text-base text-center font-semibold">{description}</p>
          </div>
          <UploadButtonComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="container flex mx-auto p-4 max-w-md">
      <div className="p-6 bg-gray-50 rounded-lg border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden border-2 h-full ">
        <div className="lg:h-10 mb-12 ">
          <p className="text-md text-center font-semibold ">{description}</p>
        </div>
        <UploadButtonComponent />
      </div>
    </div>
  );
}
