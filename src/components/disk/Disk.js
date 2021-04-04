import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../../actions/file";
import FileList from "./fileList/FileList";
import Input from "../../utils/input/Input";
import {setCurrentDir} from "../../reducers/fileReducer";

function Disk() {
  const [dirName, setDirName] = useState('')
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  function createHandler(){
    dispatch(createDir(currentDir, dirName))
  }

  function backClickHandler() {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
      <div className="disk">
        <div className="disk__btns">
          <button className="ui button" onClick={() => backClickHandler()}>Назад</button>
          <button className="ui button" onClick={() => createHandler()}>Создать папку</button>
          <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
        </div>
        <FileList/>
      </div>
  );
};

export default Disk;
