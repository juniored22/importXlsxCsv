class ImportExcelCsv {

  constructor() {
    if (typeof readXlsxFile === 'undefined') {
      window.addEventListener('load', function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js';
        document.head.appendChild(script);
      });
    }
  }

  init(options, callback) {
    if (window.FileReader) {
      this.getAsText(options);
    } else {
      alert('FileReader are not supported in this browser.');
    }

    if (typeof readXlsxFile === 'undefined') {
      alert('readXlsxFile are not supported in this browser.');
    }

    this.callback = callback
  }

  getAsText(options) {
    var reader = new FileReader();
    var typeFile = typeFile
    // Handle errors and load with options
    reader.onload = this.loadHandler.bind(this);
    reader.onerror = this.errorHandler;
    reader.file = options.file[0]
    reader.head = options.head
    reader.indexDateFormate = options.indexDateFormate
    // Read file into memory as UTF-8      
    reader.readAsText(options.file[0]);
  }

  loadHandler(event) {
    var csv = event.target.result;
    var xlsx = event.target.file
    let indexDateFormate = event.target.indexDateFormate

    if (event.target.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.xlsxType(xlsx, indexDateFormate).then((res) => {
        console.log(res);

        debugger
        event.target.head
          ? this.callback({ result: res, header: res[0], rows: res.slice(1) })
          : this.callback({ result: res, header: false, rows: res })
      });
    }
    if (event.target.file.type == 'text/csv') {
      let res = this.csvType(csv);
      event.target.head
        ? this.callback({ result: res, header: res[0], rows: res.slice(1) })
        : this.callback({ result: res, header: false, rows: res })
    }
  }

  /**
   * @param {indexDateFormate} - index matrix to format in xlsx (for table with date in Excel format)
   * @param {xlsx} - file type xlsx
   * @return {Promise} array row 
   */
  xlsxType(xlsx, indexDateFormate) {
    return readXlsxFile(xlsx)
      .then((res) => {
        res = res.map((e, i) => {
          if (i != 0) {
            indexDateFormate.forEach(element => {
              e[element] = this.excelDateToJSDatePtBr(e[element]) != 'Invalid Date'
                ? this.excelDateToJSDatePtBr(e[element])
                : e[element]
            });
          }
          return e
        })
      })
  }

  /**
   * 
   * @param {csv} file type csv 
   * @return {Array} array row
   */
  csvType(csv) {

    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];

    while (allTextLines.length) {
      let tm = allTextLines.shift().split(',')
      tm = tm.map((a) => {
        return a.replace(/"/g, '')
      })
      lines.push(tm);
    }
    return lines;
  }

  resultRead() {
    return 2
  }

  excelDateToJSDatePtBr(serial) {
    let date_info = new Date(Math.floor(serial - 25568) * 86400 * 1000);
    let fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    let seconds = total_seconds % 60;
    total_seconds -= seconds;
    let hours = Math.floor(total_seconds / (60 * 60));
    let minutes = Math.floor(total_seconds / 60) % 60;
    let result = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds).toLocaleString('pt');
    let date_not_formatad = result.split(' ')
    let date_formated = date_not_formatad[0].split('/')[2] + '-' + date_not_formatad[0].split('/')[1] + '-' + date_not_formatad[0].split('/')[0]
    date_formated += ' ' + date_not_formatad[1]
    return date_formated
  }

  errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
      alert("Canno't read file !");
    }
  }

}
