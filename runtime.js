module.exports = {
    _start : 0,
    start : () => {this._start = Date.now()},
    end   : () => { return " - " + (Date.now() - this._start) + "ms"}
}