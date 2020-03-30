const pdfmaker = require('pdfmake/src/printer');
const path = require('path');
const fs = require('fs');

module.exports.genratePdf = ( docDefinition, successCallback, errorCallback) => {
    try {
    var fontDescriptors = {
		Roboto: {
			normal: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Regular.ttf'),
			bold: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Medium.ttf'),
			italics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Italic.ttf'),
		}
	};

    var printer = new pdfmaker(fontDescriptors);
	var doc = printer.createPdfKitDocument(docDefinition);
    let chunks = [];
    
    doc.pipe(
        fs.createWriteStream('docs/filename.pdf').on("error", (err) => {
          errorCallback(err.message);
        })
      );

      doc.on('end', () => {
        successCallback("PDF successfully created and stored");
      });
      
      doc.end();
      
    } catch(err) {
      throw(err);
    }
};