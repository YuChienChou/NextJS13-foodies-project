"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {

  // console.log("label: ", label);  
  // console.log("name: ", name);
  const [pickedImage, setPickedImage] = useState();
  // console.log("pickedImage: ", pickedImage);

  const imageInput = useRef(); // Create a reference to the input element

  function handleClick() {
    imageInput.current.click(); // Trigger the file picker by clicking the button
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    // console.log("file:", file);

    if (!file) {
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();
    // console.log("reader: ", reader);

    reader.onload = () => {
      setPickedImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The image selected by the user." fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput} // Connect the input element to the reference
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
