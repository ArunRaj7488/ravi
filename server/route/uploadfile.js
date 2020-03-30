const router = require('express').Router();
const hummus = require('hummus');
const memoryStreams = require('memory-streams');
const { genratePdf } = require('./pdfmaker')
const fs = require('fs');
const { UploadFile } = require('../models/schema');

module.exports.uploadFiles = async( req, res) => {

    const uploadFiles = req.files;    
    var outStream = new memoryStreams.WritableStream();
    
        try {
            var firstPDFStream = new hummus.PDFRStreamForBuffer(uploadFiles[0].buffer);
            var pdfWriter = hummus.createWriterToModify(firstPDFStream, new hummus.PDFStreamForResponse(outStream));
            uploadFiles.map( (item, index) => {
                if( index != 0){
                    var secondPDFStream = new hummus.PDFRStreamForBuffer(uploadFiles[index].buffer);
                    pdfWriter.appendPDFPagesFromPDF(secondPDFStream);
                }
            });
            
            pdfWriter.end();
            var newBuffer = outStream.toBuffer();
            outStream.end();
            // const file = fs.writeFileSync('./route/some.pdf', newBuffer);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-disposition','attachment');
            // res.type('application/pdf');
            //res.download('./route/some.pdf', "someFile.pdf");
            console.log(newBuffer);
            res.send({newBuffer})
        }
        catch(e){
            outStream.end();
            throw new Error('Error during PDF combination: ' + e.message);
        }
    
    
}