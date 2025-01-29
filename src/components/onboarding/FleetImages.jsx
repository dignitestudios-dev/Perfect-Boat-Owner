import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FiDownload, FiLoader } from "react-icons/fi";

const FleetImages = ({
  error,
  formIndex,
  setUploadImages,
  setCoverImage,
  imagesArray,
  setImagesArray,
  coverImage,
  setImagesBox,
  imagesBox,
  setForms,
}) => {
  console.log("🚀 ~ imagesArray:", imagesArray);
  console.log("🚀 ~ imagesBox:", imagesBox);
  const [imageLoading, setImageLoading] = useState(false);
  const handleUploadedImage = async (e, formIndex, imageIndex) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        errors: {
          ...updatedForms[formIndex].errors,
          ["image"]: undefined,
          ["cover"]: undefined,
        },
      };
      return updatedForms;
    });
    const file = e.target.files[0];
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      setImageLoading(true);
      const images = await Promise.all(
        files.map(async (file) => {
          const base64String = await convertImageToBase64(file);
          return `data:${file.type};base64,${base64String}`;
        })
      );
      setImageLoading(false);
      setImagesArray((prev) => {
        const updatedImages = [...prev];
        if (!updatedImages[formIndex]) updatedImages[formIndex] = [];
        images.forEach((image, idx) => {
          if (updatedImages[formIndex].length < 5) {
            //   updatedImages[formIndex].push(image);
            updatedImages[formIndex][idx] = image;
            return updatedImages;
          }
        });
        return updatedImages;
      });

      setUploadImages((prev) => {
        const updatedFiles = [...prev];
        if (!updatedFiles[formIndex]) updatedFiles[formIndex] = [];
        files.forEach((file, idx) => {
          if (updatedFiles[formIndex].length < 5) {
            updatedFiles[formIndex][idx] = file;
          }
        });
        return updatedFiles;
      });

      setImagesBox((prev) => {
        const updatedBox = [...prev];
        console.log("🚀 ~ setImagesBox ~ updatedBox:", updatedBox);
        if (!updatedBox[formIndex]) updatedBox[formIndex] = [];
        images.forEach((_, idx) => {
          while (
            updatedBox[formIndex].length < imagesArray[formIndex].length + 1 &&
            updatedBox[formIndex].length < 5
          ) {
            updatedBox[formIndex].push(updatedBox[formIndex].length);
          }
        });
        return updatedBox;
      });
    } else {
      if (file) {
        const image = file;

        const base64String = await convertImageToBase64(file);
        const base64WithPrefix = `data:${file.type};base64,${base64String}`;
        setImagesArray((prev) => {
          const updatedImages = [...prev];
          if (!updatedImages[formIndex]) updatedImages[formIndex] = [];
          updatedImages[formIndex][imageIndex] = base64WithPrefix;
          return updatedImages;
        });

        setUploadImages((prev) => {
          const updatedImages = [...prev];
          if (!updatedImages[formIndex]) updatedImages[formIndex] = [];
          updatedImages[formIndex][imageIndex] = image;
          return updatedImages;
        });

        setImagesBox((prev) => {
          const updatedBox = [...prev];
          if (!updatedBox[formIndex]) updatedBox[formIndex] = [];
          if (updatedBox[formIndex].length < 5) {
            updatedBox[formIndex] = [
              ...updatedBox[formIndex],
              updatedBox[formIndex].length,
            ];
          }
          return updatedBox;
        });
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCoverSelect = (formIndex, imageIndex) => {
    setCoverImage((prev) => {
      const updatedCoverImage = [...prev];

      if (!updatedCoverImage[formIndex]) {
        updatedCoverImage[formIndex] = null;
      }

      updatedCoverImage[formIndex] = imageIndex;

      return updatedCoverImage;
    });

    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        errors: { ...updatedForms[formIndex].errors, ["cover"]: undefined },
      };
      return updatedForms;
    });
  };

  const handleRemoveImage = (formIndex, imageIndex) => {
    if (imagesArray[formIndex].length > 1) {
      setImagesArray((prev) => {
        const updatedImages = prev.map((formImages, idx) =>
          idx === formIndex
            ? formImages.filter((_, idx) => idx !== imageIndex)
            : formImages
        );
        return updatedImages;
      });
      setUploadImages((prev) => {
        const updatedImages = prev.map((formImages, idx) =>
          idx === formIndex
            ? formImages.filter((_, idx) => idx !== imageIndex)
            : formImages
        );
        return updatedImages;
      });
    }

    if (imagesBox[formIndex].length > 2) {
      setImagesBox((prev) => {
        const updatedBox = prev.map((formBoxes, idx) =>
          idx === formIndex
            ? formBoxes.filter((_, idx) => idx !== imageIndex)
            : formBoxes
        );
        return updatedBox;
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <>
        <h3 className="text-[18px] font-bold leading-[24.3px]">
          Upload Pictures{" "}
          <span className="text-[14px] font-normal leading-[24px]">
            (Supported Files Type: JPG, PNG)
          </span>
        </h3>
        <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
          {imagesBox[formIndex]?.map((_, imageIndex) => {
            return (
              <div key={imageIndex}>
                <div className="relative">
                  <label
                    className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                                                        text-3xl flex items-center justify-center cursor-pointer"
                  >
                    {imagesArray[formIndex][imageIndex] ? (
                      <img
                        src={imagesArray[formIndex][imageIndex]}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        {imageLoading ? (
                          <FiLoader className="animate-spin mx-auto" />
                        ) : (
                          <FiDownload />
                        )}
                      </>
                    )}

                    <input
                      name={`formsImages`}
                      accept="image/jpeg, image/png, image/bmp, image/webp"
                      className="hidden"
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleUploadedImage(e, formIndex, imageIndex)
                      }
                    />
                  </label>

                  {imagesArray[formIndex][imageIndex] ? (
                    <div className="absolute top-3 right-3 bg-[#ffffff9f] p-1 rounded-full">
                      <CiTrash
                        className="text-black cursor-pointer text-[15px]"
                        onClick={() => handleRemoveImage(formIndex, imageIndex)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-auto ml-1 mt-1 flex gap-2 justify-start items-center">
                  <input
                    type="radio"
                    checked={coverImage[formIndex] === imageIndex}
                    onChange={() => handleCoverSelect(formIndex, imageIndex)}
                    className="w-3 h-3 rounded-full accent-white outline-none border-none"
                  />
                  <span className="text-[12px] font-medium leading-[16.3px]">
                    Set as cover photo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
      </>
    </div>
  );
};

export default FleetImages;
