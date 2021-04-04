import React from 'react';
import dirLogo from '../../../../assets/images/dir.svg'
import fileLogo from '../../../../assets/images/file.svg'
import Moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";

function File({file}) {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  function openDirHandler() {
    dispatch(pushToStack(currentDir))
    dispatch(setCurrentDir(file._id))
  }

  return (
      <tr onClick={file.type === 'dir' ? ()=> openDirHandler() : ''}>
        <td><img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/></td>
        <td>{file.name}</td>
        <td>{Moment(file.data).format('DD-MM-YYYY HH:mm')}</td>
        <td>{file.size}</td>
      </tr>
  );
}

export default File;
