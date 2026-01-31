import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

type props = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: props) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileURL, setFileURL] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (!acceptedFiles.length) return;

      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileURL(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col bg-transparent rounded-xl cursor-pointer "
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileURL ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileURL} alt="image" className="file_uploader-img" />
          </div>
          <p className="text-gray-300 text-center small-regular w-full p-4 border-t border-t-gray-700">Click or drag photo to replace</p>
        </>
      ) : isDragActive ? (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-153 ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="text-3xl text-center font-medium leading-[140%] text-gray-300 mb-2 mt-6">
            Drop Here
          </h3>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-153 ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="text-[16px] font-medium leading-[140%] text-gray-300 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
