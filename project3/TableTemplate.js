class TableTemplate{
  static fillIn(id, dict, columnName){
    const table = document.getElementById(id);
    if(table.style.visibility === "hidden")
      table.style.visibility = "visible";
    const rows = table.rows;
    const header = rows[0];
    const hProcess = new Cs142TemplateProcessor(header.innerHTML);
    header.innerHTML = hProcess.fillIn(dict);

    let to_change = -1
    for(let i=0;i<header.cells.length;i++){
      if(header.cells[i].innerHTML === columnName){
        to_change = i;
        break;
      }
    }

    if(to_change === -1 && typeof columnName === "string")  return;
    for(let i=1;i<rows.length;i++){
      const cur = columnName?rows[i].cells[to_change]:rows[i];
      const curProcess = new Cs142TemplateProcessor(cur.innerHTML);
      cur.innerHTML = curProcess.fillIn(dict);
    }
  }
}