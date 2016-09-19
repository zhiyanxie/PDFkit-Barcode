
var utils = require('utils')
var blobStream = require('blob-stream');
var PDFDocument = require('pdfkit');

var doc, stream;

doc = utils.pdfGenerate(input, 'table');

stream = doc.pipe(blobStream());

doc.end();

stream.on('finish', function() {
  $scope.previewURL = stream.toBlobURL('application/pdf');
  return $scope.trustPreviewUrl = $sce.trustAsResourceUrl($scope.previewURL);
});
