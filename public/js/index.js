//search filter
document.getElementById('search').oninput=()=>{
    //removing added row
    const row=document.getElementById('nodata');
    if (row){
        document.getElementById('userTable').removeChild(row);
    }

    let count=0;
    var input,filter,table,tr,td,i,txtValue;
    input=document.getElementById('search');
    filter=input.value.toUpperCase();
    table=document.getElementById('userTable');
    tr=table.getElementsByTagName('tr');
    for(i=0;i<tr.length;i++){
        td=tr[i].getElementsByTagName('td')[0];
        if(td){
            txtValue=td.textContent||td.innerText;
            if(txtValue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display='';
                count+=1;
            }
            else{
                tr[i].style.display='none';
            }
        }
    }
    
    if(count===0){
        //adding a new row
        var tr=document.createElement('tr');
        tr.setAttribute('id','nodata');
        var td=document.createElement('td');
        td.setAttribute('colspan','4')
        td.innerText=' No data to display';
        tr.appendChild(td);
        table.appendChild(tr);
    }
}
