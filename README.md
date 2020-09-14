# importXlsxCsv
Read xlsx and csv

### HTML
```
    <input type="file"  id="csvFileInput"  accept=".csv,.xlsx">
    <div class="result">
    </div>
```

### IMPORT SRC
```
<script src="../js/ImportExcelCsv.js"></script>
<script src="../js/readXlsxFile.js"></script>
```

### JS
```
<script>
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
</script>
```
