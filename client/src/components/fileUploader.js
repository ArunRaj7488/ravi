import React,{ Component } from 'react';
import UploadServices from '../services/UploadFiles';
import download from 'downloadjs';

var filesData;

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state={
            uploadFiles: [null],
            responseData : null
        }
    }; 

    onHandleChange =(e) => {  
        this.setState({ uploadFiles: [...e.target.files ]})
    };


    onSubmit = async() => {
        const data = new FormData();
        console.log(this.state.uploadFiles);
        if( this.state.uploadFiles){
            this.state.uploadFiles.forEach( pdf => {
                data.append('uploadFiles',pdf);
            })
        }
         filesData = await UploadServices.uploadFiles(data)

        console.log(filesData);
        this.setState({ responseData: filesData.data})
    };

    handleDownload = async () => {
        // const blob = await filesData.blob(filesData.data)
        var blob=new Blob([filesData.data], {type:"application/pdf"});
          var link=document.createElement('a');
          link.href=window.URL.createObjectURL(blob);
          link.download="Report_"+new Date()+".pdf";
          link.click();
       
        //download(blob, "some.pdf");
       }
    

    render() {
        return (
            <div>
                <h3>Upload PDF Files</h3>
                <input type='file' name='files' multiple onChange={(e)=> this.onHandleChange(e)}/>
                <button className="btn btn-info" onClick={this.onSubmit} >Upload</button>
                <div>
      <button type="button" onClick={ () =>this.handleDownload() } >Download</button>
    </div>

            </div>
        )
    }
};
export default FileUploader;