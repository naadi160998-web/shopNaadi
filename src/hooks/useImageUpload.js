import { useState } from "react";

const useImageUpload = (multiple,onChange)=>{
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        console.log("e1:",e);
        
        // console.log("e:",e.target.files);
        const fileSingle = e.target.files[0];
        const files = Array.from(e.target.files);
        console.log("files:",files);
        
        let selected = multiple ? files : [fileSingle];

        const previewImages = selected.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages(previewImages);
        onChange(previewImages.map((img) => img.file));
    };

    const removeImage = (index) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        onChange(updated.map((img) => img.file));
    };

    return {
        images,
        handleChange,
        removeImage,
    }
}

export default useImageUpload