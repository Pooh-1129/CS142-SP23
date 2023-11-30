'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(date){
      const table = document.createElement("table");
      const title = table.insertRow();
      const left = title.insertCell();
      left.innerHTML ='<';
      left.addEventListener("click",()=>{
        table.remove();
        this.render(new Date(date.getFullYear(), date.getMonth()-1,1));
      });
      left.setAttribute("class","change");

      const info = title.insertCell();
      const months = ["January", "February", "March", "April", "May", "June", "July", 
                    "August", "September", "October", "November", "December"];
      info.innerHTML = months[date.getMonth()]+"  "+date.getFullYear();
      info.colSpan = "5";
      info.setAttribute("class","info");

      const right = title.insertCell();
      right.innerHTML ='>';
      right.addEventListener("click",()=>{
        table.remove();
        this.render(new Date(date.getFullYear(), date.getMonth()+1,1));
      });
      left.setAttribute("class","change");

      const head = table.insertRow();
      const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      for(let i=0;i<7;i++){
        const head_cell = head.insertCell();
        head_cell.innerHTML = days[i];;
      }
      head.setAttribute("class","header");
      
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year,month,1-firstDay.getDay());

      do{
        const weekRow = table.insertRow();
        for(let i=0;i<7;i++){
          const dayCell = weekRow.insertCell();
          dayCell.innerHTML = lastDay.getDate();
          if(lastDay.getMonth()===month){
            const tmp ={month: lastDay.getMonth()+1,
                        day: lastDay.getDate(),
                        year: lastDay.getFullYear()};
            dayCell.addEventListener("click", () => {
                        this.callback(this.id, tmp);});
            dayCell.setAttribute("class","normal");
          }
          else dayCell.setAttribute("class", "dim");
          lastDay.setDate(lastDay.getDate() + 1);
          }
      }while(lastDay.getMonth()===month);

      
      const parent = document.getElementById(this.id);
      parent.appendChild(table);
    }
}
