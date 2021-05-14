function sqlbuilder() {

    this.sql  = null;
    this.flag = false;

}

sqlbuilder.prototype.build = function () {

    if(!flag)  return null;
    this.flag = false;
    return this.sql;
}


sqlbuilder.prototype.select = function (colmuns, table, condition) {

    let newColumns;

    if(this.flag)  return;

    for(let idx of columns) {
        newColumns += colmuns[idx];
    }
    
    this.sql  = `SELECT (${newColumns}) FROM ${table} WHERE ${condition}`;
    this.flag = true;
}

sqlbuilder.prototype.insert = function (columns, values, table, condition) {




}