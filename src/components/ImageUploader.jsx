import React from "react";
import useImageUpload from "../hooks/useImageUpload";
import { IconTrash } from "@tabler/icons-react";

const ImageUploader = ({ multiple = false, onChange, title, label, loading }) => {

  const {
    images,
    handleChange,
    removeImage,
  } = useImageUpload(multiple, onChange)

  return (
    <div>
      <p size="xs" c="red.4">{title}</p>
      <input type="file" onChange={handleChange} multiple={multiple} />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <div >
          {images.map((img, index) => (

            <div span={4} key={index}>
              <img
              radius='md'
              width="auto"
              height={300}
              src={img.preview}
              fit='contain'
            />
            <button bg="red" onClick={() => removeImage(index)} loading={loading} loaderProps={{ type: 'dots' }}>
                <IconTrash size={20}/>
              </button></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;