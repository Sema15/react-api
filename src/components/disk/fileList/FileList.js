import React from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";

function FileList() {

  const files = useSelector(state => state.files.files).map(file => <File key={file.id} file={file}/>)

  return (
      <div className='filelist'>
        <table className="ui single line table">
          <thead>
          <tr>
            <th></th>
            <th>Название</th>
            <th>Дата</th>
            <th>Размер</th>
          </tr>
          </thead>
          <tbody>
          {files}
          </tbody>
        </table>
      </div>
  );
}

export default FileList;
