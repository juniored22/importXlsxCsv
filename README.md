# importXlsxCsv
Read xlsx and csv

### HTML
```html
    <input type="file"  id="csvFileInput"  accept=".csv,.xlsx">
    <div class="result">
    </div>
```

### IMPORT SRC
```html
<script src="../js/ImportExcelCsv.js"></script>
<script src="../js/readXlsxFile.js"></script>
```

### JS
```js
    const import_excel_csv = new ImportExcelCsv()
    document.querySelector('#csvFileInput').addEventListener('change', (e)=>{
        let file = e.target.files
        let options = {
            file,
            head:true,
            indexDateFormate: [1]
        }
        import_excel_csv.init(options, myCallback)
    })
    function myCallback(result){
        console.log(result);
        document.querySelector('.result').innerHTML = JSON.stringify(result)
    }
```
## Dependências

https://gitlab.com/catamphetamine/read-excel-file#readme

## License
<a href="#"><img src="https://img.shields.io/badge/License-MIT-yellow.svg)" alt="License"></a>