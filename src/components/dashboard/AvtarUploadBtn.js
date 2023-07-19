import React, { useState, useRef } from "react";
import { Button, Modal } from "rsuite";
import { useModalState } from "../../misc/customHook";
import { useToaster, Message } from "rsuite";
import AvatarEditor from "react-avatar-editor";
import { useProfile } from "../../context/profile.context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  set,
  update,
} from "firebase/database";
import ProfileAvatars from "./ProfileAvatars";
import { getUserUpdates } from "../../misc/helpers";
let TrueImage = false;

const fileInputs = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => {
  console.log("---FILE TYPE :---- ", file.type);
  TrueImage = acceptedFileTypes.includes(file.type);
  return TrueImage;
};
const AvtarUploadBtn = () => {
  const toaster = useToaster();
  const { isOpen, open, close } = useModalState();
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const onFileInputChange = (e) => {
    const currFiles = e.target.files;
    console.log("---FILE :---- ", currFiles);
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        console.log("INSIDE VALID FILE");
        setImg(file);
        setOpened(true);
        open();
      } else {
        toaster.push(
          <Message showIcon type="warn">
            Wrong file type {file.type}
          </Message>,
          { duration: 4000 }
        );
      }
    }
  };
  const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("File Process Error"));
        }
      });
    });
  };
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    console.log("CANVAS : ", canvas);
    setIsLoading(true);
    try {
      const storage = getStorage();
      const blob = await getBlob(canvas);
      const avatarFileRef = ref(storage, `/profile/${profile.uid}/avatar`);
      console.log("AVATAR FILE REF: ", avatarFileRef);
      console.log("PROFILE ID: ", profile.uid);

      const uploadResult = await uploadBytes(avatarFileRef, blob, {
        cacheControl: "public,max-age=259200",
      });
      console.log("UPLOAD RESULT: ", uploadResult);

      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("DOWNLOAD URL: ", downloadURL);
      // ------------------------------------------------------

      // const database = getDatabase();
      // const userAvatarRef = databaseRef(
      //   database,
      //   `/profiles/${profile.uid}/avatar`
      // );
      // set(userAvatarRef, downloadURL);
      // -------------------------------------------------------
      const database = getDatabase();
      const refToUpdate = databaseRef(database);
      console.log("in avatar upload");
      const updates = await getUserUpdates(
        profile.uid,
        "avatar",
        downloadURL,
        database
      );
      console.log("UPDATES IN AVATAR : ", updates);
      const result = await update(refToUpdate, updates);
      console.log("AVATAR RESULT : ", result);
      // -------------------------------------------------------

      setIsLoading(false);
      toaster.push(
        <Message showIcon type="success">
          Image Uploaded Successfully!
        </Message>,
        { duration: 4000 }
      );
    } catch (error) {
      setIsLoading(false);
      toaster.push(
        <Message showIcon type="error">
          Error {error.message}
        </Message>,
        { duration: 10000 }
      );
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatars
        circle
        name={profile.name}
        src={profile.avatar}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputs}
            onChange={onFileInputChange}
          />
        </label>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload New Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload New Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvtarUploadBtn;
